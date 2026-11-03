# Site assets

## Overview

This directory groups browser code, appearance styles, and static images for the
Jekyll site. See [Site composition](../SITE.md) for the appearance integration.

## Subdirectories & Boundaries

- [`js`](./js/README.md): Appearance preference logic and browser integration
  contract.
- `css/`: Supporting styles, referenced by the
  [custom head include](../_includes/head/custom.html).
- `images/`: Static image assets.

## Interface

The browser behavior is defined by the [JavaScript contract](./js/README.md).
The [custom head include](../_includes/head/custom.html) loads
`assets/js/appearance.js`, `assets/css/appearance.css`, and the generated
`assets/css/dark.css`.

## Invariants

- [`appearance.js:media`](./js/appearance.js) defines the same `system`, `light`,
  and `dark` values offered by the
  [footer selector](../_includes/footer/custom.html).
- [`appearance.js:applyPreference`](./js/appearance.js) relies on the
  `#dark-skin` link and `meta[name="color-scheme"]` supplied by the
  [head include](../_includes/head/custom.html).

## Side Effects

[`appearance.js:applyPreference`](./js/appearance.js) changes browser appearance;
the selector change handler writes the preference to browser `localStorage`.
See the [JavaScript contract](./js/README.md) for failure handling.

## Verification

From the repository root, run `bundle exec jekyll build`. Use
`bundle exec jekyll serve` for the manual appearance checks described in the
[root blueprint](../README.md#system-verification).
