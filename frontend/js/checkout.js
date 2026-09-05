import { getCurrentUser } from './session.js';
import { updateCartBubble,renderCartDrawer, renderCartPage, fetchCartFromBackend } from './cart.js';

async function getCart() {
    const user = await getCurrentUser();

    let userId;

    if (user) {
        userId = user.id;
    } else {
        userId = localStorage.getItem('guestId');
        if (!userId) {
            console.warn("Checkout: guestId missing — cart.js has not initialized yet.");
            return [];
        }
    }

    const res = await fetch(`http://localhost:5000/cart?userId=${userId}`);
    const data = await res.json();

    return data?.items || [];
}


async function renderCartSummary() {
    const cart = await getCart();
    const itemsContainer = document.getElementById('checkout-cart-items');
    const totalEl = document.getElementById('checkout-total-amount');

    if (!cart.length) {
        itemsContainer.innerHTML = `<p class="empty-cart">No items in manifest.</p>`;
        totalEl.textContent = '$0.00';
        return;
    }

    let total = 0;

    itemsContainer.innerHTML = cart.map(item => {
        const lineTotal = item.price * item.quantity;
        total += lineTotal;

       return `
    <div class="checkout-item">
        <img src="${item.image}" class="checkout-item-img" />

        <div class="checkout-item-info">
            <span class="item-name">${item.name}</span>
        </div>

        <div class="checkout-item-qty">
            x${item.quantity}
        </div>

        <div class="checkout-item-total">
            $${lineTotal.toFixed(2)}
        </div>
    </div>
`;

    }).join('');

    totalEl.textContent = `$${total.toFixed(2)}`;
}

async function setCheckoutButtonsByAuth() {
    const user = await getCurrentUser();

    const confirmBtn = document.getElementById('checkout-confirm-btn');
    const guestBtn = document.getElementById('checkout-guest-btn');

    if (user) {
        confirmBtn.classList.remove('hidden');
        guestBtn.classList.add('hidden');
    } else {
        confirmBtn.classList.add('hidden');
        guestBtn.classList.remove('hidden');
    }
}

function buildOrderObject(user, cart) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
        userId: user ? user.id : null,
        items: cart.map(item => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total,
        status: 'Completed',
        createdAt: new Date().toISOString(),
        source: 'Milisaka-Checkout'
    };
}

async function submitOrder(order) {
    const res = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    });

    if (!res.ok) {
        throw new Error('Order submission failed');
    }

    return await res.json();
}

function showCheckoutMessage(text, isError = false) {
    const msgEl = document.getElementById('checkout-message');
    msgEl.textContent = text;

    msgEl.classList.remove('hidden');
    msgEl.classList.toggle('error', isError);

    setTimeout(() => {
        msgEl.classList.add('fade-out');
        setTimeout(() => {
            msgEl.classList.add('hidden');
            msgEl.classList.remove('fade-out');
        }, 500);
    }, 3000);
}

async function clearBackendCart() {
    const user = await getCurrentUser();
    let userId = user ? user.id : localStorage.getItem('guestId');

    await fetch('http://localhost:5000/cart/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });
    await fetchCartFromBackend();
}

async function handleAuthorizedCheckout() {
    const cart = await getCart();
    if (!cart.length) {
        showCheckoutMessage('No items in manifest.', true);
        return;
    }

    const user = await getCurrentUser();
    if (!user) {
        showCheckoutMessage('No personnel record found. Use Guest Deployment.', true);
        return;
    }

    const order = buildOrderObject(user, cart);

    try {
        await submitOrder(order);
        await clearBackendCart();
        await fetchCartFromBackend();
        await renderCartDrawer();
        await renderCartPage();
        await updateCartBubble();
        await renderCartSummary();
        showCheckoutMessage('TRANSACTION AUTHORIZED — SUPPLY REQUEST LOGGED');
    } catch (err) {
        showCheckoutMessage('DEPLOYMENT FAILURE — TRY AGAIN LATER', true);
    }
}

async function handleGuestCheckout() {
    const cart = await getCart();
    if (!cart.length) {
        showCheckoutMessage('No items in manifest.', true);
        return;
    }

    const order = buildOrderObject(null, cart);

    try {
        await clearBackendCart();
        await fetchCartFromBackend();
        await renderCartDrawer();
        await renderCartPage();
        await updateCartBubble();
        await renderCartSummary();
        showCheckoutMessage('GUEST DEPLOYMENT AUTHORIZED — NO PERSONNEL FILE ATTACHED');
    } catch (err) {
        showCheckoutMessage('DEPLOYMENT FAILURE — TRY AGAIN LATER', true);
    }
}

async function initCheckoutPage() {
    await renderCartSummary();
    await setCheckoutButtonsByAuth();
    await renderCartDrawer();
    await renderCartPage();
    await updateCartBubble();

    document.getElementById('checkout-confirm-btn')
        .addEventListener('click', handleAuthorizedCheckout);

    document.getElementById('checkout-guest-btn')
        .addEventListener('click', handleGuestCheckout);
}

document.addEventListener('DOMContentLoaded', async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    await initCheckoutPage();
});
