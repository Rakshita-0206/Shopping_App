"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Camera,
  Sparkles,
  Award,
  Users,
  Feather,
  CheckCircle2,
  Heart,
  ShoppingBag,
  Send,
} from "lucide-react";
import { CATEGORIES, QUICK_CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { useToastStore } from "@/store/toastStore";

const HERO_SLIDES = [
  {
    id: 1,
    headline: "NEVER MEANT TO BLEND IN",
    subtitle: "The Modern Festive & Western Edit",
    description: "Contemporary cuts steeped in centuries of Indian craft mastery and rich botanical dyes.",
    ctaText: "SHOP WESTERN WEAR",
    ctaLink: "/category/women",
    ctaColor: "bg-[#1F2A44] hover:bg-[#162035] text-white",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1800&auto=format&fit=crop",
    tag: "Festive Collection 2026",
  },
  {
    id: 2,
    headline: "THE CHIKANKARI SYMPHONY",
    subtitle: "Artisanal Pure Mulmul & Chanderi Silks",
    description: "Hand-embroidery by women artisan collectives of Awadh, paired with airy silken silhouettes.",
    ctaText: "EXPLORE WOMEN",
    ctaLink: "/category/women?sub=Kurtas%20%26%20Tunics",
    ctaColor: "bg-[#8B2331] hover:bg-[#6E1B26] text-white",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1800&auto=format&fit=crop",
    tag: "Handcrafted Luxury",
  },
  {
    id: 3,
    headline: "SLOW TAILORING FOR MEN",
    subtitle: "Handspun Khadi & Pure French Linen",
    description: "Breathable charkha-spun kurtas, tailored Nehru bundis, and timeless effortless casuals.",
    ctaText: "DISCOVER MEN",
    ctaLink: "/category/men",
    ctaColor: "bg-[#1F2A44] hover:bg-[#162035] text-white",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1800&auto=format&fit=crop",
    tag: "Pure Organic Cottons",
  },
  {
    id: 4,
    headline: "LIVING IN INDIAN SPLENDOUR",
    subtitle: "Solid Sheesham Wood & Handwoven Kilims",
    description: "Kiln-seasoned rosewood furniture, block-printed quilts, and lost-wax Bell metal crafts.",
    ctaText: "SHOP HOME & LIVING",
    ctaLink: "/category/home-living",
    ctaColor: "bg-[#8B2331] hover:bg-[#6E1B26] text-white",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1800&auto=format&fit=crop",
    tag: "Artisanal Home 2026",
  },
  {
    id: 5,
    headline: "SVARNIM FESTIVE ESSENTIALS",
    subtitle: "Zari Highlights & Wild Ahimsa Silk",
    description: "Curated heirloom ensembles woven to illuminate traditional celebrations and grand weddings.",
    ctaText: "EXPLORE SVARNIM",
    ctaLink: "/category/collection",
    ctaColor: "bg-[#8B2331] hover:bg-[#6E1B26] text-white",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1800&auto=format&fit=crop",
    tag: "Limited Festive Edition",
  },
];

const CATEGORY_TILES = [
  {
    id: "women",
    title: "Women's Apparel",
    subtitle: "Kurtas, Sarees & Co-ords",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=700&auto=format&fit=crop",
    link: "/category/women",
  },
  {
    id: "men",
    title: "Men's Collection",
    subtitle: "Khadi Kurtas & Linen Shirts",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=700&auto=format&fit=crop",
    link: "/category/men",
  },
  {
    id: "home",
    title: "Home & Living",
    subtitle: "Bed Linen, Cushions & Rugs",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=700&auto=format&fit=crop",
    link: "/category/home-living",
  },
  {
    id: "furniture",
    title: "Artisanal Furniture",
    subtitle: "Solid Sheesham & Cane",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=700&auto=format&fit=crop",
    link: "/category/furniture",
  },
];

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
    tag: "@ananya_in_fabindia",
    caption: "Sunlit mornings in Ajrakh indigo cotton.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=600&auto=format&fit=crop",
    tag: "@rohit_living",
    caption: "The effortless drape of pure amber charkha khadi.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=600&auto=format&fit=crop",
    tag: "@delhi_art_home",
    caption: "Handwoven geometric wool kilims grounding our living room.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
    tag: "@silver_tales",
    caption: "Heirloom 925 tribal jhumkas carrying generational craft.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
    tag: "@fabessentials_glow",
    caption: "Hydro-distilled Kannauj rose water for everyday refresh.",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop",
    tag: "@kiran_family",
    caption: "Festive twinning in soft organic block prints.",
  },
];

export default function HomePage() {
  const [currentHero, setCurrentHero] = useState(0);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const trendingRailRef = useRef<HTMLDivElement>(null);
  const newArrivalsRailRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToastStore();

  // Auto-advance hero carousel every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleScrollRail = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      showToast({
        title: "Welcome to Fabfamily!",
        description: "Your 10% coupon code FAB10 has been sent to your email.",
      });
      setNewsletterEmail("");
    }
  };

  // Trending and New Arrival product selections
  const newArrivals = PRODUCTS.filter((p) => p.isNew || p.tag === "New" || p.tag === "Bestseller").slice(0, 8);
  const trendingProducts = PRODUCTS.filter((p) => p.rating >= 4.8).slice(0, 8);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* ========================================================================= */}
      {/* 1. HERO CAROUSEL (Full-width, edge-to-edge, uppercase navy headings & CTA) */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[65vh] min-h-[480px] sm:min-h-[560px] max-h-[720px] overflow-hidden bg-[#1F2A44]">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentHero ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority={idx === 0}
              className="object-cover object-center brightness-[0.88]"
              sizes="100vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent sm:from-black/70 sm:via-black/40 sm:to-transparent" />

            {/* Hero Text Content */}
            <div className="relative z-20 h-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-center max-w-2xl text-white space-y-4">
              <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-bold text-[#FAF6F0] bg-[#8B2331]/80 backdrop-blur-xs px-3 py-1 w-fit">
                {slide.tag}
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none font-sans drop-shadow-sm">
                {slide.headline}
              </h1>

              <p className="text-sm sm:text-base text-stone-200 font-light max-w-lg leading-relaxed">
                {slide.subtitle} — {slide.description}
              </p>

              <div className="pt-2">
                <Link
                  href={slide.ctaLink}
                  className={`inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-none transition-all shadow-lg hover:scale-105 ${slide.ctaColor}`}
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Arrow Controls */}
        <button
          onClick={() => setCurrentHero((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/40 hover:bg-[#8B2331] text-white transition-colors backdrop-blur-xs rounded-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentHero((prev) => (prev + 1) % HERO_SLIDES.length)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/40 hover:bg-[#8B2331] text-white transition-colors backdrop-blur-xs rounded-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Dot Indicators (Active dot in maroon #8B2331) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2.5">
          {HERO_SLIDES.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentHero(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 transition-all rounded-full ${
                dotIdx === currentHero ? "w-8 bg-[#8B2331]" : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* Visual Search / Camera Icon floating on right edge */}
        <button
          onClick={() => setIsVisualSearchOpen(true)}
          className="absolute right-0 top-1/3 z-30 flex items-center gap-2 bg-white text-[#2A2A2A] hover:text-[#8B2331] px-3 py-2 text-xs font-semibold uppercase tracking-wider shadow-xl border-l-2 border-[#8B2331] transition-transform hover:-translate-x-1"
          aria-label="Visual Search by Image"
        >
          <Camera className="w-4 h-4 text-[#8B2331]" />
          <span className="hidden sm:inline">Visual Search</span>
        </button>
      </section>

      {/* Visual Search Modal */}
      {isVisualSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in border border-[#E6E0D8]">
            <div className="flex items-center justify-between border-b border-[#E6E0D8] pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B2331] flex items-center gap-2">
                <Camera className="w-4 h-4" /> Visual Search
              </h3>
              <button onClick={() => setIsVisualSearchOpen(false)} className="text-[#6B6B6B] hover:text-[#2A2A2A]">✕</button>
            </div>
            <p className="text-xs text-[#6B6B6B]">
              Upload a picture of any outfit, saree, or home decor to find matching handcrafted pieces across our catalog.
            </p>
            <div className="border-2 border-dashed border-[#E6E0D8] hover:border-[#8B2331] p-8 text-center cursor-pointer transition-colors bg-[#FAF6F0]">
              <Camera className="w-8 h-8 mx-auto text-[#8B2331] mb-2" />
              <span className="text-xs font-semibold text-[#2A2A2A] block">Drag and drop photo here</span>
              <span className="text-[11px] text-[#6B6B6B] block mt-1">or click to browse from device</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsVisualSearchOpen(false)}
                className="px-4 py-2 bg-[#FAF6F0] text-xs font-semibold text-[#2A2A2A] hover:bg-[#E6E0D8]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CATEGORY TILE GRID (Row of 3-4 image tiles with subtle zoom on hover) */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORY_TILES.map((tile) => (
            <Link
              key={tile.id}
              href={tile.link}
              className="group relative aspect-[3/4] overflow-hidden bg-[#F5EFE6] border border-[#E6E0D8] shadow-xs"
            >
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 transition-opacity">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#C5A059] font-bold mb-0.5">
                  {tile.subtitle}
                </span>
                <h3 className="text-white text-base sm:text-lg font-serif font-medium leading-snug">
                  {tile.title}
                </h3>
                <span className="text-xs text-white/90 underline underline-offset-4 mt-2 font-medium tracking-wide flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SHOP BY CATEGORY (Circular Category Thumbnails with Labels) */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
            Explore by Department
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2A2A2A] mt-1">
            Shop By Category
          </h2>
          <div className="w-12 h-[2px] bg-[#8B2331] mx-auto mt-2" />
        </div>

        {/* Circular Thumbnails Rail */}
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-7 overflow-x-auto no-scrollbar pb-3 px-2">
          {QUICK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="flex flex-col items-center group shrink-0 w-20 sm:w-24 text-center"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#E6E0D8] group-hover:border-[#8B2331] transition-all duration-300 shadow-xs group-hover:scale-105">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-[#2A2A2A] group-hover:text-[#8B2331] transition-colors mt-2 tracking-wide line-clamp-1">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED COLLECTION BANNERS ("Svarnim" Festive Collection) */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-[#1F2A44] border border-[#E6E0D8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative h-[280px] sm:h-[400px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
                alt="Svarnim Festive Collection"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 text-white space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#C5A059]">
                Featured Capsule 2026
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-normal leading-tight text-[#FAF6F0]">
                Svarnim — The Golden Hour Celebration
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                Intricate zardozi embroidery, handwoven Chanderi silks, and metallic accents designed to bring regal grace to life's grandest moments.
              </p>
              <div className="pt-2">
                <Link
                  href="/category/collection"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs font-bold uppercase tracking-widest transition-colors rounded-none"
                >
                  <span>Explore Svarnim Edit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. NEW ARRIVALS PRODUCT CAROUSEL (Horizontal Scrollable Rail) */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-[#E6E0D8]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
              Fresh Drops
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2A2A2A] mt-0.5">
              New Arrivals
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScrollRail(newArrivalsRailRef, "left")}
              className="p-2 border border-[#E6E0D8] bg-white hover:border-[#8B2331] hover:text-[#8B2331] transition-colors"
              aria-label="Scroll New Arrivals Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScrollRail(newArrivalsRailRef, "right")}
              className="p-2 border border-[#E6E0D8] bg-white hover:border-[#8B2331] hover:text-[#8B2331] transition-colors"
              aria-label="Scroll New Arrivals Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Products Rail */}
        <div
          ref={newArrivalsRailRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-2"
        >
          {newArrivals.map((product) => (
            <div key={product.id} className="w-[240px] sm:w-[280px] shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CATEGORY SPLIT BANNERS (Women | Men | Home) */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Split 1: Women */}
          <div className="relative aspect-[4/5] overflow-hidden group bg-[#FAF6F0] border border-[#E6E0D8]">
            <Image
              src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop"
              alt="Women Ethnic Wear"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">Women</span>
              <h3 className="font-serif text-2xl font-normal mt-1">Ethereal Silk & Chikankari</h3>
              <p className="text-xs text-stone-200 mt-1 font-light">Anarkalis, Sarees & Breathable Mulmul</p>
              <Link
                href="/category/women"
                className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-white hover:text-[#C5A059]"
              >
                Shop Women <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Split 2: Men */}
          <div className="relative aspect-[4/5] overflow-hidden group bg-[#FAF6F0] border border-[#E6E0D8]">
            <Image
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop"
              alt="Men Tailoring"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">Men</span>
              <h3 className="font-serif text-2xl font-normal mt-1">Khadi & Wild Tussar Bundis</h3>
              <p className="text-xs text-stone-200 mt-1 font-light">Hand-treadled kurtas & classic Nehru jackets</p>
              <Link
                href="/category/men"
                className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-white hover:text-[#C5A059]"
              >
                Shop Men <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Split 3: Home */}
          <div className="relative aspect-[4/5] overflow-hidden group bg-[#FAF6F0] border border-[#E6E0D8]">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop"
              alt="Artisanal Home & Living"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">Home & Living</span>
              <h3 className="font-serif text-2xl font-normal mt-1">Handwoven Kilims & Quilts</h3>
              <p className="text-xs text-stone-200 mt-1 font-light">Warm earthy textures for thoughtful interiors</p>
              <Link
                href="/category/home-living"
                className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-white hover:text-[#C5A059]"
              >
                Shop Home <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FABFAMILY / LOYALTY PROGRAM CALLOUT STRIP */}
      {/* ========================================================================= */}
      <section className="bg-[#1F2A44] text-white py-10 px-4 sm:px-8 border-y border-[#E6E0D8]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">
              The Fabfamily Program
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-normal">
              Earn Rewards on Every Handcrafted Piece
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl">
              Enjoy complimentary gift packaging, early pre-sale access, artisan workshop invites, and earn points on every online & in-store purchase.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/account"
              className="px-6 py-3 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Join Fabfamily
            </Link>
            <Link
              href="/category/collection"
              className="px-6 py-3 border border-stone-400 hover:border-white text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. TRENDING PRODUCT CAROUSEL */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-[#E6E0D8]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2A2A2A] mt-0.5">
              Trending Right Now
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScrollRail(trendingRailRef, "left")}
              className="p-2 border border-[#E6E0D8] bg-white hover:border-[#8B2331] hover:text-[#8B2331] transition-colors"
              aria-label="Scroll Trending Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScrollRail(trendingRailRef, "right")}
              className="p-2 border border-[#E6E0D8] bg-white hover:border-[#8B2331] hover:text-[#8B2331] transition-colors"
              aria-label="Scroll Trending Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Products Rail */}
        <div
          ref={trendingRailRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-2"
        >
          {trendingProducts.map((product) => (
            <div key={product.id} className="w-[240px] sm:w-[280px] shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. EDITORIAL / CRAFT-STORY ("Celebrate India") */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5EFE6] border border-[#E6E0D8] p-8 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-square overflow-hidden border border-[#E6E0D8]">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
                alt="Artisan block printing with natural dyes"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#8B2331]">
                CELEBRATE INDIA
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2A2A2A] font-normal leading-tight">
                60+ Years of Craftsmanship & Empowering 55,000+ Rural Artisans
              </h2>
              <div className="w-14 h-[2px] bg-[#8B2331]" />
              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                Founded in 1960 by John Bissell, Fabindia was born with a mission to bring India's diverse handloom traditions into contemporary living. Every kurta, saree, dhurrie, and jar of honey carries the distinct thumbprint of a rural craft community.
              </p>
              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                We believe in slow handmade value, fair living wages, and protecting indigenous crafts from the erasure of fast industrial production.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B2331] hover:text-[#6E1B26]"
                >
                  Read Our Full Story <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. INSTAGRAM / SOCIAL GRID ("@fabindia" image mosaic) */}
      {/* ========================================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
            Community & Style Diary
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2A2A2A] mt-1">
            Styled by You • #FabindiaMoments
          </h2>
          <p className="text-xs text-[#6B6B6B] mt-1">
            Tag @fabindia on Instagram to be featured in our curated craft gallery
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden bg-[#F5EFE6] border border-[#E6E0D8] cursor-pointer"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] font-bold text-[#C5A059]">{post.tag}</span>
                <p className="text-[10px] text-stone-200 line-clamp-2 leading-tight mt-0.5 font-light">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. NEWSLETTER SIGNUP STRIP (Beige background) */}
      {/* ========================================================================= */}
      <section className="bg-[#F5EFE6] border-y border-[#E6E0D8] py-12 px-4 sm:px-8">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
            Join the Heritage Family
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#2A2A2A]">
            Subscribe & Enjoy 10% Off Your First Order
          </h3>
          <p className="text-xs text-[#6B6B6B] font-light">
            Be the first to know about seasonal collection launches, craft artisan documentaries, and private VIP sales.
          </p>

          {newsletterSubmitted ? (
            <div className="p-3.5 bg-white border border-[#8B2331] text-xs text-[#8B2331] font-semibold flex items-center justify-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#8B2331]" />
              <span>Thank you! Your 10% coupon FAB10 is ready to use at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address…"
                className="flex-1 px-4 py-3 bg-white text-xs text-[#2A2A2A] placeholder-[#6B6B6B] border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FLOATING WHATSAPP CHAT BUTTON (Green circle, bottom-right, fixed) */}
      {/* ========================================================================= */}
      <a
        href="https://wa.me/919810012345?text=Hello%20Fabindia,%20I%20have%20a%20query%20regarding%20my%20order"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Fabindia on WhatsApp"
        className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40 w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <svg className="w-7 h-7 fill-currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.073-2.18-.541-1.894-.784-3.111-2.715-3.206-2.842-.095-.127-.768-1.022-.768-1.95 0-.928.487-1.385.66-1.576.174-.191.38-.239.507-.239.127 0 .254.001.365.006.118.005.277-.044.433.332.162.391.554 1.353.603 1.452.049.099.082.215.016.345-.066.13-.099.211-.197.325-.098.114-.207.255-.296.342-.099.098-.202.204-.087.401.115.197.512.846 1.097 1.368.754.673 1.389.881 1.587.98.198.099.314.083.43-.05.116-.133.496-.577.628-.775.133-.198.265-.165.447-.099.182.066 1.155.545 1.353.644.198.099.33.149.38.232.049.083.049.48-.095.885z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.436 5.178L2 22l4.981-1.408A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.286c-1.637 0-3.161-.453-4.469-1.242l-.321-.194-2.955.836.838-2.887-.211-.336A8.257 8.257 0 0 1 3.714 12C3.714 7.431 7.431 3.714 12 3.714c4.569 0 8.286 3.717 8.286 8.286 0 4.569-3.717 8.286-8.286 8.286z"/>
        </svg>
      </a>
    </div>
  );
}
