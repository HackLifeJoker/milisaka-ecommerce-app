// GLOBAL LAYOUT INJECTION

async function injectLayout() {
  try {
    // Inject navbar at the top of the body
    const navbar = await fetch('/frontend/html/navbar.html').then(r => r.text());
    document.body.insertAdjacentHTML('afterbegin', navbar);

    // Inject footer at the bottom of the body
    const footer = await fetch('/frontend/html/footer.html').then(r => r.text());
    document.body.insertAdjacentHTML('beforeend', footer);

    // Inject GLOBAL CART DRAWER (Option B)
    const drawer = await fetch('/frontend/html/cartDrawer.html').then(r => r.text());
    document.body.insertAdjacentHTML('beforeend', drawer);

    // Inject cart.css globally
    const cartCSS = document.createElement('link');
    cartCSS.rel = 'stylesheet';
    cartCSS.href = '/frontend/css/cart.css';
    document.head.appendChild(cartCSS);

    // Inject GLOBAL USER DRAWER
    const userDrawer = await fetch('/frontend/html/userDrawer.html').then(r => r.text());
    document.body.insertAdjacentHTML('beforeend', userDrawer);

  } catch (err) {
    console.error('Layout injection failed:', err);
  }
}

// HEADER EVENT LISTENERS

function setupHeaderListeners() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

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

  // CART DRAWER CONTROLS
  const cartBtn = document.getElementById('cart-btn');
  const backdrop = document.getElementById('cart-modal-backdrop');
  const closeBtn = document.getElementById('cart-modal-close');
  const viewCartBtn = document.getElementById('view-cart-btn');

  // Open drawer
  if (cartBtn && backdrop) {
    cartBtn.addEventListener('click', () => {
      backdrop.classList.remove('hidden');
    });
  }

  // Close drawer via X button
  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', () => {
      backdrop.classList.add('hidden');
    });
  }

  // Close drawer by clicking backdrop
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.add('hidden');
      }
    });
  }

  // View Cart button
  if (viewCartBtn) {
    viewCartBtn.addEventListener('click', () => {
      window.location.href = '/frontend/html/cart.html';
    });
  }
}

// MAIN INITIALIZER

window.addEventListener('DOMContentLoaded', async () => {
  await injectLayout();        
  setupHeaderListeners();      
});
