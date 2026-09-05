import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// FORM SUBMIT HANDLER
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    document.getElementById("login-error").textContent = "Incorrect email/password combination.";
    return;
  }

  window.location.href = "../html/account.html";
});

// REGISTER BUTTON
document.getElementById("register-btn").addEventListener("click", () => {
  window.location.href = "/frontend/html/register.html";
});
