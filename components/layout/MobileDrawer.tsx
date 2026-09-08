"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronUp, Search, Heart, User, ShoppingBag, MapPin, Globe } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCurrencyStore, COUNTRIES } from "@/store/currencyStore";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const itemCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { currentCountry, setCountry } = useCurrencyStore();

  if (!isOpen) return null;

  const toggleCategory = (id: string) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-[#FAF6F0] shadow-2xl flex flex-col z-50 animate-fade-in overflow-y-auto">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-[#E6E0D8] bg-white">
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#8B2331]">
              fabindia
            </span>
            <span className="block text-[8.5px] uppercase tracking-[0.25em] text-[#6B6B6B] font-semibold">
              CELEBRATE INDIA
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#2A2A2A] hover:text-[#8B2331] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Search Link */}
        <div className="p-4 border-b border-[#E6E0D8] bg-white">
          <Link
            href="/search"
            onClick={onClose}
            className="flex items-center gap-2.5 w-full bg-[#FAF6F0] px-3.5 py-2.5 text-xs text-[#6B6B6B] rounded-full border border-[#E6E0D8]"
          >
            <Search className="w-4 h-4 text-[#8B2331]" />
            <span>Search for Kurtas, Sarees, Home, Furniture…</span>
          </Link>
        </div>

        {/* Country & Currency Switcher */}
        <div className="px-4 py-3 bg-[#F5EFE6] border-b border-[#E6E0D8] flex items-center justify-between text-xs">
          <span className="text-[#6B6B6B] flex items-center gap-1.5 font-medium">
            <Globe className="w-3.5 h-3.5 text-[#8B2331]" /> Country & Currency:
          </span>
          <select
            value={currentCountry.code}
            onChange={(e) => {
              const match = COUNTRIES.find((c) => c.code === e.target.value);
              if (match) setCountry(match);
            }}
            className="bg-white border border-[#E6E0D8] text-xs py-1 px-2 rounded-none font-medium text-[#2A2A2A] focus:outline-none"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name} ({c.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Categories Accordions */}
        <div className="flex-1 divide-y divide-[#E6E0D8] py-2">
          {CATEGORIES.map((category) => {
            const isExpanded = expandedCategory === category.id;
            const isSale = category.slug === "sale";
            return (
              <div key={category.id} className="px-4 py-1">
                <div className="flex items-center justify-between py-2.5">
                  <Link
                    href={category.slug === "fabfamily" ? "/fabfamily" : `/category/${category.slug}`}
                    onClick={onClose}
                    className={`text-xs uppercase tracking-wider font-semibold ${
                      isSale ? "text-[#B3261E]" : "text-[#2A2A2A] hover:text-[#8B2331]"
                    }`}
                  >
                    {category.name}
                  </Link>
                  {category.subcategories.length > 0 && (
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="p-1 text-[#6B6B6B] hover:text-[#8B2331]"
                      aria-label="Toggle subcategories"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Subcategory list */}
                {isExpanded && (
                  <div className="pb-3 pl-3 space-y-4 text-xs animate-fade-in border-l-2 border-[#8B2331] ml-1 my-1">
                    {category.subcategories.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B2331] block">
                          {sub.title}
                        </span>
                        <ul className="space-y-1 pl-1">
                          {sub.items.map((item, iIdx) => (
                            <li key={iIdx}>
                              <Link
                                href={`/category/${category.slug}?sub=${encodeURIComponent(item)}`}
                                onClick={onClose}
                                className="text-[#6B6B6B] hover:text-[#8B2331] py-0.5 block"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Links & Footer in Drawer */}
        <div className="p-4 border-t border-[#E6E0D8] bg-white space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/stores"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 p-2 bg-[#FAF6F0] border border-[#E6E0D8] text-[#2A2A2A] font-medium hover:border-[#8B2331]"
            >
              <MapPin className="w-4 h-4 text-[#8B2331]" />
              <span>Store Locator</span>
            </Link>
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 p-2 bg-[#FAF6F0] border border-[#E6E0D8] text-[#2A2A2A] font-medium hover:border-[#8B2331]"
            >
              <User className="w-4 h-4 text-[#8B2331]" />
              <span>My Account</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 p-2 bg-[#FAF6F0] border border-[#E6E0D8] text-[#2A2A2A] font-medium hover:border-[#8B2331]"
            >
              <Heart className="w-4 h-4 text-[#8B2331]" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 p-2 bg-[#8B2331] text-white font-medium hover:bg-[#6E1B26]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart ({itemCount})</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
