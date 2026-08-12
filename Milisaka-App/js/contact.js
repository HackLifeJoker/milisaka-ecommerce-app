/* global api, toast */
// Contact page logic.
document.addEventListener('DOMContentLoaded', () => {
  const info = [
    { icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', title: 'HEADQUARTERS', body: '214 Gotham Plaza<br>Night City, CA 92109' },
    { icon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>', title: 'PHONE', body: '<a href="tel:+1-619-343-3021" class="text-muted" style="font-size:0.875rem">(619) 343-3021</a>' },
    { icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>', title: 'EMAIL', body: '<a href="mailto:procurement@milisaka-inc.com" class="text-muted" style="font-size:0.875rem">procurement@milisaka-inc.com</a>' },
  ];
  document.getElementById('contact-info').innerHTML = info
    .map(
      (i) => `
      <div class="card chamfer" style="padding:1.5rem">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom:0.75rem">${i.icon}</svg>
        <h3 class="font-heading tracking-widest" style="font-weight:700;font-size:0.875rem;margin-bottom:0.5rem">${i.title}</h3>
        <div class="text-muted" style="font-size:0.875rem">${i.body}</div>
      </div>`
    )
    .join('');

  renderForm();
});

function renderForm() {
  const wrap = document.getElementById('contact-form-wrap');
  wrap.innerHTML = `
    <form id="contact-form" class="card chamfer" style="padding:2rem;display:flex;flex-direction:column;gap:1.25rem">
      <div style="display:grid;gap:1.25rem" class="grid-2">
        <div><label class="label">FULL NAME *</label><input class="input" name="full_name" required /></div>
        <div><label class="label">EMAIL *</label><input class="input" type="email" name="email" required /></div>
      </div>
      <div><label class="label">SUBJECT</label><input class="input" name="subject" /></div>
      <div><label class="label">MESSAGE *</label><textarea class="textarea" name="message" rows="6" required></textarea></div>
      <button type="submit" class="btn btn-primary chamfer-sm">TRANSMIT MESSAGE</button>
    </form>
  `;
  document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    try {
      await api.createMessage(data);
      wrap.innerHTML = `
        <div class="card chamfer" style="border:1px solid var(--primary);padding:3rem;text-align:center">
          <h3 class="font-display" style="font-size:1.875rem;margin-bottom:1rem">MESSAGE TRANSMITTED</h3>
          <p class="text-muted" style="margin-bottom:1.5rem">Your message has been received. Our team will respond within 24-48 hours.</p>
          <button id="again" class="font-heading text-primary tracking-wider" style="font-weight:700;font-size:0.875rem">SEND ANOTHER MESSAGE</button>
        </div>`;
      document.getElementById('again').addEventListener('click', renderForm);
    } catch (err) {
      toast(err.message);
    }
  });
}