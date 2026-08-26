import { addToCart as addToCartBackend } from './cart.js';

let products = [
    {
      id: 'ciphercore',
      name: 'CY-Lock "CipherCore" Encryption Module',
      category: 'Cybersecurity Software',
      sector: 'ENTERPRISE',
      image: '/frontend/assets/CipherCore.jpeg',
      description:
        'CY-LOCK CipherCore provides military-grade encryption for data at rest and in transit. With quantum-resistant algorithms and a centralized key management system, CipherCore ensures your data remains secure against both current and future threats.',
      price: 899,
      stockStatus: 'IN STOCK',
      keySpecs: [
        'AES-256 Encryption',
        'Quantum-Resistant',
        'Key Management System',
        'SOC 2 Certified'
      ],
      dossier: {
        Encryption: 'AES-256, ChaCha20, Post-Quantum',
        'Key Management': 'Centralized HSM-integrated',
        Algorithms: 'Quantum-resistant (CRYSTALS-Kyber)',
        Deployment: 'On-premise or cloud',
        Compliance: 'FIPS 140-3, SOC 2 Type II',
        Platforms: 'Windows, Linux, API',
        Licensing: 'Per-seat annual'
      }
    },
    {
      id: 'recon-headset',
      name: 'TAC-Link "Recon" Encrypted Comms Headset',
      category: 'Accessories & Peripherals',
      sector: 'GOVERNMENT',
      image: '/frontend/assets/Recon-Headset.png',
      description:
        'The TAC-Link Recon is a tactical communications headset featuring active noise cancellation, bone conduction technology, and secure encrypted audio. Built for field operations where clear communication is mission-critical.',
      price: 599,
      stockStatus: 'IN STOCK',
      keySpecs: [
        'Active Noise Cancellation',
        'Bone Conduction Mic',
        'Encrypted Audio',
        'MIL-STD-810H'
      ],
      dossier: {
        Type: 'Over-ear tactical headset',
        ANC: 'Active noise cancellation -40dB',
        Microphone: 'Bone conduction + boom',
        Connectivity: 'Bluetooth 5.2, USB-C',
        Battery: '40 hours',
        Encryption: 'AES-256 secure audio',
        Certification: 'MIL-STD-810H',
        Weight: '14 oz'
      }
    },
    {
      id: 'raptor-laptop',
      name: 'Mk-7 "Raptor" Tactical Laptop',
      category: 'Computers & Workstations',
      sector: 'GOVERNMENT',
      image: '/frontend/assets/Raptor-Tactical-Laptop.png',
      description:
        "The MK-7 Raptor is Milisaka's flagship tactical laptop, engineered for military and field operations. Built to MIL-STD-810H standards with an IP65-rated chassis, the Raptor delivers desktop-class performance in a portable form factor that survives drops, dust, water, and extreme temperatures.",
      price: 5247.99,
      stockStatus: 'IN STOCK',
      keySpecs: [
        'MIL-STD-810H Certified',
        'Intel Core i9-13900K',
        '32GB DDR5 RAM',
        'IP65 Dust/Water Resistant'
      ],
      dossier: {
        Processor: 'Intel Core i9-13900K (24 cores)',
        Memory: '32GB DDR5 5200MHz',
        Storage: '2TB NVMe SSD (OPAL 2.0)',
        Display: '14" FHD 1920x1080, 1000-nit',
        Graphics: 'NVIDIA RTX A2000',
        Battery: 'Hot-swappable, 12hr runtime',
        I_O: 'Thunderbolt 4, USB-C, HDMI 2.1',
        Certification: 'MIL-STD-810H, IP65',
        'Operating Temp': '-40C to 70C',
        Encryption: 'TPM 2.0, FIPS 140-3'
      }
    },
    {
      id: 'titan-edge',
      name: 'SR-880 "Titan" Edge Server',
      category: 'Servers',
      sector: 'ENTERPRISE',
      image: '/frontend/assets/Titan-Edge-Server.png',
      description:
        'The SR-880 Titan is a ruggedized 2U edge server designed for tactical deployments, remote operations, and harsh environments. With extended operating temperatures and ruggedized construction, the Titan brings data center performance to the edge.',
      price: 12500,
      stockStatus: 'IN STOCK',
      keySpecs: [
        '2U Rack-Mount Form Factor',
        'Dual Intel Xeon Gold',
        '1TB ECC RAM',
        'Ruggedized for -40C to 70C'
      ],
      dossier: {
        'Form Factor': '2U Rack-Mount',
        Processor: 'Dual Intel Xeon Gold 6448Y',
        Memory: '1TB ECC DDR5',
        Storage: '24TB NVMe SSD Array',
        Networking: '10GbE, 25GbE',
        'Operating Temp': '-40C to 70C',
        Certification: 'MIL-STD-810H',
        Power: 'Redundant 800W'
      }
    },
    {
      id: 'nightwatch-keyboard',
      name: 'AX-1 "NightWatch" Tactical Keyboard',
      category: 'Accessories & Peripherals',
      sector: 'GOVERNMENT',
      image: '/frontend/assets/NightWatch-Tactical-Keyboard.jpg',
      description:
        'The AX-1 NightWatch is a ruggedized mechanical keyboard designed for tactical operations and field use. With backlit keys, dust and water resistance, and both USB-C and wireless connectivity, the Wraith is ready for any environment.',
      price: 349,
      stockStatus: 'IN STOCK',
      keySpecs: [
        'MIL-STD-810H',
        'Backlit Keys',
        'Dust & Water Resistant',
        'USB-C & Wireless'
      ],
      dossier: {
        Type: 'Mechanical (Cherry MX Red)',
        Layout: '87-key TKL',
        Backlight: 'Red LED, adjustable',
        Connectivity: 'USB-C, Bluetooth, 2.4GHz',
        Battery: '720 hours (wireless)',
        Certification: 'MIL-STD-810H, IP54',
        Weight: '2.1 lbs'
      }
    },
    {
      id: 'sentinel-tablet',
      name: 'Mk-9 "Sentinel" Rugged Tablet',
      category: 'Computers & Workstations',
      sector: 'GOVERNMENT',
      image: '/frontend/assets/Sentinel-Rugged-Tablet.png',
      description:
        'The MK-9 Sentinel is a ruggedized tablet built for field data collection, situational awareness, and tactical operations. With a 1000-nit display readable in direct sunlight and hot-swappable batteries, the Sentinel keeps you operational in any environment.',
      price: 4669.99,
      stockStatus: 'IN STOCK',
      keySpecs: [
        '10.1" 1000-nit Display',
        'MIL-STD-810H',
        'Intel Core i7',
        'Hot-Swappable Battery'
      ],
      dossier: {
        Processor: 'Intel Core i7-1365U',
        Memory: '16GB LPDDR5',
        Storage: '1TB NVMe SSD',
        Display: '10.1" FHD 1920x1200, 1000-nit',
        Battery: 'Hot-swappable dual-battery',
        Certification: 'MIL-STD-810H, IP65',
        'Operating Temp': '-20C to 60C',
        Connectivity: 'Wi-Fi 6E, 5G, GPS'
      }
    },
    {
      id: 'fortress-dc',
      name: 'SR-8800 "Fortress" Data Center Server',
      category: 'Servers',
      sector: 'ENTERPRISE',
      image: '/frontend/assets/Fortress-Data-Center.jpg',
      description:
        "The SR-8800 Fortress is Milisaka's flagship data center server, built for mission-critical enterprise infrastructure. With quad-processor performance and massive memory capacity, the Fortress handles the most demanding virtualization and database workloads.",
      price: 28900,
      stockStatus: 'MADE TO ORDER',
      keySpecs: [
        '4U Server Chassis',
        'Quad Xeon Platinum',
        '4TB ECC RAM',
        'NVMe SSD Array'
      ],
      dossier: {
        'Form Factor': '4U Rack-Mount',
        Processor: 'Quad Intel Xeon Platinum 8480+',
        Memory: '4TB ECC DDR5',
        Storage: '96TB NVMe SSD Array',
        Networking: '100GbE, 25GbE',
        Power: 'Redundant 2000W',
        Cooling: 'Liquid-Ready',
        Certification: 'SOC 2 Type II'
      }
    },
    {
      id: 'aegis-endpoint',
      name: 'CY-SHIELD "Aegis" Endpoint Security',
      category: 'Cybersecurity Software',
      sector: null,
      image: '/frontend/assets/Aegis-Endpoint-Security.jpg',
      description:
        "CY-SHIELD Aegis is Milisaka's flagship endpoint security platform, combining AI-powered threat detection with automated response capabilities. Aegis protects every device in your network from advanced persistent threats, malware, and zero-day exploits.",
      price: 199,
      stockStatus: 'IN STOCK',
      keySpecs: [
        'AI-Powered Threat Detection',
        'Zero-Day Protection',
        'Centralized Management',
        'FIPS 140-3 Compliant'
      ],
      dossier: {
        Type: 'Endpoint Detection & Response (EDR)',
        Deployment: 'Cloud-managed agent',
        'Threat Detection': 'AI/ML behavioral analysis',
        Response: 'Automated isolation & remediation',
        Compliance: 'FIPS 140-3, SOC 2',
        Platforms: 'Windows, Linux, macOS',
        Licensing: 'Per-seat annual',
        Management: 'Centralized cloud console'
      }
    },
    {
      id: 'guardian-firewall',
      name: 'CY-WALL "Guardian" Network Firewall',
      category: 'Cybersecurity Software',
      sector: 'ENTERPRISE',
      image: '/frontend/assets/Guardian-Firewall.jpeg',
      description:
        'CY-WALL Guardian is a next-generation firewall appliance delivering enterprise-grade network security with deep packet inspection, intrusion prevention, and VPN tunnel support. Guardian protects your network perimeter with military-grade filtering.',
      price: 5400,
      stockStatus: 'IN STOCK',
      keySpecs: [
        '10Gbps Throughput',
        'Deep Packet Inspection',
        'Intrusion Prevention',
        'VPN Tunnel Support'
      ],
      dossier: {
        Throughput: '10Gbps firewall, 5Gbps IPS',
        Features: 'Deep Packet Inspection, IPS, VPN',
        VPN: 'IPsec, SSL, Site-to-Site',
        Connections: '500,000 concurrent',
        Deployment: 'Hardware appliance',
        Management: 'Web UI, CLI, API',
        Compliance: 'FIPS 140-3, Common Criteria'
      }
    },
    {
      id: 'sentry-server',
      name: 'SR-2200 "Sentry" Portable Tactical Server',
      category: 'Servers',
      sector: 'GOVERNMENT',
      image: '/frontend/assets/Sentry-Tactical-Server.png',
      description:
        'The SR-2200 Sentry portable server is a highly efficient system that effortlessly integrates into your tactical framework, delivering exceptional performance and unwavering reliability, no matter where your mission leads you.',
      price: 5587,
      stockStatus: 'MADE TO ORDER',
      keySpecs: [
        'Up to 506TB of SSD Storage',
        'Redundant 1+1 Global AC Power Supply',
        'Removable, washable, and reusable particulate filter'
      ],
      dossier: {
        Cores: 'Up to 288 Cores Intel® Xeon®',
        Memory: 'Up to 4TB of Memory',
        'Expansion Slots': '5 Expansion Slots',
        'Power Supply': 'Redundant Power Supply',
        Processor: 'Dual Processor'
      }
    },
    {
      id: 'phantom-workstation',
      name: 'Mk-3 "Phantom" Command Workstation',
      category: 'Computers & Workstations',
      sector: 'ENTERPRISE',
      image: '/frontend/assets/Phantom-Command-Workstation.png',
      description:
        'The MK-3 Phantom is a mission-ready workstation designed for command centers, secure facilities, and high-performance computing tasks. Featuring a tamper-resistant chassis and enterprise-grade components, the Bulwark handles the most demanding computational workloads.',
      price: 6699.99,
      stockStatus: 'IN STOCK',
      keySpecs: [
        'AMD Threadripper PRO 5995WX',
        '128GB ECC RAM',
        'NVIDIA RTX A6000',
        'Rugged, Tamper-Resistant Chassis'
      ],
      dossier: {
        Processor: 'AMD Threadripper PRO 5995WX (64 cores)',
        Memory: '128GB ECC DDR5',
        Storage: '4TB NVMe RAID Array',
        Graphics: 'NVIDIA RTX A6000 48GB',
        Chassis: 'Ruggedized, Tamper-Resistant, Tool-Less',
        Power: '1600W 80+ Platinum',
        Certification: 'MIL-STD-810H',
        Encryption: 'TPM 2.0, Secure Boot'
      }
    },
    {
      id: 'shadowvault-drive',
      name: 'TAC-Link "ShadowVault" 8TB Portable Secure Drive',
      category: 'Accessories & Peripherals',
      sector: null,
      image: '/frontend/assets/ShadowVault-Drive.png',
      description:
        'The TAC-Link ShadowVault provides fast data transfer, robust protection, and a massive storage capacity of 8 TB. Exclusive ventilation holes permit an incredible cooling effect and makes it suitable for high-temperature environments.',
      price: 249,
      stockStatus: 'LIMITED STOCK',
      keySpecs: [
        '8TB Storage',
        'USB Interface',
        'Data Transfers up to 5Gb/s',
        'Portable & Lightweight'
      ],
      dossier: {
        'Storage Capacity': '8TB',
        Material: 'Brushed Aluminum case',
        'Transfer Speed': 'Up to 5Gb/s',
        Compatibility: 'Windows, Linux',
        'Connection Type': 'USB'
      }
    },
    {
      id: 'quantum-surge',
      name: 'AX-1 "Quantum Surge" Portable Power Station',
      category: 'Accessories & Peripherals',
      sector: null,
      image: '/frontend/assets/Quantum-Surge.png',
      description:
        "The AX-1 Quantum Surge is Milisaka's premier power station. Built in compliance with numerous military standards, it can handle extremes far beyond other power stations in its class.",
      price: 8061,
      stockStatus: 'IN STOCK',
      keySpecs: [
        '5.1kWh Capacity',
        '100W USB-C Output',
        'MIL-STD-810H',
        'MPPT solar charging'
      ],
      dossier: {
        Dimensions: '65cm x 50.8cm x 30cm (25.6in x 20in x 11.8in)',
        'Energy Capacity': '5.1kWh',
        Cycles: '3,500+',
        Output:
          'USB-C 100W, USB-A x4, AC 120V x4, Wireless charging, AC, DC, and Solar input',
        Certification: 'MIL-STD-810H, IP65',
        Weight: '63.5 kg (140 lbs)',
        'Operating Temp': '-20C to 60C',
        Display: 'OLED capacity indicator'
      }
    }
  ];


  let currentCategory = 'ALL';
  let currentSort = 'default';
  let currentModalProduct = null;
  
  function formatPrice(value) {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  }
  
  function truncateDescription(text, maxChars = 140) {
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars).trim() + '…';
  }
  
  function renderSectorBadge(sector) {
    if (!sector) return '';
    return `<span class="sector-badge sector-${sector.toLowerCase()}">${sector}</span>`;
  }
  
  function renderStockLabel(stockStatus) {
    return `<span class="stock-label stock-${stockStatus.replace(/\s+/g, '-').toLowerCase()}">${stockStatus}</span>`;
  }
  
  function renderKeySpecs(specs) {
    return specs
      .map(spec => `<li class="product-spec-item">${spec}</li>`)
      .join('');
  }
  
  function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
  
    card.innerHTML = `
      <div class="product-card-header">
        ${renderSectorBadge(product.sector)}
      </div>
  
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image" />
      </div>
  
      <div class="product-meta">
        <div class="product-category-stock">
          <span class="product-category">${product.category}</span>
          ${renderStockLabel(product.stockStatus)}
        </div>
  
        <h3 class="product-name">${product.name}</h3>
  
        <p class="product-description">
          ${truncateDescription(product.description)}
        </p>
  
        <ul class="product-specs">
          ${renderKeySpecs(product.keySpecs)}
        </ul>
      </div>
  
      <div class="product-card-footer">
        <span class="product-price">${formatPrice(product.price)}</span>
  
        <div class="product-actions">
          <button class="btn btn-cart product-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
  
          <button class="btn-icon view-product-btn">
            View Product
          </button>
        </div>
      </div>
    `;
  
    // Attach handlers
    const addToCartBtn = card.querySelector('.product-add-to-cart');
    const viewProductBtn = card.querySelector('.view-product-btn');

    addToCartBtn.addEventListener('click', () => addToCart(product));
    viewProductBtn.addEventListener('click', () => openProductModal(product));

  
    return card;
  }
  
  function addToCart(product) {
    // Call backend cart system
    addToCartBackend(product);
  }
  
  
  function applyFiltersAndSort() {
    let filtered = products.slice();
  
    if (currentCategory !== 'ALL') {
      filtered = filtered.filter(p => p.category === currentCategory);
    }
  
    switch (currentSort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'sector':
        filtered.sort((a, b) => (a.sector || '').localeCompare(b.sector || ''));
        break;
      default:
        break;
    }
  
    renderProducts(filtered);
  }
  
  function renderProducts(list, gridEl) {
    gridEl.innerHTML = '';
    list.forEach(product => {
      const card = createProductCard(product);
      gridEl.appendChild(card);
    });
  }
  
  function renderDossierSections(dossier) {
    modalDossierEl.innerHTML = '';
    Object.entries(dossier).forEach(([title, value]) => {
      const section = document.createElement('div');
      section.className = 'dossier-section';
      section.innerHTML = `
        <h4 class="dossier-title">${title}</h4>
        <p class="dossier-value">${value}</p>
      `;
      modalDossierEl.appendChild(section);
    });
  }
  
  function renderModalSpecs(specs) {
    modalSpecsEl.innerHTML = '';
    const ul = document.createElement('ul');
    ul.className = 'modal-specs-list';
    specs.forEach(spec => {
      const li = document.createElement('li');
      li.textContent = spec;
      ul.appendChild(li);
    });
    modalSpecsEl.appendChild(ul);
  }
  
  function openProductModal(product) {
    currentModalProduct = product;
  
    modalNameEl.textContent = product.name;
    modalSectorBadgeEl.textContent = product.sector || '';
    modalSectorBadgeEl.className = 'sector-badge';
    if (product.sector) {
      modalSectorBadgeEl.classList.add(`sector-${product.sector.toLowerCase()}`);
    }
  
    modalCategoryStockEl.textContent = `${product.category} • ${product.stockStatus}`;
    modalDescriptionEl.textContent = product.description;
  
    modalImageEl.src = product.image;
    modalImageEl.alt = product.name;
  
    renderDossierSections(product.dossier);
    renderModalSpecs(product.keySpecs);
  
    modalPriceEl.textContent = formatPrice(product.price);
  
    modalBackdrop.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
  
  
  function closeProductModal() {
    currentModalProduct = null;
    modalBackdrop.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
  
  function initCategoryFilters() {
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        applyFiltersAndSort();
      });
    });
  }
  
  function initSortSelect() {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      applyFiltersAndSort();
    });
  }
  
  function initModalHandlers() {
    modalCloseBtn.addEventListener('click', closeProductModal);
    modalBackdrop.addEventListener('click', e => {
      if (e.target === modalBackdrop) {
        closeProductModal();
      }
    });
  }
  
  function initProductsPage() {

  const gridEl = document.getElementById('products-grid');
  const categoryButtons = document.querySelectorAll('.category-filter');
  const sortSelect = document.getElementById('sort-select');
  const params = new URLSearchParams(window.location.search);
  const sectorParam = params.get("sector");
  const categoryParam = params.get("category");
  const modalBackdrop = document.getElementById('product-modal-backdrop');
  const modalEl = document.getElementById('product-modal');
  const modalCloseBtn = document.getElementById('product-modal-close');
  const modalNameEl = document.getElementById('modal-name');
  const modalSectorBadgeEl = document.getElementById('modal-sector-badge');
  const modalCategoryStockEl = document.getElementById('modal-category-stock');
  const modalDescriptionEl = document.getElementById('modal-description');
  const modalDossierEl = document.getElementById('modal-dossier');
  const modalSpecsEl = document.getElementById('modal-specs');
  const modalImageEl = document.getElementById('modal-image');
  const modalPriceEl = document.getElementById('modal-price');
  const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
  
  if (!gridEl) return;

  // Apply sector/category filters FIRST
  if (sectorParam || categoryParam) {
    products = products.filter(product => {
      const sector = product.sector ?? null;
      const category = product.category ?? null;

      if (sectorParam === "GOVERNMENT") {
        return sector === "GOVERNMENT";
      }

      if (sectorParam === "ENTERPRISE") {
        return sector === "ENTERPRISE";
      }

      if (sectorParam === "GOV_OR_NULL") {
        return sector === "GOVERNMENT" || sector === null;
      }

      if (categoryParam === "INFRA") {
        return category === "Servers" || category === "Cybersecurity Software";
      }

      return true;
    });

  
    renderProducts(products, gridEl);
  } else {
  
    applyFiltersAndSort();
  }

  initCategoryFilters();
  initSortSelect();
  initModalHandlers();
}

  
  window.addEventListener('DOMContentLoaded', initProductsPage);
  