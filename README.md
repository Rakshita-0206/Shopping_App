# VIRAASAT — Fabindia-Style Next.js E-Commerce Platform

A production-quality artisanal Indian handloom, apparel, and lifestyle e-commerce web application inspired by the look, feel, architecture, and functionality of **fabindia.com**.

---

## 🌿 Brand Look & Feel (The Fabindia Aesthetic)
- **Earthy Artisanal Palette**: Terracotta Rust (`#B5651D`), Indigo Blue (`#2E4372`), Deep Maroon (`#6B2737`), Warm Off-White (`#F7F3EE`), Soft Charcoal (`#2B2B2B`), and Zari Gold accents (`#C5A059`).
- **Editorial Typography**: Elegant serif headings via Google Fonts (`Cormorant Garamond` / `Playfair Display`) paired with clean modern sans-serif body typography (`Plus Jakarta Sans`).
- **Slow Living Design Details**: Generous whitespace, thin uppercase letter-spaced labels, subtle hover transitions, minimal borders, and handcrafted product photography.

---

## ⚡ Tech Stack
- **Next.js 16 (App Router)** with `/app` directory architecture
- **TypeScript** for strict type safety
- **Tailwind CSS v4** with custom artisanal design tokens
- **Zustand** with `localStorage` persistence for Shopping Cart & Wishlist state
- **lucide-react** for iconography
- **next/image** with responsive sizing and remote pattern optimization

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx             # Root layout with fonts, announcement bar, navbar, footer & cart drawer
│   ├── globals.css            # Artisanal design tokens, theme variables & subtle scrollbars
│   ├── page.tsx               # Homepage with all 8 specified sections in exact order
│   ├── category/[slug]/       # Category listing with filters, sorting, load more
│   │   └── page.tsx
│   ├── product/[id]/          # Product detail page with gallery, size/color selectors, accordions
│   │   └── page.tsx
│   ├── cart/                  # Full shopping bag with coupon code & free shipping progress
│   │   └── page.tsx
│   ├── checkout/              # Multi-step checkout with address form, mock payment & confirmation
│   │   └── page.tsx
│   ├── search/                # Dynamic search page with real-time query matching & department filters
│   │   └── page.tsx
│   ├── account/               # Account dashboard with order history, saved wishlist & addresses
│   │   └── page.tsx
│   └── about/                 # Our Story page celebrating 55,000+ rural artisans & craft techniques
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx # Rotating promotional strip with pause/resume controls
│   │   ├── Navbar.tsx          # Sticky header, logo wordmark, mega-menu trigger, cart badge
│   │   ├── MegaMenu.tsx        # Multi-column department dropdown with editorial showcase
│   │   ├── MobileDrawer.tsx    # Slide-in mobile drawer with category accordions
│   │   └── Footer.tsx          # Multi-column footer, newsletter, craft stories, payment badges
│   ├── cart/
│   │   └── CartDrawer.tsx      # Slide-out interactive cart drawer with free shipping progress bar
│   └── ui/
│       ├── ProductCard.tsx     # Reusable card with hover image switch, quick add & wishlist toggle
│       ├── Breadcrumbs.tsx     # Breadcrumb navigation atom
│       └── Accordion.tsx       # Collapsible content accordion
├── data/
│   ├── categories.ts          # Department taxonomy, banner imagery & subcategories
│   └── products.ts            # 24+ rich mock products across Women, Men, Kids, Home, Wellness, Jewellery
├── store/
│   ├── cartStore.ts           # Persistent Zustand cart store with coupons & discount logic
│   └── wishlistStore.ts       # Persistent Zustand wishlist store
├── types/
│   └── product.ts             # TypeScript interfaces for products, categories, cart
└── next.config.ts             # Next.js configuration with remote image patterns
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (Node.js LTS v24 installed)
- npm or yarn

### Installation
```bash
# Clone the repository and install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 🛍️ Key Features Tested & Functional
1. **Rotating Announcement Bar**: Auto-advancing offers with manual arrows.
2. **Desktop Mega Menu & Mobile Drawer**: Multi-column subcategories on hover and touch drawer on mobile.
3. **8 Homepage Sections in Order**:
   - Hero Carousel with auto-advance and manual controls
   - 6 Category Tiles
   - New Arrivals horizontal scrollable carousel
   - Featured Split Collection Banner
   - Best Sellers 8-item grid
   - "The Craft / Our Story" artisan strip
   - Instagram-style community visual diary (`#ViraasatLiving`)
   - Newsletter signup band with discount coupon reward
4. **Category Listing & Filtering**: Filter by subcategory, price range slider, color swatch, and size, with active filter tags and sort-by dropdown.
5. **Product Detail Page**: Multi-thumbnail gallery switcher, color and size selectors, quantity stepper, PIN code delivery checker, craft accordions, and related products carousel.
6. **Cart & Slide-out Drawer**: Persistent state, quantity adjustment, coupon applicator (`HERITAGE10`, `WELCOME15`), and free shipping threshold meter.
7. **Complete Checkout Flow**: Form validation, simulated UPI / Card / COD payment, and instant order confirmation screen with unique order reference (`#VIR-XXXXXX`).
