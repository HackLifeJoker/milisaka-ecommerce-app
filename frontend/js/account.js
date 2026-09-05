import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Get current user
const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  window.location.href = "/frontend/html/login.html";
}

// Slide-down reveal for panels
function revealPanels() {
  const profilePanel = document.getElementById("profile-panel");
  const ordersPanel = document.getElementById("orders-panel");

  profilePanel.classList.remove("panel-hidden");
  profilePanel.classList.add("panel-visible");

  // slight delay for second panel
  setTimeout(() => {
    ordersPanel.classList.remove("panel-hidden");
    ordersPanel.classList.add("panel-visible");
  }, 150);
}

// Load profile
async function loadProfile() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Profile load error:", error);
    return;
  }

  document.getElementById("profile-email").textContent = data.email;
  document.getElementById("profile-name").textContent = data.display_name || "Not set";
  document.getElementById("profile-phone").textContent = data.phone || "Not set";
  document.getElementById("profile-address").textContent = data.address || "Not set";
  document.getElementById("profile-created").textContent =
    new Date(data.created_at).toLocaleDateString();
}

// Load orders
async function loadOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const ordersList = document.getElementById("orders-list");

  if (error) {
    console.error("Orders load error:", error);
    ordersList.innerHTML = `<p class="placeholder">Error loading orders.</p>`;
    return;
  }

  if (!data || data.length === 0) {
    ordersList.innerHTML = `<p class="placeholder">No orders found.</p>`;
    return;
  }

  ordersList.innerHTML = "";

  data.forEach(order => {
    const card = document.createElement("div");
    card.classList.add("order-card");

    card.innerHTML = `
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Total:</strong> $${order.total}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
    `;

    ordersList.appendChild(card);
  });
}

// Logout
document.getElementById("logout-btn").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "/frontend/html/login.html";
});

// Edit profile (placeholder for now)
document.getElementById("edit-profile-btn").addEventListener("click", () => {
  alert("Profile editing coming soon, Redwing and PackLife edition.");
});

// Init
await loadProfile();
await loadOrders();
revealPanels();
