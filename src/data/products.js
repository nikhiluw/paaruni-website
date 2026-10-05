// src/data/products.js
// Base product and category data for Paaruni Ethnic Wear

export const categories = [
  {
    id: "long-kurti",
    name: "Long Kurti",
    tagline: "Graceful & Elegant Daily Wear",
    description: "Flowing flared and straight long kurtis designed for effortless grace, day-long comfort, and festive radiance.",
    coverImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
    featured: true
  },
  {
    id: "short-kurti",
    name: "Short Kurti",
    tagline: "Chic & Versatile Casuals",
    description: "Modern short kurtis perfect for college, work, and casual outings. Pair effortlessly with jeans, trousers, or skirts.",
    coverImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
    featured: true
  },
  {
    id: "1-piece",
    name: "1 Piece",
    tagline: "Statement Ethnic Dresses",
    description: "Stunning single-piece ethnic gowns and flared maxis combining traditional Indian motifs with contemporary fits.",
    coverImage: "https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=1000&auto=format&fit=crop",
    featured: true
  },
  {
    id: "2-piece",
    name: "2 Piece",
    tagline: "Coordinated Kurti & Bottom Sets",
    description: "Perfectly matched Kurti & Pant or Kurti & Skirt co-ord sets designed to elevate your everyday ethnic wardrobe.",
    coverImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
    featured: true
  },
  {
    id: "3-piece",
    name: "3 Piece",
    tagline: "Complete Festive Suit Sets",
    description: "Grand 3-piece suit ensembles comprising Kurti, Pant, and Dupatta crafted for celebrations and special occasions.",
    coverImage: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1000&auto=format&fit=crop",
    featured: true
  }
];

export const products = [
  // --- LONG KURTI (4 items) ---
  {
    id: "lk-101",
    name: "Gulmohar Maroon Anarkali Long Kurti",
    categoryId: "long-kurti",
    pieces: 1,
    length: "long",
    price: 699,
    mrp: 1299,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Royal Maroon", hex: "#7A1C30" },
      { name: "Deep Navy", hex: "#1B2A47" }
    ],
    fabric: "Pure Cotton Slub",
    description: "A breathtaking flared long Kurti featuring gold foil block prints along the flare and intricate neckline zari embroidery. Breathable pure cotton for all-day comfort.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: "lk-102",
    name: "Mayuri Peacock Teal Straight Kurti",
    categoryId: "long-kurti",
    pieces: 1,
    length: "long",
    price: 549,
    mrp: 999,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Teal Green", hex: "#006666" },
      { name: "Mustard Gold", hex: "#D4AF37" }
    ],
    fabric: "Premium Rayon",
    description: "Elegant calf-length straight kurti embellished with delicate mirror work on the neck yolk. Features side slits and quarter sleeves for classic silhouette.",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false,
    active: true
  },
  {
    id: "lk-103",
    name: "Chanderi Floral Printed Long Kurti",
    categoryId: "long-kurti",
    pieces: 1,
    length: "long",
    price: 799,
    mrp: 1499,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blush Pink", hex: "#E8A598" },
      { name: "Mint Sage", hex: "#8CA897" }
    ],
    fabric: "Chanderi Silk Blend",
    description: "Soft pastel Chanderi silk kurti adorned with hand-block botanical floral prints. Lined with ultra-soft cotton for lightweight elegance.",
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: "lk-104",
    name: "Kashmiri Embroidered Rayon Long Kurti",
    categoryId: "long-kurti",
    pieces: 1,
    length: "long",
    price: 649,
    mrp: 1199,
    sizes: ["M", "L", "XL", "XXL", "3XL"],
    colors: [
      { name: "Rust Red", hex: "#9E382A" },
      { name: "Black Gold", hex: "#262421" }
    ],
    fabric: "Heavy 14kg Rayon",
    description: "Richly embroidered Kashmiri Aari thread work across the chest and cuffs. Heavy fall fabric that flatters every body type smoothly.",
    images: [
      "https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false,
    active: true
  },

  // --- SHORT KURTI (4 items) ---
  {
    id: "sk-201",
    name: "Indigo Kalamkari Short Tunic Kurti",
    categoryId: "short-kurti",
    pieces: 1,
    length: "short",
    price: 399,
    mrp: 799,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Indigo Blue", hex: "#1A365D" },
      { name: "Earthy Brown", hex: "#654321" }
    ],
    fabric: "100% Jaipuri Cotton",
    description: "Hip-length short kurti with authentic Kalamkari hand block print. Styled with mandarin collar and coconut shell buttons.",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: "sk-202",
    name: "Sunburst Yellow Peplum Short Kurti",
    categoryId: "short-kurti",
    pieces: 1,
    length: "short",
    price: 449,
    mrp: 849,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Mustard Yellow", hex: "#E5A93B" },
      { name: "Coral Peach", hex: "#F28482" }
    ],
    fabric: "Mulmul Cotton",
    description: "Flirty peplum flared short kurti with subtle gotta patti highlights. Extremely light and breathable for daily summer styling.",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false,
    active: true
  },
  {
    id: "sk-203",
    name: "Chikankari White Embroidered Short Top",
    categoryId: "short-kurti",
    pieces: 1,
    length: "short",
    price: 499,
    mrp: 899,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Powder Blue", hex: "#B0E0E6" }
    ],
    fabric: "Cotton Georgette",
    description: "Classic Lucknawi Chikankari hand embroidery on soft cotton georgette. Comes with attached inner lining.",
    images: [
      "https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: "sk-204",
    name: "Bandhani Print Collar Short Kurti",
    categoryId: "short-kurti",
    pieces: 1,
    length: "short",
    price: 429,
    mrp: 749,
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Crimson Red", hex: "#990000" },
      { name: "Emerald Green", hex: "#004B23" }
    ],
    fabric: "Rayon Cotton",
    description: "Vibrant Gujarati Bandhani polka print short shirt-style kurti with cuffed sleeves and curved hemline.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false,
    active: true
  },

  // --- 1 PIECE DRESS (3 items) ---
  {
    id: "op-301",
    name: "Royal Anarkali Ethnic One-Piece Maxi",
    categoryId: "1-piece",
    pieces: 1,
    length: "long",
    price: 899,
    mrp: 1699,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Wine Maroon", hex: "#58111A" },
      { name: "Bottle Green", hex: "#093C29" }
    ],
    fabric: "Rayon Jacquard",
    description: "Full-length floor-touching ethnic flared dress with woven gold lurex jacquard stripes and dori tassel waist belt.",
    images: [
      "https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: "op-302",
    name: "Tiered Block Print Ethnic Dress",
    categoryId: "1-piece",
    pieces: 1,
    length: "long",
    price: 749,
    mrp: 1399,
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Terracotta Orange", hex: "#C85A32" },
      { name: "Olive Sage", hex: "#708238" }
    ],
    fabric: "100% Breathable Cotton",
    description: "Boho-ethnic 3-tier maxi dress styled with subtle lace trims and comfortable elasticated puff sleeves.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false,
    active: true
  },
  {
    id: "op-303",
    name: "A-Line Foil Print Indo-Western Dress",
    categoryId: "1-piece",
    pieces: 1,
    length: "long",
    price: 799,
    mrp: 1499,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Royal Blue", hex: "#002366" },
      { name: "Plum Purple", hex: "#4A0E4E" }
    ],
    fabric: "Slub Silk Blend",
    description: "Contemporary fusion dress featuring gold foil bootis, V-neckline with fabric buttons and side pockets.",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },

  // --- 2 PIECE SET (4 items) ---
  {
    id: "tp-401",
    name: "Printed Straight Kurti with Pant Set",
    categoryId: "2-piece",
    pieces: 2,
    length: "long",
    price: 849,
    mrp: 1599,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Dusty Pink", hex: "#D8A7B1" },
      { name: "Aqua Teal", hex: "#5C9EAD" }
    ],
    fabric: "Soft Cotton Rayon",
    description: "Comes with a straight printed kurti and matching comfortable cigarette pant with elastic waist and side pocket.",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: "tp-402",
    name: "Embroidered Kurti & Palazzo Co-ord Set",
    categoryId: "2-piece",
    pieces: 2,
    length: "long",
    price: 899,
    mrp: 1699,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Maroon Crimson", hex: "#800020" },
      { name: "Forest Green", hex: "#1B4D3E" }
    ],
    fabric: "Heavy Viscose Rayon",
    description: "A rich neck-embroidered kurti paired with wide-leg flared palazzo featuring matching embroidered lace hem.",
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false,
    active: true
  },
  {
    id: "tp-403",
    name: "Short Kurti with Dhoti Pants Set",
    categoryId: "2-piece",
    pieces: 2,
    length: "short",
    price: 799,
    mrp: 1399,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Marigold Yellow", hex: "#F3A712" },
      { name: "Magenta Pink", hex: "#D10069" }
    ],
    fabric: "Pure Jaipuri Cotton",
    description: "Vibrant ethnic 2-piece set with short angrakha style kurti and pleated comfortable cotton dhoti pants.",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: "tp-404",
    name: "Geometric Block Print Kurti & Pant",
    categoryId: "2-piece",
    pieces: 2,
    length: "long",
    price: 829,
    mrp: 1499,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Black & Gold", hex: "#1C1C1C" },
      { name: "Beige & Ochre", hex: "#C2A676" }
    ],
    fabric: "Slub Cotton",
    description: "Modern minimalist geometric ethnic motif print kurti with straight pants. Smart workwear and daily wear pick.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false,
    active: true
  },

  // --- 3 PIECE SUIT SET (4 items) ---
  {
    id: "thp-501",
    name: "Festive Silk Kurti, Pant & Chiffon Dupatta Set",
    categoryId: "3-piece",
    pieces: 3,
    length: "long",
    price: 1199,
    mrp: 2299,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Deep Maroon", hex: "#6B1D2F" },
      { name: "Emerald Green", hex: "#0A5C36" }
    ],
    fabric: "Art Silk & Chiffon Dupatta",
    description: "Complete 3-piece festive suit featuring intricate zari embroidered neck, tailored straight pant, and lightweight flowing printed chiffon dupatta.",
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: "thp-502",
    name: "Jaipuri Sanganeri 3-Piece Cotton Suit Set",
    categoryId: "3-piece",
    pieces: 3,
    length: "long",
    price: 1099,
    mrp: 1999,
    sizes: ["M", "L", "XL", "XXL", "3XL"],
    colors: [
      { name: "Indigo Blue", hex: "#1F3B68" },
      { name: "Brick Red", hex: "#8A2323" }
    ],
    fabric: "100% Pure Mulmul Cotton",
    description: "Authentic Jaipuri hand block printed 3-piece suit set with soft cotton mulmul dupatta. Pure comfort for hot climate and celebrations.",
    images: [
      "https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: "thp-503",
    name: "Anarkali Flared Kurti, Churidar & Dupatta Set",
    categoryId: "3-piece",
    pieces: 3,
    length: "long",
    price: 1299,
    mrp: 2499,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Mustard Gold", hex: "#D4AF37" },
      { name: "Rani Pink", hex: "#C71585" }
    ],
    fabric: "Chanderi Blend & Organza Dupatta",
    description: "Royal flared Anarkali 3-piece suit embellished with sequence embroidery and accompanied by a sheer organza embroidered dupatta.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: "thp-504",
    name: "Pastel Embroidery Kurti, Trousers & Dupatta",
    categoryId: "3-piece",
    pieces: 3,
    length: "long",
    price: 1049,
    mrp: 1899,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Pistachio Green", hex: "#93C572" },
      { name: "Peach Coral", hex: "#F08080" }
    ],
    fabric: "Premium Rayon Cotton",
    description: "Subtle pastel palette ethnic suit set featuring pearl work accents on the neck and border detail on dupatta.",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596783074918-c84cb06ad917?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false,
    active: true
  }
];
