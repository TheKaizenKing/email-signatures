const search = document.querySelector('#search');
const cards = [...document.querySelectorAll('.asset-card')];
const typeFilters = [...document.querySelectorAll('[data-kind-filter]')];
const collectionSelect = document.querySelector('#collection');
const collectionLabel = document.querySelector('#collection-label');
const selection = document.querySelector('#asset-selection');
let kind = 'all';

function refreshCollections() {
  const names = new Map();
  for (const card of cards) {
    if (kind === 'all' || card.dataset.kind === kind) names.set(`${card.dataset.kind}:${card.dataset.collection}`, card.dataset.collectionLabel);
  }
  collectionLabel.textContent = kind === 'email' ? 'Email address' : kind === 'logo' ? 'Logo collection' : 'Collection';
  const allLabel = kind === 'email' ? 'All email addresses' : kind === 'logo' ? 'All logo collections' : 'All collections';
  const options = [new Option(allLabel, 'all'), ...[...names].map(([value,label]) => new Option(label,value))];
  collectionSelect.replaceChildren(...options);
}
function filterAssets() {
  const query = search.value.trim().toLowerCase();
  const collection = collectionSelect.value;
  let visible = 0;
  for (const card of cards) {
    const matches = (kind === 'all' || card.dataset.kind === kind) && (collection === 'all' || `${card.dataset.kind}:${card.dataset.collection}` === collection) && card.dataset.search.includes(query);
    card.hidden = !matches;
    if (matches) visible++;
  }
  document.querySelector('#empty-state').hidden = visible > 0;
  document.querySelector('#result-count').textContent = visible === cards.length ? `Showing all ${visible} assets` : `Showing ${visible} of ${cards.length} assets`;
}
function chooseKind(value) {
  kind = value;
  for (const button of typeFilters) button.setAttribute('aria-pressed', String(button.dataset.kindFilter === value));
  refreshCollections();
  filterAssets();
}
search.addEventListener('input', filterAssets);
collectionSelect.addEventListener('change', filterAssets);
for (const button of typeFilters) button.addEventListener('click', () => chooseKind(button.dataset.kindFilter));
for (const link of document.querySelectorAll('[data-kind-link]')) link.addEventListener('click', () => { search.value = ''; chooseKind(link.dataset.kindLink); });
document.querySelector('#background').addEventListener('change', event => { document.body.dataset.preview = event.target.value; });

for (const link of document.querySelectorAll('[data-select]')) link.addEventListener('click', event => {
  if (typeof selection.showModal !== 'function') return;
  event.preventDefault();
  const card = link.closest('.asset-card');
  const title = card.querySelector('h2').textContent;
  const image = card.querySelector('.asset-preview img');
  const signature = card.querySelector('.signature-action');
  document.querySelector('#selected-title').textContent = title;
  document.querySelector('#selected-collection').textContent = card.dataset.collectionLabel;
  document.querySelector('#selected-meta').textContent = card.querySelector('.asset-meta').textContent;
  const preview = document.querySelector('#selected-preview');
  preview.src = image.getAttribute('src');
  preview.alt = title;
  preview.closest('.selection-preview').dataset.dark = card.dataset.dark;
  const url = card.querySelector('[data-copy]').dataset.copy;
  document.querySelector('#selected-url').value = url;
  document.querySelector('#selected-copy').dataset.copy = url;
  document.querySelector('#selected-download').href = card.querySelector('.download-action').getAttribute('href');
  const signatureLink = document.querySelector('#selected-signature');
  signatureLink.hidden = !signature;
  if (signature) signatureLink.href = signature.getAttribute('href');
  else signatureLink.removeAttribute('href');
  selection.querySelector('[data-copy-status]').textContent = '';
  selection.showModal();
});
document.querySelector('.close-selection').addEventListener('click', () => selection.close());
document.querySelector('#selected-url').addEventListener('click', event => event.target.select());

const statusTimeouts = new WeakMap();
document.addEventListener('click', async event => {
  const button = event.target.closest('[data-copy]');
  if (!button || !button.dataset.copy) return;
  const status = button.closest('dialog')?.querySelector('[data-copy-status]') || document.querySelector('#copy-status');
  clearTimeout(statusTimeouts.get(status));
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    status.textContent = 'Asset URL copied.';
  } catch {
    status.textContent = button.closest('dialog') ? 'Copy was unavailable. Select the asset link above and copy it.' : 'Copy was unavailable. Select the asset to copy its link.';
  }
  statusTimeouts.set(status, setTimeout(() => { status.textContent = ''; }, 2600));
});
