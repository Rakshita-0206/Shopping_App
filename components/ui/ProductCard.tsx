"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useToastStore } from "@/store/toastStore";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);
  const { formatPrice } = useCurrencyStore();
  const { showToast } = useToastStore();

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const mrp = product.mrp || product.originalPrice || product.price;
  const hasDiscount = mrp > product.price;
  const discountPct =
    product.discountPct ||
    (hasDiscount ? Math.round(((mrp - product.price) / mrp) * 100) : 0);

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const color = product.colors[selectedColorIdx]?.name || "Standard";
    addItem(product, size, color, 1);
    setQuickAdded(true);
    setShowSizes(false);
    showToast({
      title: "Added to Bag",
      description: `${product.name} (Size: ${size})`,
    });
    setTimeout(() => setQuickAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast({
      title: wishlisted ? "Removed from Wishlist" : "Saved to Wishlist",
      description: product.name,
    });
  };

  return (
    <div
      className="group relative flex flex-col bg-white border border-[#E6E0D8] transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      {/* Product Image Container with 2-Image Hover Flip */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF6F0]">
        <Link href={`/product/${product.id}`} className="relative block w-full h-full">
          {/* Primary Image */}
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            priority={priority}
            className={`object-cover object-top transition-opacity duration-500 ${
              isHovered && secondaryImage ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Secondary Hover Image */}
          {secondaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              className={`object-cover object-top transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Tag Badges (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.tag && (
            <span
              className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-xs ${
                product.tag === "Bestseller"
                  ? "bg-[#1F2A44] text-white"
                  : product.tag.includes("Sale") || product.tag.includes("Off")
                  ? "bg-[#B3261E] text-white"
                  : "bg-[#8B2331] text-white"
              }`}
            >
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#2A2A2A] hover:text-[#8B2331] transition-all z-10 shadow-xs hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? "fill-[#8B2331] text-[#8B2331]" : "text-[#2A2A2A]"
            }`}
          />
        </button>

        {/* Quick Add To Bag on Hover (Slide up from bottom of image) */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs border-t border-[#E6E0D8] p-2 transition-all duration-300 z-20 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          {showSizes ? (
            <div className="space-y-1.5 animate-fade-in">
              <span className="text-[10px] font-bold uppercase text-[#6B6B6B] block text-center">
                Select Size
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAdd(size, e)}
                    className="text-[11px] font-semibold px-2 py-1 bg-white border border-[#E6E0D8] hover:border-[#8B2331] hover:bg-[#8B2331] hover:text-white transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.sizes.length === 1 && product.sizes[0] === "Free Size") {
                  handleQuickAdd("Free Size", e);
                } else {
                  setShowSizes(true);
                }
              }}
              className="w-full py-2 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              {quickAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Product Details Block */}
      <div className="flex flex-col flex-1 p-3.5 space-y-1.5">
        {/* Fabric / Subcategory & Rating */}
        <div className="flex items-center justify-between text-[11px] text-[#6B6B6B]">
          <span className="truncate uppercase tracking-wider text-[9.5px] font-medium text-[#8B2331]">
            {product.fabric || product.subcategory}
          </span>
          {product.rating > 0 && (
            <span className="flex items-center gap-0.5 text-stone-700 shrink-0 font-medium">
              <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
              {product.rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Product Title */}
        <Link href={`/product/${product.id}`} className="block group-hover:text-[#8B2331] transition-colors">
          <h3 className="text-xs sm:text-[13px] font-medium text-[#2A2A2A] line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Price Row: Selling Price + Strike-through MRP + Discount % */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-sm sm:text-base font-bold text-[#2A2A2A]">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xs text-[#6B6B6B] line-through">
                {formatPrice(mrp)}
              </span>
              <span className="text-xs font-bold text-[#B3261E]">
                ({discountPct}% off)
              </span>
            </>
          )}
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1.5">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColorIdx(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColorIdx === idx
                    ? "ring-1 ring-[#8B2331] scale-110 border-white"
                    : "border-[#E6E0D8] hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select color ${color.name}`}
              />
            ))}
            {product.colors.length > 1 && (
              <span className="text-[10px] text-[#6B6B6B] ml-1">
                +{product.colors.length - 1}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
