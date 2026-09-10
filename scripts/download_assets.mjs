import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicImagesDir = path.join(rootDir, 'public', 'images');

// Curated high-res ethnic Indian wear, handloom, blockprint, sheesham wood, and craft assets
const ASSETS = [
  // HERO SLIDES (6 slides)
  {
    dir: 'hero',
    file: 'slide-1.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1800&auto=format&fit=crop',
  },
  {
    dir: 'hero',
    file: 'slide-2.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1800&auto=format&fit=crop',
  },
  {
    dir: 'hero',
    file: 'slide-3.jpg',
    url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1800&auto=format&fit=crop',
  },
  {
    dir: 'hero',
    file: 'slide-4.jpg',
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1800&auto=format&fit=crop',
  },
  {
    dir: 'hero',
    file: 'slide-5.jpg',
    url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1800&auto=format&fit=crop',
  },
  {
    dir: 'hero',
    file: 'slide-6.jpg',
    url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1800&auto=format&fit=crop',
  },

  // CATEGORIES - BANNERS & FEATURED
  {
    dir: 'categories',
    file: 'women-banner.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1400&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'women-featured.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=700&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'men-banner.jpg',
    url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1400&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'men-featured.jpg',
    url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=700&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'kids-banner.jpg',
    url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1400&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'kids-featured.jpg',
    url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=700&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'home-banner.jpg',
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'home-featured.jpg',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=700&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'furniture-banner.jpg',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'furniture-featured.jpg',
    url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=700&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'food-banner.jpg',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1400&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'food-featured.jpg',
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=700&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'collection-banner.jpg',
    url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1400&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'collection-featured.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=700&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'services-banner.jpg',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1400&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'services-featured.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=700&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'sale-banner.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1400&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'sale-featured.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=700&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'new-arrivals-banner.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1400&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'new-arrivals-featured.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=700&auto=format&fit=crop',
  },

  // QUICK CATEGORIES CIRCULAR ICONS
  {
    dir: 'categories',
    file: 'qc-kurtas.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=350&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'qc-sarees.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=350&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'qc-men.jpg',
    url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=350&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'qc-kids.jpg',
    url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=350&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'qc-bedlinen.jpg',
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=350&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'qc-cushions.jpg',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=350&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'qc-furniture.jpg',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=350&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'qc-food.jpg',
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=350&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'qc-sale.jpg',
    url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=350&auto=format&fit=crop',
  },

  // CATEGORY TILES (HOMEPAGE)
  {
    dir: 'categories',
    file: 'tile-women.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=750&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'tile-men.jpg',
    url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=750&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'tile-home.jpg',
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=750&auto=format&fit=crop',
  },
  {
    dir: 'categories',
    file: 'tile-furniture.jpg',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=750&auto=format&fit=crop',
  },

  // HOMEPAGE SECTIONS
  {
    dir: 'home',
    file: 'svarnim-banner.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    dir: 'home',
    file: 'split-women.jpg',
    url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop',
  },
  {
    dir: 'home',
    file: 'split-men.jpg',
    url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop',
  },
  {
    dir: 'home',
    file: 'split-home.jpg',
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
  },
  {
    dir: 'home',
    file: 'artisan-blockprint.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=900&auto=format&fit=crop',
  },
  {
    dir: 'home',
    file: 'moment-1.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
  },
  {
    dir: 'home',
    file: 'moment-2.jpg',
    url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=600&auto=format&fit=crop',
  },
  {
    dir: 'home',
    file: 'moment-3.jpg',
    url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=600&auto=format&fit=crop',
  },
  {
    dir: 'home',
    file: 'moment-4.jpg',
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
  },
  {
    dir: 'home',
    file: 'moment-5.jpg',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop',
  },
  {
    dir: 'home',
    file: 'moment-6.jpg',
    url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop',
  },

  // PRODUCTS (2 consistent images each)
  // w-01: Indigo Ajrakh Kurta
  { dir: 'products', file: 'w-01-1.jpg', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'w-01-2.jpg', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' },

  // w-02: Chanderi Silk Saree
  { dir: 'products', file: 'w-02-1.jpg', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'w-02-2.jpg', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop' },

  // w-03: Lucknowi Chikankari Anarkali
  { dir: 'products', file: 'w-03-1.jpg', url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'w-03-2.jpg', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop' },

  // w-04: Kalamkari Midi Dress
  { dir: 'products', file: 'w-04-1.jpg', url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'w-04-2.jpg', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop' },

  // w-05: Bagru Suit Set
  { dir: 'products', file: 'w-05-1.jpg', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'w-05-2.jpg', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop' },

  // w-06: Cotton Palazzos
  { dir: 'products', file: 'w-06-1.jpg', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'w-06-2.jpg', url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop' },

  // w-07: Tussar Silk Stole
  { dir: 'products', file: 'w-07-1.jpg', url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'w-07-2.jpg', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop' },

  // w-08: Short Cotton Tunic
  { dir: 'products', file: 'w-08-1.jpg', url: 'https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'w-08-2.jpg', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop' },

  // w-09: Silver Jhumkas
  { dir: 'products', file: 'w-09-1.jpg', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'w-09-2.jpg', url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop' },

  // w-10: Silk Potli Bag
  { dir: 'products', file: 'w-10-1.jpg', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'w-10-2.jpg', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop' },

  // MEN
  // m-01: Khadi Long Kurta
  { dir: 'products', file: 'm-01-1.jpg', url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'm-01-2.jpg', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop' },

  // m-02: Tussar Silk Bundi
  { dir: 'products', file: 'm-02-1.jpg', url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'm-02-2.jpg', url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop' },

  // m-03: Khadi Mandarin Shirt
  { dir: 'products', file: 'm-03-1.jpg', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'm-03-2.jpg', url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop' },

  // m-04: Cotton Short Kurta
  { dir: 'products', file: 'm-04-1.jpg', url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'm-04-2.jpg', url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop' },

  // m-05: Linen Casual Shirt
  { dir: 'products', file: 'm-05-1.jpg', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'm-05-2.jpg', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop' },

  // KIDS
  // k-01: Boys Kurta Pyjama
  { dir: 'products', file: 'k-01-1.jpg', url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'k-01-2.jpg', url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800&auto=format&fit=crop' },

  // k-02: Girls Tiered Frock
  { dir: 'products', file: 'k-02-1.jpg', url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'k-02-2.jpg', url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop' },

  // HOME & LIVING
  // h-01: Kilim Rug
  { dir: 'products', file: 'h-01-1.jpg', url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'h-01-2.jpg', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop' },

  // h-02: Botanical Bedcover
  { dir: 'products', file: 'h-02-1.jpg', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'h-02-2.jpg', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop' },

  // h-03: Bell Metal Lamp
  { dir: 'products', file: 'h-03-1.jpg', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'h-03-2.jpg', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop' },

  // FURNITURE
  // f-01: Sheesham Wood Coffee Table
  { dir: 'products', file: 'f-01-1.jpg', url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'f-01-2.jpg', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop' },

  // f-02: Rattan Cane Armchair
  { dir: 'products', file: 'f-02-1.jpg', url: 'https://images.unsplash.com/photo-1580481077194-4d8cb8e63a1e?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'f-02-2.jpg', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop' },

  // FOOD & PANTRY
  // fd-01: Raw Forest Honey
  { dir: 'products', file: 'fd-01-1.jpg', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'fd-01-2.jpg', url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=800&auto=format&fit=crop' },

  // fd-02: Darjeeling Tea
  { dir: 'products', file: 'fd-02-1.jpg', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'fd-02-2.jpg', url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop' },

  // fd-03: Cold-Pressed Mustard Oil
  { dir: 'products', file: 'fd-03-1.jpg', url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'fd-03-2.jpg', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop' },

  // WELLNESS & COLLECTION
  // wl-01: Kumkumadi Elixir
  { dir: 'products', file: 'wl-01-1.jpg', url: 'https://images.unsplash.com/photo-1608248597359-269e358b5cf3?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'wl-01-2.jpg', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop' },

  // wl-02: Kannauj Rose Water
  { dir: 'products', file: 'wl-02-1.jpg', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 'wl-02-2.jpg', url: 'https://images.unsplash.com/photo-1608248597359-269e358b5cf3?q=80&w=800&auto=format&fit=crop' },

  // SALE
  // s-01: Flared Kurta Set
  { dir: 'products', file: 's-01-1.jpg', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' },
  { dir: 'products', file: 's-01-2.jpg', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop' },
];

async function downloadAsset(asset) {
  const targetDir = path.join(publicImagesDir, asset.dir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetPath = path.join(targetDir, asset.file);
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 1000) {
    console.log(`[SKIP] Already exists: ${asset.dir}/${asset.file}`);
    return;
  }

  try {
    const res = await fetch(asset.url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(targetPath, buffer);
    console.log(`[DOWNLOADED] ${asset.dir}/${asset.file} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`[ERROR] Failed ${asset.dir}/${asset.file}:`, err.message);
  }
}

async function main() {
  console.log(`Starting asset download for ${ASSETS.length} assets...`);
  for (let i = 0; i < ASSETS.length; i += 5) {
    const batch = ASSETS.slice(i, i + 5);
    await Promise.all(batch.map(downloadAsset));
  }
  console.log('All downloads completed!');
}

main();
