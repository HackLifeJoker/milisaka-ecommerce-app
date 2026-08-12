// Solutions page logic.
document.addEventListener('DOMContentLoaded', () => {
  const sectors = [
    {
      sector: 'MILITARY & DEFENSE',
      title: 'Tactical Operations',
      description: 'Mission-ready hardware engineered for field deployment, tactical operations, and defense procurement contracts.',
      image_url: 'https://media.base44.com/images/public/6a5a7ba5b70e888ca3c0ccdd/4a5f2d5ca_generated_image.png',
      features: ['MIL-STD-810H ruggedized hardware', 'ITAR-compliant procurement process', 'Tactical field support & deployment', 'Government contract fulfillment'],
      ctaText: 'REQUEST DEFENSE QUOTE',
      ctaLink: 'quote.html',
    },
    {
      sector: 'CORPORATE ENTERPRISE',
      title: 'Enterprise Infrastructure',
      description: 'Performance-focused servers, workstations, and cybersecurity solutions for industrial and corporate applications.',
      image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      features: ['SOC 2 Type II certified systems', 'Scalable server infrastructure', 'Enterprise-grade network security', '24/7 priority support SLAs'],
      ctaText: 'REQUEST ENTERPRISE QUOTE',
      ctaLink: 'quote.html',
    },
    {
      sector: 'INDIVIDUAL & PRIVATE',
      title: 'Personal Security',
      description: 'Enterprise-grade cybersecurity solutions and ruggedized hardware available for individuals and private organizations.',
      image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      features: ['Direct purchase availability', 'Enterprise-grade endpoint security', 'Ruggedized personal hardware', 'No contract minimums'],
      ctaText: 'BROWSE PRODUCTS',
      ctaLink: 'products.html',
    },
  ];

  document.getElementById('sectors-grid').innerHTML = sectors
    .map(
      (s) => `
      <article class="card chamfer card-hover" style="overflow:hidden">
        <div style="position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--background)">
          <img src="${s.image_url}" alt="${s.sector}" style="width:100%;height:100%;object-fit:cover" />
          <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(10,10,10,0.9), transparent)"></div>
          <span style="position:absolute;top:1rem;left:1rem;padding:0.25rem 0.75rem;background:rgba(10,10,10,0.8);backdrop-filter:blur(4px);border:1px solid var(--border);font-family:var(--font-mono);font-size:0.625rem;letter-spacing:0.1em;color:var(--primary)">${s.sector}</span>
        </div>
        <div style="padding:1.5rem">
          <h3 class="font-heading" style="font-weight:700;font-size:1.5rem;margin-bottom:0.75rem">${s.title}</h3>
          <p class="text-muted" style="font-size:0.875rem;line-height:1.6;margin-bottom:1.25rem">${s.description}</p>
          <ul class="product-specs" style="border:none;padding:0;margin-bottom:1.5rem">
            ${s.features.map((f) => `<li>${f}</li>`).join('')}
          </ul>
          <a href="${s.ctaLink}" class="font-heading text-primary tracking-wider" style="font-weight:600;font-size:0.875rem">${s.ctaText} →</a>
        </div>
      </article>`
    )
    .join('');
});