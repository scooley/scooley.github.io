# Site composition

## Personal sidebar

The `scooley` profile in `_data/authors.yml` contains the about-me sidebar text,
location preferences, and profile links. The portrait is stored at
`assets/images/sarah-cooley.png`.

The resume uses Minimal Mistakes' `single` layout with `author_profile: true`
and `author: scooley` to display this sidebar. Other pages can use the same
front matter to share the personal profile.

Posts default to `author: scooley` and `author_profile: true` through
`_config.yml`, displaying the author's profile in the left sidebar. To use a
different profile, set `author: <profile-key>` in the post's front matter and
define that profile in `_data/authors.yml`.

Other pages without an explicit author continue to use the site-wide author
in `_config.yml`.

## Blog

My blog lives in `/blog/`. It lists posts newest first, with linked titles,
publication dates, reading times, and excerpts using the Minimal Mistakes theme.

Add posts in `_posts/` using `YYYY-MM-DD-title.md` filenames and front matter
with a title and date. Posts appear in the blog automatically; no manual links
or page updates are needed. Post URLs follow the permalink setting in
`_config.yml`.

## Career page

`_pages/resume.md` is titled "My work" and keeps the `/resume/` URL. It presents
linked highlights followed by a conversational career history, rather than a
document-style resume. Its "On this page" navigation comes from the theme's
built-in table of contents.

## Appearance

The footer's Appearance selector offers System, Light, and Dark. System is the
default and follows changes to the device's appearance. Explicit choices are
saved in the browser's `localStorage` under `color-scheme` and applied before
page content renders by `assets/js/appearance.js`. If storage is unavailable,
the choice still works for the current page and a warning is logged.

`_includes/footer/custom.html` provides the selector, styled by
`assets/css/appearance.css`. It stays hidden without JavaScript; the site
still follows the system appearance in that case. The compact native select
uses system colors (`Field`, `FieldText`, and `GrayText`) so its text,
background, and border follow the selected color scheme rather than the
theme's hardcoded white select background. Keyboard focus has a visible outline.

The light skin is selected by `minimal_mistakes_skin` in `_config.yml`.
`_includes/head/custom.html` links to the generated `assets/css/dark.css`
(built from `assets/css/dark.scss`). The script adjusts that link's media
condition and the native browser color scheme to match the selected option.
The dark stylesheet imports Minimal Mistakes' built-in dark skin and styles,
so both appearances stay aligned with the remote theme. Keep the initial
`prefers-color-scheme: dark` condition for the no-JavaScript fallback.
