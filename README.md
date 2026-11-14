# Personal media library

A shared home for Paul Armstrong’s personal media, signatures, logos and assets for small projects that do not need a repository of their own.

[Browse the media library](https://thekaizenking.github.io/email-signatures/)

The library provides previews, original-file downloads and copyable public HTTPS links. The current collections are examples, not a limit on future personal projects or media types.

## Collections

- **Email signatures:** the approved personal footer and PA artwork.
- **Armstrong:** supplied Armstrong artwork.
- **Invictus:** PNG and SVG logo variants, emblems and app icons.
- **Kaizen King:** supplied white artwork in three resolutions.
- **Reid:** the RA artwork.

The import adds 35 supplied personal files. Original bytes and dimensions are preserved. Small PNG previews keep the library quick to browse, including the very large Kaizen King originals. `catalog.json` records the original paths, formats, dimensions, sizes and SHA-256 hashes.

## Stable email images

Existing email images and the signature template keep their current paths and contents:

- https://thekaizenking.github.io/email-signatures/assets/v1/personal-footer.png
- https://thekaizenking.github.io/email-signatures/assets/v1/selected-a-monogram.png
- [Personal signature HTML](templates/personal.html)
- [Signature setup notes](SETUP.txt)

The repository keeps its existing name to preserve these published image URLs, including images in emails already sent. The broader library does not require existing email account settings to change. Keep released artwork URLs available; use a new filename or version for later replacements.

## Adding media

Add original files under `media/<collection>/`, provide a compact preview under `previews/<collection>/`, and add the record to `catalog.json`. Preserve supplied originals; gallery previews should be no larger than 512 pixels on their longest side. SVG originals remain available as vector downloads.

Run `node scripts/build-catalog.mjs` to regenerate the static index after changing the catalog. The generator uses standard Node.js modules and requires no packages. The published library has no framework, external font service or runtime dependency. Direct file links continue to work independently of the index.
