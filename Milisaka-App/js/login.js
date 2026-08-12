// Login page logic.
document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.getElementById('login-card');
  wrap.innerHTML = `
    <div class="card chamfer" style="padding:2rem">
      <h1 class="font-display text-center" style="font-size:1.875rem;margin-bottom:0.5rem">ACCESS</h1>
      <p class="font-mono text-primary tracking-widest text-center" style="font-size:0.75rem;margin-bottom:2rem">// AUTHENTICATE</p>
      <p id="login-error" class="font-mono text-center" style="color:var(--destructive);font-size:0.875rem;margin-bottom:1rem;display:none"></p>
      <form id="login-form" style="display:flex;flex-direction:column;gap:1.25rem">
        <div><label class="label">EMAIL</label><input class="input" type="email" name="email" required /></div>
        <div><label class="label">PASSWORD</label><input class="input" type="password" name="password" required /></div>
        <button type="submit" class="btn btn-primary chamfer-sm">LOGIN</button>
      </form>
      <p class="text-muted text-center" style="font-size:0.875rem;margin-top:1.5rem">No account? <a href="register.html" class="text-primary">Register</a></p>
    </div>`;

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const errEl = document.getElementById('login-error');
    errEl.style.display = 'none';
    try {
      await window.auth.login(fd.get('email'), fd.get('password'));
      window.location.href = 'index.html';
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = 'block';
    }
  });
});