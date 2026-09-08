"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  QrCode,
  Truck,
  Building2,
  ArrowRight,
  ShoppingBag,
  Clock,
  Package,
  Award,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useFabfamilyStore } from "@/store/fabfamilyStore";
import { useToastStore } from "@/store/toastStore";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"details" | "payment" | "confirmed">("details");
  const [orderId, setOrderId] = useState("");
  const [earnedReward, setEarnedReward] = useState<{ coins: number; tierPromoted: string | null } | null>(null);
  const [redeemedAmount, setRedeemedAmount] = useState(0);

  const { formatPrice } = useCurrencyStore();
  const { showToast } = useToastStore();

  // Shipping form fields
  const [formData, setFormData] = useState({
    fullName: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "9876543210",
    address: "Flat 402, Lotus Residency, MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [upiId, setUpiId] = useState("priya@okhdfcbank");

  const {
    items,
    clearCart,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getGrandTotal,
    discountPercent,
    couponCode,
    appliedFabcoins,
    applyFabcoins,
    removeFabcoins,
  } = useCartStore();

  const {
    isMember,
    tier,
    fabcoins,
    addEarn,
    redeemCoins,
  } = useFabfamilyStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const total = getGrandTotal();

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;
    setIsPlacingOrder(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          paymentMethod,
          couponCode: couponCode || undefined,
          fabcoinsUsed: appliedFabcoins,
          items: items.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            productImage: item.product.images[0],
            size: item.selectedSize,
            color: item.selectedColor,
            quantity: item.quantity,
            price: item.product.price,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to place order");
      }

      const placedOrder = data.data;
      setOrderId(placedOrder.id);

      const coinsToRedeem = appliedFabcoins;
      setRedeemedAmount(coinsToRedeem);
      if (coinsToRedeem > 0) {
        redeemCoins(coinsToRedeem, `Redeemed on Order #${placedOrder.id}`);
      }

      // Spend amount excluding coupon discount
      const spendForEarn = Math.max(0, subtotal - discount);
      const earnResult = addEarn(spendForEarn, `Earned from Order #${placedOrder.id}`);

      setEarnedReward({
        coins: earnResult.earnedCoins,
        tierPromoted: earnResult.promotedTier,
      });

      if (earnResult.promotedTier) {
        showToast({
          title: `🎉 Congratulations! You reached ${earnResult.promotedTier} Tier!`,
          description: "Enjoy your newly unlocked tier privileges and higher Fabcoin earn rates.",
          type: "success",
        });
      } else if (earnResult.earnedCoins > 0) {
        showToast({
          title: `+${earnResult.earnedCoins} Fabcoins Credited!`,
          description: "Your Fabfamily rewards balance has been updated.",
          type: "success",
        });
      }

      setStep("confirmed");
      clearCart();
    } catch (err) {
      console.error("Order error:", err);
      showToast({
        title: "Order Failed",
        description: err instanceof Error ? err.message : "Unable to place order. Please try again.",
        type: "error",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (items.length === 0 && step !== "confirmed") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-serif text-3xl text-[#2A2A2A]">Your Bag is Empty</h1>
        <p className="text-xs text-[#6B6B6B]">Add products to your shopping bag before proceeding to checkout.</p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-[#8B2331] text-white text-xs uppercase tracking-widest font-semibold mt-4"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-600 animate-fade-in">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B2331] font-bold">
            Order Successfully Placed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2A2A]">
            Thank You For Celebrating India
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
            Your order <strong>#{orderId}</strong> has been received and will be handcrafted & dispatched with care.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#E6E0D8] text-left text-xs space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-[#8B2331] font-semibold uppercase tracking-wider">
            <Package className="w-4 h-4" /> Order Summary
          </div>
          <p className="text-[#6B6B6B]">
            Shipping to: <strong>{formData.fullName}</strong>, {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
          </p>
          <p className="text-[#6B6B6B]">
            Contact: {formData.email} | +91 {formData.phone}
          </p>
          <p className="text-[#6B6B6B]">
            Payment Mode: <strong className="uppercase">{paymentMethod}</strong> • Status: <strong>Verified</strong>
          </p>
          {redeemedAmount > 0 && (
            <p className="text-emerald-700 font-semibold pt-1 border-t border-[#E6E0D8]">
              Fabcoins Redeemed: - {formatPrice(redeemedAmount)} applied as instant cash discount.
            </p>
          )}
        </div>

        {/* Fabfamily Earned Rewards Banner */}
        {isMember && earnedReward && (
          <div className="p-5 bg-[#FAF6F0] border-2 border-[#8B2331]/30 text-left text-xs space-y-2 shadow-xs animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#8B2331] font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Fabfamily Rewards Credited</span>
              </div>
              <span className="px-2 py-0.5 bg-[#8B2331] text-white text-[10px] font-bold uppercase tracking-widest">
                {tier} Tier
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <div>
                <p className="font-bold text-[#2A2A2A] text-sm">
                  +{earnedReward.coins} Fabcoins Added to Your Account!
                </p>
                <p className="text-[11px] text-[#6B6B6B]">
                  1 Fabcoin = ₹1 at redemption. Use them on your next handcrafted order.
                </p>
              </div>
              <Link
                href="/fabfamily"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#8B2331] hover:underline shrink-0"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        <div className="pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-none shadow-md inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 space-y-8 bg-[#FAF6F0]">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shopping Bag", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <div className="flex items-center justify-between border-b border-[#E6E0D8] pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#2A2A2A]">
          Secure Checkout
        </h1>
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className={step === "details" ? "text-[#8B2331] font-bold" : "text-[#6B6B6B]"}>
            1. Shipping Address
          </span>
          <span className="text-[#E6E0D8]">→</span>
          <span className={step === "payment" ? "text-[#8B2331] font-bold" : "text-[#6B6B6B]"}>
            2. Payment Options
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Step Forms */}
        <div className="lg:col-span-8">
          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="p-6 bg-white border border-[#E6E0D8] space-y-6 shadow-xs">
              <h2 className="font-serif text-lg text-[#2A2A2A] font-bold pb-2 border-b border-[#E6E0D8]">
                Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2A2A2A]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-[#E6E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#8B2331]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2A2A2A]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-[#E6E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#8B2331]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2A2A2A]">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-[#E6E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#8B2331]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2A2A2A]">Street Address / House No.</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-[#E6E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#8B2331]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2A2A2A]">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-[#E6E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#8B2331]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2A2A2A]">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border border-[#E6E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#8B2331]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2A2A2A]">Pincode</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full border border-[#E6E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#8B2331]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 rounded-none shadow-md"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === "payment" && (
            <div className="p-6 bg-white border border-[#E6E0D8] space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6E0D8]">
                <h2 className="font-serif text-lg text-[#2A2A2A] font-bold">
                  Select Payment Option
                </h2>
                <button
                  onClick={() => setStep("details")}
                  className="text-xs text-[#8B2331] underline font-semibold"
                >
                  Edit Address
                </button>
              </div>

              {/* Payment Methods Accordion */}
              <div className="space-y-3">
                {/* UPI */}
                <div
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-4 border transition-all cursor-pointer ${
                    paymentMethod === "upi"
                      ? "border-[#8B2331] bg-[#FAF6F0]"
                      : "border-[#E6E0D8] hover:border-stone-400"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="mt-1 accent-[#8B2331]"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#2A2A2A]">
                        <QrCode className="w-4 h-4 text-[#8B2331]" /> UPI / Instant QR (Google Pay, PhonePe, Paytm)
                      </div>
                      <p className="text-[11px] text-[#6B6B6B]">
                        Fastest payment. 5% instant cashback applied at checkout.
                      </p>

                      {paymentMethod === "upi" && (
                        <div className="pt-3">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter UPI ID (e.g. mobile@upi)"
                            className="w-full max-w-sm px-3 py-2 border border-[#E6E0D8] text-xs focus:outline-none focus:border-[#8B2331]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 border transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-[#8B2331] bg-[#FAF6F0]"
                      : "border-[#E6E0D8] hover:border-stone-400"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mt-1 accent-[#8B2331]"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#2A2A2A]">
                        <CreditCard className="w-4 h-4 text-[#8B2331]" /> Credit / Debit Card (Visa, RuPay, MasterCard)
                      </div>
                      <p className="text-[11px] text-[#6B6B6B]">
                        All major Indian and international bank cards accepted with 256-bit SSL encryption.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 border transition-all cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-[#8B2331] bg-[#FAF6F0]"
                      : "border-[#E6E0D8] hover:border-stone-400"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 accent-[#8B2331]"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#2A2A2A]">
                        <Truck className="w-4 h-4 text-[#8B2331]" /> Cash on Delivery (COD)
                      </div>
                      <p className="text-[11px] text-[#6B6B6B]">
                        Pay in cash or scan QR upon delivery at your doorstep.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full py-4 bg-[#8B2331] hover:bg-[#6E1B26] disabled:bg-stone-400 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 shadow-md rounded-none cursor-pointer disabled:cursor-not-allowed"
              >
                <span>{isPlacingOrder ? "Placing Order..." : `Place Order • ${formatPrice(total)}`}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 bg-white border border-[#E6E0D8] space-y-4 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-[#2A2A2A] pb-3 border-b border-[#E6E0D8]">
              Order Items ({items.length})
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar pr-1">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <div className="relative w-12 aspect-[3/4] bg-[#FAF6F0] shrink-0 border border-[#E6E0D8]">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="50px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#2A2A2A] font-medium line-clamp-1">{item.product.name}</p>
                    <p className="text-[#6B6B6B] text-[11px]">
                      {item.selectedSize} • Qty {item.quantity}
                    </p>
                    <p className="font-semibold text-[#2A2A2A]">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Fabcoins Redeem in Checkout */}
            {isMember && fabcoins > 0 && (
              <div className="p-3.5 bg-[#FAF6F0] border border-[#E6E0D8] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2A2A2A] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#8B2331]" />
                    <span>Apply Fabcoins</span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#8B2331]">
                    {fabcoins} available
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#6B6B6B]">
                    Worth {formatPrice(fabcoins)}
                  </span>
                  {appliedFabcoins > 0 ? (
                    <button
                      onClick={() => removeFabcoins()}
                      className="text-xs font-bold text-[#8B2331] uppercase underline"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => applyFabcoins(Math.min(fabcoins, Math.max(0, subtotal - discount)))}
                      className="px-2.5 py-1 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-[10px] font-bold uppercase tracking-wider transition-colors shadow-2xs"
                    >
                      Apply Coins
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2 text-xs text-[#6B6B6B] pt-3 border-t border-[#E6E0D8]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2A2A2A]">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon ({couponCode})</span>
                  <span>- {formatPrice(discount)}</span>
                </div>
              )}
              {appliedFabcoins > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Fabcoins Redeemed</span>
                  <span>- {formatPrice(appliedFabcoins)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-[#2A2A2A]">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2A2A2A] pt-3 border-t border-[#E6E0D8]">
                <span>Total Due</span>
                <span className="text-[#8B2331]">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
