-- =============================================================
-- Paaruni Website — Supabase Database Setup
-- =============================================================
-- Run this entire script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new
-- =============================================================

-- 1. CATEGORIES TABLE
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id          text PRIMARY KEY,
  name        text NOT NULL,
  tagline     text DEFAULT '',
  description text DEFAULT '',
  cover_image text DEFAULT '',
  featured    boolean DEFAULT true,
  sort_order  integer DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

-- 2. PRODUCTS TABLE
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id          text PRIMARY KEY,
  name        text NOT NULL,
  category_id text NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  pieces      integer DEFAULT 1,
  length      text DEFAULT 'long',
  price       integer NOT NULL,
  mrp         integer NOT NULL,
  sizes       jsonb DEFAULT '["M","L","XL","XXL"]'::jsonb,
  colors      jsonb DEFAULT '[]'::jsonb,
  fabric      text DEFAULT '',
  description text DEFAULT '',
  images      jsonb DEFAULT '[]'::jsonb,
  featured    boolean DEFAULT false,
  active      boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active   ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- 3. ROW LEVEL SECURITY (RLS)
-- -----------------------------------------------------------
-- Enable RLS on both tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products   ENABLE ROW LEVEL SECURITY;

-- Public read access for both tables (anon users can browse)
CREATE POLICY "Public read categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Public read products"
  ON products FOR SELECT
  USING (true);

-- Authenticated users (admins) can do everything
CREATE POLICY "Admin full access categories"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 4. STORAGE BUCKET
-- -----------------------------------------------------------
-- Create the product-images bucket (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: anyone can read, authenticated can upload/delete
CREATE POLICY "Public read product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update product images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- 5. SEED DATA — CATEGORIES
-- -----------------------------------------------------------
INSERT INTO categories (id, name, tagline, description, cover_image, featured, sort_order) VALUES
  ('long-kurti',  'Long Kurti',  'Graceful & Elegant Daily Wear',       'Flowing flared and straight long kurtis designed for effortless grace, day-long comfort, and festive radiance.',                              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop', true, 1),
  ('short-kurti', 'Short Kurti', 'Chic & Versatile Casuals',            'Modern short kurtis perfect for college, work, and casual outings. Pair effortlessly with jeans, trousers, or skirts.',                       'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop', true, 2),
  ('1-piece',     '1 Piece',     'Statement Ethnic Dresses',            'Stunning single-piece ethnic gowns and flared maxis combining traditional Indian motifs with contemporary fits.',                             'https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=1000&auto=format&fit=crop', true, 3),
  ('2-piece',     '2 Piece',     'Coordinated Kurti & Bottom Sets',     'Perfectly matched Kurti & Pant or Kurti & Skirt co-ord sets designed to elevate your everyday ethnic wardrobe.',                              'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop', true, 4),
  ('3-piece',     '3 Piece',     'Complete Festive Suit Sets',          'Grand 3-piece suit ensembles comprising Kurti, Pant, and Dupatta crafted for celebrations and special occasions.',                             'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1000&auto=format&fit=crop', true, 5)
ON CONFLICT (id) DO NOTHING;

-- 6. SEED DATA — PRODUCTS
-- -----------------------------------------------------------
INSERT INTO products (id, name, category_id, pieces, length, price, mrp, sizes, colors, fabric, description, images, featured, active) VALUES
  -- LONG KURTI
  ('lk-101', 'Gulmohar Maroon Anarkali Long Kurti',    'long-kurti', 1, 'long', 699, 1299,
   '["M","L","XL","XXL"]',
   '[{"name":"Royal Maroon","hex":"#7A1C30"},{"name":"Deep Navy","hex":"#1B2A47"}]',
   'Pure Cotton Slub',
   'A breathtaking flared long Kurti featuring gold foil block prints along the flare and intricate neckline zari embroidery. Breathable pure cotton for all-day comfort.',
   '["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop"]',
   true, true),

  ('lk-102', 'Mayuri Peacock Teal Straight Kurti',     'long-kurti', 1, 'long', 549, 999,
   '["M","L","XL","XXL"]',
   '[{"name":"Teal Green","hex":"#006666"},{"name":"Mustard Gold","hex":"#D4AF37"}]',
   'Premium Rayon',
   'Elegant calf-length straight kurti embellished with delicate mirror work on the neck yolk. Features side slits and quarter sleeves for classic silhouette.',
   '["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"]',
   false, true),

  ('lk-103', 'Chanderi Floral Printed Long Kurti',     'long-kurti', 1, 'long', 799, 1499,
   '["M","L","XL","XXL"]',
   '[{"name":"Blush Pink","hex":"#E8A598"},{"name":"Mint Sage","hex":"#8CA897"}]',
   'Chanderi Silk Blend',
   'Soft pastel Chanderi silk kurti adorned with hand-block botanical floral prints. Lined with ultra-soft cotton for lightweight elegance.',
   '["https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"]',
   true, true),

  ('lk-104', 'Kashmiri Embroidered Rayon Long Kurti',  'long-kurti', 1, 'long', 649, 1199,
   '["M","L","XL","XXL"]',
   '[{"name":"Rust Red","hex":"#9E382A"},{"name":"Black Gold","hex":"#262421"}]',
   'Heavy 14kg Rayon',
   'Richly embroidered Kashmiri Aari thread work across the chest and cuffs. Heavy fall fabric that flatters every body type smoothly.',
   '["https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"]',
   false, true),

  -- SHORT KURTI
  ('sk-201', 'Indigo Kalamkari Short Tunic Kurti',     'short-kurti', 1, 'short', 399, 799,
   '["M","L","XL","XXL"]',
   '[{"name":"Indigo Blue","hex":"#1A365D"},{"name":"Earthy Brown","hex":"#654321"}]',
   '100% Jaipuri Cotton',
   'Hip-length short kurti with authentic Kalamkari hand block print. Styled with mandarin collar and coconut shell buttons.',
   '["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"]',
   true, true),

  ('sk-202', 'Sunburst Yellow Peplum Short Kurti',     'short-kurti', 1, 'short', 449, 849,
   '["M","L","XL","XXL"]',
   '[{"name":"Mustard Yellow","hex":"#E5A93B"},{"name":"Coral Peach","hex":"#F28482"}]',
   'Mulmul Cotton',
   'Flirty peplum flared short kurti with subtle gotta patti highlights. Extremely light and breathable for daily summer styling.',
   '["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop"]',
   false, true),

  ('sk-203', 'Chikankari White Embroidered Short Top',  'short-kurti', 1, 'short', 499, 899,
   '["M","L","XL","XXL"]',
   '[{"name":"Pure White","hex":"#FFFFFF"},{"name":"Powder Blue","hex":"#B0E0E6"}]',
   'Cotton Georgette',
   'Classic Lucknawi Chikankari hand embroidery on soft cotton georgette. Comes with attached inner lining.',
   '["https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"]',
   true, true),

  ('sk-204', 'Bandhani Print Collar Short Kurti',       'short-kurti', 1, 'short', 429, 749,
   '["M","L","XL","XXL"]',
   '[{"name":"Crimson Red","hex":"#990000"},{"name":"Emerald Green","hex":"#004B23"}]',
   'Rayon Cotton',
   'Vibrant Gujarati Bandhani polka print short shirt-style kurti with cuffed sleeves and curved hemline.',
   '["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"]',
   false, true),

  -- 1 PIECE
  ('op-301', 'Royal Anarkali Ethnic One-Piece Maxi',    '1-piece', 1, 'long', 899, 1699,
   '["M","L","XL","XXL"]',
   '[{"name":"Wine Maroon","hex":"#58111A"},{"name":"Bottle Green","hex":"#093C29"}]',
   'Rayon Jacquard',
   'Full-length floor-touching ethnic flared dress with woven gold lurex jacquard stripes and dori tassel waist belt.',
   '["https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop"]',
   true, true),

  ('op-302', 'Tiered Block Print Ethnic Dress',          '1-piece', 1, 'long', 749, 1399,
   '["M","L","XL"]',
   '[{"name":"Terracotta Orange","hex":"#C85A32"},{"name":"Olive Sage","hex":"#708238"}]',
   '100% Breathable Cotton',
   'Boho-ethnic 3-tier maxi dress styled with subtle lace trims and comfortable elasticated puff sleeves.',
   '["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"]',
   false, true),

  ('op-303', 'A-Line Foil Print Indo-Western Dress',     '1-piece', 1, 'long', 799, 1499,
   '["M","L","XL","XXL"]',
   '[{"name":"Royal Blue","hex":"#002366"},{"name":"Plum Purple","hex":"#4A0E4E"}]',
   'Slub Silk Blend',
   'Contemporary fusion dress featuring gold foil bootis, V-neckline with fabric buttons and side pockets.',
   '["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop"]',
   true, true),

  -- 2 PIECE
  ('tp-401', 'Printed Straight Kurti with Pant Set',     '2-piece', 2, 'long', 849, 1599,
   '["M","L","XL","XXL"]',
   '[{"name":"Dusty Pink","hex":"#D8A7B1"},{"name":"Aqua Teal","hex":"#5C9EAD"}]',
   'Soft Cotton Rayon',
   'Comes with a straight printed kurti and matching comfortable cigarette pant with elastic waist and side pocket.',
   '["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"]',
   true, true),

  ('tp-402', 'Embroidered Kurti & Palazzo Co-ord Set',   '2-piece', 2, 'long', 899, 1699,
   '["M","L","XL","XXL"]',
   '[{"name":"Maroon Crimson","hex":"#800020"},{"name":"Forest Green","hex":"#1B4D3E"}]',
   'Heavy Viscose Rayon',
   'A rich neck-embroidered kurti paired with wide-leg flared palazzo featuring matching embroidered lace hem.',
   '["https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop"]',
   false, true),

  ('tp-403', 'Short Kurti with Dhoti Pants Set',          '2-piece', 2, 'short', 799, 1399,
   '["M","L","XL"]',
   '[{"name":"Marigold Yellow","hex":"#F3A712"},{"name":"Magenta Pink","hex":"#D10069"}]',
   'Pure Jaipuri Cotton',
   'Vibrant ethnic 2-piece set with short angrakha style kurti and pleated comfortable cotton dhoti pants.',
   '["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"]',
   true, true),

  ('tp-404', 'Geometric Block Print Kurti & Pant',        '2-piece', 2, 'long', 829, 1499,
   '["M","L","XL","XXL"]',
   '[{"name":"Black & Gold","hex":"#1C1C1C"},{"name":"Beige & Ochre","hex":"#C2A676"}]',
   'Slub Cotton',
   'Modern minimalist geometric ethnic motif print kurti with straight pants. Smart workwear and daily wear pick.',
   '["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop"]',
   false, true),

  -- 3 PIECE
  ('thp-501', 'Festive Silk Kurti, Pant & Chiffon Dupatta Set', '3-piece', 3, 'long', 1199, 2299,
   '["M","L","XL","XXL"]',
   '[{"name":"Deep Maroon","hex":"#6B1D2F"},{"name":"Emerald Green","hex":"#0A5C36"}]',
   'Art Silk & Chiffon Dupatta',
   'Complete 3-piece festive suit featuring intricate zari embroidered neck, tailored straight pant, and lightweight flowing printed chiffon dupatta.',
   '["https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"]',
   true, true),

  ('thp-502', 'Jaipuri Sanganeri 3-Piece Cotton Suit Set',      '3-piece', 3, 'long', 1099, 1999,
   '["M","L","XL","XXL"]',
   '[{"name":"Indigo Blue","hex":"#1F3B68"},{"name":"Brick Red","hex":"#8A2323"}]',
   '100% Pure Mulmul Cotton',
   'Authentic Jaipuri hand block printed 3-piece suit set with soft cotton mulmul dupatta. Pure comfort for hot climate and celebrations.',
   '["https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"]',
   true, true),

  ('thp-503', 'Anarkali Flared Kurti, Churidar & Dupatta Set',  '3-piece', 3, 'long', 1299, 2499,
   '["M","L","XL"]',
   '[{"name":"Mustard Gold","hex":"#D4AF37"},{"name":"Rani Pink","hex":"#C71585"}]',
   'Chanderi Blend & Organza Dupatta',
   'Royal flared Anarkali 3-piece suit embellished with sequence embroidery and accompanied by a sheer organza embroidered dupatta.',
   '["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop"]',
   true, true),

  ('thp-504', 'Pastel Embroidery Kurti, Trousers & Dupatta',    '3-piece', 3, 'long', 1049, 1899,
   '["M","L","XL","XXL"]',
   '[{"name":"Pistachio Green","hex":"#93C572"},{"name":"Peach Coral","hex":"#F08080"}]',
   'Premium Rayon Cotton',
   'Subtle pastel palette ethnic suit set featuring pearl work accents on the neck and border detail on dupatta.',
   '["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop"]',
   false, true)
ON CONFLICT (id) DO NOTHING;

-- Done! Your database is ready.
-- Next steps:
-- 1. Create an admin user in Authentication > Users in the Supabase dashboard
-- 2. Fill in your .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
