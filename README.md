scooley.github.io
=================

## System Overview

This repository contains the Jekyll site at [scooley.io](https://scooley.io).
[`_config.yml`](./_config.yml) selects the Minimal Mistakes remote theme and
configures page defaults, post URLs, pagination, and plugins.
[`Gemfile`](./Gemfile) supplies the GitHub Pages dependency bundle and
`jekyll-include-cache`.

Most of the site is Markdown content and theme configuration. The local browser
code controls appearance preferences. See [Site composition](./SITE.md) for
editing guidance and the relationship between profiles, pages, and appearance.

## Subdirectories & System Boundaries

- [`assets`](./assets/README.md): Browser appearance behavior and supporting
  styles and images; the code contract is in [`assets/js`](./assets/js/README.md).

Content-only and template-only directories are not separate code contracts in
this blueprint. Pages live in `_pages/`, posts in `_posts/`, profile and navigation
data in `_data/`, and theme overrides in `_includes/`.

## Global Invariants

- [`_config.yml:include`](./_config.yml) includes `_pages` in the Jekyll build.
- [`_config.yml:defaults`](./_config.yml) assigns posts the `single` layout,
  `author: scooley`, and `author_profile: true`; individual front matter may
  override these defaults.
- [`_config.yml:permalink`](./_config.yml) defines post URLs as
  `/blog/:categories/:title/`.
- [`_includes/head/custom.html:dark-skin`](./_includes/head/custom.html) provides
  the dark stylesheet link and `meta[name="color-scheme"]` consumed by
  [`appearance.js:applyPreference`](./assets/js/appearance.js).
- [`_includes/footer/custom.html:appearance-picker`](./_includes/footer/custom.html)
  supplies `#appearance-picker` and `#color-scheme`, with `system`, `light`, and
  `dark` option values matching [`appearance.js:media`](./assets/js/appearance.js).

## Global Side Effects

- Jekyll builds write the generated site to `_site/`; local serving also starts
  an HTTP server.
- [`_config.yml:remote_theme`](./_config.yml) and [`Gemfile:source`](./Gemfile)
  depend on externally supplied theme and gem resources.
- [`appearance.js:applyPreference`](./assets/js/appearance.js) changes browser
  appearance, and its selector change handler persists the preference in
  `localStorage`. These are client-side effects, not server-side user storage.

## System Verification

There is no configured automated test suite or linter.

```sh
bundle exec jekyll build
```

For local inspection, run `bundle exec jekyll serve` and open
`http://127.0.0.1:4000`. Check System, Light, and Dark in the footer selector and
reload to confirm an explicit choice persists. Install missing gems with
`bundle install` before building.
