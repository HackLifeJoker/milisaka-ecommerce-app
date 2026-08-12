/* global toast */
// Cart state in localStorage — mirrors the React CartContext.
const CART_KEY = 'milisaka_cart';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartBadge();
}

window.cart = {
  get items() { return loadCart(); },

  add(product, quantity = 1) {
    const items = loadCart();
    const id = product._id || product.id;
    const existing = items.find((i) => i.product_id === id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({
        product_id: id,
        product_name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity,
      });
    }
    saveCart(items);
    toast(`${product.name} added to cart`);
  },

  remove(productId) {
    const items = loadCart().filter((i) => i.product_id !== productId);
    saveCart(items);
  },

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    const items = loadCart().map((i) =>
      i.product_id === productId ? { ...i, quantity } : i
    );
    saveCart(items);
  },

  clear() {
    saveCart([]);
  },

  get total() {
    return loadCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
  },

  get count() {
    return loadCart().reduce((sum, i) => sum + i.quantity, 0);
  },
};

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const count = window.cart.count;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}