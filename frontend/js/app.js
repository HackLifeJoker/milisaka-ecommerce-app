// ===========================
// GLOBAL LAYOUT INJECTION
// ===========================

async function injectLayout() {
  try {
    // Inject navbar at the top of the body
    const navbar = await fetch('/frontend/html/navbar.html').then(r => r.text());
    document.body.insertAdjacentHTML('afterbegin', navbar);

    // Inject footer at the bottom of the body
    const footer = await fetch('/frontend/html/footer.html').then(r => r.text());
    document.body.insertAdjacentHTML('beforeend', footer);

  } catch (err) {
    console.error('Layout injection failed:', err);
  }
}

// ===============================
// HEADER EVENT LISTENERS
// ===============================

function setupHeaderListeners() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  const mobileMenuClose = document.getElementById('mobile-menu-close');
  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  }

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });

  const userBtn = document.querySelector('.icon-btn.user-btn');
  if (userBtn) {
    userBtn.addEventListener('click', () => {
      window.location.href = '/frontend/html/login.html';
    });
  }

  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      const drawer = document.getElementById('cart-drawer');
      if (drawer) drawer.classList.add('open');
    });
  }

  const closeCart = document.getElementById('close-cart');
  if (closeCart) {
    closeCart.addEventListener('click', () => {
      const drawer = document.getElementById('cart-drawer');
      if (drawer) drawer.classList.remove('open');
    });
  }

  const viewCartBtn = document.getElementById('view-cart-btn');
  if (viewCartBtn) {
    viewCartBtn.addEventListener('click', () => {
      window.location.href = '/frontend/html/cart.html';
    });
  }
}

// ===============================
// MAIN INITIALIZER
// ===============================

window.addEventListener('DOMContentLoaded', async () => {
  await injectLayout();        // inject ONCE
  setupHeaderListeners();      // bind events AFTER injection
});
