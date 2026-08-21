import { createClient } from '@supabase/supabase-js';
import { mergeGuestCartIntoUserCart } from './cart.js';

// Load Supabase keys from Vite environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// DOM elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const errorEl = document.getElementById('login-error');

// Redirect if already logged in
(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    window.location.href = '../html/account.html';
  }
})();

// LOGIN BUTTON
loginBtn.addEventListener('click', async () => {
  errorEl.textContent = '';

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    errorEl.textContent = 'Email and password required.';
    return;
  }

  // Attempt login
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    errorEl.textContent = 'Incorrect email/password combination.';
    return;
  }

// Successful login → redirect
  // Merge guest cart into user cart
  const { data: { user } } = await supabase.auth.getUser();
  await mergeGuestCartIntoUserCart(user.id);

// Redirect
window.location.href = '/frontend/html/account.html';

});

// REGISTER BUTTON
registerBtn.addEventListener('click', () => {
  window.location.href = '/frontend/html/register.html';
});
