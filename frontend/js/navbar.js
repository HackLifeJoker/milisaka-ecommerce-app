function initializeNavbar() {
 
  // CART DRAWER ELEMENTS
  
  const cartBtn = document.getElementById("cart-btn");
  const backdrop = document.getElementById("cart-modal-backdrop");
  const closeBtn = document.getElementById("cart-modal-close");
  const viewCartBtn = document.getElementById("view-cart-btn");

  if (cartBtn && backdrop) {
    cartBtn.addEventListener("click", () => {
      backdrop.classList.remove("hidden");
    });
  }

  if (closeBtn && backdrop) {
    closeBtn.addEventListener("click", () => {
      backdrop.classList.add("hidden");
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.add("hidden");
      }
    });
  }

  if (viewCartBtn) {
    viewCartBtn.addEventListener("click", () => {
      window.location.href = "/frontend/html/cart.html";
    });
  }

  // USER DRAWER CONTROLS
  
  const userBtn = document.getElementById("nav-user-icon");
  const userBackdrop = document.getElementById("user-modal-backdrop");
  const userCloseBtn = document.getElementById("user-modal-close");

  if (userBtn && userBackdrop) {
    userBtn.addEventListener("click", () => {
      userBackdrop.classList.remove("hidden");
    });
  }

  if (userCloseBtn && userBackdrop) {
    userCloseBtn.addEventListener("click", () => {
      userBackdrop.classList.add("hidden");
    });
  }

  if (userBackdrop) {
    userBackdrop.addEventListener("click", (e) => {
      if (e.target === userBackdrop) {
        userBackdrop.classList.add("hidden");
      }
    });
  }


  // MOBILE MENU CONTROLS
 
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuClose = document.getElementById("mobile-menu-close");

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      mobileMenu.classList.add("open");
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  }

  document.addEventListener("click", (e) => {
    if (
      mobileMenu &&
      !mobileMenu.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      mobileMenu.classList.remove("open");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initializeNavbar, 200);
});
