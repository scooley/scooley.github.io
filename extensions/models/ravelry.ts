import { z } from "npm:zod@4.1.12";

const GlobalArgs = z.object({
  member: z.string().regex(/^[a-zA-Z0-9_-]+$/),
  apiUsername: z.string().min(1).meta({ sensitive: true }),
  apiPassword: z.string().min(1).meta({ sensitive: true }),
});

const Project = z.object({
  id: z.number().int(),
  name: z.string(),
});

const Preview = z.object({
  member: z.string(),
  sampleOnly: z.boolean(),
  projects: z.array(Project),
});

const Details = z.object({
  member: z.string(),
  projects: z.array(z.record(z.string(), z.unknown())),
});

type Context = {
  globalArgs: z.infer<typeof GlobalArgs>;
  writeResource: (
    spec: string,
    name: string,
    data: z.infer<typeof Preview> | z.infer<typeof Details>,
  ) => Promise<{ name: string }>;
};

export const model = {
  type: "@scooley/ravelry",
  version: "2026.11.02.1",
  globalArguments: GlobalArgs,
  resources: {
    preview: {
      description: "First five project names and IDs, not a complete notebook",
      schema: Preview,
      lifetime: "1d",
      garbageCollection: 2,
    },
    details: {
      description:
        "Selected notebook entries for local editorial review, not full project notes",
      schema: Details,
      lifetime: "1d",
      garbageCollection: 2,
    },
  },
  methods: {
    details: {
      description:
        "Read up to five selected entries from the first 100 notebook projects",
      arguments: z.object({
        ids: z.array(z.number().int().positive()).min(1).max(5),
      }),
      execute: async (args: { ids: number[] }, context: Context) => {
        const ids = z.array(z.number().int().positive()).min(1).max(5).parse(
          args.ids,
        );
        const { member, apiUsername, apiPassword } = GlobalArgs.parse(
          context.globalArgs,
        );
        const headers = {
          Authorization: `Basic ${btoa(`${apiUsername}:${apiPassword}`)}`,
          Accept: "application/json",
        };
        const listing = await fetch(
          `https://api.ravelry.com/projects/${
            encodeURIComponent(member)
          }/list.json?page_size=100`,
          {
            headers,
            redirect: "error",
            signal: AbortSignal.timeout(20_000),
          },
        );
        if (!listing.ok) {
          await listing.body?.cancel();
          throw new Error(
            `Ravelry project lookup failed (HTTP ${listing.status}).`,
          );
        }
        const index = z.object({
          projects: z.array(z.record(z.string(), z.unknown())),
        }).parse(await listing.json());
        const projects = [];
        for (const id of ids) {
          const entry = index.projects.find((project) => project.id === id);
          if (!entry) {
            throw new Error(
              `Project ${id} was not in the first 100 Ravelry projects; select a listed project.`,
            );
          }
          projects.push(entry);
        }
        const handle = await context.writeResource("details", "details", {
          member,
          projects,
        });
        return { dataHandles: [handle] };
      },
    },
    preview: {
      description:
        "Check read access to a member's projects without publishing",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const { member, apiUsername, apiPassword } = GlobalArgs.parse(
          context.globalArgs,
        );
        const url = new URL(
          `/projects/${encodeURIComponent(member)}/list.json`,
          "https://api.ravelry.com",
        );
        url.searchParams.set("page", "1");
        url.searchParams.set("page_size", "5");
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Basic ${btoa(`${apiUsername}:${apiPassword}`)}`,
            Accept: "application/json",
          },
          redirect: "error",
          signal: AbortSignal.timeout(20_000),
        });
        if (!response.ok) {
          await response.body?.cancel();
          throw new Error(
            `Ravelry project preview failed (HTTP ${response.status}). ` +
              "Check the API credentials and whether read-only access permits project listing.",
          );
        }
        const result = z.object({ projects: z.array(Project) }).parse(
          await response.json(),
        );
        const handle = await context.writeResource("preview", "preview", {
          member,
          sampleOnly: true,
          projects: result.projects,
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
