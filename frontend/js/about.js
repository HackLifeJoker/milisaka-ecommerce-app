const spyLinks = document.querySelectorAll(".scroll-menu a");
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.scroll-menu a[href="#${id}"]`);

      // Scroll Spy Highlight
      if (entry.isIntersecting && link) {
        spyLinks.forEach(a => a.classList.remove("active"));
        link.classList.add("active");
      }

      // Fade-In Animation
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach(section => observer.observe(section));
