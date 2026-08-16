// ================================
// LOAD NAVBAR + FOOTER
// ================================

async function loadComponent(targetId, filePath) {
    const html = await fetch(filePath).then(res => res.text());
    document.getElementById(targetId).innerHTML = html;
}

loadComponent("navbar", "frontend/components/navbar.html");
loadComponent("footer", "frontend/components/footer.html");

// ================================
// GLOBAL STATE
// ================================

let lastProductId = null;
let CART = []; // MUST be global

// ================================
// PAGE ROUTER
// ================================

function renderPage(page) {
    const container = document.getElementById("page-container");

    fetch(`frontend/pages/${page}.html`)
        .then(res => res.text())
        .then(html => {
            container.innerHTML = html;

            if (page === "home") loadHome();
            if (page === "products") loadProducts();
            if (page === "cart") renderCart();
            if (page === "product-detail") loadProductDetail(lastProductId);
            if (page === "checkout") loadCheckout();
        });
}

// ================================
// HOME PAGE
// ================================

function loadHome() {
    attachHomeEvents();
    loadFeaturedProducts();
}

function attachHomeEvents() {
    const btn = document.getElementById("shop-now-btn");
    if (btn) {
        btn.addEventListener("click", () => renderPage("products"));
    }
}

// ================================
// FEATURED PRODUCTS
// ================================

function loadFeaturedProducts() {
    const grid = document.getElementById("featured-grid");
    if (!grid) return;

    const featured = PRODUCTS.slice(0, 3);

    grid.innerHTML = featured.map(p => `
        <div class="product-card" data-id="${p.id}">
            <img src="${p.image_url}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
        </div>
    `).join("");
}

// ================================
// PRODUCTS PAGE
// ================================

function loadProducts() {
    const container = document.getElementById("products_grid");
    const filter = document.getElementById("category-filter");

    if (!container || !filter) return;

    const categories = [...new Set(PRODUCTS.map(p => p.category))];
    filter.innerHTML = `<option value="all">All</option>` +
        categories.map(c => `<option value="${c}">${c}</option>`).join("");

    filter.addEventListener("change", () => {
        renderProducts(filter.value);
    });

    renderProducts("all");
}

function renderProducts(category) {
    const container = document.getElementById("products_grid");

    let list = PRODUCTS;
    if (category !== "all") {
        list = PRODUCTS.filter(p => p.category === category);
    }

    container.innerHTML = list.map(p => `
        <div class="product-card" data-id="${p.id}">
            <img src="${p.image_url}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
        </div>
    `).join("");
}

// ================================
// PRODUCT DETAIL PAGE
// ================================

function loadProductDetail(id) {
    const product = PRODUCTS.find(p => p.id === id);
    const container = document.getElementById("product-detail-container");

    if (!product || !container) return;

    container.innerHTML = `
        <div class="product-detail">
            <img src="${product.image_url}" alt="${product.name}">

            <div class="product-info">
                <h2>${product.name}</h2>
                <p class="price">$${product.price}</p>
                <p class="stock">${product.stock_status}</p>
                <p class="classification">${product.classification}</p>

                <p>${product.description}</p>

                <h3>Key Specifications</h3>
                <ul>
                    ${product.key_specs.map(spec => `<li>${spec}</li>`).join("")}
                </ul>

                <button class="add-to-cart-btn" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// ================================
// CART LOGIC
// ================================

function addToCart(id) {
    id = Number(id);
    const existing = CART.find(i => i.id === id);

    if (existing) {
        existing.qty++;
    } else {
        CART.push({ id, qty: 1 });
    }

    alert("Item added to cart");
}

function renderCart() {
    const container = document.getElementById("cart-container");

    if (!container) return;

    if (CART.length === 0) {
        container.innerHTML = `<p>Your cart is empty.</p>`;
        return;
    }

    let html = "";

    CART.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.id);

        html += `
            <div class="cart-item" data-id="${product.id}">
                <img src="${product.image_url}" alt="${product.name}">
                <div>
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                </div>

                <div class="qty-controls">
                    <button class="qty-minus">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-plus">+</button>
                </div>

                <button class="remove-btn">Remove</button>
            </div>
        `;
    });

    const total = CART.reduce((sum, item) => {
        const product = PRODUCTS.find(p => p.id === item.id);
        return sum + product.price * item.qty;
    }, 0);

    html += `<div class="cart-total">Total: $${total}</div>`;

    container.innerHTML = html;
}

// ================================
// CHECKOUT PAGE
// ================================

function loadCheckout() {
    const summary = document.getElementById("checkout-summary");

    if (!summary) return;

    if (CART.length === 0) {
        summary.innerHTML = `<p>Your cart is empty.</p>`;
        return;
    }

    let html = "<h2>Order Summary</h2>";

    CART.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        html += `<p>${product.name} (x${item.qty}) — $${product.price * item.qty}</p>`;
    });

    const total = CART.reduce((sum, item) => {
        const product = PRODUCTS.find(p => p.id === item.id);
        return sum + product.price * item.qty;
    }, 0);

    html += `<h3>Total: $${total}</h3>`;

    summary.innerHTML = html;

    const form = document.getElementById("checkout-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        CART = [];
        renderPage("confirmation");
    });
}

// ================================
// GLOBAL CLICK HANDLING
// ================================

document.addEventListener("click", (e) => {

    // Navbar navigation
    if (e.target.classList.contains("nav-link")) {
        const page = e.target.dataset.page;
        renderPage(page);
    }

    // Product card click > product detail
    const card = e.target.closest(".product-card");
    if (card) {
        lastProductId = Number(card.dataset.id);
        renderPage("product-detail");
    }

    // Add to cart
    const addBtn = e.target.closest(".add-to-cart-btn");
    if (addBtn) {
        addToCart(addBtn.dataset.id);
    }

    // Quantity minus
    if (e.target.classList.contains("qty-minus")) {
        const id = Number(e.target.closest(".cart-item").dataset.id);
        const item = CART.find(i => i.id === id);
        if (item.qty > 1) item.qty--;
        renderCart();
    }

    // Quantity plus
    if (e.target.classList.contains("qty-plus")) {
        const id = Number(e.target.closest(".cart-item").dataset.id);
        const item = CART.find(i => i.id === id);
        item.qty++;
        renderCart();
    }

    // Remove item
    if (e.target.classList.contains("remove-btn")) {
        const id = Number(e.target.closest(".cart-item").dataset.id);
        CART = CART.filter(i => i.id !== id);
        renderCart();
    }
});

// ================================
// INITIAL PAGE LOAD
// ================================

renderPage("home");
