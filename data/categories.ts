import { CategoryItem } from "@/types/product";

export const CATEGORIES: CategoryItem[] = [
  {
    id: "new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest seasonal arrivals featuring handwoven silks, breezy summer linens, artisanal home decor, and contemporary silhouettes.",
    bannerImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1400&auto=format&fit=crop",
    subcategories: [
      {
        title: "Women's Fresh Drops",
        items: ["Chikankari Kurtas", "Zari Silk Sarees", "Linen Tunics", "Handblock Co-ords"],
      },
      {
        title: "Men's New Season",
        items: ["Pastel Khadi Kurtas", "Linen Bandhgala Bundis", "Breathable Casual Shirts"],
      },
      {
        title: "Home & Accents",
        items: ["Botanical Bedcovers", "Hand-cast Brass Lamps", "Indigo Cushion Sets"],
      },
    ],
    featuredImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
    featuredTitle: "Svarnim Festive Edit 2026",
  },
  {
    id: "women",
    name: "Women",
    slug: "women",
    description: "Handcrafted kurtas, artisanal Chanderi & Tussar sarees, suit sets, dupattas, and contemporary ethnic silhouettes spun by master weavers.",
    bannerImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1400&auto=format&fit=crop",
    subcategories: [
      {
        title: "Apparel",
        items: ["Kurtas & Tunics", "Suit Sets", "Sarees & Blouses", "Dresses & Jumpsuits", "Pants & Palazzos", "Dupattas & Stoles"],
      },
      {
        title: "Craft Edits",
        items: ["Lucknowi Chikankari", "Ajrakh Handblock", "Chanderi Silk Weaves", "Bagru Indigo", "Kalamkari Classics"],
      },
      {
        title: "Accessories",
        items: ["Silver Jewellery", "Handcrafted Bags & Potlis", "Stoles & Scarves", "Artisanal Juttis & Footwear"],
      },
    ],
    featuredImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
    featuredTitle: "The Indigo & Ajrakh Story",
  },
  {
    id: "men",
    name: "Men",
    slug: "men",
    description: "Timeless handcrafted shirts, organic khadi kurtas, tailored Nehru jackets (Bundis), and breathable pure linen essentials.",
    bannerImage: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1400&auto=format&fit=crop",
    subcategories: [
      {
        title: "Kurtas & Shirts",
        items: ["Short Kurtas", "Classic Long Kurtas", "Handspun Khadi Shirts", "Pure Linen Shirts"],
      },
      {
        title: "Bottoms & Layering",
        items: ["Nehru Jackets (Bundis)", "Churidar & Pyjamas", "Cotton Dhotis", "Linen Waistcoats"],
      },
      {
        title: "Fabrics & Crafts",
        items: ["Pure Organic Cotton", "Tussar & Matka Silk", "Handspun Charkha Khadi", "Handblock Prints"],
      },
    ],
    featuredImage: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=600&auto=format&fit=crop",
    featuredTitle: "Handspun Khadi Collection",
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    description: "Soft, gentle organic cottons, playful block prints, and breathable festive wear crafted for young comfort.",
    bannerImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1400&auto=format&fit=crop",
    subcategories: [
      {
        title: "Girls",
        items: ["Frocks & Dresses", "Kurta Sets", "Lehenga Choli Sets", "Stoles & Dupattas"],
      },
      {
        title: "Boys",
        items: ["Kurta Pyjama Sets", "Handblock Shirts", "Nehru Jackets", "Comfort Pants"],
      },
      {
        title: "Baby & Toddler",
        items: ["Organic Muslin Jabs", "Soft Swaddles", "Playwear Sets"],
      },
    ],
    featuredImage: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=600&auto=format&fit=crop",
    featuredTitle: "Gentle Pure Cottons",
  },
  {
    id: "home-living",
    name: "Home & Living",
    slug: "home-living",
    description: "Artisanal handwoven kilim rugs, block-printed bedcovers, hand-thrown pottery, and timeless brass decor.",
    bannerImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop",
    subcategories: [
      {
        title: "Bed Linen & Bath",
        items: ["Bedcovers & Quilts", "Bedsheets & Pillowcases", "Bath Towels & Robes", "Table Runners"],
      },
      {
        title: "Cushions & Curtains",
        items: ["Embroidered Cushion Covers", "Handloom Curtains & Drapes", "Floor Cushions"],
      },
      {
        title: "Décor, Dining & Rugs",
        items: ["Handwoven Kilims & Durries", "Dhokra Brass Crafts", "Handmade Ceramics", "Copper Dinnerware"],
      },
    ],
    featuredImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
    featuredTitle: "Handwoven Kilims & Dhurries",
  },
  {
    id: "furniture",
    name: "Furniture",
    slug: "furniture",
    description: "Solid seasoned Sheesham and teak wood furniture with traditional brass inlay, rattan cane webbing, and hand-carved details.",
    bannerImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop",
    subcategories: [
      {
        title: "Living Room",
        items: ["Solid Wood Coffee Tables", "Accent & Lounge Chairs", "Sideboards & Consoles", "Display Shelves"],
      },
      {
        title: "Bedroom & Dining",
        items: ["Sheesham Dining Tables", "Hand-carved Bedside Tables", "Cane Webbing Beds", "Dining Chairs"],
      },
      {
        title: "Accents & Decor",
        items: ["Carved Wall Mirrors", "Wooden Peg Tables", "Magazine Racks", "Room Dividers & Screens"],
      },
    ],
    featuredImage: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop",
    featuredTitle: "Sheesham Wood Elegance",
  },
  {
    id: "food",
    name: "Food",
    slug: "food",
    description: "Certified organic pantry staples, raw forest honey, stone-ground spices, single-origin teas, and cold-pressed oils from farmer collectives.",
    bannerImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1400&auto=format&fit=crop",
    subcategories: [
      {
        title: "Organic Pantry",
        items: ["Wild Forest Raw Honey", "Single-Origin Spices", "Cold-Pressed Mustard & Sesame Oil", "Himalayan Rock Salt"],
      },
      {
        title: "Teas & Beverages",
        items: ["Darjeeling Whole Leaf Tea", "Kashmiri Kahwa Green Tea", "Tulsi & Ginger Infusion", "Amla Juice"],
      },
      {
        title: "Snacks & Preserves",
        items: ["Handmade Mango Pickle", "Amla Murabba", "Roasted Multi-grain Crisps", "Organic Jaggery"],
      },
    ],
    featuredImage: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=600&auto=format&fit=crop",
    featuredTitle: "Wild Forest Certified Organics",
  },
  {
    id: "collection",
    name: "Collection",
    slug: "collection",
    description: "Curated seasonal capsules and heritage craft stories celebrating the timeless diversity of India.",
    bannerImage: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1400&auto=format&fit=crop",
    subcategories: [
      {
        title: "Signature Capsules",
        items: ["Svarnim Festive 2026", "The Indigo Dabu Edit", "Breezy Summer Cottons", "Heirloom Chanderi Weaves"],
      },
      {
        title: "Living Concepts",
        items: ["The Artisan Living Room", "Sunlit Verandah", "Handcrafted Dining Sanctuary"],
      },
    ],
    featuredImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
    featuredTitle: "Svarnim Festive Collection",
  },
  {
    id: "services",
    name: "Services",
    slug: "services",
    description: "Personal styling, bespoke tailoring, home interior consultations, and corporate artisanal gifting.",
    bannerImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1400&auto=format&fit=crop",
    subcategories: [
      {
        title: "Customer Services",
        items: ["Custom Tailoring & Alterations", "Home Décor Consultation", "Bespoke Curtain & Drapery Stitching"],
      },
      {
        title: "Special Occasions",
        items: ["Corporate Artisanal Gifting", "Wedding Registry", "Fabindia Gift Cards"],
      },
    ],
    featuredImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
    featuredTitle: "Custom Tailoring & Styling",
  },
  {
    id: "fabfamily",
    name: "Fabfamily",
    slug: "fabfamily",
    description: "Join the Fabfamily loyalty program. Earn points on every handcrafted purchase and unlock exclusive preview access.",
    bannerImage: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1400&auto=format&fit=crop",
    subcategories: [
      {
        title: "Membership Tiers",
        items: ["Bronze Tier", "Silver Tier", "Gold VIP Status", "Family Matching Sets"],
      },
      {
        title: "Privileges",
        items: ["Exclusive Pre-Sale Access", "Artisan Workshop Invites", "Birthday Bonus Rewards"],
      },
    ],
    featuredImage: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=600&auto=format&fit=crop",
    featuredTitle: "Fabfamily Rewards & Perks",
  },
  {
    id: "sale",
    name: "Sale",
    slug: "sale",
    description: "Exclusive discounts up to 50% off on authentic handcrafted kurtas, sarees, home linen, and wooden furniture.",
    bannerImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1400&auto=format&fit=crop",
    subcategories: [
      {
        title: "Discount Offers",
        items: ["Flat 50% Off", "Flat 40% Off", "Flat 30% Off", "Under ₹1999 Specials"],
      },
      {
        title: "Sale by Department",
        items: ["Women's Apparel Sale", "Men's Kurta Deals", "Home Decor Clearance", "Kids Festive Savings"],
      },
    ],
    featuredImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
    featuredTitle: "End of Season Heritage Sale",
  },
];

// Circular category thumbnails for homepage quick navigation
export const QUICK_CATEGORIES = [
  { id: "kurtas", name: "Kurtas", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=300&auto=format&fit=crop", href: "/category/women?sub=Kurtas%20%26%20Tunics" },
  { id: "sarees", name: "Sarees", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300&auto=format&fit=crop", href: "/category/women?sub=Sarees%20%26%20Blouses" },
  { id: "men-kurtas", name: "Men's Wear", image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=300&auto=format&fit=crop", href: "/category/men" },
  { id: "kids", name: "Kids", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=300&auto=format&fit=crop", href: "/category/kids" },
  { id: "bed-linen", name: "Bed Linen", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=300&auto=format&fit=crop", href: "/category/home-living" },
  { id: "cushions", name: "Cushions", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop", href: "/category/home-living" },
  { id: "furniture", name: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop", href: "/category/furniture" },
  { id: "organic-food", name: "Food & Teas", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=300&auto=format&fit=crop", href: "/category/food" },
  { id: "sale", name: "Sale Up To 50%", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=300&auto=format&fit=crop", href: "/category/sale" },
];
