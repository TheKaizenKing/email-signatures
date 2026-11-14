# Media assets

A file store for email artwork, logos and reusable media. Browse and select files using GitHub's normal folder and image views.

## Folder structure

`email/<email-address>/` contains that account's signature HTML and artwork. The address is the next folder level; its spelling is retained exactly.

`logos/<collection>/` contains logo originals. PNG, SVG and JPG variants share the collection folder; their extensions distinguish the formats.

Add `images/<collection>/` or another media folder when it is needed. Adding a file requires no catalog, manifest, preview generation or frontend update.

## File naming

Use lowercase descriptive filenames, separated by hyphens:

`<name>[-<layout-or-style>][-<colour-or-variant>][-<width>x<height>]-v<version>.<ext>`

- For logos, include the brand or initials so a downloaded file remains identifiable.
- Include only descriptors that distinguish an actual variant. Keep supplied `colour`/`colour-light` distinctions rather than guessing a different palette or background. `gold-background` names the Invictus icon with the gold background.
- Include actual pixel dimensions for raster images. SVG files have no size suffix.
- Use a new version for a released replacement; do not overwrite images already referenced by emails or other documents. New dimensions do not by themselves change the design version.

Examples:

- `gemba-logo-3d-white-1200x1200-v1.png`
- `invictus-horizontal-colour-3140x1292-v1.png`
- `kaizen-king-logo-white-2500x2500-v1.png`
- `pa-monogram-purple-1324x1188-v1.png`
- `invictus-horizontal-colour-v1.svg`

## Direct file URLs

GitHub Pages serves the files directly; there is no custom site or application. For example:

https://thekaizenking.github.io/media-assets/logos/gemba/gemba-logo-3d-white-1200x1200-v1.png

The empty `.nojekyll` file bypasses Jekyll processing. There is no build script, JavaScript application or file registry to maintain. See [GitHub's static publishing guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Email and legacy links

Each account's `signature.html` is the current editable signature source. Its artwork has a versioned filename, so changing a future signature does not change an image used by an old email.

After the rename, the old `email-signatures` address is retained as a frozen compatibility store for published links. New account settings use the `media-assets/email/<address>/` paths. Original artwork bytes are unchanged; filenames and storage locations are the intended migration.

The original repository's PR history moves with `media-assets`; the repository recreated at the old name has a different identity.
