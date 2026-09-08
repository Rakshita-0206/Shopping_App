"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  MapPin,
  Sparkles,
  Share2,
  Tag,
  Plus,
  Minus,
  Ruler,
  X,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Accordion from "@/components/ui/Accordion";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useToastStore } from "@/store/toastStore";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const { formatPrice } = useCurrencyStore();
  const { showToast } = useToastStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Standard");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<{ checked: boolean; msg: string; success: boolean } | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const mrp = product.mrp || product.originalPrice || product.price;
  const hasDiscount = mrp > product.price;
  const discountPct =
    product.discountPct ||
    (hasDiscount ? Math.round(((mrp - product.price) / mrp) * 100) : 0);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const completeLookProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === "home-living" || p.category === "women")
  ).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    showToast({
      title: "Added to Bag",
      description: `${quantity} × ${product.name} (${selectedSize})`,
    });
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);
    showToast({
      title: wishlisted ? "Removed from Wishlist" : "Saved to Wishlist",
      description: product.name,
    });
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setPincodeStatus({
        checked: true,
        success: true,
        msg: "Delivery available by " + new Date(Date.now() + 3 * 86400000).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) + " • Cash on Delivery available",
      });
    } else {
      setPincodeStatus({
        checked: true,
        success: false,
        msg: "Please enter a valid 6-digit Indian PIN code.",
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] pb-24">
      {/* Breadcrumb row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E6E0D8]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: product.categoryName, href: `/category/${product.category}` },
            { label: product.subcategory, href: `/category/${product.category}?sub=${encodeURIComponent(product.subcategory)}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* ========================================================================= */}
          {/* LEFT: IMAGE GALLERY (Vertical Thumbnails + Main Zoom Image) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Vertical Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 sm:w-20 aspect-[3/4] border transition-all shrink-0 bg-white ${
                    selectedImageIndex === idx
                      ? "border-[#8B2331] ring-1 ring-[#8B2331]"
                      : "border-[#E6E0D8] opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>

            {/* Main Interactive Zoom Display */}
            <div
              className="relative flex-1 aspect-[3/4] overflow-hidden bg-white border border-[#E6E0D8] cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className={`object-cover object-top transition-transform duration-200 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      }
                    : undefined
                }
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {product.tag && (
                <span className="absolute top-4 left-4 bg-[#8B2331] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 z-10">
                  {product.tag}
                </span>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: PRODUCT DETAILS & BUY BOX */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title, Category & Ratings */}
            <div className="space-y-1.5 pb-4 border-b border-[#E6E0D8]">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8B2331]">
                {product.categoryName} • {product.subcategory}
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-normal text-[#2A2A2A] leading-snug">
                {product.name}
              </h1>

              {product.rating > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex items-center gap-1 bg-[#F5EFE6] px-2 py-0.5 border border-[#E6E0D8]">
                    <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                    <span className="text-xs font-bold text-[#2A2A2A]">{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-[#6B6B6B]">
                    ({product.reviewsCount} verified reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price Box */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#2A2A2A]">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm sm:text-base text-[#6B6B6B] line-through">
                      {formatPrice(mrp)}
                    </span>
                    <span className="text-sm font-bold text-[#B3261E]">
                      ({discountPct}% OFF)
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-[#6B6B6B]">Inclusive of all taxes</p>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              {product.description}
            </p>

            {/* Promotional Offers & Coupons Strip */}
            <div className="bg-[#F5EFE6] border border-[#E6E0D8] p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8B2331] uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" /> Special Offers & Coupons
              </div>
              <ul className="text-xs text-[#2A2A2A] space-y-1 pl-1">
                <li>• <strong>FAB10</strong>: Flat 10% off on first handcrafted order.</li>
                <li>• <strong>FREESHIP</strong>: Free shipping on all orders over ₹1,499.</li>
                <li>• 5% instant cashback on UPI & RuPay cards.</li>
              </ul>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2A2A2A]">
                  Color: <span className="font-normal text-[#6B6B6B]">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                        selectedColor === c.name
                          ? "ring-2 ring-[#8B2331] border-white scale-110"
                          : "border-[#E6E0D8] hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && <Check className="w-3.5 h-3.5 text-white drop-shadow-xs" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector + Size Guide Modal Trigger */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2A2A2A]">
                  Select Size
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#8B2331] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                      selectedSize === s
                        ? "bg-[#8B2331] text-white border-[#8B2331]"
                        : "bg-white text-[#2A2A2A] border-[#E6E0D8] hover:border-[#8B2331]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2A2A2A]">
                Quantity
              </span>
              <div className="flex items-center border border-[#E6E0D8] w-fit bg-white">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-2 text-[#6B6B6B] hover:text-[#2A2A2A] hover:bg-[#FAF6F0]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-bold text-[#2A2A2A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-2 text-[#6B6B6B] hover:text-[#2A2A2A] hover:bg-[#FAF6F0]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Bag (Maroon) + Add to Wishlist */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors rounded-none shadow-md"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Bag
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`px-5 py-3.5 border transition-colors rounded-none ${
                  wishlisted
                    ? "bg-[#8B2331] text-white border-[#8B2331]"
                    : "bg-white text-[#2A2A2A] border-[#E6E0D8] hover:border-[#8B2331] hover:text-[#8B2331]"
                }`}
                aria-label="Add to Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-white" : ""}`} />
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="pt-4 border-t border-[#E6E0D8] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2A2A2A] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8B2331]" /> Check Delivery & COD
              </span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 bg-white text-xs border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1F2A44] hover:bg-[#162035] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className={`text-xs mt-1 ${pincodeStatus.success ? "text-emerald-700 font-medium" : "text-rose-600"}`}>
                  {pincodeStatus.msg}
                </p>
              )}
            </div>

            {/* Accordions: Details, Fabric & Care, Shipping, Craft Story */}
            <div className="pt-4 border-t border-[#E6E0D8] space-y-1">
              <Accordion title="Product Details" defaultOpen>
                <div className="text-xs text-[#6B6B6B] space-y-2 leading-relaxed">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>SKU: FAB-{product.id.toUpperCase()}</li>
                    <li>Craft Cluster: Handloom Weaves of India</li>
                    <li>Fit: Regular Contemporary Silhouette</li>
                  </ul>
                </div>
              </Accordion>

              <Accordion title="Fabric & Care">
                <div className="text-xs text-[#6B6B6B] space-y-1.5 leading-relaxed">
                  {product.fabricAndCare.map((item, idx) => (
                    <p key={idx}>• {item}</p>
                  ))}
                </div>
              </Accordion>

              <Accordion title="Shipping & Returns">
                <div className="text-xs text-[#6B6B6B] space-y-2 leading-relaxed">
                  <p>{product.shippingInfo}</p>
                  <p>
                    Easy 14-day return and exchange policy. Free doorstep return pickup available for eligible pin codes across India.
                  </p>
                </div>
              </Accordion>

              <Accordion title="The Craft / Artisan Story">
                <div className="text-xs text-[#6B6B6B] space-y-2 leading-relaxed bg-[#FAF6F0] p-3 border-l-2 border-[#8B2331]">
                  <p className="font-serif italic text-stone-700">
                    "{product.artisanStory}"
                  </p>
                  <p className="text-[11px] text-[#8B2331] font-semibold">
                    Directly empowering generational artisan clusters through ethical fair wages.
                  </p>
                </div>
              </Accordion>
            </div>
          </div>
        </div>

        {/* You May Also Like Product Rail */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#E6E0D8]">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
                Curated Recommendations
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#2A2A2A] mt-1">
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Complete the Look Rail */}
        {completeLookProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#E6E0D8]">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
                Styling Essentials
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#2A2A2A] mt-1">
                Complete The Look
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {completeLookProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fade-in border border-[#E6E0D8]">
            <div className="flex items-center justify-between border-b border-[#E6E0D8] pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B2331] flex items-center gap-2">
                <Ruler className="w-4 h-4" /> Size Guide (Inches)
              </h3>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-[#6B6B6B] hover:text-[#2A2A2A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#6B6B6B]">
              Standard garment measurements for a relaxed handcrafted fit. Measurements are in inches.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-[#E6E0D8]">
                <thead className="bg-[#FAF6F0] font-bold uppercase text-[#2A2A2A]">
                  <tr>
                    <th className="p-2 border border-[#E6E0D8]">Size</th>
                    <th className="p-2 border border-[#E6E0D8]">Chest (in)</th>
                    <th className="p-2 border border-[#E6E0D8]">Waist (in)</th>
                    <th className="p-2 border border-[#E6E0D8]">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E0D8] text-[#6B6B6B]">
                  <tr>
                    <td className="p-2 font-bold text-[#2A2A2A]">XS / 36</td>
                    <td className="p-2">38</td>
                    <td className="p-2">34</td>
                    <td className="p-2">42</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-[#2A2A2A]">S / 38</td>
                    <td className="p-2">40</td>
                    <td className="p-2">36</td>
                    <td className="p-2">43</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-[#2A2A2A]">M / 40</td>
                    <td className="p-2">42</td>
                    <td className="p-2">38</td>
                    <td className="p-2">44</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-[#2A2A2A]">L / 42</td>
                    <td className="p-2">44</td>
                    <td className="p-2">40</td>
                    <td className="p-2">44.5</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-[#2A2A2A]">XL / 44</td>
                    <td className="p-2">46</td>
                    <td className="p-2">42</td>
                    <td className="p-2">45</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="px-5 py-2 bg-[#8B2331] text-white text-xs font-bold uppercase tracking-wider"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
