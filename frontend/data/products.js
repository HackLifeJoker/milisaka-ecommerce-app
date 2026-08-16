// =========================
// PRODUCT CATEGORIES
// =========================

const CATEGORIES = [
    { label: 'ALL', value: '' },
    { label: 'COMPUTERS & WORKSTATIONS', value: 'Computers & Workstations' },
    { label: 'SERVERS', value: 'Servers' },
    { label: 'CYBERSECURITY SOFTWARE', value: 'Cybersecurity Software' },
    { label: 'ACCESSORIES & PERIPHERALS', value: 'Accessories & Peripherals' }
];


// =========================
// PRODUCT CATALOG
// =========================

const PRODUCTS = [
    {
        id: 1,
        name: 'MK-9 "Sentinel" Rugged Tablet',
        category: 'Computers & Workstations',
        price: 4899,
        short_description: 'MIL-STD-810H ruggedized tactical tablet with daylight-readable 10.1" display.',
        description: 'The MK-9 Sentinel is a mission-ready ruggedized tablet built for field deployment. Its magnesium-alloy chassis survives drops, immersion, and extreme temperatures while delivering full desktop-class performance.',
        key_specs: [
            'Intel Core i7-1370P vPRO',
            '32GB DDR5 RAM',
            '1TB NVMe SSD',
            'MIL-STD-810H certified'
        ],
        image_url: 'frontend/assets/Sentinel-Rugged-Tablet.png',
        stock_status: 'In Stock',
        featured: true,
        classification: 'Government'
    },

    {
        id: 2,
        name: 'MK-7 "Raptor" Tactical Laptop',
        category: 'Computers & Workstations',
        price: 6499,
        short_description: 'Tactical-grade laptop with semi-rugged chassis and extended battery life.',
        description: 'The MK-7 Raptor pairs battlefield durability with workstation-class compute. Ideal for forward-deployed analysts and field engineers.',
        key_specs: [
            'Intel Core i9-13900H',
            '64GB DDR5 RAM',
            '2TB NVMe SSD',
            '14" 1200-nit display'
        ],
        image_url: 'frontend/assets/Raptor-Tactical-Laptop.png',
        stock_status: 'In Stock',
        featured: true,
        classification: 'Government'
    },

    {
        id: 3,
        name: 'MK-12 "Bastion" Command Workstation',
        category: 'Computers & Workstations',
        price: 12999,
        short_description: 'Fixed-installation command workstation for operations centers and C2 suites.',
        description: 'The Bastion is engineered for 24/7 command-center operations, with redundant power and hot-swappable drives.',
        key_specs: [
            'AMD Threadripper PRO',
            '128GB ECC RAM',
            '4TB NVMe RAID',
            'Dual 10GbE'
        ],
        image_url: 'frontend/assets/Bastion-Command-Workstation.png',
        stock_status: 'Made to Order',
        featured: true,
        classification: 'Enterprise'
    },

    {
        id: 4,
        name: 'SR-440 "Vanguard" Rack Server',
        category: 'Servers',
        price: 18999,
        short_description: '2U rack server optimized for defense-grade compute and virtualization.',
        description: 'The Vanguard delivers high-density compute for classified and enterprise datacenters.',
        key_specs: [
            '2x Intel Xeon Gold',
            '256GB ECC RAM',
            '8TB NVMe',
            'Redundant PSU'
        ],
        image_url: 'frontend/assets/SR-440-Vanguard-Rack-Server.jpg',
        stock_status: 'In Stock',
        featured: true,
        classification: 'Enterprise'
    },

    {
        id: 5,
        name: 'SR-880 "Titan" Edge Server',
        category: 'Servers',
        price: 24999,
        short_description: 'Ruggedized edge server for tactical field datacenters and mobile deployments.',
        description: 'The Titan brings enterprise compute to the tactical edge, ruggedized for transport and field power.',
        key_specs: [
            '2x AMD EPYC',
            '512GB ECC RAM',
            '16TB NVMe',
            'MIL-STD-810H'
        ],
        image_url: 'frontend/assets/SR-880-Titan-Edge-Server.png',
        stock_status: 'Limited Stock',
        featured: false,
        classification: 'Government'
    },

    {
        id: 6,
        name: 'CY-SHIELD Endpoint Security Suite',
        category: 'Cybersecurity Software',
        price: 299,
        short_description: 'Enterprise endpoint protection with zero-trust enforcement and EDR.',
        description: 'CY-SHIELD combines next-gen antivirus, behavioral EDR, and zero-trust network enforcement in a single agent.',
        key_specs: [
            'Zero-trust enforcement',
            'Behavioral EDR',
            'Per-seat licensing',
            'Cloud-managed console'
        ],
        image_url: 'frontend/assets/CY-SHIELD-Endpoint-Security-Suite.jpg',
        stock_status: 'In Stock',
        featured: false,
        classification: 'Standard'
    },

    {
        id: 7,
        name: 'CY-FORGE Encryption Module',
        category: 'Cybersecurity Software',
        price: 1499,
        short_description: 'FIPS 140-3 validated encryption module for sensitive data at rest.',
        description: 'CY-FORGE provides hardware-backed, FIPS 140-3 validated encryption for classified storage.',
        key_specs: [
            'FIPS 140-3 validated',
            'Hardware-backed keys',
            'Tamper-evident',
            'AES-256'
        ],
        image_url: 'frontend/assets/CY-FORGE-Encryption-Module.jpeg',
        stock_status: 'In Stock',
        featured: false,
        classification: 'Government'
    },

    {
        id: 8,
        name: 'TAC-Link Encrypted Comm Headset',
        category: 'Accessories & Peripherals',
        price: 899,
        short_description: 'Encrypted tactical communications headset with active noise cancellation.',
        description: 'TAC-Link delivers secure, clear voice comms in high-noise tactical environments.',
        key_specs: [
            'AES-256 encrypted',
            'Active noise cancellation',
            '20hr battery',
            'MIL-STD-810H'
        ],
        image_url: 'frontend/assets/Milisaka-TAC-Link-Encrypted-Comm-Headset.png',
        stock_status: 'In Stock',
        featured: true,
        classification: 'Standard'
    },

    {
        id: 9,
        name: 'Field Power Module MK-3',
        category: 'Accessories & Peripherals',
        price: 1299,
        short_description: 'Universal ruggedized power supply for field-deployed Milisaka hardware.',
        description: 'The MK-3 power module accepts multiple input sources and conditions power for field electronics.',
        key_specs: [
            'Multi-input (AC/DC/solar)',
            '1500Wh capacity',
            'Ruggedized case',
            'MIL-STD-810H'
        ],
        image_url: 'frontend/assets/mk3-power-module.png',
        stock_status: 'In Stock',
        featured: false,
        classification: 'Standard'
    },

    {
        id: 10,
        name: 'Secure KVM Switch SK-4',
        category: 'Accessories & Peripherals',
        price: 749,
        short_description: 'TEMPEST-certified secure KVM for multi-domain workstation switching.',
        description: 'The SK-4 enables secure switching between classified and unclassified domains with hardware isolation.',
        key_specs: [
            'TEMPEST certified',
            'Hardware-isolated ports',
            '4-port',
            'NIPR/SIPR capable'
        ],
        image_url: 'frontend/assets/Secure-KVM-Switch-SK-4.jpg',
        stock_status: 'Limited Stock',
        featured: false,
        classification: 'Government'
    },

    {
        id: 11,
        name: 'NightWatch Tactical Keyboard',
        category: 'Accessories & Peripherals',
        price: 329,
        short_description: 'Backlit ruggedized keyboard with NVG-compatible red illumination.',
        description: 'NightWatch is engineered for low-light tactical ops with night-vision-compatible backlighting.',
        key_specs: [
            'NVG-compatible backlight',
            'Ruggedized membrane',
            'Washable',
            'MIL-STD-810H'
        ],
        image_url: 'frontend/assets/NightWatch-Tactical-Keyboard.jpg',
        stock_status: 'In Stock',
        featured: false,
        classification: 'Standard'
    },

    {
        id: 12,
        name: 'DataVault Portable Secure Drive 8TB',
        category: 'Accessories & Peripherals',
        price: 599,
        short_description: 'Hardware-encrypted portable SSD with biometric access control.',
        description: 'DataVault secures sensitive data in transit with hardware encryption and biometric access.',
        key_specs: [
            '8TB NVMe SSD',
            'AES-256 hardware encryption',
            'Fingerprint + PIN',
            'FIPS 140-2'
        ],
        image_url: 'frontend/assets/DataVault-Portable-Secure-Drive-8TB.png',
        stock_status: 'In Stock',
        featured: false,
        classification: 'Enterprise'
    }
];
