// Register page logic.
document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.getElementById('register-card');
  wrap.innerHTML = `
    <div class="card chamfer" style="padding:2rem">
      <h1 class="font-display text-center" style="font-size:1.875rem;margin-bottom:0.5rem">ENLIST</h1>
      <p class="font-mono text-primary tracking-widest text-center" style="font-size:0.75rem;margin-bottom:2rem">// NEW OPERATOR</p>
      <p id="reg-error" class="font-mono text-center" style="color:var(--destructive);font-size:0.875rem;margin-bottom:1rem;display:none"></p>
      <form id="reg-form" style="display:flex;flex-direction:column;gap:1.25rem">
        <div><label class="label">FULL NAME</label><input class="input" name="full_name" required /></div>
        <div><label class="label">EMAIL</label><input class="input" type="email" name="email" required /></div>
        <div><label class="label">PASSWORD</label><input class="input" type="password" name="password" required /></div>
        <button type="submit" class="btn btn-primary chamfer-sm">REGISTER</button>
      </form>
      <p class="text-muted text-center" style="font-size:0.875rem;margin-top:1.5rem">Already enlisted? <a href="login.html" class="text-primary">Login</a></p>
    </div>`;

  document.getElementById('reg-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const errEl = document.getElementById('reg-error');
    const password = fd.get('password');
    if (password.length < 6) {
      errEl.textContent = 'Password must be at least 6 characters';
      errEl.style.display = 'block';
      return;
    }
    errEl.style.display = 'none';
    try {
      await window.auth.register(fd.get('full_name'), fd.get('email'), password);
      window.location.href = 'index.html';
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = 'block';
    }
  });
});