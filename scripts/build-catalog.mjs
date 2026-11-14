import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = JSON.parse(fs.readFileSync(path.join(root, 'catalog.json'), 'utf8'));
const base = 'https://thekaizenking.github.io/media-assets/';
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const encodePath = relative => relative.split('/').map(encodeURIComponent).join('/');
const publicUrl = relative => new URL(encodePath(relative), base).href;
const kindNames = {email:'Email assets', logo:'Logos', image:'Images', video:'Videos', audio:'Audio', document:'Documents'};
const kindName = kind => kindNames[kind] || `${kind.charAt(0).toUpperCase()}${kind.slice(1).replaceAll('-', ' ')} assets`;
const kinds = [...new Set(assets.map(asset => asset.kind))].sort((a,b) => {
  const priority = value => value === 'email' ? 0 : value === 'logo' ? 1 : 2;
  return priority(a) - priority(b) || a.localeCompare(b);
});
const icon = assets.find(asset => asset.path === 'logos/armstrong/pa-monogram.png')?.preview;
if (!icon) throw Error('The PA library icon is missing');
const prettyBytes = bytes => bytes < 1024 ? `${bytes} B` : bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const ids = new Set();
function validatePath(relative) {
  if (typeof relative !== 'string' || !relative || path.isAbsolute(relative) || /[\\?#]/.test(relative)) throw Error('Invalid catalog path');
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(root + path.sep) || !fs.existsSync(resolved)) throw Error('Missing or invalid asset: ' + relative);
}
const cards = assets.map(asset => {
  if (!/^[a-z][a-z0-9-]*$/.test(asset.kind) || !/^[a-z0-9-]+$/.test(asset.id) || ids.has(asset.id)) throw Error('Invalid asset kind or ID');
  ids.add(asset.id);
  validatePath(asset.path);
  validatePath(asset.preview);
  if (asset.signaturePath) validatePath(asset.signaturePath);
  const dimensions = asset.format.toLowerCase() === 'svg' ? 'Scalable vector' : Number.isFinite(asset.width) && Number.isFinite(asset.height) ? `${asset.width.toLocaleString('en-GB')} × ${asset.height.toLocaleString('en-GB')}` : '';
  const metadata = [asset.format.toUpperCase(), dimensions, prettyBytes(asset.bytes)].filter(Boolean).join(' · ');
  const search = [asset.title, asset.collection, asset.kind, kindName(asset.kind), asset.format, path.basename(asset.path)].join(' ').toLowerCase();
  const signature = asset.signaturePath ? `<a class="signature-action" href="${escape(encodePath(asset.signaturePath))}" target="_blank" rel="noopener">Open signature <span aria-hidden="true">↗</span></a>` : '';
  return `<article class="asset-card" data-asset-id="${escape(asset.id)}" data-kind="${escape(asset.kind)}" data-collection="${escape(asset.collectionSlug)}" data-collection-label="${escape(asset.collection)}" data-search="${escape(search)}" data-dark="${Boolean(asset.darkPreview)}">
  <a class="asset-preview" data-select href="${escape(encodePath(asset.path))}" target="_blank" rel="noopener" aria-label="Select ${escape(asset.title)}"><img src="${escape(encodePath(asset.preview))}" alt="${escape(asset.title)}" loading="lazy" decoding="async" width="512" height="512"><span class="select-hint">Select asset</span></a>
  <div class="asset-details"><p class="collection-label">${escape(asset.collection)}</p><h2>${escape(asset.title)}</h2><p class="asset-meta">${escape(metadata)}</p>
  <div class="asset-actions"><a class="download-action" href="${escape(encodePath(asset.path))}" download>Download</a><button type="button" data-copy="${escape(publicUrl(asset.path))}" aria-label="Copy asset URL: ${escape(asset.title)}">Copy URL</button></div>${signature}</div>
</article>`;
}).join('\n');
const filters = kinds.map(kind => `<button type="button" class="filter" data-kind-filter="${escape(kind)}" aria-pressed="false">${escape(kindName(kind))} <span>${assets.filter(asset => asset.kind === kind).length}</span></button>`).join('\n');
const collections = [...new Map(assets.map(asset => [`${asset.kind}:${asset.collectionSlug}`, asset.collection])).entries()];
const options = collections.map(([value,label]) => `<option value="${escape(value)}">${escape(label)}</option>`).join('');
const html = `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Paul Armstrong’s media library: email assets, logos and reusable files, organised by purpose."><title>Media library · Paul Armstrong</title><link rel="canonical" href="${base}"><link rel="icon" type="image/png" href="${escape(encodePath(icon))}"><link rel="stylesheet" href="catalog.css"><script src="catalog.js" defer></script></head>
<body data-preview="auto"><div class="page">
<header class="site-header"><a class="identity" href="./" aria-label="Media library home"><span class="identity-mark"><img src="${escape(encodePath(icon))}" width="38" height="38" alt=""></span><span>Paul Armstrong</span></a><a class="email-shortcut" href="#library" data-kind-link="email">Email assets <span aria-hidden="true">↗</span></a></header>
<main><section class="intro"><p class="eyebrow">Media library</p><h1>Everything in its place.</h1><p class="intro-copy">Email artwork by address. Logos by collection. Room for the next project.</p><p class="library-size">${assets.length} assets <span aria-hidden="true">·</span> ${kinds.length} media types</p></section>
<section class="library" id="library" aria-label="Media library"><div class="type-filters" role="group" aria-label="Filter by media type"><button type="button" class="filter" data-kind-filter="all" aria-pressed="true">All assets <span>${assets.length}</span></button>${filters}</div>
<div class="toolbar"><div class="search-field"><label for="search">Find an asset</label><input id="search" type="search" placeholder="Search names, addresses or formats" autocomplete="off"></div><div class="collection-field"><label id="collection-label" for="collection">Collection</label><select id="collection"><option value="all">All collections</option>${options}</select></div><div class="background-field"><label for="background">Preview background</label><select id="background"><option value="auto">Automatic</option><option value="light">Light</option><option value="dark">Dark</option></select></div></div>
<p id="result-count" class="result-count" aria-live="polite">Showing all ${assets.length} assets</p><div class="asset-grid">${cards}</div><p id="empty-state" class="empty-state" hidden>No matching assets. Try a different search or collection.</p><p id="copy-status" class="copy-status" role="status" aria-live="polite"></p><noscript><p class="noscript-note">All assets are shown. Open or download an original to use it; email cards also link to the full signature.</p></noscript></section></main>
<footer><span>Paul Armstrong · Media library</span><a href="https://github.com/TheKaizenKing/media-assets">Manage files on GitHub <span aria-hidden="true">↗</span></a></footer>
</div><dialog id="asset-selection" aria-labelledby="selected-title"><div class="selection-header"><p class="eyebrow">Selected asset</p><button class="close-selection" type="button" autofocus>Close <span aria-hidden="true">×</span></button></div><div class="selection-preview" data-dark="false"><img id="selected-preview" alt="" width="512" height="512"></div><div class="selection-details"><p id="selected-collection" class="collection-label"></p><h2 id="selected-title">Selected asset</h2><p id="selected-meta" class="asset-meta"></p><label for="selected-url">Asset link</label><input id="selected-url" type="url" readonly spellcheck="false"><div class="selection-actions"><a id="selected-download" class="primary-action" download>Download original</a><button id="selected-copy" class="secondary-action" type="button" data-copy="">Copy URL</button><a id="selected-signature" class="signature-action" target="_blank" rel="noopener" hidden>Open signature <span aria-hidden="true">↗</span></a></div><p class="selection-status" data-copy-status role="status" aria-live="polite"></p></div></dialog></body></html>`;
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log(`Built media library: ${assets.length} assets; ${kinds.map(kind => `${kind}:${assets.filter(asset => asset.kind === kind).length}`).join(', ')}.`);
