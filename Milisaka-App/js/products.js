/* global api, productCardHTML, wireAddToCartButtons */
// Products catalog page logic.
const CATEGORIES = [
  { label: 'ALL', value: '' },
  { label: 'COMPUTERS & WORKSTATIONS', value: 'Computers & Workstations' },
  { label: 'SERVERS', value: 'Servers' },
  { label: 'CYBERSECURITY SOFTWARE', value: 'Cybersecurity Software' },
  { label: 'ACCESSORIES & PERIPHERALS', value: 'Accessories & Peripherals' },
];

let activeCategory = '';

document.addEventListener('DOMContentLoaded', async () => {
  const filterBar = document.getElementById('filter-bar');
  filterBar.innerHTML = CATEGORIES.map(
    (c) => `<button class="filter-btn chamfer-sm ${c.value === '' ? 'active' : ''}" data-cat="${c.value}">${c.label}</button>`
  ).join('');
  filterBar.querySelectorAll('[data-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-cat');
      filterBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      loadProducts();
    });
  });

  await loadProducts();
});

async function loadProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '<div class="loading" style="grid-column:1/-1"><div class="spinner"></div></div>';
  try {
    const params = activeCategory ? { category: activeCategory } : {};
    const products = await api.getProducts(params);
    if (products.length === 0) {
      grid.innerHTML = '<p class="font-mono text-muted text-center" style="grid-column:1/-1;padding:5rem">NO PRODUCTS FOUND IN THIS CATEGORY</p>';
    } else {
      grid.innerHTML = products.map(productCardHTML).join('');
      wireAddToCartButtons(grid, products);
    }
  } catch {
    grid.innerHTML = '<p class="font-mono text-muted text-center" style="grid-column:1/-1;padding:5rem">UNABLE TO LOAD PRODUCTS</p>';
  }
}