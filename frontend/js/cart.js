import { getCurrentUser } from './session.js';

// ===== Determine Cart Owner (User or Guest) =====
export async function getCartOwnerId() {
  const user = await getCurrentUser();
  if (user) return user.id;

  let guestId = localStorage.getItem('guestId');
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem('guestId', guestId);
  }
  return guestId;
}

// ===== BACKEND API CALLS =====
async function addToCartBackend(product) {
  const ownerId = await getCartOwnerId();

  await fetch('http://localhost:5000/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ownerId, product })
  });
}

async function removeFromCartBackend(productId) {
  const ownerId = await getCartOwnerId();

  await fetch('http://localhost:5000/cart/remove', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ownerId, productId })
  });
}

async function updateQuantityBackend(productId, quantity) {
  const ownerId = await getCartOwnerId();

  await fetch('http://localhost:5000/cart/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ownerId, productId, quantity })
  });
}

async function fetchCartFromBackend() {
  const ownerId = await getCartOwnerId();

  const res = await fetch(`http://localhost:5000/cart?ownerId=${ownerId}`);
  const data = await res.json();

  return data?.items || [];
}

// ===== ADD TO CART (exported for products.js) =====
export async function addToCart(product) {
  await addToCartBackend(product);
  await renderCartDrawer();
  await renderCartPage();
  await updateCartBubble();
  showCartPopup(product.name);
}

// ===== REMOVE ITEM =====
async function removeFromCart(productId) {
  await removeFromCartBackend(productId);
  await renderCartDrawer();
  await renderCartPage();
  await updateCartBubble();
}

// ===== UPDATE QUANTITY =====
async function updateQuantity(productId, newQty) {
  await updateQuantityBackend(productId, newQty);
  await renderCartDrawer();
  await renderCartPage();
  await updateCartBubble();
}

// ===== CART BUBBLE =====
async function updateCartBubble() {
  const bubble = document.getElementById('cart-count-bubble');
  if (!bubble) return;

  const backendCart = await fetchCartFromBackend();
  const totalQty = backendCart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalQty > 0) {
    bubble.textContent = totalQty;
    bubble.classList.remove('hidden');
  } else {
    bubble.classList.add('hidden');
  }
}

// ===== GLOBAL MODAL DRAWER BINDINGS =====
function setupDrawerListeners() {
  const backdrop = document.getElementById('cart-modal-backdrop');
  const modalClose = document.getElementById('cart-modal-close');

  // Open from header cart icon
  document.addEventListener('click', (e) => {
    const cartBtn = e.target.closest('#cart-btn');
    if (cartBtn && backdrop) {
      backdrop.classList.remove('hidden');
    }
  });

  // Close via X button
  if (modalClose && backdrop) {
    modalClose.addEventListener('click', () => {
      backdrop.classList.add('hidden');
    });
  }

  // Close via backdrop click
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.add('hidden');
      }
    });
  }
}

// ===== RENDER DRAWER ITEMS =====
async function renderCartDrawer() {
  const drawerItemsEl = document.getElementById('cart-modal-items');
  if (!drawerItemsEl) return;

  const backendCart = await fetchCartFromBackend();
  drawerItemsEl.innerHTML = '';

  if (backendCart.length === 0) {
    drawerItemsEl.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    return;
  }

  backendCart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'drawer-item';

    div.innerHTML = `
      <img src="${item.image}" class="drawer-item-img" />
      <div class="drawer-item-info">
        <p class="drawer-item-name">${item.name}</p>
        <p class="drawer-item-qty">Qty: ${item.quantity}</p>
        <p class="drawer-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button class="drawer-remove-btn" data-id="${item.productId}">Remove</button>
    `;

    drawerItemsEl.appendChild(div);
  });

  document.querySelectorAll('.drawer-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });
}

// ===== CART PAGE RENDERER =====
async function renderCartPage() {
  const pageItemsEl = document.getElementById('cart-items-page');
  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl = document.getElementById('summary-total');
  if (!pageItemsEl || !subtotalEl || !totalEl) return;

  const backendCart = await fetchCartFromBackend();
  pageItemsEl.innerHTML = '';

  if (backendCart.length === 0) {
    pageItemsEl.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    subtotalEl.textContent = '$0.00';
    totalEl.textContent = '$0.00';
    return;
  }

  backendCart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-page-item';

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-page-img" />

      <div class="cart-page-info">
        <h3>${item.name}</h3>
        <p class="price-per-unit">$${item.price.toFixed(2)} per unit</p>

        <div class="qty-controls">
          <button class="qty-btn" data-id="${item.productId}" data-action="minus">-</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" data-id="${item.productId}" data-action="plus">+</button>
        </div>

        <button class="remove-btn" data-id="${item.productId}">🗑</button>
      </div>

      <div class="cart-item-total">
        $${(item.price * item.quantity).toFixed(2)}
      </div>
    `;

    pageItemsEl.appendChild(div);
  });

  const subtotal = backendCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  totalEl.textContent = `$${subtotal.toFixed(2)}`;

  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;

      const item = backendCart.find(i => i.productId === id);
      if (!item) return;

      let newQty = item.quantity;
      if (action === 'plus') newQty++;
      if (action === 'minus') newQty = Math.max(1, newQty - 1);

      updateQuantity(id, newQty);
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });
}

// ===== POPUP =====
function showCartPopup(productName) {
  const popup = document.getElementById('cart-popup');
  const popupText = document.getElementById('popup-body-text');
  if (!popup || !popupText) return;

  popupText.textContent = `${productName} has been added to your order.`;

  popup.classList.remove('hidden');
  popup.classList.add('visible');

  setTimeout(() => {
    popup.classList.remove('visible');
    popup.classList.add('hidden');
  }, 3000);
}

// ===== MERGE GUEST CART INTO USER CART =====
export async function mergeGuestCartIntoUserCart(userId) {
  const guestId = localStorage.getItem('guestId');
  if (!guestId) return;

  await fetch('http://localhost:5000/cart/merge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guestId, userId })
  });

  localStorage.removeItem('guestId');

  await renderCartDrawer();
  await renderCartPage();
  await updateCartBubble();
}

// ===== INITIAL LOAD (single, clean initializer) =====
document.addEventListener('DOMContentLoaded', async () => {
  // small delay to let app.js inject navbar/footer + drawer
  await new Promise(resolve => setTimeout(resolve, 50));

  setupDrawerListeners();
  await renderCartDrawer();
  await renderCartPage();
  await updateCartBubble();
});
