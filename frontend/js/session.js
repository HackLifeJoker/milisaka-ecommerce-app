import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);


// GET CURRENT USER

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}


// LOGOUT

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = '/index.html';
}


// USER DRAWER

export async function applyNavbarSessionLogic() {
  const user = await getCurrentUser();

  const userDrawerBody = document.getElementById('user-modal-body');
  const userIcon = document.getElementById('nav-user-icon');

  if (!userDrawerBody || !userIcon) return;

  // USER NOT LOGGED IN
  if (!user) {
    userDrawerBody.innerHTML = `
      <p class="user-welcome">Welcome, Operator.</p>

      <button class="cart-view-btn" onclick="window.location.href='/frontend/html/login.html'">
        LOGIN
      </button>

      <button class="cart-view-btn" onclick="window.location.href='/frontend/html/register.html'">
        REGISTER
      </button>
    `;
    return;
  }

  // USER LOGGED IN
  const username = user.user_metadata?.username || user.email;

  userDrawerBody.innerHTML = `
    <p class="user-welcome">Welcome, <strong>${username}</strong></p>

    <button class="cart-view-btn" onclick="window.location.href='/frontend/html/account.html'">
      ACCOUNT
    </button>

    <button class="cart-view-btn">
      SAVED ITEMS
    </button>

    <button class="cart-view-btn">
      PURCHASE HISTORY
    </button>

    <button class="cart-view-btn" id="user-logout-btn">
      SIGN OUT
    </button>
  `;

  
  const logoutBtn = document.getElementById('user-logout-btn');
  if (logoutBtn) logoutBtn.onclick = logout;
}
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(applyNavbarSessionLogic, 200);
});
