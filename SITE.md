# Site composition

## Homepage and navigation

`index.md` uses Minimal Mistakes' `splash` layout and `_includes/home.html`.
The homepage links to Writing, Knitting, Experiments, the existing resume, and
the contact invitation. Navigation is maintained in `_data/navigation.yml`.

The selected-work grid combines the two latest posts with two curated craft
projects. `assets/js/home.js` enables topic filtering and hides filters that
have no matching entries. Without JavaScript, all entries remain visible.
Post tags link to the existing `/tags/` archive.

The square giraffe artwork and original-aspect-ratio mountain panorama are
stored in `assets/images/`. The panorama comes from the author's Flickr
account. On November 3, 2026, the site owner confirmed ownership of all images,
including the supplied giraffe wallpaper, and that the Ravelry and Flickr
photographs came from their personal camera. The image-permission blocker is
resolved.

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

## Knitting and crochet

`_pages/knitting.html` is a public gallery of selected projects, not a complete
Ravelry notebook import. `_data/knitting.yml` holds the verified project names,
crafts, completion dates, descriptions, pattern links, and local image paths.
`_includes/knitting-card.html` renders the shared gallery/homepage cards;
`_includes/craft-project.html` renders individual project pages.

To add a project, add its metadata and photograph, then create a page under
`_pages/` with a `/knitting/<slug>/` permalink, a matching `project` front matter
value, and the `craft-project.html` include. Keep photographs accessible without
a Ravelry login and link to patterns rather than copying pattern instructions.

The local read-only Ravelry connector and its vault-backed model definition
are development tools, not part of the published site. The initial selection
uses notebook-list metadata: the full project-detail endpoint failed, so
personal notes and yarn details have not been imported. No automatic sync is
configured. Never put API credentials in site data, assets, or front matter.

## Appearance

The footer's Appearance selector offers System, Light, and Dark. System is the
default and follows changes to the device's appearance. Explicit choices are
saved in the browser's `localStorage` under `color-scheme` and applied before
page content renders by `assets/js/appearance.js`. If storage is unavailable,
the choice still works for the current page and a warning is logged.

`_includes/footer/custom.html` provides the selector, styled by
`assets/css/appearance.css`. It stays hidden without JavaScript; the site
still follows the system appearance in that case. The compact native select
uses the shared palette tokens, with native system colors as fallbacks.
Keyboard focus has a visible outline. `_includes/footer.html` provides RSS,
the current-year copyright, and platform credits on the left; the selector
stays right aligned and moves below the credits on narrow screens.

`assets/css/main.scss` defines the warm mushroom and muted cream light palette.
`assets/css/dark.scss` defines the smoky navy and dusty peach dark palette.
Both set Minimal Mistakes' Sass colors before importing the theme and then
import `_sass/_site.scss`, which exposes shared `--cp-*` CSS tokens and adds
the homepage, gallery, and footer styles. This applies the palette to articles,
archives, projects, and the resume as well as the homepage, without changing
the resume's content or layout.

The homepage and gallery use the demo's browser-default (`medium`) font scale
with component-relative `em` sizes. This prevents Minimal Mistakes' responsive
root font enlargement from inflating those components. Heading and caption
fonts inherit the shared site font; paragraph and section spacing follow the
demo. Article and resume type sizing remains controlled by the theme.

`_includes/head/custom.html` links to the generated `assets/css/dark.css`
(built from `assets/css/dark.scss`). The script adjusts that link's media
condition and the native browser color scheme to match the selected option.
Keep the initial `prefers-color-scheme: dark` condition for the no-JavaScript
fallback.

## Local build

Run `bundle install`, then `bundle exec jekyll build` or
`bundle exec jekyll serve`. The Gemfile uses GitHub Pages 232 and explicitly
includes `csv` and `bigdecimal` for Ruby 3.4 compatibility.
Development integrations and documentation are excluded in `_config.yml`.
