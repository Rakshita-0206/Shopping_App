"use client";

import { useState, useMemo, useEffect, use, Suspense } from "react";
import Image from "next/image";
import { notFound, redirect, useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  X,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Check,
  Scissors,
  Home as HomeIcon,
  Gift,
  Calendar,
  Sparkles,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useCurrencyStore } from "@/store/currencyStore";
import { useToastStore } from "@/store/toastStore";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const OCCASIONS = ["Festive", "Everyday Casual", "Wedding", "Office Wear"];

const matchesSubcategory = (product: (typeof PRODUCTS)[0], query: string) => {
  const q = query.toLowerCase().trim();
  const pSub = product.subcategory.toLowerCase();
  const pName = product.name.toLowerCase();
  const pDesc = (product.description || "").toLowerCase();
  const pFabric = (product.fabric || "").toLowerCase();
  const pStory = (product.artisanStory || "").toLowerCase();

  // 1. Direct equality or substring containment in subcategory
  if (pSub === q || pSub.includes(q) || q.includes(pSub)) return true;

  // 2. Tokenized word matching
  const words = q
    .split(/[\s,&/()]+/)
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length >= 4);

  const productText = `${pSub} ${pName} ${pDesc} ${pFabric} ${pStory}`;
  const hasWordMatch = words.some((w) => {
    const stem = w.endsWith("s") ? w.slice(0, -1) : w;
    return productText.includes(stem);
  });
  if (hasWordMatch) return true;

  return false;
};

// =========================================================================
// SERVICES LANDING COMPONENT (FOR /category/services)
// =========================================================================
function ServicesLanding() {
  const { showToast } = useToastStore();
  const [serviceType, setServiceType] = useState("Custom Tailoring");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCity, setClientCity] = useState("New Delhi");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone || clientPhone.length < 10) {
      showToast({ title: "Invalid Phone", description: "Please enter a valid 10-digit mobile number." });
      return;
    }
    setIsBooked(true);
    showToast({
      title: "Consultation Requested!",
      description: `Our specialist will contact you shortly for ${serviceType}.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] pb-24 space-y-12">
      {/* Editorial Banner */}
      <div className="relative bg-[#1F2A44] text-white py-16 px-6 sm:px-12 text-center overflow-hidden border-b border-[#E6E0D8]">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#C5A059]">
            Bespoke Artisanal Services
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-white">
            Tailored Experiences, Thoughtfully Crafted
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
            From made-to-measure ethnic tailoring and personalized home styling to customized corporate craft hampers, experience Fabindia's bespoke craftsmanship.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ label: "Services", href: "/category/services" }]} />

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 border border-[#E6E0D8] space-y-3 shadow-xs">
            <div className="w-10 h-10 bg-[#FAF6F0] border border-[#E6E0D8] flex items-center justify-center text-[#8B2331]">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2A2A2A]">Custom Tailoring & Alterations</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Personalized made-to-measure stitching for kurtas, bundis, trousers, and blouses using handloom fabrics.
            </p>
            <ul className="text-[11px] text-[#2A2A2A] space-y-1 pt-2 border-t border-[#E6E0D8]">
              <li>• Precision bespoke fit</li>
              <li>• Custom collar & button styling</li>
              <li>• Available at 350+ stores</li>
            </ul>
          </div>

          <div className="bg-white p-6 border border-[#E6E0D8] space-y-3 shadow-xs">
            <div className="w-10 h-10 bg-[#FAF6F0] border border-[#E6E0D8] flex items-center justify-center text-[#8B2331]">
              <HomeIcon className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2A2A2A]">Home Interior Consultations</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Expert interior stylists help design living spaces with handwoven kilims, seasoned Sheesham wood, and handcrafted lamps.
            </p>
            <ul className="text-[11px] text-[#2A2A2A] space-y-1 pt-2 border-t border-[#E6E0D8]">
              <li>• In-store or in-home visits</li>
              <li>• Material & palette curation</li>
              <li>• Rug & curtain sizing</li>
            </ul>
          </div>

          <div className="bg-white p-6 border border-[#E6E0D8] space-y-3 shadow-xs">
            <div className="w-10 h-10 bg-[#FAF6F0] border border-[#E6E0D8] flex items-center justify-center text-[#8B2331]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2A2A2A]">Bespoke Curtain & Drapery</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Select pure linen or handloom cotton drapery fabrics customized to your exact window dimensions with custom pleating.
            </p>
            <ul className="text-[11px] text-[#2A2A2A] space-y-1 pt-2 border-t border-[#E6E0D8]">
              <li>• Free window measurements</li>
              <li>• Blackout & sheer lining</li>
              <li>• Professional installation</li>
            </ul>
          </div>

          <div className="bg-white p-6 border border-[#E6E0D8] space-y-3 shadow-xs">
            <div className="w-10 h-10 bg-[#FAF6F0] border border-[#E6E0D8] flex items-center justify-center text-[#8B2331]">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2A2A2A]">Corporate & Artisanal Gifting</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Thoughtful handloom and certified organic food hampers tailored for corporate milestones, weddings, and festivals.
            </p>
            <ul className="text-[11px] text-[#2A2A2A] space-y-1 pt-2 border-t border-[#E6E0D8]">
              <li>• Custom branding & monogramming</li>
              <li>• Eco-friendly handloom packaging</li>
              <li>• Pan-India multi-address shipping</li>
            </ul>
          </div>
        </div>

        {/* Interactive Consultation Request Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 border border-[#E6E0D8] shadow-sm space-y-6">
          <div className="text-center space-y-1 pb-4 border-b border-[#E6E0D8]">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B2331]">
              Schedule an Appointment
            </span>
            <h2 className="font-serif text-2xl text-[#2A2A2A]">Book Your Personalized Service</h2>
            <p className="text-xs text-[#6B6B6B]">
              Our artisanal styling specialists will get in touch with you within 24 hours.
            </p>
          </div>

          {isBooked ? (
            <div className="p-6 bg-[#FAF6F0] border border-[#8B2331] text-center space-y-3 animate-fade-in">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2A2A2A]">Consultation Requested!</h3>
              <p className="text-xs text-[#6B6B6B]">
                Thank you, {clientName || "Valued Patron"}. Our master consultant for {serviceType} will call you at {clientPhone} to confirm the appointment.
              </p>
              <button
                onClick={() => setIsBooked(false)}
                className="px-6 py-2 bg-[#8B2331] text-white text-xs font-bold uppercase tracking-wider"
              >
                Book Another Service
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#2A2A2A] block mb-1">Select Service</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF6F0] border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
                >
                  <option value="Custom Tailoring">Custom Tailoring & Alterations</option>
                  <option value="Home Interior Consultation">Home Interior Consultation</option>
                  <option value="Bespoke Curtains">Bespoke Curtain & Drapery Stitching</option>
                  <option value="Corporate Artisanal Gifting">Corporate & Artisanal Gifting</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#2A2A2A] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="E.g. Meera Nambiar"
                    className="w-full p-2.5 border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#2A2A2A] block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="9876543210"
                    className="w-full p-2.5 border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#2A2A2A] block mb-1">City / Preferred Store</label>
                  <select
                    value={clientCity}
                    onChange={(e) => setClientCity(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF6F0] border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
                  >
                    <option value="New Delhi">New Delhi (GK-1 / Connaught Place)</option>
                    <option value="Mumbai">Mumbai (Kala Ghoda / Bandra)</option>
                    <option value="Bengaluru">Bengaluru (Indiranagar / Koramangala)</option>
                    <option value="Chennai">Chennai (Nungambakkam)</option>
                    <option value="Kolkata">Kolkata (Park Street)</option>
                    <option value="Jaipur">Jaipur (C-Scheme)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#2A2A2A] block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full p-2.5 border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#2A2A2A] block mb-1">Notes or Specific Requirements</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share details about fabrics, dimensions, or event timelines…"
                  className="w-full p-2.5 border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-xs"
              >
                Confirm Consultation Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// MAIN PLP CATEGORY CONTENT
// =========================================================================
function CategoryContent({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (slug === "fabfamily") {
    redirect("/fabfamily");
  }

  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  if (slug === "services") {
    return <ServicesLanding />;
  }

  const { formatPrice } = useCurrencyStore();

  // Collapsible accordion states for filters
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    subcategory: true,
    price: true,
    size: true,
    color: true,
    occasion: true,
    fabric: true,
    discount: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter States initialized from URL params
  const initialSub = searchParams.get("sub");
  const initialSize = searchParams.get("size");
  const initialColor = searchParams.get("color");
  const initialFabric = searchParams.get("fabric");
  const initialOccasion = searchParams.get("occasion");
  const initialSort = searchParams.get("sort") || "featured";
  const initialMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 25000;
  const initialMinDiscount = searchParams.get("discount") ? Number(searchParams.get("discount")) : 0;

  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    initialSub ? initialSub.split(",") : []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    initialColor ? initialColor.split(",") : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    initialSize ? initialSize.split(",") : []
  );
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>(
    initialFabric ? initialFabric.split(",") : []
  );
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    initialOccasion ? initialOccasion.split(",") : []
  );
  const [minDiscount, setMinDiscount] = useState<number>(initialMinDiscount);
  const [maxPrice, setMaxPrice] = useState<number>(initialMaxPrice);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync state to URL Query Parameters seamlessly
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedSubcategories.length > 0) params.set("sub", selectedSubcategories.join(","));
    if (selectedColors.length > 0) params.set("color", selectedColors.join(","));
    if (selectedSizes.length > 0) params.set("size", selectedSizes.join(","));
    if (selectedFabrics.length > 0) params.set("fabric", selectedFabrics.join(","));
    if (selectedOccasions.length > 0) params.set("occasion", selectedOccasions.join(","));
    if (minDiscount > 0) params.set("discount", String(minDiscount));
    if (maxPrice < 25000) params.set("maxPrice", String(maxPrice));
    if (sortBy !== "featured") params.set("sort", sortBy);

    const qs = params.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;
    window.history.replaceState(null, "", newUrl);
  }, [
    selectedSubcategories,
    selectedColors,
    selectedSizes,
    selectedFabrics,
    selectedOccasions,
    minDiscount,
    maxPrice,
    sortBy,
    pathname,
  ]);

  // Available products for this category/page
  const categoryProducts = useMemo(() => {
    if (category.id === "new-arrivals") {
      return PRODUCTS.filter((p) => p.isNew || p.tag === "New" || p.tag === "Bestseller");
    }
    if (category.id === "sale") {
      return PRODUCTS.filter((p) => p.isSale || (p.mrp && p.mrp > p.price));
    }
    if (category.id === "collection") {
      return PRODUCTS.filter((p) => p.category === "collection" || p.tag === "Bestseller" || p.tag === "Festive");
    }
    const direct = PRODUCTS.filter((p) => p.category === category.id);
    return direct.length > 0 ? direct : PRODUCTS.slice(0, 10);
  }, [category.id]);

  const allSubcategories = useMemo(() => {
    const list = new Set<string>();
    category.subcategories?.forEach((group) => {
      group.items.forEach((item) => list.add(item));
    });
    categoryProducts.forEach((p) => list.add(p.subcategory));
    return Array.from(list);
  }, [category, categoryProducts]);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    categoryProducts.forEach((p) => {
      p.colors.forEach((c) => map.set(c.name, c.hex));
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [categoryProducts]);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    categoryProducts.forEach((p) => {
      p.sizes.forEach((s) => set.add(s));
    });
    return Array.from(set);
  }, [categoryProducts]);

  const allFabrics = useMemo(() => {
    const set = new Set<string>();
    categoryProducts.forEach((p) => {
      if (p.fabric) set.add(p.fabric.split(" ")[0]);
    });
    return Array.from(set);
  }, [categoryProducts]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return categoryProducts
      .filter((product) => {
        // Subcategory filter with smart matching
        if (selectedSubcategories.length > 0) {
          const matched = selectedSubcategories.some((sub) =>
            matchesSubcategory(product, sub)
          );
          if (!matched) return false;
        }

        // Max price filter
        if (product.price > maxPrice) {
          return false;
        }

        // Color filter
        if (
          selectedColors.length > 0 &&
          !product.colors.some((c) => selectedColors.includes(c.name))
        ) {
          return false;
        }

        // Size filter
        if (
          selectedSizes.length > 0 &&
          !product.sizes.some((s) => selectedSizes.includes(s))
        ) {
          return false;
        }

        // Fabric filter
        if (
          selectedFabrics.length > 0 &&
          !selectedFabrics.some((f) => product.fabric?.toLowerCase().includes(f.toLowerCase()))
        ) {
          return false;
        }

        // Occasion filter
        if (
          selectedOccasions.length > 0 &&
          !selectedOccasions.some((o) => (product.occasion || "").toLowerCase() === o.toLowerCase())
        ) {
          return false;
        }

        // Discount filter
        if (minDiscount > 0) {
          const mrp = product.mrp || product.originalPrice || product.price;
          const pct = Math.round(((mrp - product.price) / mrp) * 100);
          if (pct < minDiscount) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low-high") return a.price - b.price;
        if (sortBy === "price-high-low") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") {
          const pctA = a.discountPct || 0;
          const pctB = b.discountPct || 0;
          return pctB - pctA;
        }
        if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [
    categoryProducts,
    selectedSubcategories,
    maxPrice,
    selectedColors,
    selectedSizes,
    selectedFabrics,
    selectedOccasions,
    minDiscount,
    sortBy,
  ]);

  const activeFilterCount =
    selectedSubcategories.length +
    selectedColors.length +
    selectedSizes.length +
    selectedFabrics.length +
    selectedOccasions.length +
    (minDiscount > 0 ? 1 : 0) +
    (maxPrice < 25000 ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedSubcategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedFabrics([]);
    setSelectedOccasions([]);
    setMinDiscount(0);
    setMaxPrice(25000);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] pb-20">
      {/* Category Editorial Hero Banner - Full Width Image Spread */}
      <div className="relative w-full bg-[#FAF6F0] border-b border-[#E6E0D8] overflow-hidden">
        {/* Full-width Panoramic Banner Image */}
        <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[460px] xl:h-[500px] bg-[#E6E0D8]">
          <Image
            src={category.bannerImage}
            alt={category.name}
            fill
            priority
            className="object-cover object-[center_25%]"
            sizes="100vw"
          />
        </div>

        {/* Category Editorial Header & Popular Subcategories Bar */}
        <div className="bg-[#FAF6F0] border-t border-[#E6E0D8] py-4 sm:py-5">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B2331]">
                Artisanal Handcrafts • Heritage Edit
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-[#2A2A2A]">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#6B6B6B] font-normal leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Popular Subcategory Filter Pills */}
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1 md:pt-0 shrink-0 max-w-xl">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B2331] mr-1 hidden sm:inline">
                  Popular:
                </span>
                {category.subcategories.flatMap((s) => s.items).slice(0, 6).map((item) => {
                  const isActive = selectedSubcategories.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        if (isActive) {
                          setSelectedSubcategories(selectedSubcategories.filter((s) => s !== item));
                        } else {
                          setSelectedSubcategories([item]);
                        }
                      }}
                      className={`text-[11px] px-3.5 py-1.5 rounded-full border transition-all cursor-pointer font-medium ${
                        isActive
                          ? "bg-[#8B2331] text-white border-[#8B2331] shadow-xs"
                          : "bg-white text-[#2A2A2A] border-[#E6E0D8] hover:border-[#8B2331] hover:text-[#8B2331]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Breadcrumbs & Product Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E6E0D8]">
          <Breadcrumbs
            items={[
              { label: category.name, href: `/category/${category.slug}` },
              ...(selectedSubcategories.length === 1 ? [{ label: selectedSubcategories[0] }] : []),
            ]}
          />
          <span className="text-xs text-[#6B6B6B] font-medium">
            Showing <strong className="text-[#2A2A2A]">{filteredProducts.length}</strong> items
          </span>
        </div>

        {/* Toolbar: Filter Toggle & Sort Dropdown */}
        <div className="flex items-center justify-between py-4 border-b border-[#E6E0D8] mb-6">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E6E0D8] text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B2331]" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 text-xs text-[#6B6B6B]">
            <SlidersHorizontal className="w-4 h-4 text-[#8B2331]" />
            <span className="font-semibold uppercase tracking-wider text-[#2A2A2A]">
              Filter By
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-[#6B6B6B] hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E6E0D8] text-xs py-2 px-3 text-[#2A2A2A] font-medium focus:outline-none focus:border-[#8B2331] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low-high">Price Low→High</option>
              <option value="price-high-low">Price High→Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Applied Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
            <span className="text-xs text-[#6B6B6B] font-medium">Applied:</span>
            {selectedSubcategories.map((sub) => (
              <span
                key={sub}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E6E0D8] text-xs text-[#2A2A2A]"
              >
                {sub}
                <button
                  onClick={() => setSelectedSubcategories(selectedSubcategories.filter((s) => s !== sub))}
                  className="hover:text-[#8B2331] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedOccasions.map((occ) => (
              <span
                key={occ}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E6E0D8] text-xs text-[#2A2A2A]"
              >
                Occasion: {occ}
                <button
                  onClick={() => setSelectedOccasions(selectedOccasions.filter((o) => o !== occ))}
                  className="hover:text-[#8B2331] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedColors.map((col) => (
              <span
                key={col}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E6E0D8] text-xs text-[#2A2A2A]"
              >
                Color: {col}
                <button
                  onClick={() => setSelectedColors(selectedColors.filter((c) => c !== col))}
                  className="hover:text-[#8B2331] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedSizes.map((sz) => (
              <span
                key={sz}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E6E0D8] text-xs text-[#2A2A2A]"
              >
                Size: {sz}
                <button
                  onClick={() => setSelectedSizes(selectedSizes.filter((s) => s !== sz))}
                  className="hover:text-[#8B2331] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedFabrics.map((fb) => (
              <span
                key={fb}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E6E0D8] text-xs text-[#2A2A2A]"
              >
                Fabric: {fb}
                <button
                  onClick={() => setSelectedFabrics(selectedFabrics.filter((f) => f !== fb))}
                  className="hover:text-[#8B2331] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {maxPrice < 25000 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E6E0D8] text-xs text-[#2A2A2A]">
                Under {formatPrice(maxPrice)}
                <button onClick={() => setMaxPrice(25000)} className="hover:text-[#8B2331] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {minDiscount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E6E0D8] text-xs text-[#2A2A2A]">
                Min {minDiscount}% Off
                <button onClick={() => setMinDiscount(0)} className="hover:text-[#8B2331] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-[#8B2331] hover:underline ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Layout: Left Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Left Sidebar Filters (Collapsible) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4 pr-4 border-r border-[#E6E0D8]">
            {/* Subcategory Filter */}
            {allSubcategories.length > 0 && (
              <div className="border-b border-[#E6E0D8] pb-4">
                <button
                  onClick={() => toggleSection("subcategory")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#2A2A2A] py-1 cursor-pointer"
                >
                  <span>Subcategory</span>
                  {openSections.subcategory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSections.subcategory && (
                  <div className="space-y-2 mt-3 max-h-48 overflow-y-auto no-scrollbar">
                    {allSubcategories.map((sub) => {
                      const checked = selectedSubcategories.includes(sub);
                      return (
                        <label
                          key={sub}
                          className="flex items-center gap-2 text-xs text-[#2A2A2A] hover:text-[#8B2331] cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              if (checked) {
                                setSelectedSubcategories(selectedSubcategories.filter((s) => s !== sub));
                              } else {
                                setSelectedSubcategories([...selectedSubcategories, sub]);
                              }
                            }}
                            className="w-3.5 h-3.5 accent-[#8B2331]"
                          />
                          <span>{sub}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Occasion Filter */}
            <div className="border-b border-[#E6E0D8] pb-4">
              <button
                onClick={() => toggleSection("occasion")}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#2A2A2A] py-1 cursor-pointer"
              >
                <span>Occasion</span>
                {openSections.occasion ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {openSections.occasion && (
                <div className="space-y-2 mt-3">
                  {OCCASIONS.map((occ) => {
                    const checked = selectedOccasions.includes(occ);
                    return (
                      <label
                        key={occ}
                        className="flex items-center gap-2 text-xs text-[#2A2A2A] hover:text-[#8B2331] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            if (checked) {
                              setSelectedOccasions(selectedOccasions.filter((o) => o !== occ));
                            } else {
                              setSelectedOccasions([...selectedOccasions, occ]);
                            }
                          }}
                          className="w-3.5 h-3.5 accent-[#8B2331]"
                        />
                        <span>{occ}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Price Range Filter Slider */}
            <div className="border-b border-[#E6E0D8] pb-4">
              <button
                onClick={() => toggleSection("price")}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#2A2A2A] py-1 cursor-pointer"
              >
                <span>Price Range</span>
                {openSections.price ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {openSections.price && (
                <div className="space-y-3 mt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6B6B6B]">Max Price:</span>
                    <span className="font-semibold text-[#8B2331]">{formatPrice(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="25000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#8B2331] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#6B6B6B]">
                    <span>{formatPrice(500)}</span>
                    <span>{formatPrice(25000)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Size Filter */}
            {allSizes.length > 0 && (
              <div className="border-b border-[#E6E0D8] pb-4">
                <button
                  onClick={() => toggleSection("size")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#2A2A2A] py-1 cursor-pointer"
                >
                  <span>Size</span>
                  {openSections.size ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSections.size && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {allSizes.map((size) => {
                      const active = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => {
                            if (active) {
                              setSelectedSizes(selectedSizes.filter((s) => s !== size));
                            } else {
                              setSelectedSizes([...selectedSizes, size]);
                            }
                          }}
                          className={`text-xs px-2.5 py-1 border transition-colors cursor-pointer ${
                            active
                              ? "bg-[#8B2331] text-white border-[#8B2331]"
                              : "bg-white text-[#2A2A2A] border-[#E6E0D8] hover:border-[#8B2331]"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Color Swatch Filter */}
            {allColors.length > 0 && (
              <div className="border-b border-[#E6E0D8] pb-4">
                <button
                  onClick={() => toggleSection("color")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#2A2A2A] py-1 cursor-pointer"
                >
                  <span>Color</span>
                  {openSections.color ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSections.color && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {allColors.map((c) => {
                      const active = selectedColors.includes(c.name);
                      return (
                        <button
                          key={c.name}
                          onClick={() => {
                            if (active) {
                              setSelectedColors(selectedColors.filter((col) => col !== c.name));
                            } else {
                              setSelectedColors([...selectedColors, c.name]);
                            }
                          }}
                          className={`w-6 h-6 rounded-full border transition-transform flex items-center justify-center cursor-pointer ${
                            active
                              ? "ring-2 ring-[#8B2331] scale-110 border-white"
                              : "border-[#E6E0D8] hover:scale-105"
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                          aria-label={`Filter by color ${c.name}`}
                        >
                          {active && <Check className="w-3 h-3 text-white drop-shadow-xs" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Fabric Filter */}
            {allFabrics.length > 0 && (
              <div className="border-b border-[#E6E0D8] pb-4">
                <button
                  onClick={() => toggleSection("fabric")}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#2A2A2A] py-1 cursor-pointer"
                >
                  <span>Fabric</span>
                  {openSections.fabric ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSections.fabric && (
                  <div className="space-y-2 mt-3 max-h-36 overflow-y-auto no-scrollbar">
                    {allFabrics.map((fab) => {
                      const checked = selectedFabrics.includes(fab);
                      return (
                        <label
                          key={fab}
                          className="flex items-center gap-2 text-xs text-[#2A2A2A] hover:text-[#8B2331] cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              if (checked) {
                                setSelectedFabrics(selectedFabrics.filter((f) => f !== fab));
                              } else {
                                setSelectedFabrics([...selectedFabrics, fab]);
                              }
                            }}
                            className="w-3.5 h-3.5 accent-[#8B2331]"
                          />
                          <span>{fab}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Discount Filter */}
            <div className="pb-2">
              <button
                onClick={() => toggleSection("discount")}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#2A2A2A] py-1 cursor-pointer"
              >
                <span>Discount</span>
                {openSections.discount ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {openSections.discount && (
                <div className="space-y-1.5 text-xs mt-3">
                  {[10, 20, 30, 50].map((pct) => (
                    <label
                      key={pct}
                      className="flex items-center gap-2 cursor-pointer text-[#2A2A2A] hover:text-[#8B2331]"
                    >
                      <input
                        type="radio"
                        name="discount"
                        checked={minDiscount === pct}
                        onChange={() => setMinDiscount(minDiscount === pct ? 0 : pct)}
                        className="accent-[#8B2331]"
                      />
                      <span>{pct}% and above</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Product Grid: 2 cols mobile / 3-4 desktop */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E6E0D8] p-12 text-center space-y-3 my-8">
                <p className="text-base font-serif text-[#2A2A2A]">
                  No handcrafted pieces match your selected filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-[#8B2331] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6E1B26] cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                  {filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button / Pagination */}
                {visibleCount < filteredProducts.length && (
                  <div className="text-center pt-6">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 8)}
                      className="px-8 py-3 bg-white border border-[#8B2331] text-[#8B2331] hover:bg-[#8B2331] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Load More Products ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Bottom Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-h-[85vh] bg-white rounded-t-2xl shadow-2xl flex flex-col z-10 overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="p-4 border-b border-[#E6E0D8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#8B2331]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A2A2A]">
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </h3>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-[#6B6B6B] hover:text-[#2A2A2A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs divide-y divide-[#E6E0D8]">
              {/* Subcategories */}
              {allSubcategories.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold uppercase tracking-wider text-[#8B2331] block">
                    Subcategory
                  </span>
                  <div className="space-y-2">
                    {allSubcategories.map((sub) => {
                      const checked = selectedSubcategories.includes(sub);
                      return (
                        <label key={sub} className="flex items-center gap-2 text-[#2A2A2A] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              if (checked) {
                                setSelectedSubcategories(selectedSubcategories.filter((s) => s !== sub));
                              } else {
                                setSelectedSubcategories([...selectedSubcategories, sub]);
                              }
                            }}
                            className="accent-[#8B2331]"
                          />
                          <span>{sub}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Occasions */}
              <div className="pt-4 space-y-2">
                <span className="font-bold uppercase tracking-wider text-[#8B2331] block">
                  Occasion
                </span>
                <div className="space-y-2">
                  {OCCASIONS.map((occ) => {
                    const checked = selectedOccasions.includes(occ);
                    return (
                      <label key={occ} className="flex items-center gap-2 text-[#2A2A2A] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            if (checked) {
                              setSelectedOccasions(selectedOccasions.filter((o) => o !== occ));
                            } else {
                              setSelectedOccasions([...selectedOccasions, occ]);
                            }
                          }}
                          className="accent-[#8B2331]"
                        />
                        <span>{occ}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Slider */}
              <div className="pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold uppercase tracking-wider text-[#8B2331]">Max Price</span>
                  <span className="font-semibold text-[#2A2A2A]">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#8B2331]"
                />
              </div>

              {/* Sizes */}
              {allSizes.length > 0 && (
                <div className="pt-4 space-y-2">
                  <span className="font-bold uppercase tracking-wider text-[#8B2331] block">Size</span>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map((size) => {
                      const active = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => {
                            if (active) {
                              setSelectedSizes(selectedSizes.filter((s) => s !== size));
                            } else {
                              setSelectedSizes([...selectedSizes, size]);
                            }
                          }}
                          className={`px-3 py-1.5 border text-xs cursor-pointer ${
                            active
                              ? "bg-[#8B2331] text-white border-[#8B2331]"
                              : "bg-white border-[#E6E0D8] text-[#2A2A2A]"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-[#E6E0D8] flex gap-3 bg-white">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 bg-[#FAF6F0] border border-[#E6E0D8] text-xs font-bold uppercase tracking-wider text-[#2A2A2A] cursor-pointer"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#8B2331] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#8B2331] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CategoryContent {...props} />
    </Suspense>
  );
}
