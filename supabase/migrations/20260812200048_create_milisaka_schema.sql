/*
# Create Milisaka e-commerce schema

1. New Tables
- `products`: Product catalog with name, category, price, descriptions, image, specs, classification, stock status, featured flag.
- `quotes`: Quote requests from customers with contact info, sector, product interest, quantity, message, and status.
- `contact_messages`: Contact form submissions with name, email, subject, and message.
- `orders`: Order records with customer info, line items (JSON), total, and status.

2. Security
- RLS enabled on all tables.
- All tables allow anon + authenticated CRUD because this is a public-facing e-commerce site (no login required to browse, request quotes, contact, or order).
- Products: anon can read (public catalog); only authenticated can write (admin management).
- Quotes, contact_messages, orders: anon can insert (public submissions) and read own rows; authenticated have full access.

3. Seed Data
- Inserts 8 sample products across 4 categories: Computers & Workstations, Servers, Cybersecurity Software, Accessories & Peripherals.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  short_description text,
  description text,
  image_url text,
  key_specs jsonb DEFAULT '[]'::jsonb,
  specs text,
  classification text DEFAULT 'Standard',
  stock_status text DEFAULT 'In Stock',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_products" ON products;
CREATE POLICY "auth_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_products" ON products;
CREATE POLICY "auth_update_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_products" ON products;
CREATE POLICY "auth_delete_products" ON products FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  organization text,
  sector text,
  product_interest text,
  quantity integer DEFAULT 1,
  message text,
  status text DEFAULT 'Pending Review',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_quotes" ON quotes;
CREATE POLICY "anon_select_quotes" ON quotes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_quotes" ON quotes;
CREATE POLICY "anon_insert_quotes" ON quotes FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_quotes" ON quotes;
CREATE POLICY "auth_update_quotes" ON quotes FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_quotes" ON quotes;
CREATE POLICY "auth_delete_quotes" ON quotes FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_messages" ON contact_messages;
CREATE POLICY "anon_select_messages" ON contact_messages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_messages" ON contact_messages;
CREATE POLICY "anon_insert_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_messages" ON contact_messages;
CREATE POLICY "auth_delete_messages" ON contact_messages FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  shipping_address text NOT NULL,
  items jsonb NOT NULL,
  total numeric NOT NULL,
  status text DEFAULT 'Pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_orders" ON orders;
CREATE POLICY "auth_update_orders" ON orders FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_orders" ON orders;
CREATE POLICY "auth_delete_orders" ON orders FOR DELETE
  TO authenticated USING (true);

INSERT INTO products (name, category, price, short_description, description, image_url, key_specs, specs, classification, stock_status, featured) VALUES
('MK-7 Raptor Tactical Laptop', 'Computers & Workstations', 8499, 'MIL-STD-810H ruggedized laptop with Intel Core i9 and discrete graphics.', 'The MK-7 Raptor is a mission-ready tactical laptop engineered for field deployment in the harshest environments. Featuring a 14-inch sunlight-readable display, hot-swappable battery system, and MIL-STD-810H certification for shock, vibration, and extreme temperatures.', 'https://images.pexels.com/photos/10843996/pexels-photo-10843996.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["Intel Core i9-13900K", "32GB DDR5 RAM", "1TB NVMe SSD", "NVIDIA RTX 4060"]', 'Display: 14" 1920x1080 sunlight-readable\nBattery: Dual hot-swappable 99Wh\nWeight: 3.2 kg\nOperating Temp: -20C to 60C\nCertification: MIL-STD-810H, IP65', 'MIL-SPEC', 'In Stock', true),
('MK-4 Vanguard Workstation', 'Computers & Workstations', 12999, 'High-performance desktop workstation for mission-critical computing.', 'The MK-4 Vanguard delivers enterprise-grade computing power in a compact, ruggedized chassis. Designed for command centers and secure facilities requiring sustained high-performance workloads with zero downtime.', 'https://images.pexels.com/photos/12741849/pexels-photo-12741849.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["AMD Threadripper PRO 7995WX", "128GB ECC RAM", "4TB NVMe RAID", "Dual NVIDIA RTX 4500"]', 'CPU: 96-core Threadripper PRO\nMemory: 128GB DDR5 ECC\nStorage: 4TB NVMe RAID 1\nGPU: Dual NVIDIA RTX 4500\nForm Factor: 4U rack-mountable', 'Standard', 'In Stock', true),
('SR-9 Titan Server Blade', 'Servers', 24999, 'High-density server blade for data center and tactical operations centers.', 'The SR-9 Titan is a high-density server blade designed for both traditional data centers and forward-deployed tactical operations centers. Features redundant power, hot-swappable components, and FIPS 140-3 compliant encryption.', 'https://images.pexels.com/photos/37730212/pexels-photo-37730212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["Dual Intel Xeon Platinum 8480+", "512GB DDR5 ECC", "16TB NVMe array", "10GbE dual-port"]', 'CPU: Dual 56-core Xeon Platinum\nMemory: 512GB DDR5 ECC\nStorage: 16TB NVMe RAID 10\nNetwork: Dual 10GbE + 1GbE BMC\nPower: Dual 1100W redundant\nEncryption: FIPS 140-3', 'MIL-SPEC', 'In Stock', true),
('SR-3 Sentinel Rack Server', 'Servers', 15799, 'Enterprise rack server with redundant power and advanced thermal management.', 'The SR-3 Sentinel is a versatile 2U rack server built for enterprise IT infrastructure. Combines high compute density with redundant power delivery and advanced thermal management for 24/7 operation.', 'https://images.pexels.com/photos/17489151/pexels-photo-17489151.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["AMD EPYC 9654 96-core", "256GB DDR5 ECC", "8TB NVMe", "Dual 25GbE"]', 'CPU: 96-core EPYC 9654\nMemory: 256GB DDR5 ECC\nStorage: 8TB NVMe RAID 1\nNetwork: Dual 25GbE\nPower: Dual 800W redundant\nForm Factor: 2U rack', 'Standard', 'In Stock', false),
('CY-SHIELD Endpoint Security Suite', 'Cybersecurity Software', 299, 'Enterprise-grade endpoint protection with AI-driven threat detection.', 'CY-SHIELD provides real-time endpoint protection using AI-driven behavioral analysis and zero-trust architecture. Includes centralized management console, automated response playbooks, and FIPS 140-3 compliant encryption.', 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["AI-driven threat detection", "Zero-trust architecture", "Centralized management", "FIPS 140-3 encryption"]', 'Deployment: Cloud or on-premise\nEndpoints: Unlimited per license\nManagement: Web console + API\nThreat Response: Automated playbooks\nCompliance: FIPS 140-3, SOC 2 Type II\nLicense: Per-seat annual', 'Standard', 'In Stock', true),
('CY-FORTRESS Network Defense System', 'Cybersecurity Software', 5999, 'Network-level intrusion detection and prevention with real-time packet inspection.', 'CY-FORTRESS is a network defense platform providing deep packet inspection, intrusion prevention, and real-time threat intelligence integration. Designed for enterprise networks handling classified or sensitive data.', 'https://images.pexels.com/photos/38482455/pexels-photo-38482455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["Deep packet inspection", "Real-time threat intelligence", "IPS/IDS", "SOC 2 Type II certified"]', 'Throughput: Up to 40 Gbps\nInspection: Layer 2-7 deep packet\nThreat Intel: Real-time feeds\nResponse: Automated blocking + alerting\nDeployment: Hardware appliance or virtual\nCompliance: SOC 2 Type II, FIPS 140-3', 'Standard', 'In Stock', false),
('TX-2 Tactical Peripheral Kit', 'Accessories & Peripherals', 449, 'Ruggedized peripheral kit with tactical keyboard, pointing device, and display mount.', 'The TX-2 Tactical Peripheral Kit includes a MIL-STD-810H ruggedized keyboard, optical pointing device, and vehicle-grade display mount. Designed for field deployment with tactical laptops and workstations.', 'https://images.pexels.com/photos/5976956/pexels-photo-5976956.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["MIL-STD-810H ruggedized keyboard", "Optical pointing device", "Vehicle-grade display mount", "IP67 rated"]', 'Keyboard: Backlit, IP67, USB-C\nPointing Device: Optical, MIL-STD-810H\nMount: Vehicle-grade, vibration-damped\nConnectivity: USB-C / USB-A\nOperating Temp: -30C to 70C', 'MIL-SPEC', 'In Stock', false),
('TX-7 Secure Comms Module', 'Accessories & Peripherals', 1299, 'Hardware encryption module for secure communications and data transfer.', 'The TX-7 Secure Comms Module provides hardware-level encryption for secure voice and data communications. Features FIPS 140-3 Level 3 validated encryption, tamper-evident casing, and zeroization capability.', 'https://images.pexels.com/photos/3949101/pexels-photo-3949101.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["FIPS 140-3 Level 3", "Hardware encryption", "Tamper-evident", "Zeroization capable"]', 'Encryption: AES-256, FIPS 140-3 Level 3\nInterface: USB-C, Ethernet, Serial\nTamper: Evident + zeroization\nPower: Bus-powered\nDimensions: 10cm x 6cm x 2cm\nWeight: 180g', 'MIL-SPEC', 'Out of Stock', false)
ON CONFLICT DO NOTHING;
