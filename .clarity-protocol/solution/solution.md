# Implemented local site

Keep Jekyll and Minimal Mistakes. `index.md` uses the theme's splash layout with
`_includes/home.html`; shared card includes connect the latest two posts and
curated craft metadata in `_data/knitting.yml`. The gallery and two project
pages host actual photographs locally, avoiding Ravelry login for visitors.

Populate Writing and Experiments with existing material. Maintain the shared
navigation in `_data/navigation.yml`. Leave the resume's Markdown and layout
unchanged.

Define the light and dark palettes before importing Minimal Mistakes in
`assets/css/main.scss` and `dark.scss`. Import `_sass/_site.scss` in both for
shared tokens and scoped homepage/gallery styles. Retain the existing
appearance script and system-following media condition. The footer separates
plain RSS/platform credits on the left from the right-aligned selector.

Topic filtering progressively enhances the homepage: without JavaScript all
entries remain visible and controls stay hidden. Real post tags drive topics;
buttons with no matches stay hidden.

The read-only Ravelry connector uses vault credentials only in local tooling.
The published build excludes integration source and model definitions. Its
selected-list method does not pretend to provide full project notes.

Local builds and browser checks cover content routes, actual palette colors,
responsive layouts, filters, proportions, saved/system appearance, and no-JS
behavior. These checks are not a formal design review or deployment approval.
