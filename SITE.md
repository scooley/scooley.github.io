# Site composition

## Personal sidebar

The `scooley` profile in `_data/authors.yml` contains the about-me sidebar text,
location preferences, and profile links. The portrait is stored at
`assets/images/sarah-cooley.png`.

The resume uses Minimal Mistakes' `single` layout with `author_profile: true`
and `author: scooley` to display this sidebar. Other pages can use the same
front matter to share the personal profile.

Other pages continue to use the site-wide author in `_config.yml`.

## Career page

`_pages/resume.md` is titled "My work" and keeps the `/resume/` URL. It presents
linked highlights followed by a conversational career history, rather than a
document-style resume. Its "On this page" navigation comes from the theme's
built-in table of contents.

## System appearance

The site follows the device's light or dark appearance without JavaScript.
The light skin is selected by `minimal_mistakes_skin` in `_config.yml`.
`_includes/head/custom.html` loads `assets/css/dark.scss` only when
`prefers-color-scheme: dark` matches and lets native browser controls follow
the system appearance.

The dark stylesheet imports Minimal Mistakes' built-in dark skin and styles,
so both appearances stay aligned with the remote theme. Keep the media
condition on the stylesheet link so it does not override the light skin.
