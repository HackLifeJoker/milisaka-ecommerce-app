import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ===== GET CURRENT USER =====
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// ===== LOGOUT =====
export async function logout() {
  await supabase.auth.signOut();
  window.location.href = '/index.html';
}

// ===== NAVBAR SESSION HANDLING =====
export async function applyNavbarSessionLogic() {
  const userIcon = document.getElementById('nav-user-icon');
  const logoutBtn = document.getElementById('nav-logout-btn');

  const user = await getCurrentUser();

  if (!user) {
    // Not logged in → user icon goes to login page
    if (userIcon) userIcon.onclick = () => window.location.href = '/frontend/html/login.html';
    if (logoutBtn) logoutBtn.style.display = 'none';
  } else {
    // Logged in → user icon goes to account page
    if (userIcon) userIcon.onclick = () => window.location.href = '/frontend/html/account.html';
    if (logoutBtn) {
      logoutBtn.style.display = 'inline-block';
      logoutBtn.onclick = logout;
    }
  }
}
