# Appearance preference

## Overview

[`appearance.js`](./appearance.js) runs an internal browser closure that applies
the saved appearance preference and connects the footer's appearance selector.
It exports no public JavaScript symbols.

## Interface

- [`appearance.js:storageKey`](./appearance.js): Uses the browser `localStorage`
  key `color-scheme`.
- [`appearance.js:media`](./appearance.js): Maps `system` to
  `(prefers-color-scheme: dark)`, `light` to `not all`, and `dark` to `all`.
- [`appearance.js:applyPreference`](./appearance.js): Updates the `media`
  attribute of `#dark-skin` and the content of `meta[name="color-scheme"]`.
  The [head include](../../_includes/head/custom.html) supplies these elements.
- [`appearance.js:DOMContentLoaded`](./appearance.js): Initializes
  `#color-scheme`, unhides `#appearance-picker`, and registers the selector's
  change listener. The [footer include](../../_includes/footer/custom.html)
  supplies these elements.

## Invariants

- [`appearance.js:preference`](./appearance.js): Starts with `system`; a stored
  preference is accepted only when it is a key in `media`.
- [`appearance.js:applyPreference`](./appearance.js): Keeps the dark stylesheet's
  media condition and browser color-scheme metadata aligned with the current
  preference. System mode uses `light dark` metadata.
- [`appearance.js:media`](./appearance.js): The footer option values must match
  the supported preference keys.

## Side Effects

- [`appearance.js:applyPreference`](./appearance.js): Applies the preference
  immediately when the script executes, modifying the stylesheet link and
  metadata.
- [`appearance.js:DOMContentLoaded`](./appearance.js): Reveals the picker and
  attaches its change listener.
- [`appearance.js:storageKey`](./appearance.js): Reads the saved preference on
  startup and writes a new preference when the selector changes.
- [`appearance.js:console.warn`](./appearance.js): Warns on invalid saved
  preferences and on storage read or write errors. Storage failures are caught;
  a failed write does not undo the current in-page selection.

## Verification

There is no configured automated JavaScript test runner. From the repository
root, run `bundle exec jekyll build`, then `bundle exec jekyll serve` for manual
inspection:

1. Select System, Light, and Dark and confirm the page follows the selection.
2. Reload after an explicit selection and confirm the preference persists.
3. In System mode, change the device appearance and confirm the page follows it.
4. With browser storage unavailable, confirm selection still works in the
   current page and a warning is logged.
