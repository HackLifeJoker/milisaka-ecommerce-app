/* global scrambleText, productCardHTML, wireAddToCartButtons, api */

// Home page logic.
document.addEventListener('DOMContentLoaded', async () => {
  // Scramble hero text
  scrambleText(document.getElementById('scramble-1'), '// MILISAKA SYSTEMS ONLINE', 1500);
  scrambleText(document.getElementById('scramble-2'), 'HARDWARE FOR THE UNFORGIVING', 2000, 500);

  // Stats
  const stats = [
    { value: '100%', label: 'MISSION CRITICAL' },
    { value: 'MIL-STD-810H', label: 'CERTIFIED' },
    { value: '24/7', label: 'TACTICAL SUPPORT' },
    { value: 'FIPS 140-3', label: 'ENCRYPTION' },
  ];
  document.getElementById('stats-grid').innerHTML = stats
    .map(
      (s) => `
      <div class="card chamfer" style="padding:1.5rem">
        <div class="font-display text-primary" style="font-size:1.75rem;margin-bottom:0.5rem">${s.value}</div>
        <div class="font-mono text-muted tracking-widest" style="font-size:0.75rem">${s.label}</div>
      </div>`
    )
    .join('');

  // Sectors
  const sectors = [
    { title: 'Military & Defense', desc: 'Mission-ready hardware engineered for tactical operations and field deployment.', icon: 'crosshair' },
    { title: 'Corporate Enterprise', desc: 'Performance-focused infrastructure and security for industrial applications.', icon: 'server' },
    { title: 'Individual & Private', desc: 'Enterprise-grade cybersecurity and hardware for private organizations.', icon: 'shield' },
  ];
  const iconSVG = {
    crosshair: '<circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/>',
    server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  };
  document.getElementById('sectors-grid').innerHTML = sectors
    .map(
      (s) => `
      <a href="solutions.html" class="card chamfer card-hover" style="padding:2rem;display:block">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="margin-bottom:1rem">${iconSVG[s.icon]}</svg>
        <h3 class="font-heading" style="font-weight:700;font-size:1.25rem;margin-bottom:0.75rem">${s.title}</h3>
        <p class="text-muted" style="font-size:0.875rem;line-height:1.6;margin-bottom:1rem">${s.desc}</p>
        <span class="font-heading text-primary tracking-wider" style="font-weight:600;font-size:0.875rem">LEARN MORE →</span>
      </a>`
    )
    .join('');

  // Featured products
  const grid = document.getElementById('featured-grid');
  try {
    const products = await api.getProducts({ featured: 'true' });
    if (products.length === 0) {
      grid.innerHTML = '<p class="text-muted font-mono text-center" style="grid-column:1/-1;padding:3rem">NO FEATURED PRODUCTS AVAILABLE</p>';
    } else {
      grid.innerHTML = products.map(productCardHTML).join('');
      wireAddToCartButtons(grid, products);
    }
  } catch {
    grid.innerHTML = '<p class="text-muted font-mono text-center" style="grid-column:1/-1;padding:3rem">UNABLE TO LOAD PRODUCTS — IS THE SERVER RUNNING?</p>';
  }
});

/* ---------------------------------------------------------
   NEW ADDITIONS BELOW THIS LINE
--------------------------------------------------------- */

// Scroll fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, { threshold: 0.2 });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
});

// Parallax hero movement
document.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-section");
  if (!hero) return;

  const offset = window.scrollY * 0.25;
  hero.style.backgroundPositionY = `calc(50% + ${offset}px)`;
});

// Tactical scanline overlay
document.addEventListener("DOMContentLoaded", () => {
  const scanline = document.createElement("div");
  scanline.className = "scanline-overlay";
  document.body.appendChild(scanline);
});
