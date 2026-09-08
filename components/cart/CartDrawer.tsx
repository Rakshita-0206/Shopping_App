"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Award } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useFabfamilyStore } from "@/store/fabfamilyStore";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getShippingFee,
    getGrandTotal,
    getItemCount,
    appliedFabcoins,
    applyFabcoins,
    removeFabcoins,
  } = useCartStore();

  const { isMember, fabcoins } = useFabfamilyStore();
  const { formatPrice } = useCurrencyStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const total = getGrandTotal();
  const itemCount = getItemCount();
  const freeShippingThreshold = 1499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF6F0] shadow-2xl flex flex-col z-50 animate-fade-in border-l border-[#E6E0D8]">
        {/* Top Header */}
        <div className="p-5 border-b border-[#E6E0D8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8B2331]" />
            <h2 className="font-serif text-lg font-bold text-[#2A2A2A] tracking-wide">
              Your Shopping Bag
            </h2>
            <span className="text-xs bg-[#F5EFE6] text-[#2A2A2A] px-2 py-0.5 font-bold">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-[#6B6B6B] hover:text-[#8B2331] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F5EFE6] p-4 border-b border-[#E6E0D8] space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-[#2A2A2A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-800 font-bold">You qualify for FREE Delivery!</span>
              ) : (
                <span>
                  Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more for <strong>FREE Delivery</strong>
                </span>
              )}
            </span>
            <span className="text-[10px] text-[#6B6B6B] font-mono">{Math.round(shippingProgress)}%</span>
          </div>
          <div className="w-full bg-[#E6E0D8] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#8B2331] h-full transition-all duration-500 rounded-full"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8">
              <div className="w-16 h-16 rounded-full bg-white border border-[#E6E0D8] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-[#6B6B6B]" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#2A2A2A]">Your bag is empty</h3>
                <p className="text-xs text-[#6B6B6B] mt-1 max-w-xs">
                  Discover authentic handcrafted kurtas, sarees, kilim rugs, and organic food.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 bg-[#8B2331] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6E1B26]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="flex gap-4 bg-white p-3.5 border border-[#E6E0D8] relative group"
              >
                <div className="relative w-20 aspect-[3/4] bg-[#FAF6F0] shrink-0 border border-[#E6E0D8]">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.product.id}`}
                        onClick={closeCart}
                        className="text-xs font-medium text-[#2A2A2A] hover:text-[#8B2331] line-clamp-2 leading-snug"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-[#6B6B6B] hover:text-[#B3261E] p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#6B6B6B] mt-1 space-x-2">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>Color: <strong>{item.selectedColor}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#E6E0D8]">
                    <div className="flex items-center border border-[#E6E0D8] bg-[#FAF6F0]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="p-1 text-[#6B6B6B] hover:text-[#2A2A2A]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#2A2A2A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="p-1 text-[#6B6B6B] hover:text-[#2A2A2A]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#2A2A2A]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E6E0D8] bg-white space-y-3">
            {/* Fabcoins Redeem Widget */}
            {isMember && fabcoins > 0 && (
              <div className="p-3 bg-[#FAF6F0] border border-[#E6E0D8] text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[#2A2A2A]">
                  <Award className="w-4 h-4 text-[#8B2331] shrink-0" />
                  <div>
                    <span className="font-bold">Fabfamily Coins</span>
                    <span className="text-[11px] text-[#6B6B6B] block">
                      Balance: {fabcoins} ({formatPrice(fabcoins)})
                    </span>
                  </div>
                </div>
                {appliedFabcoins > 0 ? (
                  <button
                    onClick={() => removeFabcoins()}
                    className="text-[11px] font-bold text-[#8B2331] uppercase underline"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => applyFabcoins(Math.min(fabcoins, subtotal))}
                    className="px-2.5 py-1 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-[10px] font-bold uppercase tracking-wider transition-colors shadow-2xs"
                  >
                    Apply Coins
                  </button>
                )}
              </div>
            )}

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2A2A2A]">{formatPrice(subtotal)}</span>
              </div>
              {appliedFabcoins > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Fabcoins Redeemed</span>
                  <span>- {formatPrice(appliedFabcoins)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6B6B6B]">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-[#2A2A2A]">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2A2A2A] pt-2 border-t border-[#E6E0D8]">
                <span>Total</span>
                <span className="text-base text-[#8B2331]">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/cart"
                onClick={closeCart}
                className="py-3 text-center bg-white border border-[#8B2331] text-[#8B2331] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF6F0]"
              >
                View Full Bag
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="py-3 text-center bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
              >
                Checkout <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
