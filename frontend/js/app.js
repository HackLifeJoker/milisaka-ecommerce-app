// ===============================
// app.js — global initializer
// ===============================

// 1. Import utilities and page logic FIRST
import '/frontend/js/utils.js';
import '/frontend/js/home.js';

// 2. Layout injection (header + footer)
export async function injectLayout() {
  try {
    const navbar = await fetch('/frontend/html/navbar.html').then(r => r.text());
    document.body.insertAdjacentHTML('afterbegin', navbar);

    const footer = await fetch('/frontend/html/footer.html').then(r => r.text());
    document.body.insertAdjacentHTML('beforeend', footer);

  } catch (err) {
    console.error('Layout injection failed:', err);
  }
}


// ===============================
// 3. HEADER EVENT LISTENERS
// ===============================

function setupHeaderListeners() {

  // HAMBURGER MENU
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // MOBILE MENU CLOSE BUTTON
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  }

  // CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
  document.addEventListener('click', (e) => {
    const clickedInsideMenu = mobileMenu.contains(e.target);
    const clickedHamburger = hamburgerBtn.contains(e.target);

    if (!clickedInsideMenu && !clickedHamburger) {
      mobileMenu.classList.remove('open');
    }
  });

  // USER BUTTON → LOGIN PAGE
  const userBtn = document.querySelector('.icon-btn.user-btn');
  if (userBtn) {
    userBtn.addEventListener('click', () => {
      window.location.href = '/frontend/html/login.html';
    });
  }

  // CART BUTTON → OPEN DRAWER
  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      const drawer = document.getElementById('cart-drawer');
      if (drawer) drawer.classList.add('open');
    });
  }

  // CLOSE CART DRAWER
  const closeCart = document.getElementById('close-cart');
  if (closeCart) {
    closeCart.addEventListener('click', () => {
      const drawer = document.getElementById('cart-drawer');
      if (drawer) drawer.classList.remove('open');
    });
  }

  // VIEW CART BUTTON → CART PAGE
  const viewCartBtn = document.getElementById('view-cart-btn');
  if (viewCartBtn) {
    viewCartBtn.addEventListener('click', () => {
      window.location.href = '/frontend/html/cart.html';
    });
  }
}


// ===============================
// 4. MAIN INITIALIZER
// ===============================

window.addEventListener('load', async () => {
  await injectLayout();
  setupHeaderListeners();
});
