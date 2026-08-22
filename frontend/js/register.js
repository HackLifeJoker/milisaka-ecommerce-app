import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


const supabase = createClient(supabaseUrl, supabaseAnonKey);

// DOM elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm-password');
const createBtn = document.getElementById('create-account-btn');
const backBtn = document.getElementById('back-to-login-btn');
const errorEl = document.getElementById('register-error');

// Redirect if already logged in
(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    window.location.href = '../html/account.html';
  }
})();

// Email validation 
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// CREATE ACCOUNT BUTTON
createBtn.addEventListener('click', async () => {
  errorEl.textContent = '';

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirm = confirmInput.value.trim();

  // ===== VALIDATION =====

  // Required fields
  if (!email || !password || !confirm) {
    errorEl.textContent = 'All fields are required.';
    return;
  }

  // Email format
  if (!isValidEmail(email)) {
    errorEl.textContent = 'Please enter a valid email address.';
    return;
  }

  // Password length
  if (password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters.';
    return;
  }

  // Password match
  if (password !== confirm) {
    errorEl.textContent = 'Passwords do not match.';
    return;
  }

  // ===== SUPABASE SIGNUP =====
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    errorEl.textContent = 'Registration failed. Try again.';
    return;
  }

  // Auto-login after signup
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (loginError) {
    errorEl.textContent = 'Account created, but login failed.';
    return;
  }

  // Redirect to account page
  window.location.href = '../html/account.html';
});

// BACK TO LOGIN BUTTON
backBtn.addEventListener('click', () => {
  window.location.href = '../html/login.html';
});
