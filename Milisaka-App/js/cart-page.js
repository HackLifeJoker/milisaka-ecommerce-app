/* global formatMoney */
// Cart page logic.
document.addEventListener('DOMContentLoaded', () => renderCart());

function renderCart() {
  const wrap = document.getElementById('cart-page');
  const items = window.cart.items;

  if (items.length === 0) {
    wrap.innerHTML = `
      <div style="min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" stroke-width="1.5" style="margin-bottom:1.5rem"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <h1 class="font-display" style="font-size:1.875rem;margin-bottom:1rem">CART EMPTY</h1>
        <p class="text-muted" style="margin-bottom:2rem;max-width:28rem">Your cart is awaiting deployment. Browse our arsenal to get started.</p>
        <a href="products.html" class="btn btn-primary chamfer-sm">EXPLORE ARSENAL →</a>
      </div>`;
    return;
  }

  wrap.innerHTML = `
    <span class="eyebrow">// ORDER MANIFEST</span>
    <h1 class="h2" style="margin-bottom:3rem">YOUR CART</h1>
    <div style="display:grid;gap:2rem" class="cart-grid">
      <div id="cart-items" style="display:flex;flex-direction:column;gap:1rem"></div>
      <div id="cart-summary"></div>
    </div>`;

  const itemsEl = document.getElementById('cart-items');
  itemsEl.innerHTML = items
    .map(
      (item) => `
      <div class="card chamfer" style="padding:1rem;display:flex;gap:1rem">
        <img src="${item.image_url}" alt="${item.product_name}" style="width:6rem;height:6rem;object-fit:cover;background:var(--background)" />
        <div style="flex:1;min-width:0">
          <a href="product.html?id=${item.product_id}" class="product-name" style="font-size:1.125rem">${item.product_name}</a>
          <p class="font-mono text-muted" style="font-size:0.875rem;margin-top:0.25rem">${formatMoney(item.price)} / unit</p>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-top:0.75rem">
            <div style="display:flex;align-items:center;border:1px solid var(--border)">
              <button class="qty-btn" data-id="${item.product_id}" data-delta="-1" style="width:2.25rem;height:2.25rem;display:flex;align-items:center;justify-content:center">−</button>
              <span style="width:2.5rem;text-align:center;font-family:var(--font-mono);font-size:0.875rem">${item.quantity}</span>
              <button class="qty-btn" data-id="${item.product_id}" data-delta="1" style="width:2.25rem;height:2.25rem;display:flex;align-items:center;justify-content:center">+</button>
            </div>
            <button class="remove-btn" data-id="${item.product_id}" style="color:var(--muted-foreground);padding:0.5rem" aria-label="Remove">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <p class="font-heading" style="font-weight:700;font-size:1.125rem">${formatMoney(item.price * item.quantity)}</p>
        </div>
      </div>`
    )
    .join('');

  itemsEl.querySelectorAll('.qty-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const delta = parseInt(btn.getAttribute('data-delta'));
      const item = items.find((i) => i.product_id === id);
      window.cart.updateQuantity(id, item.quantity + delta);
      renderCart();
    });
  });
  itemsEl.querySelectorAll('.remove-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      window.cart.remove(btn.getAttribute('data-id'));
      renderCart();
    });
  });

  document.getElementById('cart-summary').innerHTML = `
    <div class="card chamfer" style="padding:1.5rem;position:sticky;top:7rem">
      <h2 class="font-heading tracking-widest" style="font-weight:700;font-size:0.875rem;margin-bottom:1rem">ORDER SUMMARY</h2>
      <div style="display:flex;flex-direction:column;gap:0.75rem;padding-bottom:1rem;border-bottom:1px solid rgba(38,38,38,0.5)">
        <div style="display:flex;justify-content:space-between;font-size:0.875rem"><span class="text-muted">Subtotal</span><span class="font-mono">${formatMoney(window.cart.total)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:0.875rem"><span class="text-muted">Shipping</span><span class="font-mono text-muted" style="font-size:0.75rem">CALCULATED AT CHECKOUT</span></div>
      </div>
      <div style="display:flex;justify-content:space-between;padding:1rem 0">
        <span class="font-heading" style="font-weight:700;font-size:1.125rem">TOTAL</span>
        <span class="font-heading text-primary" style="font-weight:700;font-size:1.25rem">${formatMoney(window.cart.total)}</span>
      </div>
      <a href="checkout.html" class="btn btn-primary chamfer-sm" style="width:100%">PROCEED TO CHECKOUT →</a>
      <a href="products.html" class="font-heading text-muted tracking-wider" style="display:block;text-align:center;margin-top:0.75rem;font-weight:700;font-size:0.875rem">CONTINUE SHOPPING</a>
    </div>`;
}