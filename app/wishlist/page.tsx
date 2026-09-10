"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useToastStore } from "@/store/toastStore";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { items, clearWishlist } = useWishlistStore();
  const { showToast } = useToastStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
        <p className="text-xs text-[#6B6B6B]">Loading your wishlist…</p>
      </div>
    );
  }

  const savedProducts = PRODUCTS.filter((p) => items.includes(p.id));

  const handleClearWishlist = () => {
    clearWishlist();
    showToast({
      title: "Wishlist Cleared",
      description: "All saved items have been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E6E0D8]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Wishlist" }]} />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E0D8]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
              Saved For Later
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#2A2A2A] mt-0.5">
              My Wishlist ({savedProducts.length})
            </h1>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="text-xs text-[#6B6B6B] hover:text-[#B3261E] underline font-medium"
            >
              Clear Entire Wishlist
            </button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div className="max-w-md mx-auto py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white border border-[#E6E0D8] mx-auto flex items-center justify-center text-[#6B6B6B]">
              <Heart className="w-8 h-8 text-[#8B2331]" />
            </div>
            <h3 className="font-serif text-xl text-[#2A2A2A]">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Save your favorite handblock kurtas, silk sarees, and solid wood furniture by clicking the heart icon on any product.
            </p>
            <div className="pt-2">
              <Link
                href="/category/women"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
