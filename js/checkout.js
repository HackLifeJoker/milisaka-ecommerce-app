/* global formatMoney, initSlideToSubmit, api */
// Checkout page logic — creates a Stripe Checkout Session and redirects.
document.addEventListener('DOMContentLoaded', () => {
  // Stripe success redirect
  const params = new URLSearchParams(window.location.search);
  if (params.get('status') === 'success') {
    window.cart.clear();
    renderCompleted();
    return;
  }

  if (window.cart.items.length === 0) {
    renderEmpty();
    return;
  }

  renderForm();
});

function renderEmpty() {
  document.getElementById('checkout-page').innerHTML = `
    <div style="min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;text-align:center">
      <p class="font-mono text-muted">CART IS EMPTY</p>
      <a href="products.html" class="font-heading text-primary tracking-wider" style="font-weight:700">BROWSE PRODUCTS</a>
    </div>`;
}

function renderCompleted() {
  document.getElementById('checkout-page').innerHTML = `
    <div style="min-height:70vh;display:flex;align-items:center;justify-content:center;padding:5rem 1rem">
      <div class="card chamfer" style="border:1px solid var(--primary);padding:3rem;text-align:center;max-width:32rem">
        <div style="width:5rem;height:5rem;background:rgba(255,31,31,0.1);border:2px solid var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 class="font-display" style="font-size:1.875rem;margin-bottom:1rem">ORDER CONFIRMED</h2>
        <p class="text-muted" style="margin-bottom:0.5rem">Your payment has been processed and your order transmitted to our fulfillment center.</p>
        <p class="text-muted" style="font-size:0.875rem;margin-bottom:2rem">A confirmation will be sent to your email shortly.</p>
        <a href="products.html" class="btn btn-primary chamfer-sm">CONTINUE SHOPPING</a>
      </div>
    </div>`;
}

function renderForm() {
  const wrap = document.getElementById('checkout-page');
  const items = window.cart.items;
  wrap.innerHTML = `
    <span class="eyebrow">// FINAL TRANSMISSION</span>
    <h1 class="h2" style="margin-bottom:3rem">CHECKOUT</h1>
    <div style="display:grid;gap:2rem" class="cart-grid">
      <div style="display:flex;flex-direction:column;gap:1.25rem">
        <div class="card chamfer" style="padding:1.5rem">
          <h2 class="font-heading tracking-widest" style="font-weight:700;font-size:0.875rem;margin-bottom:1.25rem">CUSTOMER INFORMATION</h2>
          <div style="display:grid;gap:1.25rem" class="grid-2">
            <div><label class="label">FULL NAME *</label><input class="input" id="c-name" /></div>
            <div><label class="label">EMAIL *</label><input class="input" type="email" id="c-email" /></div>
          </div>
          <div style="margin-top:1.25rem"><label class="label">SHIPPING ADDRESS *</label><textarea class="textarea" id="c-addr" rows="3"></textarea></div>
        </div>
        <div class="card chamfer" style="padding:1.5rem">
          <h2 class="font-heading tracking-widest" style="font-weight:700;font-size:0.875rem;margin-bottom:0.75rem">PAYMENT</h2>
          <p class="text-muted" style="font-size:0.875rem">You'll be redirected to Stripe's secure checkout to complete your payment.</p>
        </div>
      </div>
      <div>
        <div class="card chamfer" style="padding:1.5rem;position:sticky;top:7rem">
          <h2 class="font-heading tracking-widest" style="font-weight:700;font-size:0.875rem;margin-bottom:1rem">ORDER MANIFEST</h2>
          <div id="manifest" style="display:flex;flex-direction:column;gap:0.75rem;padding-bottom:1rem;border-bottom:1px solid rgba(38,38,38,0.5);max-height:15rem;overflow-y:auto"></div>
          <div style="display:flex;justify-content:space-between;padding:1rem 0">
            <span class="font-heading" style="font-weight:700;font-size:1.125rem">TOTAL</span>
            <span class="font-heading text-primary" style="font-weight:700;font-size:1.25rem">${formatMoney(window.cart.total)}</span>
          </div>
          <p id="checkout-error" class="font-mono" style="color:var(--destructive);font-size:0.875rem;margin-bottom:0.75rem;display:none"></p>
          <div id="slide-track" class="slide-track"></div>
          <p id="checkout-status" class="font-mono text-primary" style="text-align:center;margin-top:0.75rem;display:none">PROCESSING...</p>
        </div>
      </div>
    </div>`;

  document.getElementById('manifest').innerHTML = items
    .map(
      (i) =>
        `<div style="display:flex;justify-content:space-between;font-size:0.875rem;gap:0.5rem"><span class="text-muted" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">${i.product_name} ×${i.quantity}</span><span class="font-mono" style="flex-shrink:0">${formatMoney(i.price * i.quantity)}</span></div>`
    )
    .join('');

  const track = document.getElementById('slide-track');
  initSlideToSubmit(track, submitCheckout, 'SLIDE TO CHECKOUT');
}

async function submitCheckout() {
  const name = document.getElementById('c-name').value.trim();
  const email = document.getElementById('c-email').value.trim();
  const addr = document.getElementById('c-addr').value.trim();
  const errEl = document.getElementById('checkout-error');

  if (!name || !email || !addr) {
    errEl.textContent = 'FILL REQUIRED FIELDS TO PROCEED';
    errEl.style.display = 'block';
    return;
  }

  document.getElementById('checkout-status').style.display = 'block';
  try {
    const res = await api.createCheckoutSession({
      customer_name: name,
      customer_email: email,
      shipping_address: addr,
      items: window.cart.items,
      total: window.cart.total,
    });
    window.location.href = res.url;
  } catch (err) {
    errEl.textContent = err.message;
    errEl.style.display = 'block';
    document.getElementById('checkout-status').style.display = 'none';
  }
}