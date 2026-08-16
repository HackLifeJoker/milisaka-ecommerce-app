// Inject navbar + footer using RELATIVE paths
export async function injectLayout() {
    try {
      const navbar = await fetch('./navbar.html').then(r => r.text());
      const footer = await fetch('./footer.html').then(r => r.text());
  
      // Insert navbar at top of body
      document.body.insertAdjacentHTML('afterbegin', navbar);
  
      // Insert footer at bottom of body
      document.body.insertAdjacentHTML('beforeend', footer);
  
      // Load navbar JS AFTER navbar is injected
      import('./navbar.js');
    } catch (err) {
      console.error('Layout injection failed:', err);
    }
  }
  
  // Initialize layout
  document.addEventListener('DOMContentLoaded', () => {
    injectLayout();
  });
  