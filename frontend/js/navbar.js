document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const closeCart = document.getElementById("close-cart");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuClose = document.getElementById("mobile-menu-close");

  if (cartBtn && cartDrawer) {
    cartBtn.addEventListener("click", () => {
      cartDrawer.classList.add("open");
    });

    closeCart.addEventListener("click", () => {
      cartDrawer.classList.remove("open");
    });
  }

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      mobileMenu.classList.add("open");
    });

    mobileMenuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  }
});
