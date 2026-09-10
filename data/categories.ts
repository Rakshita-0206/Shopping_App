import { CategoryItem } from "@/types/product";

export const CATEGORIES: CategoryItem[] = [
  {
    id: "new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest seasonal arrivals featuring handwoven silks, breezy summer linens, artisanal home decor, and contemporary silhouettes.",
    bannerImage: "/images/categories/new-arrivals-banner.jpg",
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
    featuredImage: "/images/categories/new-arrivals-featured.jpg",
    featuredTitle: "Svarnim Festive Edit 2026",
  },
  {
    id: "women",
    name: "Women",
    slug: "women",
    description: "Handcrafted kurtas, artisanal Chanderi & Tussar sarees, suit sets, dupattas, and contemporary ethnic silhouettes spun by master weavers.",
    bannerImage: "/images/categories/women-banner.jpg",
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
    featuredImage: "/images/categories/women-featured.jpg",
    featuredTitle: "The Indigo & Ajrakh Story",
  },
  {
    id: "men",
    name: "Men",
    slug: "men",
    description: "Timeless handcrafted shirts, organic khadi kurtas, tailored Nehru jackets (Bundis), and breathable pure linen essentials.",
    bannerImage: "/images/categories/men-banner.jpg",
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
    featuredImage: "/images/categories/men-featured.jpg",
    featuredTitle: "Handspun Khadi Collection",
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    description: "Soft, gentle organic cottons, playful block prints, and breathable festive wear crafted for young comfort.",
    bannerImage: "/images/categories/kids-banner.jpg",
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
    featuredImage: "/images/categories/kids-featured.jpg",
    featuredTitle: "Gentle Pure Cottons",
  },
  {
    id: "home-living",
    name: "Home & Living",
    slug: "home-living",
    description: "Artisanal handwoven kilim rugs, block-printed bedcovers, hand-thrown pottery, and timeless brass decor.",
    bannerImage: "/images/categories/home-banner.jpg",
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
    featuredImage: "/images/categories/home-featured.jpg",
    featuredTitle: "Handwoven Kilims & Dhurries",
  },
  {
    id: "furniture",
    name: "Furniture",
    slug: "furniture",
    description: "Solid seasoned Sheesham and teak wood furniture with traditional brass inlay, rattan cane webbing, and hand-carved details.",
    bannerImage: "/images/categories/furniture-banner.jpg",
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
    featuredImage: "/images/categories/furniture-featured.jpg",
    featuredTitle: "Sheesham Wood Elegance",
  },
  {
    id: "food",
    name: "Food",
    slug: "food",
    description: "Certified organic pantry staples, raw forest honey, stone-ground spices, single-origin teas, and cold-pressed oils from farmer collectives.",
    bannerImage: "/images/categories/food-banner.jpg",
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
    featuredImage: "/images/categories/food-featured.jpg",
    featuredTitle: "Wild Forest Certified Organics",
  },
  {
    id: "collection",
    name: "Collection",
    slug: "collection",
    description: "Curated seasonal capsules and heritage craft stories celebrating the timeless diversity of India.",
    bannerImage: "/images/categories/collection-banner.jpg",
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
    featuredImage: "/images/categories/collection-featured.jpg",
    featuredTitle: "Svarnim Festive Collection",
  },
  {
    id: "services",
    name: "Services",
    slug: "services",
    description: "Personal styling, bespoke tailoring, home interior consultations, and corporate artisanal gifting.",
    bannerImage: "/images/categories/services-banner.jpg",
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
    featuredImage: "/images/categories/services-featured.jpg",
    featuredTitle: "Custom Tailoring & Styling",
  },
  {
    id: "fabfamily",
    name: "Fabfamily",
    slug: "fabfamily",
    description: "Join the Fabfamily loyalty program. Earn points on every handcrafted purchase and unlock exclusive preview access.",
    bannerImage: "/images/categories/women-banner.jpg",
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
    featuredImage: "/images/categories/women-featured.jpg",
    featuredTitle: "Fabfamily Rewards & Perks",
  },
  {
    id: "sale",
    name: "Sale",
    slug: "sale",
    description: "Exclusive discounts up to 50% off on authentic handcrafted kurtas, sarees, home linen, and wooden furniture.",
    bannerImage: "/images/categories/sale-banner.jpg",
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
    featuredImage: "/images/categories/sale-featured.jpg",
    featuredTitle: "End of Season Heritage Sale",
  },
];

// Circular category thumbnails for homepage quick navigation
export const QUICK_CATEGORIES = [
  { id: "kurtas", name: "Kurtas", image: "/images/categories/qc-kurtas.jpg", href: "/category/women?sub=Kurtas%20%26%20Tunics" },
  { id: "sarees", name: "Sarees", image: "/images/categories/qc-sarees.jpg", href: "/category/women?sub=Sarees%20%26%20Blouses" },
  { id: "men-kurtas", name: "Men's Wear", image: "/images/categories/qc-men.jpg", href: "/category/men" },
  { id: "kids", name: "Kids", image: "/images/categories/qc-kids.jpg", href: "/category/kids" },
  { id: "bed-linen", name: "Bed Linen", image: "/images/categories/qc-bedlinen.jpg", href: "/category/home-living" },
  { id: "cushions", name: "Cushions", image: "/images/categories/qc-cushions.jpg", href: "/category/home-living" },
  { id: "furniture", name: "Furniture", image: "/images/categories/qc-furniture.jpg", href: "/category/furniture" },
  { id: "organic-food", name: "Food & Teas", image: "/images/categories/qc-food.jpg", href: "/category/food" },
  { id: "sale", name: "Sale Up To 50%", image: "/images/categories/qc-sale.jpg", href: "/category/sale" },
];
