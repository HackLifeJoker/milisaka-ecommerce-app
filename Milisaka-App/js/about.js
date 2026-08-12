// About page logic.
document.addEventListener('DOMContentLoaded', () => {
  const leaders = [
    {
      name: 'David Martinez',
      role: 'CHIEF EXECUTIVE OFFICER',
      img: 'https://media.base44.com/images/public/6a5a7ba5b70e888ca3c0ccdd/fffc887f5_DavidMartinezCEO.jpg',
      bio: "As CEO, David Martinez drives Milisaka's strategic vision — forging partnerships with defense agencies and corporate enterprises to deliver mission-critical technology where it matters most.",
    },
    {
      name: 'Richard Grayson',
      role: 'CHIEF INFORMATION OFFICER',
      img: 'https://media.base44.com/images/public/6a5a7ba5b70e888ca3c0ccdd/307ccc017_GraysonCIO.jpg',
      bio: 'As CIO, Richard Grayson oversees Milisaka\'s technology infrastructure and cybersecurity architecture, ensuring every product meets the rigorous demands of defense and enterprise environments.',
    },
  ];
  document.getElementById('leadership-grid').innerHTML = leaders
    .map(
      (l) => `
      <div class="card chamfer" style="padding:2rem">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <img src="${l.img}" alt="${l.name}" style="width:5rem;height:5rem;object-fit:cover;border:1px solid rgba(255,31,31,0.3)" />
          <div>
            <h3 class="font-heading" style="font-weight:700;font-size:1.5rem">${l.name}</h3>
            <p class="font-mono text-primary tracking-widest" style="font-size:0.75rem">${l.role}</p>
          </div>
        </div>
        <p class="text-muted" style="line-height:1.7">${l.bio}</p>
      </div>`
    )
    .join('');

  const values = [
    { title: 'Resilient Precision', desc: 'Every product is engineered to perform under the most unforgiving conditions. No compromises.', icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
    { title: 'Mission First', desc: 'Our hardware serves the mission. We build for outcomes, not just specifications.', icon: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>' },
    { title: 'Zero-Doubt Security', desc: 'From encryption to physical ruggedization, security is not a feature — it is the foundation.', icon: '<circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/>' },
  ];
  document.getElementById('values-grid').innerHTML = values
    .map(
      (v) => `
      <div class="card chamfer" style="padding:2rem">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom:1rem">${v.icon}</svg>
        <h3 class="font-heading" style="font-weight:700;font-size:1.25rem;margin-bottom:0.75rem">${v.title}</h3>
        <p class="text-muted" style="line-height:1.6">${v.desc}</p>
      </div>`
    )
    .join('');
});