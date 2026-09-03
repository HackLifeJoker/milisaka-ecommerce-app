import { scrambleText } from '/frontend/js/utils.js';

/* ---------------------------------------------------------
   SCRAMBLE TEXT
--------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  scrambleText(
    document.getElementById('scramble-1'),
    'MILISAKA SYSTEMS ONLINE',
    2000,
    300
  );

  scrambleText(
    document.getElementById('scramble-2'),
    'HARDWARE FOR THE UNFORGIVING',
    2600,
    600
  );
});

/* ---------------------------------------------------------
   SCROLL FADE-IN ANIMATIONS
--------------------------------------------------------- */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  },
  { threshold: 0.2 }
);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
  });
});

/* ---------------------------------------------------------
   PARALLAX HERO MOVEMENT
--------------------------------------------------------- */

document.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  const offset = window.scrollY * 0.25;
  hero.style.backgroundPositionY = `calc(50% + ${offset}px)`;
});

/* ---------------------------------------------------------
   TACTICAL SCANLINE OVERLAY
--------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const scanline = document.createElement('div');
  scanline.className = 'scanline-overlay';
  document.body.appendChild(scanline);
});
