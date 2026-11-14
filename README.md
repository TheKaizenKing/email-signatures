# Media assets

A shared library of email artwork, logos and reusable media for Paul Armstrong and his projects.

[Open the media library](https://thekaizenking.github.io/media-assets/)

## Storage

```text
email/
  paul_armstrong698@hotmail.com/
  parmstrong698@gmail.com/
  paul.armstrong@gembagroup.co.uk/
logos/
  armstrong/
  invictus/
  kaizen-king/
  reid/
  gemba/
```

Each email folder contains the artwork, preview and ready-to-use signature for that sending address. Logos live in their own collections, with originals and compact previews together. The library lets you filter by media type and collection, select an asset, download it or copy its public HTTPS URL.

These collections are a starting point. New logo styles, images and other media can be added later; the catalog derives its type filters from the records rather than restricting the library to the current types.

## Email signatures

- [Hotmail](email/paul_armstrong698%40hotmail.com/signature.html)
- [Personal Gmail](email/parmstrong698%40gmail.com/signature.html)
- [Gemba](email/paul.armstrong%40gembagroup.co.uk/signature.html)
- [Installation notes](email/README.md)

The personal design and Gemba layout retain their approved artwork, typography and colours. The Gemba signature keeps the email, website and LinkedIn links as live text, including the 3 px dark purple divider.

## Logos and other media

The 46 current logos include the supplied Armstrong, Invictus, Kaizen King and Reid files, the PA artwork and ten Gemba convenience copies. Original bytes and full-size downloads are preserved. The website continues to own its active Gemba artwork; these copies make the supplied files easy to access in this library.

Previews stay within the corresponding email or logo folder and are at most 512 px on their longest side. `catalog.json` records each original's format, dimensions, file size and SHA-256 hash. The index is generated with `node scripts/build-catalog.mjs`, using standard Node.js modules without packages.

## Released links

The previous `email-signatures` Pages address is retained separately as a compatibility store for previously published paths, including images in emails already sent. New assets and account settings use this `media-assets` library. Do not remove compatibility files or overwrite released artwork without a separate decision to retire those links. Future replacements should use a new filename or version.

The active repository's original PR and issue history remains here after the rename. The compatibility repository at the old name is a different repository.
