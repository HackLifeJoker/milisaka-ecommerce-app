function formatMoney(n) {
  return '$' + Number(n).toLocaleString();
}

/* ---------------------------------------------------------
   SCRAMBLE TEXT 
--------------------------------------------------------- */

export function scrambleText(el, text, duration = 1800, startDelay = 200) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const totalFrames = Math.round(duration / 16);
  let frame = 0;

  const queue = text.split('').map((char) => {
    const start = Math.floor(Math.random() * (totalFrames * 0.4));
    const end = start + Math.floor(totalFrames * 0.4) + 5;
    return { char, start, end };
  });

  function update() {
    let output = '';
    let complete = 0;

    for (let i = 0; i < queue.length; i++) {
      const { char, start, end } = queue[i];

      if (frame >= end) {
        complete++;
        output += char;
      } else if (frame >= start) {
        output += CHARS[Math.floor(Math.random() * CHARS.length)];
      } else {
        output += ' ';
      }
    }

    el.textContent = output;

    if (complete === queue.length) {
      el.textContent = text;
      return;
    }

    frame++;
    requestAnimationFrame(update);
  }

  setTimeout(() => requestAnimationFrame(update), startDelay);
}



/* SLIDE TO SUBMIT */

function initSlideToSubmit(trackEl, onSubmit, label = 'SLIDE TO SUBMIT') {
  let position = 0;
  let dragging = false;
  let completed = false;
  let startX = 0;

  trackEl.innerHTML = `
    <div class="slide-fill"></div>
    <div class="slide-label">${label}</div>
    <div class="slide-thumb">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  `;

  const fill = trackEl.querySelector('.slide-fill');
  const labelEl = trackEl.querySelector('.slide-label');
  const thumb = trackEl.querySelector('.slide-thumb');

  function maxWidth() {
    return trackEl.offsetWidth - 52;
  }

  function move(clientX) {
    if (completed) return;
    const w = maxWidth();
    let newPos = clientX - startX;
    newPos = Math.max(0, Math.min(newPos, w));
    position = newPos;
    thumb.style.transform = `translateX(${position}px)`;
    fill.style.width = position + 52 + 'px';

    if (newPos >= w - 2) {
      completed = true;
      trackEl.classList.add('completed');
      labelEl.textContent = 'AUTHENTICATED — TRANSMITTING';
      labelEl.style.color = 'var(--primary)';
      thumb.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>`;
      onSubmit();
    }
  }

  function start(clientX) {
    if (completed) return;
    dragging = true;
    startX = clientX - position;
  }

  thumb.addEventListener('mousedown', (e) => start(e.clientX));
  thumb.addEventListener('touchstart', (e) => { e.preventDefault(); start(e.touches[0].clientX); });

  window.addEventListener('mousemove', (e) => { if (dragging) move(e.clientX); });
  window.addEventListener('mouseup', () => {
    if (dragging && !completed) {
      dragging = false;
      position = 0;
      thumb.style.transform = 'translateX(0)';
      fill.style.width = '52px';
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (dragging) {
      e.preventDefault();
      move(e.touches[0].clientX);
    }
  }, { passive: false });

  window.addEventListener('touchend', () => {
    if (dragging && !completed) {
      dragging = false;
      position = 0;
      thumb.style.transform = 'translateX(0)';
      fill.style.width = '52px';
    }
  });
}

/* PRODUCT CARD + CART WIRING */

function productCardHTML(p) {
  const id = p._id || p.id;
  const badge =
    p.classification && p.classification !== 'Standard'
      ? `<span class="product-badge">${p.classification.toUpperCase()}</span>`
      : '';

  const specs = (p.key_specs || [])
    .slice(0, 3)
    .map((s) => `<li>${s}</li>`)
    .join('');

  return `
    <article class="product-card chamfer">
      <a href="product.html?id=${id}" class="product-card-img">
        <img src="${p.image_url}" alt="${p.name}" loading="lazy" />
        <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(10,10,10,0.8), transparent)"></div>
        ${badge}
      </a>
      <div class="product-card-body">
        <div class="product-meta">
          <span class="product-cat">${(p.category || '').toUpperCase()}</span>
          <span class="product-stock">${(p.stock_status || '').toUpperCase()}</span>
        </div>
        <a href="product.html?id=${id}" class="product-name">${p.name}</a>
        <p class="product-desc">${p.short_description || ''}</p>
        ${specs ? `<ul class="product-specs">${specs}</ul>` : ''}
        <div class="product-footer">
          <span class="product-price">${formatMoney(p.price)}</span>
          <div class="product-actions">
            <button class="icon-btn icon-btn-primary chamfer-sm" data-add="${id}" ${p.stock_status === 'Out of Stock' ? 'disabled' : ''} aria-label="Add to cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
            <a class="icon-btn icon-btn-secondary chamfer-sm" href="product.html?id=${id}" aria-label="View details">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

function wireAddToCartButtons(container, products) {
  container.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-add');
      const product = products.find((p) => (p._id || p.id) === id);
      if (product) window.cart.add(product);
    });
  });
}
