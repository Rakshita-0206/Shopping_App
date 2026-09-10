"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  ExternalLink,
  Award,
  Sparkles,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useFabfamilyStore } from "@/store/fabfamilyStore";

interface DbOrderItem {
  id: string;
  productId: string | null;
  productName: string;
  productImage: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

interface DbOrder {
  id: string;
  createdAt: string;
  orderStatus: string;
  total: number;
  items: DbOrderItem[];
}

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "orders";
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  const { items: wishlistIds } = useWishlistStore();
  const { formatPrice } = useCurrencyStore();
  const {
    name: memberName,
    email: memberEmail,
    mobile: memberMobile,
    tier: memberTier,
    fabcoins,
    transactions,
    getNextTierProgress,
    getTierRate,
  } = useFabfamilyStore();

  const nextTierProgress = getNextTierProgress();

  useEffect(() => {
    setMounted(true);
    fetch("/api/orders?email=priya.sharma@example.com")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);
        }
      })
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setIsLoadingOrders(false));
  }, []);

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 space-y-8 bg-[#FAF6F0]">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Account" }]} />

      {/* User Header Profile Card */}
      <div className="bg-white border border-[#E6E0D8] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-[#8B2331] flex items-center justify-center font-serif text-2xl font-bold text-[#8B2331]">
            {memberName
              ? memberName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "PS"}
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl text-[#2A2A2A] font-bold">
              {memberName || "Priya Sharma"}
            </h1>
            <p className="text-xs text-[#6B6B6B]">
              {memberEmail || "priya.sharma@example.com"} • +91 {memberMobile || "9876543210"}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5 justify-center sm:justify-start">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F5EFE6] text-[#8B2331] px-2 py-0.5 border border-[#E6E0D8]">
                Fabfamily {memberTier} Member
              </span>
            </div>
          </div>
        </div>

        {/* Fabfamily Fabcoins Widget */}
        <div className="bg-[#FAF6F0] border border-[#E6E0D8] p-4 text-center sm:text-right min-w-[200px]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B6B6B]">
            Available Fabcoins
          </span>
          <div className="text-2xl font-serif font-bold text-[#8B2331]">
            {fabcoins.toLocaleString("en-IN")} Fabcoins
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Worth {formatPrice(fabcoins)} on next order (1 coin = ₹1)
          </p>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-1">
          {[
            { id: "orders", label: `My Orders (${orders.length})`, icon: Package },
            { id: "fabfamily", label: "Fabfamily Fabcoins", icon: Award },
            { id: "wishlist", label: `Saved Wishlist (${wishlistIds.length})`, icon: Heart },
            { id: "addresses", label: "Saved Addresses", icon: MapPin },
            { id: "profile", label: "Account Profile", icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors text-left border ${
                  isActive
                    ? "bg-[#8B2331] text-white border-[#8B2331]"
                    : "bg-white text-[#2A2A2A] border-[#E6E0D8] hover:bg-[#FAF6F0]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Tab Contents */}
        <main className="lg:col-span-9 bg-white border border-[#E6E0D8] p-6 sm:p-8 shadow-xs">
          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#2A2A2A] pb-3 border-b border-[#E6E0D8]">
                Order History ({orders.length})
              </h2>

              {isLoadingOrders ? (
                <div className="py-12 text-center text-xs text-[#6B6B6B]">
                  Loading your orders from database...
                </div>
              ) : orders.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <Package className="w-10 h-10 text-stone-400 mx-auto" />
                  <p className="text-xs text-[#6B6B6B]">No orders found yet.</p>
                  <Link
                    href="/"
                    className="inline-block px-5 py-2 bg-[#8B2331] text-white text-xs uppercase tracking-wider font-semibold"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => {
                    const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                    return (
                      <div
                        key={order.id}
                        className="border border-[#E6E0D8] p-5 space-y-4 bg-[#FAF6F0]/50"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E6E0D8] text-xs">
                          <div>
                            <span className="font-bold text-[#2A2A2A]">Order #{order.id}</span>
                            <span className="text-[#6B6B6B] ml-3">Placed on {formattedDate}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-200 capitalize">
                              <CheckCircle2 className="w-3 h-3" /> {order.orderStatus}
                            </span>
                            <span className="font-bold text-[#2A2A2A]">{formatPrice(order.total)}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3 text-xs">
                              <div className="relative w-14 aspect-[3/4] bg-white border border-[#E6E0D8] shrink-0 overflow-hidden">
                                <Image
                                  src={item.productImage}
                                  alt={item.productName}
                                  fill
                                  className="object-cover"
                                  sizes="60px"
                                />
                              </div>
                              <div className="flex-1">
                                {item.productId ? (
                                  <Link
                                    href={`/product/${item.productId}`}
                                    className="font-medium text-[#2A2A2A] hover:text-[#8B2331]"
                                  >
                                    {item.productName}
                                  </Link>
                                ) : (
                                  <span className="font-medium text-[#2A2A2A]">{item.productName}</span>
                                )}
                                <p className="text-[#6B6B6B] text-[11px] mt-0.5">
                                  Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                                </p>
                                <p className="font-semibold text-[#2A2A2A] mt-1">
                                  {formatPrice(item.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* FABFAMILY FABCOINS TAB */}
          {activeTab === "fabfamily" && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-[#E6E0D8] flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#2A2A2A]">
                    Fabfamily Loyalty Rewards
                  </h2>
                  <p className="text-xs text-[#6B6B6B]">
                    Earning rate: {Math.round(getTierRate(memberTier) * 100)}% Fabcoins on every order across 350+ stores and fabindia.com
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#8B2331] text-white text-xs font-bold uppercase tracking-wider">
                  {memberTier} Tier
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#FAF6F0] border border-[#E6E0D8] text-center space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-bold">
                    Available Fabcoins
                  </span>
                  <div className="text-2xl font-serif font-bold text-[#8B2331]">
                    {fabcoins.toLocaleString("en-IN")}
                  </div>
                  <span className="text-[10px] text-stone-500">1 Fabcoin = ₹1</span>
                </div>
                <div className="p-4 bg-[#FAF6F0] border border-[#E6E0D8] text-center space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-bold">
                    Redeemable Value
                  </span>
                  <div className="text-2xl font-serif font-bold text-emerald-700">
                    {formatPrice(fabcoins)}
                  </div>
                  <span className="text-[10px] text-stone-500">Apply directly at checkout</span>
                </div>
                <div className="p-4 bg-[#FAF6F0] border border-[#E6E0D8] text-center space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-bold">
                    Next Tier Status
                  </span>
                  <div className="text-sm font-serif font-bold text-[#2A2A2A] mt-1">
                    {nextTierProgress.nextTier ? `${nextTierProgress.nextTier} (${nextTierProgress.percent}%)` : "Top Tier (Black)"}
                  </div>
                  {nextTierProgress.nextTier && (
                    <span className="text-[10px] text-stone-500">
                      Spend {formatPrice(nextTierProgress.spendNeeded)} to upgrade
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {nextTierProgress.nextTier && (
                <div className="bg-[#FAF6F0] p-4 border border-[#E6E0D8] space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#2A2A2A]">Progress to {nextTierProgress.nextTier} Tier</span>
                    <span className="text-[#8B2331] font-bold">{nextTierProgress.percent}%</span>
                  </div>
                  <div className="w-full bg-[#E6E0D8] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#8B2331] h-full transition-all duration-500"
                      style={{ width: `${nextTierProgress.percent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Tier Benefits */}
              <div className="border border-[#E6E0D8] p-4 bg-white space-y-2 text-xs">
                <h3 className="font-bold text-[#2A2A2A] uppercase tracking-wider">
                  Your {memberTier} Tier Privileges:
                </h3>
                <ul className="space-y-1.5 text-[#6B6B6B] list-disc pl-4">
                  <li>Earn {Math.round(getTierRate(memberTier) * 100)}% Fabcoins on every qualifying handcrafted purchase.</li>
                  <li>Exclusive preview access to festive collections and annual sale events.</li>
                  <li>Complimentary signature cloth gift bags on eligible orders.</li>
                  <li>Special invitations to regional artisan weaving & indigo masterclasses.</li>
                  {memberTier === "Black" && <li>Personal Relationship Manager & in-home styling consultations.</li>}
                </ul>
              </div>

              {/* Recent Fabcoins Activity */}
              <div className="space-y-3 pt-2">
                <h3 className="font-serif text-base font-bold text-[#2A2A2A]">
                  Recent Fabcoins Activity
                </h3>
                {transactions && transactions.length > 0 ? (
                  <div className="border border-[#E6E0D8] divide-y divide-[#E6E0D8] text-xs">
                    {transactions.map((txn) => (
                      <div key={txn.id} className="p-3 flex items-center justify-between bg-white hover:bg-[#FAF6F0]/50 transition-colors">
                        <div>
                          <p className="font-medium text-[#2A2A2A]">{txn.note}</p>
                          <span className="text-[11px] text-[#6B6B6B]">{txn.date}</span>
                        </div>
                        <div className={`font-bold font-mono text-sm ${txn.type === "earn" ? "text-emerald-700" : "text-[#8B2331]"}`}>
                          {txn.type === "earn" ? `+${txn.coins}` : `-${txn.coins}`} Fabcoins
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#6B6B6B]">No recent Fabcoins activity recorded.</p>
                )}
              </div>
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#2A2A2A] pb-3 border-b border-[#E6E0D8]">
                Saved Items ({wishlistedProducts.length})
              </h2>

              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <p className="text-xs text-[#6B6B6B]">No items saved yet.</p>
                  <Link
                    href="/category/women"
                    className="inline-block px-5 py-2 bg-[#8B2331] text-white text-xs font-bold uppercase"
                  >
                    Browse Kurtas & Sarees
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {wishlistedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#2A2A2A] pb-3 border-b border-[#E6E0D8]">
                Saved Delivery Addresses
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-[#8B2331] bg-[#FAF6F0] space-y-2 text-xs relative">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#8B2331] text-white px-2 py-0.5">
                    Default Home
                  </span>
                  <p className="font-bold text-sm text-[#2A2A2A]">Priya Sharma</p>
                  <p className="text-[#6B6B6B]">
                    Flat 402, Lotus Residency, MG Road, Bengaluru, Karnataka - 560001
                  </p>
                  <p className="text-[#6B6B6B]">Phone: +91 9876543210</p>
                </div>

                <div className="p-4 border border-[#E6E0D8] bg-white space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F5EFE6] text-[#2A2A2A] px-2 py-0.5">
                    Office
                  </span>
                  <p className="font-bold text-sm text-[#2A2A2A]">Priya Sharma</p>
                  <p className="text-[#6B6B6B]">
                    Tech Park Tower 3, Outer Ring Road, Bengaluru, Karnataka - 560103
                  </p>
                  <p className="text-[#6B6B6B]">Phone: +91 9876543210</p>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#2A2A2A] pb-3 border-b border-[#E6E0D8]">
                Personal Profile Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2A2A]">First Name</label>
                  <input
                    type="text"
                    defaultValue="Priya"
                    className="w-full border border-[#E6E0D8] p-2.5 bg-[#FAF6F0] focus:outline-none focus:border-[#8B2331]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2A2A]">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Sharma"
                    className="w-full border border-[#E6E0D8] p-2.5 bg-[#FAF6F0] focus:outline-none focus:border-[#8B2331]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2A2A]">Email Address</label>
                  <input
                    type="email"
                    defaultValue="priya.sharma@example.com"
                    className="w-full border border-[#E6E0D8] p-2.5 bg-[#FAF6F0] focus:outline-none focus:border-[#8B2331]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2A2A]">Mobile Number</label>
                  <input
                    type="tel"
                    defaultValue="+91 9876543210"
                    className="w-full border border-[#E6E0D8] p-2.5 bg-[#FAF6F0] focus:outline-none focus:border-[#8B2331]"
                  />
                </div>
              </div>

              <button className="px-6 py-2.5 bg-[#8B2331] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6E1B26]">
                Save Changes
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#8B2331] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
