/* global initSlideToSubmit, api */
// Quote request page — 3-step wizard.
let step = 1;
let form = { full_name: '', email: '', phone: '', organization: '', sector: '', product_interest: '', quantity: 1, message: '' };

const SECTORS = [
  { value: 'Government & Military', label: 'GOVERNMENT & MILITARY', desc: 'Defense procurement and tactical operations' },
  { value: 'Corporate Enterprise', label: 'CORPORATE ENTERPRISE', desc: 'Industrial and enterprise IT infrastructure' },
  { value: 'Individual Consumer', label: 'INDIVIDUAL CONSUMER', desc: 'Personal and private organization security' },
];

document.addEventListener('DOMContentLoaded', () => {
  renderSteps();
  renderStep();
});

function canProceed() {
  if (step === 1) return form.sector !== '';
  if (step === 2) return form.product_interest.trim() !== '' && form.quantity > 0;
  if (step === 3) return form.full_name.trim() && form.email.trim() && form.message.trim();
  return false;
}

function renderSteps() {
  const stepsEl = document.getElementById('steps');
  stepsEl.innerHTML = [1, 2, 3].map((s) => {
    const done = step > s;
    const active = step >= s;
    return `
      <div class="step ${active ? 'active' : ''} ${done ? 'done' : ''}">
        <div class="step-circle">${done ? '✓' : s}</div>
        ${s < 3 ? '<div class="step-line"></div>' : ''}
      </div>`;
  }).join('');
}

function renderStep() {
  const wrap = document.getElementById('quote-content');
  if (step === 1) {
    wrap.innerHTML = `
      <h2 class="font-heading" style="font-weight:700;font-size:1.5rem;margin-bottom:0.5rem">SELECT YOUR SECTOR</h2>
      <p class="text-muted" style="font-size:0.875rem;margin-bottom:1.5rem">Choose the category that best describes your organization.</p>
      <div style="display:flex;flex-direction:column;gap:0.75rem" id="sector-list">
        ${SECTORS.map((s) => `
          <button data-sector="${s.value}" class="card chamfer-sm" style="display:flex;align-items:center;gap:1rem;padding:1.25rem;text-align:left;border:1px solid ${form.sector === s.value ? 'var(--primary)' : 'var(--border)'};background:${form.sector === s.value ? 'rgba(255,31,31,0.05)' : 'var(--card)'}">
            <div style="flex:1">
              <h3 class="font-heading" style="font-weight:700">${s.label}</h3>
              <p class="text-muted" style="font-size:0.875rem">${s.desc}</p>
            </div>
            ${form.sector === s.value ? '<span class="text-primary" style="font-size:1.5rem">✓</span>' : ''}
          </button>`).join('')}
      </div>
      ${navButtons()}`;
    document.querySelectorAll('[data-sector]').forEach((btn) => {
      btn.addEventListener('click', () => {
        form.sector = btn.getAttribute('data-sector');
        renderStep();
      });
    });
  } else if (step === 2) {
    wrap.innerHTML = `
      <h2 class="font-heading" style="font-weight:700;font-size:1.5rem;margin-bottom:0.5rem">PRODUCT REQUIREMENTS</h2>
      <p class="text-muted" style="font-size:0.875rem;margin-bottom:1.5rem">Tell us what you need and in what quantity.</p>
      <div style="margin-bottom:1.25rem"><label class="label">PRODUCT(S) OF INTEREST *</label><textarea class="textarea" id="q-interest" rows="3" placeholder="e.g., 50x MK-7 Raptor Tactical Laptops, CY-SHIELD Endpoint Security licenses...">${form.product_interest}</textarea></div>
      <div><label class="label">ESTIMATED QUANTITY</label><input class="input" type="number" min="1" id="q-qty" value="${form.quantity}" /></div>
      ${navButtons()}`;
    document.getElementById('q-interest').addEventListener('input', (e) => (form.product_interest = e.target.value));
    document.getElementById('q-qty').addEventListener('input', (e) => (form.quantity = parseInt(e.target.value) || 1));
  } else if (step === 3) {
    wrap.innerHTML = `
      <h2 class="font-heading" style="font-weight:700;font-size:1.5rem;margin-bottom:0.5rem">CONTACT INFORMATION</h2>
      <p class="text-muted" style="font-size:0.875rem;margin-bottom:1.5rem">Provide your details and project requirements.</p>
      <div style="display:grid;gap:1.25rem" class="grid-2">
        <div><label class="label">FULL NAME *</label><input class="input" id="q-name" value="${form.full_name}" /></div>
        <div><label class="label">EMAIL *</label><input class="input" type="email" id="q-email" value="${form.email}" /></div>
        <div><label class="label">PHONE</label><input class="input" type="tel" id="q-phone" value="${form.phone}" /></div>
        <div><label class="label">ORGANIZATION</label><input class="input" id="q-org" value="${form.organization}" /></div>
      </div>
      <div style="margin-top:1.25rem"><label class="label">PROJECT DETAILS / MESSAGE *</label><textarea class="textarea" id="q-msg" rows="4" placeholder="Describe your project requirements, timeline, and any specific needs...">${form.message}</textarea></div>
      <div style="margin-top:1.5rem">
        <label class="label">// AUTHENTICATE TO TRANSMIT</label>
        <div id="slide-track" class="slide-track"></div>
        <p id="submit-status" class="font-mono text-primary" style="text-align:center;margin-top:0.75rem;display:none">TRANSMITTING...</p>
      </div>
      <div style="margin-top:2rem"><button id="back-btn" class="btn btn-outline chamfer-sm">BACK</button></div>`;

    document.getElementById('q-name').addEventListener('input', (e) => (form.full_name = e.target.value));
    document.getElementById('q-email').addEventListener('input', (e) => (form.email = e.target.value));
    document.getElementById('q-phone').addEventListener('input', (e) => (form.phone = e.target.value));
    document.getElementById('q-org').addEventListener('input', (e) => (form.organization = e.target.value));
    document.getElementById('q-msg').addEventListener('input', (e) => (form.message = e.target.value));
    document.getElementById('back-btn').addEventListener('click', () => { step = 2; renderSteps(); renderStep(); });

    const track = document.getElementById('slide-track');
    if (canProceed()) {
      initSlideToSubmit(track, submitQuote, 'SLIDE TO AUTHENTICATE & SUBMIT');
    } else {
      track.innerHTML = '<p class="font-mono" style="color:var(--destructive);text-align:center;line-height:3.5rem;font-size:0.875rem">FILL ALL REQUIRED FIELDS TO ENABLE SUBMISSION</p>';
    }
  }

  wireNav();
}

function navButtons() {
  if (step === 3) return '';
  return `
    <div style="display:flex;justify-content:space-between;margin-top:2rem">
      <button id="back-btn" class="btn btn-outline chamfer-sm" ${step === 1 ? 'disabled' : ''}>BACK</button>
      <button id="next-btn" class="btn btn-primary chamfer-sm" ${canProceed() ? '' : 'disabled'}>CONTINUE →</button>
    </div>`;
}

function wireNav() {
  const back = document.getElementById('back-btn');
  const next = document.getElementById('next-btn');
  if (back) back.addEventListener('click', () => { if (step > 1) { step--; renderSteps(); renderStep(); } });
  if (next) next.addEventListener('click', () => { if (canProceed()) { step++; renderSteps(); renderStep(); } });
}

async function submitQuote() {
  document.getElementById('submit-status').style.display = 'block';
  try {
    await api.createQuote({ ...form, status: 'Pending Review' });
    document.getElementById('quote-content').innerHTML = `
      <div class="card chamfer" style="border:1px solid var(--primary);padding:3rem;text-align:center;max-width:32rem;margin:0 auto">
        <div style="width:5rem;height:5rem;background:rgba(255,31,31,0.1);border:2px solid var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 class="font-display" style="font-size:1.875rem;margin-bottom:1rem">REQUEST AUTHENTICATED</h2>
        <p class="text-muted" style="margin-bottom:0.5rem">Your quote request has been transmitted to our procurement team.</p>
        <p class="text-muted" style="font-size:0.875rem;margin-bottom:2rem">A specialist will contact you within 24-48 hours.</p>
        <a href="index.html" class="btn btn-primary chamfer-sm">RETURN TO BASE</a>
      </div>`;
  } catch (err) {
    document.getElementById('submit-status').textContent = err.message;
  }
}
