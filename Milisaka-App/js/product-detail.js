/* global api, formatMoney */
// Product detail page logic.
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const wrap = document.getElementById('product-detail');
  const crumb = document.getElementById('breadcrumb');

  if (!id) {
    wrap.innerHTML = '<p class="font-mono text-muted">PRODUCT NOT FOUND</p>';
    return;
  }

  try {
    const p = await api.getProduct(id);
    crumb.innerHTML = `<a href="index.html">HOME</a> › <a href="products.html">PRODUCTS</a> › <span class="text-foreground">${p.name}</span>`;

    const badge = p.classification && p.classification !== 'Standard'
      ? `<span class="product-badge">${p.classification.toUpperCase()}</span>` : '';
    const specs = (p.key_specs || []).map((s) => `<li>${s}</li>`).join('');

    wrap.innerHTML = `
      <div style="display:grid;gap:3rem" class="detail-grid">
        <div>
          <div class="card chamfer" style="overflow:hidden">
            <img src="${p.image_url}" alt="${p.name}" style="width:100%;aspect-ratio:1;object-fit:cover" />
          </div>
        </div>
        <div>
          <div style="display:flex;gap:0.75rem;align-items:center;margin-bottom:0.5rem">
            <span class="font-mono text-primary tracking-widest" style="font-size:0.75rem">${(p.category || '').toUpperCase()}</span>
            ${badge}
          </div>
          <h1 class="h2" style="margin-bottom:1rem">${p.name}</h1>
          <p class="text-muted" style="font-size:1.125rem;line-height:1.7;margin-bottom:1.5rem">${p.description || p.short_description}</p>
          <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid rgba(38,38,38,0.5)">
            <span class="font-heading" style="font-weight:700;font-size:1.875rem">${formatMoney(p.price)}</span>
            <span class="font-mono text-muted tracking-widest" style="font-size:0.75rem;border:1px solid var(--border);padding:0.25rem 0.75rem">${(p.stock_status || '').toUpperCase()}</span>
          </div>
          ${specs ? `<div style="margin-bottom:1.5rem"><h3 class="font-heading tracking-widest" style="font-weight:700;font-size:0.875rem;margin-bottom:0.75rem">KEY SPECIFICATIONS</h3><ul class="product-specs" style="border:none;padding:0">${specs}</ul></div>` : ''}
          ${p.specs ? `<div style="margin-bottom:2rem"><h3 class="font-heading tracking-widest" style="font-weight:700;font-size:0.875rem;margin-bottom:0.75rem">TECHNICAL DOSSIER</h3><pre class="font-mono" style="white-space:pre-wrap;background:var(--card);border:1px solid var(--border);padding:1rem;font-size:0.875rem;color:var(--muted-foreground)">${p.specs}</pre></div>` : ''}
          <div class="flex flex-col gap-4">
            <button id="add-cart-btn" class="btn btn-primary chamfer-sm" ${p.stock_status === 'Out of Stock' ? 'disabled' : ''}>ADD TO CART</button>
            <a href="quote.html" class="btn btn-outline chamfer-sm">REQUEST QUOTE</a>
          </div>
        </div>
      </div>
    `;
    document.getElementById('add-cart-btn').addEventListener('click', () => window.cart.add(p));
  } catch {
    wrap.innerHTML = '<div style="text-align:center;padding:3rem"><p class="font-mono text-muted" style="font-size:1.125rem;margin-bottom:1rem">PRODUCT NOT FOUND</p><a href="products.html" class="font-heading text-primary tracking-wider" style="font-weight:700">RETURN TO CATALOG</a></div>';
  }
});