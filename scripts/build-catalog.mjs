import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = JSON.parse(fs.readFileSync(path.join(root, 'catalog.json'), 'utf8'));
const base = 'https://thekaizenking.github.io/email-signatures/';
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const url = relative => new URL(relative.split('/').map(encodeURIComponent).join('/'), base).href;
const collections = [...new Map(assets.map(asset => [asset.collectionSlug, asset.collection])).entries()];
const icon = assets.find(asset => asset.path.endsWith('selected-a-monogram.png')).preview;
const prettyBytes = bytes => bytes < 1024 ? `${bytes} B` : bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const cards = assets.map(asset => {
  for (const field of ['path', 'preview']) {
    const resolved = path.resolve(root, asset[field]);
    if (!resolved.startsWith(root + path.sep) || !fs.existsSync(resolved)) throw Error('Missing or invalid asset: ' + asset[field]);
  }
  const dimensions = asset.format.toLowerCase() === 'svg' ? 'Scalable vector' : `${asset.width.toLocaleString('en-GB')} × ${asset.height.toLocaleString('en-GB')}`;
  const search = [asset.title, asset.collection, asset.format, path.basename(asset.path)].join(' ').toLowerCase();
  return `<article class="asset-card" data-collection="${escape(asset.collectionSlug)}" data-search="${escape(search)}" data-dark="${Boolean(asset.darkPreview)}">
  <a class="asset-preview" href="${escape(asset.path)}" target="_blank" rel="noopener" aria-label="View original: ${escape(asset.title)}"><img src="${escape(asset.preview)}" alt="${escape(asset.title)}" loading="lazy" decoding="async" width="512" height="512"></a>
  <div class="asset-details"><p class="collection-label">${escape(asset.collection)}</p><h2>${escape(asset.title)}</h2><p class="asset-meta">${escape(asset.format.toUpperCase())} <span aria-hidden="true">·</span> ${escape(dimensions)} <span aria-hidden="true">·</span> ${prettyBytes(asset.bytes)}</p>
  <div class="asset-actions"><a href="${escape(asset.path)}" download>Download</a><button type="button" data-copy="${escape(url(asset.path))}" aria-label="Copy image URL: ${escape(asset.title)}">Copy URL</button></div></div>
</article>`;
}).join('\n');
const filters = collections.map(([slug, label]) => `<button type="button" class="filter" data-filter="${escape(slug)}" aria-pressed="false">${escape(label)} <span>${assets.filter(asset => asset.collectionSlug === slug).length}</span></button>`).join('\n');
const html = `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Paul Armstrong’s personal media library: signatures, logos and reusable assets for small projects."><title>Personal media · Paul Armstrong</title><link rel="canonical" href="${base}"><link rel="icon" type="image/png" href="${escape(icon)}"><link rel="stylesheet" href="catalog.css"><script src="catalog.js" defer></script></head>
<body data-preview="auto"><div class="page">
<header class="site-header"><a class="identity" href="./" aria-label="Personal media home"><span class="identity-mark"><img src="${escape(icon)}" width="38" height="38" alt=""></span><span>Paul Armstrong</span></a><a class="signature-link" href="templates/personal.html">Email signature <span aria-hidden="true">↗</span></a></header>
<main><section class="intro"><p class="eyebrow">Personal collection</p><h1>Media, ready to use.</h1><p class="intro-copy">A home for signatures, logos and the small projects that deserve good assets.</p><p class="library-size">${assets.length} files <span aria-hidden="true">·</span> ${collections.length} collections</p></section>
<section class="library" aria-label="Media library"><div class="toolbar"><div class="search-field"><label for="search">Find an asset</label><input id="search" type="search" placeholder="Search names, projects or formats" autocomplete="off"></div><div class="background-field"><label for="background">Preview background</label><select id="background"><option value="auto">Automatic</option><option value="light">Light</option><option value="dark">Dark</option></select></div></div>
<div class="filters" role="group" aria-label="Filter by collection"><button type="button" class="filter" data-filter="all" aria-pressed="true">All media <span>${assets.length}</span></button>${filters}</div><p id="result-count" class="result-count" aria-live="polite">Showing all ${assets.length} files</p>
<div class="asset-grid">${cards}</div><p id="empty-state" class="empty-state" hidden>No matching assets. Try a different search or collection.</p><p id="copy-status" class="copy-status" role="status" aria-live="polite"></p><noscript><p class="noscript-note">All files are shown. Open or download an original to use it.</p></noscript></section></main>
<footer><span>Paul Armstrong · Personal media</span><a href="https://github.com/TheKaizenKing/email-signatures">Manage files on GitHub <span aria-hidden="true">↗</span></a></footer>
</div></body></html>`;
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log(`Built catalog: ${assets.length} assets in ${collections.length} collections.`);
