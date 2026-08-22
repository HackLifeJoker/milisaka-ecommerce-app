import { getCurrentUser } from './session.js';

function normalizeProduct(product) {
  return {
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity: product.quantity || 1,
    image: product.image
  };
}

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

async function addToCartBackend(product) {
  const userId = await getCartOwnerId();

  await fetch('http://localhost:5000/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, product: normalizeProduct(product) })
  });
}

async function removeFromCartBackend(productId) {
  const userId = await getCartOwnerId();

  await fetch('http://localhost:5000/cart/remove', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId })
  });
}

async function updateQuantityBackend(productId, quantity) {
  const userId = await getCartOwnerId();

  await fetch('http://localhost:5000/cart/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId, quantity })
  });
}

async function fetchCartFromBackend() {
  const userId = await getCartOwnerId();

  const res = await fetch(`http://localhost:5000/cart?userId=${userId}`);
  const data = await res.json();

  return data?.items || [];
}

export async function addToCart(product) {
  await addToCartBackend(product);
  await renderCartDrawer();
  await renderCartPage();
  await updateCartBubble();
  showCartPopup(product.name);
}

async function removeFromCart(productId) {
  await removeFromCartBackend(productId);
  await renderCartDrawer();
  await renderCartPage();
  await updateCartBubble();
}

async function updateQuantity(productId, newQty) {
  await updateQuantityBackend(productId, newQty);
  await renderCartDrawer();
  await renderCartPage();
  await updateCartBubble();
}

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

async function renderCartDrawer() {
  const drawerItemsEl = document.getElementById('cart-modal-items');
  const drawerSubtotalEl = document.getElementById('drawer-subtotal-amount');
  if (!drawerItemsEl) return;

  const backendCart = await fetchCartFromBackend();
  drawerItemsEl.innerHTML = '';

  if (backendCart.length === 0) {
    drawerItemsEl.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    if (drawerSubtotalEl) drawerSubtotalEl.textContent = '$0.00';
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

  const subtotal = backendCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (drawerSubtotalEl) drawerSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

async function renderCartPage() {
  console.log('[cart] renderCartPage called');   // ← ADD THIS

  const pageItemsEl = document.getElementById('cart-items-page');
  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl = document.getElementById('summary-total');

  if (!pageItemsEl || !subtotalEl || !totalEl) {
    console.log('[cart] missing elements:', { pageItemsEl, subtotalEl, totalEl });  // ← ADD THIS
    return;
  }

  const backendCart = await fetchCartFromBackend();
  console.log('[cart] backendCart on cart page:', backendCart);   // ← ADD THIS

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

function showCartPopup(productName) {
  const popup = document.getElementById('cart-popup');
  const popupText = document.getElementById('popup-body-text');
  if (!popup || !popupText) return;

  popupText.textContent = `${productName} has been added to your order.`;

  popup.classList.remove('hidden');
  popup.classList.add('visible');

  setTimeout(() => {
    popup.classList.remove('visible');
    setTimeout(() => popup.classList.add('hidden'), 400);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', async () => {
  await new Promise(resolve => setTimeout(resolve, 150));

  await renderCartDrawer();
  await renderCartPage();
  await updateCartBubble();
});
