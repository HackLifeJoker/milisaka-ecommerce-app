document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("hamburger-overlay");
    const openBtn = document.getElementById("hamburger-btn");
    const closeBtn = document.getElementById("hamburger-close");
  
    if (!overlay || !openBtn || !closeBtn) return;
  
    openBtn.addEventListener("click", () => {
      overlay.classList.add("open");
      document.body.classList.add("no-scroll");
    });
  
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("open");
      document.body.classList.remove("no-scroll");
    });
  
    // Search bar behavior
    const searchInput = document.getElementById("nav-search");
    if (searchInput) {
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          window.location.href = "/frontend/html/products.html";
        }
      });
    }
  });
  