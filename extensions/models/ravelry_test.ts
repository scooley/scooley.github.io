import { deepStrictEqual, rejects, strictEqual } from "node:assert";
import { model } from "./ravelry.ts";

const globalArgs = {
  member: "yiandes",
  apiUsername: "test-user",
  apiPassword: "test-password",
};

Deno.test("preview uses a fixed HTTPS GET and saves only project names and IDs", async () => {
  const originalFetch = globalThis.fetch;
  const writes: unknown[] = [];
  globalThis.fetch = (input, init) => {
    const url = new URL(String(input));
    strictEqual(url.origin, "https://api.ravelry.com");
    strictEqual(url.pathname, "/projects/yiandes/list.json");
    strictEqual(url.searchParams.get("page_size"), "5");
    strictEqual(init?.method, "GET");
    strictEqual(init?.redirect, "error");
    strictEqual(
      new Headers(init?.headers).get("Authorization"),
      `Basic ${btoa("test-user:test-password")}`,
    );
    return Promise.resolve(Response.json({
      projects: [{ id: 123, name: "Cardigan", notes: "Not for publication" }],
    }));
  };
  try {
    await model.methods.preview.execute({}, {
      globalArgs,
      writeResource: (spec, name, data) => {
        writes.push({ spec, name, data });
        return Promise.resolve({ name });
      },
    });
    deepStrictEqual(writes, [{
      spec: "preview",
      name: "preview",
      data: {
        member: "yiandes",
        sampleOnly: true,
        projects: [{ id: 123, name: "Cardigan" }],
      },
    }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

Deno.test("denied access reports HTTP status without saving an empty success", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () =>
    Promise.resolve(new Response("Private server response", { status: 401 }));
  try {
    await rejects(
      () =>
        model.methods.preview.execute({}, {
          globalArgs,
          writeResource: () => {
            throw new Error("Must not persist a failed preview");
          },
        }),
      /Ravelry project preview failed \(HTTP 401\)/,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

Deno.test("malformed project responses fail rather than producing a preview", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () =>
    Promise.resolve(Response.json({ projects: [{ name: "Missing ID" }] }));
  try {
    await rejects(
      () =>
        model.methods.preview.execute({}, {
          globalArgs,
          writeResource: () => {
            throw new Error("Must not persist an invalid preview");
          },
        }),
      (error: unknown) => error instanceof Error && error.name === "ZodError",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

Deno.test("details stores only selected notebook entries", async () => {
  const originalFetch = globalThis.fetch;
  const writes: unknown[] = [];
  const paths: string[] = [];
  globalThis.fetch = (input, init) => {
    const url = new URL(String(input));
    strictEqual(url.origin, "https://api.ravelry.com");
    strictEqual(init?.method || "GET", "GET");
    strictEqual(init?.redirect, "error");
    paths.push(url.pathname);
    return Promise.resolve(Response.json({
      projects: [
        { id: 123, name: "Cardigan", permalink: "cardigan" },
        { id: 456, name: "Cat", permalink: "cat" },
        { id: 789, name: "Not selected" },
      ],
    }));
  };
  try {
    await model.methods.details.execute({ ids: [123, 456] }, {
      globalArgs,
      writeResource: (spec, name, data) => {
        writes.push({ spec, name, data });
        return Promise.resolve({ name });
      },
    });
    deepStrictEqual(paths, [
      "/projects/yiandes/list.json",
    ]);
    deepStrictEqual(writes, [{
      spec: "details",
      name: "details",
      data: {
        member: "yiandes",
        projects: [
          { id: 123, name: "Cardigan", permalink: "cardigan" },
          { id: 456, name: "Cat", permalink: "cat" },
        ],
      },
    }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

Deno.test("an absent notebook entry does not save a partial selection", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () =>
    Promise.resolve(Response.json({
      projects: [{ id: 123, name: "Cardigan" }],
    }));
  try {
    await rejects(() =>
      model.methods.details.execute({ ids: [123, 456] }, {
        globalArgs,
        writeResource: () => {
          throw new Error("Must not save partial results");
        },
      }), /Project 456 was not in the first 100 Ravelry projects/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
