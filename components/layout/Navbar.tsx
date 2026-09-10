"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  User,
  Heart,
  ShoppingBag,
  MapPin,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import MegaMenu from "@/components/layout/MegaMenu";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCurrencyStore, COUNTRIES } from "@/store/currencyStore";

const POPULAR_SEARCHES = [
  "Chikankari Kurtas",
  "Chanderi Silk Sarees",
  "Khadi Shirts for Men",
  "Sheesham Wood Table",
  "Raw Forest Honey",
  "Wool Kilim Rugs",
  "FabEssentials Kumkumadi",
  "Kids Festive Wear",
];

export default function Navbar() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { currentCountry, setCountry } = useCurrencyStore();

  const handleMouseEnterCategory = (categoryId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveCategory(categoryId);
  };

  const handleMouseLeaveNav = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 280);
  };

  const handleMouseEnterMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeaveMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 280);
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    setIsSearchFocused(false);
  };

  const currentCategoryData = CATEGORIES.find((c) => c.id === activeCategory);
  const hasMegaMenu = ["women", "men", "kids", "home-living", "furniture", "food", "collection"].includes(
    activeCategory || ""
  );

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-shadow duration-300 bg-white border-b border-[#E6E0D8] ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Top Header Bar */}
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#2A2A2A] hover:text-[#8B2331]"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Left: Brand Wordmark */}
            <div className="flex items-center">
              <Link href="/" className="group flex flex-col items-start justify-center">
                <span className="font-serif text-3xl sm:text-[34px] font-bold tracking-tight text-[#8B2331] leading-none select-none">
                  fabindia
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] font-semibold uppercase tracking-[0.32em] text-[#6B6B6B] group-hover:text-[#8B2331] transition-colors mt-1 select-none">
                  CELEBRATE INDIA
                </span>
              </Link>

              {/* Desktop Country / Currency Selector */}
              <div ref={countryRef} className="relative hidden md:block ml-8 border-l border-[#E6E0D8] pl-6">
                <button
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className="flex items-center gap-1.5 text-xs text-[#2A2A2A] hover:text-[#8B2331] py-1 font-medium transition-colors"
                  aria-label="Select Country and Currency"
                >
                  <span className="text-base">{currentCountry.flag}</span>
                  <span>{currentCountry.name}</span>
                  <span className="text-[#6B6B6B]">({currentCountry.currency})</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B6B6B]" />
                </button>

                {isCountryOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#E6E0D8] shadow-lg py-1.5 z-50 animate-fade-in">
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCountry(c);
                          setIsCountryOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-4 py-2 text-xs text-left hover:bg-[#FAF6F0] transition-colors ${
                          currentCountry.code === c.code ? "bg-[#F5EFE6] font-semibold text-[#8B2331]" : "text-[#2A2A2A]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{c.flag}</span>
                          <span>{c.name}</span>
                        </span>
                        <span className="text-[#6B6B6B] font-mono">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Center: Search Bar (Pill with Dropdown Suggestions) */}
            <div ref={searchRef} className="relative flex-1 max-w-lg hidden sm:block mx-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search here…"
                  className="w-full h-10 pl-4 pr-10 bg-[#FAF6F0] hover:bg-[#F5EFE6] focus:bg-white text-xs text-[#2A2A2A] placeholder-[#6B6B6B] rounded-full border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#8B2331]"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Suggestions Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E6E0D8] shadow-xl rounded-xl p-4 z-50 animate-fade-in">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8B2331] uppercase tracking-wider mb-2.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {POPULAR_SEARCHES.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSuggestionClick(item)}
                        className="text-xs bg-[#FAF6F0] hover:bg-[#8B2331] hover:text-white text-[#2A2A2A] px-3 py-1.5 rounded-full border border-[#E6E0D8] transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-[#E6E0D8] flex items-center justify-between text-[11px] text-[#6B6B6B]">
                    <span>Popular Departments:</span>
                    <div className="flex gap-2">
                      <Link href="/category/women" onClick={() => setIsSearchFocused(false)} className="hover:text-[#8B2331] underline">Women</Link>
                      <Link href="/category/men" onClick={() => setIsSearchFocused(false)} className="hover:text-[#8B2331] underline">Men</Link>
                      <Link href="/category/home-living" onClick={() => setIsSearchFocused(false)} className="hover:text-[#8B2331] underline">Home</Link>
                      <Link href="/category/furniture" onClick={() => setIsSearchFocused(false)} className="hover:text-[#8B2331] underline">Furniture</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Icon Cluster (Store Locator, Account, Wishlist, Cart) */}
            <div className="flex items-center space-x-5 sm:space-x-6">
              {/* Store Locator */}
              <Link
                href="/stores"
                className="hidden md:flex flex-col items-center text-[#2A2A2A] hover:text-[#8B2331] transition-colors group"
                aria-label="Stores Locator"
              >
                <MapPin className="w-5 h-5 text-[#2A2A2A] group-hover:text-[#8B2331] transition-colors" />
                <span className="text-[10px] font-medium tracking-wide mt-0.5">Stores</span>
              </Link>

              {/* Account / User */}
              <Link
                href="/account"
                className="flex flex-col items-center text-[#2A2A2A] hover:text-[#8B2331] transition-colors group"
                aria-label="My Account"
              >
                <User className="w-5 h-5 text-[#2A2A2A] group-hover:text-[#8B2331] transition-colors" />
                <span className="text-[10px] font-medium tracking-wide mt-0.5 hidden sm:block">Account</span>
              </Link>

              {/* Wishlist with Badge */}
              <Link
                href="/wishlist"
                className="relative flex flex-col items-center text-[#2A2A2A] hover:text-[#8B2331] transition-colors group"
                aria-label="Wishlist"
              >
                <div className="relative">
                  <Heart className="w-5 h-5 text-[#2A2A2A] group-hover:text-[#8B2331] transition-colors" />
                  {mounted && wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#8B2331] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-wide mt-0.5 hidden sm:block">Wishlist</span>
              </Link>

              {/* Cart Bag with Badge */}
              <button
                onClick={toggleCart}
                className="relative flex flex-col items-center text-[#2A2A2A] hover:text-[#8B2331] transition-colors group"
                aria-label="Open Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#2A2A2A] group-hover:text-[#8B2331] transition-colors" />
                  {mounted && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#8B2331] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-wide mt-0.5 hidden sm:block">Cart</span>
              </button>
            </div>
          </div>

          {/* Primary Horizontal Navigation Bar */}
          <nav
            className="hidden lg:flex items-center justify-center space-x-7 border-t border-[#E6E0D8] text-[13px] tracking-[0.06em] font-medium uppercase"
            onMouseLeave={handleMouseLeaveNav}
          >
            {CATEGORIES.map((category) => {
              const isSale = category.slug === "sale";
              return (
                <div
                  key={category.id}
                  className="relative py-3.5"
                  onMouseEnter={() => handleMouseEnterCategory(category.id)}
                >
                  <Link
                    href={category.slug === "fabfamily" ? "/fabfamily" : `/category/${category.slug}`}
                    className={`transition-colors relative py-1 ${
                      isSale
                        ? "text-[#B3261E] font-bold hover:text-[#8B2331]"
                        : activeCategory === category.id
                        ? "text-[#8B2331] font-semibold"
                        : "text-[#2A2A2A] hover:text-[#8B2331]"
                    }`}
                  >
                    {category.name}
                    {activeCategory === category.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B2331]" />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Full-width Mega Menu Dropdown */}
        {hasMegaMenu && currentCategoryData && (
          <MegaMenu
            category={currentCategoryData}
            onClose={() => setActiveCategory(null)}
            onMouseEnter={handleMouseEnterMenu}
            onMouseLeave={handleMouseLeaveMenu}
          />
        )}
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
