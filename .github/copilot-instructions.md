# Copilot Instructions — scooley.github.io

## Build & Serve

```bash
bundle install                  # install dependencies
bundle exec jekyll serve        # local dev server at http://127.0.0.1:4000
bundle exec jekyll build        # build static site to _site/
```

GitHub Pages builds and deploys automatically on push to the default branch. There are no tests or linters configured.

## Architecture

This is a **Jekyll** site using the **Minimal Mistakes** remote theme (`mmistakes/minimal-mistakes@4.24.0`) deployed to **GitHub Pages** at `scooley.io`.

- **`_config.yml`** — Theme config, site metadata, author info, plugin list, and front matter defaults for posts and pages.
- **`_pages/`** — Static pages (blog, projects, resume). These are included via the `include: [_pages]` directive in `_config.yml`.
- **`_data/navigation.yml`** — Top-level site navigation links.
- **`index.md`** — Homepage using the `home` layout.

Posts go in `_posts/` (not yet created) using the naming convention `YYYY-MM-DD-title.md`. Default front matter for posts and pages is set in `_config.yml` under `defaults:` — avoid duplicating those values in individual files.

## Conventions

- All pages use Minimal Mistakes layouts (`single`, `archive`, `home`). Refer to [Minimal Mistakes docs](https://mmistakes.github.io/minimal-mistakes/) for available layouts, helpers, and overrides.
- The permalink pattern is `/:categories/:title/`.
- The site has no custom layouts or includes — everything comes from the remote theme. Any overrides would go in `_layouts/` or `_includes/` directories (which don't exist yet).

## Clarity Protocol

This project uses the Clarity Protocol (`.clarity-protocol/`) for structured thinking. When the user is exploring what to build, requirements are unclear, or they ask to brainstorm, clarify, or analyze risks — read and follow `/Users/scooley/Applications/Clarity.app/Contents/Resources/app/processes/clarity-agent.md`.

After significant implementation work, update protocol documents:

```bash
python -m clarity_agent.protocol.packet_status . --agent
python -m clarity_agent.protocol.packet_status . --record <docs>
```
