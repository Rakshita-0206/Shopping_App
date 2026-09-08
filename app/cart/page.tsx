"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useFabfamilyStore } from "@/store/fabfamilyStore";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    couponCode,
    discountPercent,
    appliedFabcoins,
    applyCoupon,
    removeCoupon,
    applyFabcoins,
    removeFabcoins,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getGrandTotal,
    getItemCount,
  } = useCartStore();

  const { isMember, fabcoins } = useFabfamilyStore();
  const { formatPrice } = useCurrencyStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
        <div className="animate-pulse text-[#6B6B6B] font-serif text-xl">Loading your bag…</div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const shipping = getShippingFee();
  const total = getGrandTotal();
  const itemCount = getItemCount();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponMsg({ type: "success", text: `Coupon ${couponInput.toUpperCase()} applied successfully (10% Off)!` });
      setCouponInput("");
    } else {
      setCouponMsg({ type: "error", text: "Invalid code. Try FAB10 or HERITAGE10." });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMsg(null);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-white border border-[#E6E0D8] mx-auto flex items-center justify-center text-[#6B6B6B]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl text-[#2A2A2A]">Your Shopping Bag is Empty</h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md mx-auto">
          Explore our generational handlooms, pure vegetable-dyed kurtas, solid sheesham furniture, and organic food.
        </p>
        <div>
          <Link
            href="/category/women"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-none"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 space-y-8 bg-[#FAF6F0]">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shopping Bag" }]} />

      <div className="flex items-baseline justify-between border-b border-[#E6E0D8] pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-4xl text-[#2A2A2A]">
            Shopping Bag
          </h1>
          <p className="text-xs text-[#6B6B6B] mt-1">
            You have {itemCount} {itemCount === 1 ? "item" : "items"} crafted by rural artisans
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-[#6B6B6B] hover:text-[#B3261E] underline transition-colors"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item, idx) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
              className="flex flex-col sm:flex-row gap-5 p-5 bg-white border border-[#E6E0D8] shadow-xs"
            >
              {/* Image */}
              <div className="relative w-28 sm:w-32 aspect-[3/4] bg-[#FAF6F0] shrink-0 border border-[#E6E0D8]">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover object-top"
                  sizes="130px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <Link
                      href={`/product/${item.product.id}`}
                      className="font-serif text-base text-[#2A2A2A] hover:text-[#8B2331] leading-snug"
                    >
                      {item.product.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                      className="text-[#6B6B6B] hover:text-[#B3261E] p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 text-xs text-[#6B6B6B] pt-1">
                    <span>Size: <strong className="text-[#2A2A2A]">{item.selectedSize}</strong></span>
                    <span>Color: <strong className="text-[#2A2A2A]">{item.selectedColor}</strong></span>
                    <span>Fabric: <strong className="text-[#2A2A2A]">{item.product.fabric || "Handloom"}</strong></span>
                  </div>
                </div>

                {/* Stepper + Subtotal Price */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E6E0D8]">
                  <div className="flex items-center border border-[#E6E0D8] bg-[#FAF6F0]">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                      className="p-2 text-[#6B6B6B] hover:text-[#2A2A2A]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#2A2A2A]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                      className="p-2 text-[#6B6B6B] hover:text-[#2A2A2A]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm sm:text-base font-bold text-[#2A2A2A]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="block text-[11px] text-[#6B6B6B]">
                        ({formatPrice(item.product.price)} each)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping Link */}
          <div className="pt-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B2331] hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Promo code box */}
          <div className="p-5 bg-white border border-[#E6E0D8] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2A2A2A] uppercase tracking-wider">
              <Tag className="w-4 h-4 text-[#8B2331]" />
              <span>Apply Promo Code</span>
            </div>

            {discountPercent > 0 ? (
              <div className="flex items-center justify-between p-2.5 bg-[#FAF6F0] border border-[#8B2331] text-xs">
                <div className="flex items-center gap-2 text-[#8B2331]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-bold uppercase tracking-wider">{couponCode} ({discountPercent}% OFF)</span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-xs text-[#6B6B6B] hover:text-[#B3261E] underline font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter FAB10"
                  className="flex-1 px-3 py-2 text-xs bg-[#FAF6F0] border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {couponMsg && (
              <p
                className={`text-xs ${
                  couponMsg.type === "success" ? "text-emerald-700 font-medium" : "text-rose-600"
                }`}
              >
                {couponMsg.text}
              </p>
            )}
          </div>

          {/* Fabfamily Coins Box */}
          {isMember && (
            <div className="p-5 bg-white border border-[#E6E0D8] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#2A2A2A] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#8B2331]" />
                  <span>Fabfamily Coins</span>
                </div>
                <span className="text-[11px] font-semibold text-[#8B2331]">1 Coin = ₹1</span>
              </div>

              <div className="p-3 bg-[#FAF6F0] border border-[#E6E0D8] text-xs flex items-center justify-between gap-3">
                <div>
                  <span className="font-semibold text-[#2A2A2A] block">Available Balance</span>
                  <span className="text-sm font-bold text-[#8B2331]">{fabcoins} Coins</span>
                  <span className="text-[11px] text-[#6B6B6B] block">Worth {formatPrice(fabcoins)} discount</span>
                </div>

                {appliedFabcoins > 0 ? (
                  <button
                    onClick={() => removeFabcoins()}
                    className="text-xs font-bold text-[#8B2331] uppercase underline hover:text-[#6E1B26]"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => applyFabcoins(Math.min(fabcoins, Math.max(0, subtotal - discountAmount)))}
                    disabled={fabcoins <= 0}
                    className="px-3.5 py-1.5 bg-[#8B2331] hover:bg-[#6E1B26] disabled:bg-stone-300 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs"
                  >
                    Apply Coins
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Order Summary Box */}
          <div className="p-6 bg-white border border-[#E6E0D8] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2A2A2A] pb-3 border-b border-[#E6E0D8]">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-[#6B6B6B]">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-semibold text-[#2A2A2A]">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({couponCode})</span>
                  <span>- {formatPrice(discountAmount)}</span>
                </div>
              )}

              {appliedFabcoins > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Fabcoins Redeemed</span>
                  <span>- {formatPrice(appliedFabcoins)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="font-semibold text-[#2A2A2A]">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>

              {shipping > 0 && (
                <p className="text-[11px] text-amber-700 pt-1">
                  Add {formatPrice(1499 - subtotal)} more for free express shipping!
                </p>
              )}

              <div className="flex justify-between text-sm font-bold text-[#2A2A2A] pt-3 border-t border-[#E6E0D8]">
                <span>Total Amount</span>
                <span className="text-lg text-[#8B2331]">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors rounded-none shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#6B6B6B]">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>100% Verified Safe & Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
