# Media assets

A file store for email artwork, logos and reusable media. Browse and select files using GitHub's folder and image views.

## Folders

- `email/personal/`: the personal signature and its versioned image.
- `email/business/`: a business signature template using website-hosted artwork.
- `logos/<collection>/`: logo originals, including the supplied Gemba convenience copies.

Email folders use neutral labels. The real account mapping is kept outside this public repository. The public business template uses `{{EMAIL}}`; insert the actual address only in a private working copy or the mail application's signature editor. The business email image remains hosted by the website and is not duplicated in an email folder here.

Add `images/<collection>/` or another media folder when needed. Uploading a new file requires no catalog, manifest, preview generation or frontend update.

## Naming

Use lowercase descriptive filenames with hyphens:

`<name>[-<style>][-<colour-or-variant>][-<width>x<height>]-v<version>.<ext>`

For logos, include the brand or initials. Include useful descriptors that identify actual variants; retain supplied `colour`/`colour-light` distinctions rather than guessing colours. `gold-background` identifies the Invictus app icon with that background. Use actual dimensions for raster files, omit dimensions for SVG, and use a new version instead of overwriting released artwork.

Examples: `gemba-logo-3d-white-1200x1200-v1.png`, `kaizen-king-logo-white-2500x2500-v1.png`, `invictus-horizontal-colour-v1.svg`.

## Direct file serving

GitHub Pages serves direct HTTPS files under `https://thekaizenking.github.io/media-assets/`. There is no custom frontend or application. The empty `.nojekyll` file bypasses Jekyll processing.

Previously published paths stay available separately at the legacy host after the rename. The original repository's history moves with the renamed repository; the compatibility repository at the old name is separate.
