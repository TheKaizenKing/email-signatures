const search = document.querySelector('#search');
const cards = [...document.querySelectorAll('.asset-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
let collection = 'all';
function filterAssets() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  for (const card of cards) {
    const matches = (collection === 'all' || card.dataset.collection === collection) && card.dataset.search.includes(query);
    card.hidden = !matches;
    if (matches) visible++;
  }
  document.querySelector('#empty-state').hidden = visible > 0;
  document.querySelector('#result-count').textContent = visible === cards.length ? `Showing all ${visible} files` : `Showing ${visible} of ${cards.length} files`;
}
search.addEventListener('input', filterAssets);
for (const button of filters) button.addEventListener('click', () => {
  collection = button.dataset.filter;
  for (const filter of filters) filter.setAttribute('aria-pressed', String(filter === button));
  filterAssets();
});
document.querySelector('#background').addEventListener('change', event => { document.body.dataset.preview = event.target.value; });
let copyStatusTimeout;
for (const button of document.querySelectorAll('[data-copy]')) button.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  clearTimeout(copyStatusTimeout);
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    status.textContent = 'Image URL copied.';
  } catch {
    status.textContent = 'Copy was unavailable. Open the original image to copy its address.';
  }
  copyStatusTimeout = setTimeout(() => { status.textContent = ''; }, 2600);
});
