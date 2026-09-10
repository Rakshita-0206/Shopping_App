"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  MapPin,
  User,
  Heart,
  ShoppingBag,
  ChevronDown,
  Edit2,
  MessageSquare,
  X,
} from "lucide-react";
import { useFabfamilyStore } from "@/store/fabfamilyStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/store/toastStore";
import FabindiaOrnament from "@/components/ui/FabindiaOrnament";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawStartUrl = searchParams.get("startUrl");
  const startUrl = rawStartUrl
    ? rawStartUrl.startsWith("/")
      ? rawStartUrl
      : `/${rawStartUrl}`
    : "/fabfamily";

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordMode, setIsPasswordMode] = useState(false);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [showSmsAlert, setShowSmsAlert] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  const { enroll } = useFabfamilyStore();
  const { showToast } = useToastStore();
  const itemCount = useCartStore((state) => state.getItemCount());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const wishlistCount = useWishlistStore((state) => state.items.length);

  // Close country dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = mobileNumber.replace(/\D/g, "");
    if (cleanNumber.length !== 10) {
      showToast({
        title: "Invalid Mobile",
        description: "Please enter a valid 10-digit Indian mobile number.",
      });
      return;
    }

    setIsLoading(true);
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);

    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setShowSmsAlert(true);
      setResendTimer(30);
    }, 500);
  };

  const handleResendOtp = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setShowSmsAlert(true);
    setResendTimer(30);
    showToast({
      title: "New OTP Dispatched",
      description: `A verification code was dispatched to +91 ${mobileNumber}.`,
    });
  };

  const handleAutoFill = () => {
    if (generatedOtp) {
      setOtp(generatedOtp.split(""));
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otp.join("");
    if (enteredCode.length < 4) {
      showToast({
        title: "Incomplete Code",
        description: "Please enter all 4 digits of the OTP.",
      });
      return;
    }

    if (generatedOtp && enteredCode !== generatedOtp && enteredCode !== "1234") {
      showToast({
        title: "Invalid OTP",
        description: `Code does not match. Please enter ${generatedOtp} or tap auto-fill.`,
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      enroll(
        `Member ${mobileNumber.slice(-4)}`,
        mobileNumber,
        `user${mobileNumber.slice(-4)}@fabindia.com`
      );
      showToast({
        title: "Welcome to FabFamily!",
        description: `Logged in successfully as +91 ${mobileNumber}.`,
      });
      router.push(startUrl);
    }, 600);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || !password) {
      showToast({
        title: "Required Fields",
        description: "Please enter your mobile number and password.",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      enroll(
        `Member ${mobileNumber.slice(-4)}`,
        mobileNumber,
        `user${mobileNumber.slice(-4)}@fabindia.com`
      );
      showToast({
        title: "Welcome Back!",
        description: "Logged in successfully.",
      });
      router.push(startUrl);
    }, 600);
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newArr = [...otp];
    newArr[index] = val;
    setOtp(newArr);

    if (val && index < 3) {
      document.getElementById(`otp-box-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2A2A2A] font-sans antialiased selection:bg-[#801323] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. TOP ANNOUNCEMENT BAR (Solid Maroon with Right-Aligned Banner Link) */}
      {/* ========================================================================= */}
      <div className="bg-[#801323] text-white text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 border-b border-[#6B101D]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-end">
          <Link
            href="/category/collection"
            className="hover:underline tracking-wide transition-opacity opacity-95 hover:opacity-100"
          >
            Discover Svarnim- A festive collection
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. AUTHENTIC FABINDIA HEADER (Logo, Country, Search Pill, Clean Icons) */}
      {/* ========================================================================= */}
      <header className="w-full bg-white border-b border-[#E6E0D8]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between gap-4 sm:gap-8">
          {/* Left: Brand Logo Wordmark */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex flex-col items-start leading-none group">
              <span className="font-serif text-[28px] sm:text-[34px] font-bold tracking-tight text-[#801323] select-none">
                fabindia
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] font-semibold uppercase tracking-[0.32em] text-[#666666] group-hover:text-[#801323] transition-colors mt-0.5 select-none">
                CELEBRATE INDIA
              </span>
            </Link>

            {/* Country Dropdown */}
            <div ref={countryRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="flex items-center gap-1.5 text-xs text-[#2A2A2A] hover:text-[#801323] font-medium py-1 transition-colors"
              >
                <span className="text-sm">🇮🇳</span>
                <span>India</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#555555]" />
              </button>

              {isCountryOpen && (
                <div className="absolute top-full left-0 mt-2 w-36 bg-white border border-[#E6E0D8] shadow-lg rounded-sm py-1 z-50">
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(false)}
                    className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-[#F8F4EE] text-[#801323] font-semibold"
                  >
                    <span>🇮🇳</span>
                    <span>India (INR)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(false)}
                    className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-[#F8F4EE] text-[#555555]"
                  >
                    <span>🇺🇸</span>
                    <span>United States (USD)</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Center: Search Bar Pill (Magnifier on Left, "Search here...") */}
          <div className="flex-1 max-w-md hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#888888] absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search here..."
                  className="w-full h-9.5 pl-10 pr-4 bg-[#F5F5F5] hover:bg-[#EFEFEF] focus:bg-white text-xs text-[#2A2A2A] placeholder-[#888888] rounded-full border border-transparent focus:border-[#801323] focus:outline-none transition-all placeholder:italic"
                />
              </div>
            </form>
          </div>

          {/* Right: Clean Header Icons (No bottom text labels) */}
          <div className="flex items-center space-x-5 sm:space-x-6 text-[#2A2A2A]">
            <Link
              href="/stores"
              className="hover:text-[#801323] transition-colors"
              aria-label="Find Stores"
            >
              <MapPin className="w-5 h-5 stroke-[1.75]" />
            </Link>

            <Link
              href="/login/email?startUrl=fabfamily"
              className="text-[#801323] hover:text-[#6B101D] transition-colors"
              aria-label="Login / Account"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </Link>

            <Link
              href="/wishlist"
              className="relative hover:text-[#801323] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#801323] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={toggleCart}
              className="relative hover:text-[#801323] transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#801323] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. SIMULATED SMS PUSH NOTIFICATION (Fixed at Top for OTP Auto-fill Demo) */}
      {/* ========================================================================= */}
      {showSmsAlert && generatedOtp && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 animate-bounce-short">
          <div className="bg-[#1E293B] text-white p-4 rounded-xl shadow-2xl border border-slate-700 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    SMS from FABIND
                  </span>
                  <span className="text-[10px] text-slate-500">• Just now</span>
                </div>
                <p className="text-xs text-slate-200">
                  Your Fabindia verification OTP is{" "}
                  <strong className="text-amber-400 font-mono text-sm tracking-wider">
                    {generatedOtp}
                  </strong>
                  . Valid for 10 minutes. Do not share.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleAutoFill}
                    className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-400/40 hover:bg-amber-500/30 transition-colors"
                  >
                    Tap to auto-fill ({generatedOtp})
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSmsAlert(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MAIN BODY CANVAS WITH ORNAMENTAL MANDALA ARTWORK (LEFT & RIGHT) */}
      {/* ========================================================================= */}
      <main className="relative flex-1 flex items-center justify-center min-h-[580px] lg:min-h-[640px] py-16 sm:py-24 px-4 overflow-hidden bg-white">
        {/* LEFT ORNAMENT (Exact match to Image 2 - Authentic Fabindia Motif: bottom-left pointing up) */}
        <FabindiaOrnament
          side="left"
          className="absolute bottom-0 left-0 z-0 opacity-80 sm:opacity-100"
        />

        {/* RIGHT ORNAMENT (Exact match to Image 2 - Authentic Fabindia Motif: top-right pointing down) */}
        <FabindiaOrnament
          side="right"
          className="absolute top-0 right-0 z-0 opacity-80 sm:opacity-100"
        />

        {/* CENTERED LOGIN OR SIGNUP FORM */}
        <div className="relative z-10 max-w-[390px] w-full mx-auto text-center">
          {/* Step 1: Mobile Number Input Screen */}
          {step === "phone" && !isPasswordMode && (
            <div className="space-y-7 animate-fade-in">
              <h1 className="text-2xl sm:text-[25px] font-medium text-[#2A2A2A] tracking-normal">
                Login or Signup
              </h1>

              <form onSubmit={handleSendOtp} className="space-y-8 pt-4">
                {/* Single Underlined Mobile Input Row */}
                <div className="flex items-center gap-3 border-b border-[#CCCCCC] focus-within:border-[#801323] pb-2.5 transition-colors">
                  <div className="flex items-center gap-1.5 shrink-0 text-sm text-[#2A2A2A] font-medium pr-1 select-none">
                    <span className="text-base leading-none">🇮🇳</span>
                    <span className="text-sm font-normal text-[#2A2A2A]">+91</span>
                  </div>
                  <div className="w-[1px] h-4 bg-[#E0E0E0]" />
                  <input
                    type="tel"
                    maxLength={10}
                    autoFocus
                    value={mobileNumber}
                    onChange={(e) =>
                      setMobileNumber(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Your Mobile Number"
                    className="w-full text-sm text-[#2A2A2A] placeholder-[#9E9E9E] bg-transparent focus:outline-none tracking-wide"
                  />
                </div>

                {/* Send OTP Full-Width Pill Button */}
                <button
                  type="submit"
                  disabled={mobileNumber.length !== 10 || isLoading}
                  className={`w-full py-3 rounded-full text-sm font-medium transition-all duration-200 select-none ${
                    mobileNumber.length === 10
                      ? "bg-[#801323] hover:bg-[#6E101D] text-white shadow-xs cursor-pointer"
                      : "bg-[#CCCCCC] text-white cursor-not-allowed"
                  }`}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>

              {/* "Or" Horizontal Divider */}
              <div className="relative flex items-center justify-center my-6">
                <div className="w-full border-t border-[#E5E5E5]" />
                <span className="absolute bg-white px-3 text-xs text-[#757575]">
                  Or
                </span>
              </div>

              {/* Login using password link */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsPasswordMode(true)}
                  className="text-xs font-normal text-[#801323] hover:underline transition-colors"
                >
                  Login using password
                </button>
              </div>
            </div>
          )}

          {/* Step 2: OTP Verification Screen */}
          {step === "otp" && !isPasswordMode && (
            <div className="space-y-6 animate-fade-in text-center">
              <h1 className="text-2xl sm:text-[25px] font-medium text-[#2A2A2A] tracking-normal">
                Verify OTP
              </h1>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#666666]">
                <span>Sent to +91 {mobileNumber}</span>
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setOtp(["", "", "", ""]);
                  }}
                  className="text-[#801323] hover:underline flex items-center gap-0.5 font-medium ml-1"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6 pt-2">
                {/* 4 Discrete Boxes */}
                <div className="flex justify-center gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-box-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      autoFocus={idx === 0}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      className="w-12 h-13 text-center text-xl font-bold border border-[#CCCCCC] focus:border-[#801323] focus:ring-1 focus:ring-[#801323] rounded-md focus:outline-none bg-white transition-colors"
                    />
                  ))}
                </div>

                {/* Resend OTP */}
                <div className="flex justify-between items-center text-xs text-[#666666]">
                  {resendTimer > 0 ? (
                    <span>Resend OTP in {resendTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#801323] font-semibold hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                  {generatedOtp && (
                    <button
                      type="button"
                      onClick={handleAutoFill}
                      className="text-[#801323] font-semibold underline text-[11px]"
                    >
                      Auto-fill ({generatedOtp})
                    </button>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={otp.join("").length !== 4 || isLoading}
                  className={`w-full py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 select-none ${
                    otp.join("").length === 4
                      ? "bg-[#801323] hover:bg-[#6E101D] text-white shadow-xs cursor-pointer"
                      : "bg-[#D9D9D9] text-white cursor-not-allowed"
                  }`}
                >
                  {isLoading ? "Verifying..." : "Verify & Proceed"}
                </button>
              </form>
            </div>
          )}

          {/* Alternate: Password Login Mode */}
          {isPasswordMode && (
            <div className="space-y-6 animate-fade-in text-left">
              <h1 className="text-2xl sm:text-[25px] font-medium text-[#2A2A2A] tracking-normal text-center">
                Login using Password
              </h1>

              <form onSubmit={handlePasswordLogin} className="space-y-5 pt-4">
                <div>
                  <label className="text-xs font-medium text-[#666666] block mb-1">
                    Mobile Number or Email
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter registered mobile or email"
                    className="w-full text-sm text-[#2A2A2A] p-2.5 border border-[#CCCCCC] focus:border-[#801323] rounded-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#666666] block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full text-sm text-[#2A2A2A] p-2.5 border border-[#CCCCCC] focus:border-[#801323] rounded-sm focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!mobileNumber || !password || isLoading}
                  className={`w-full py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 select-none ${
                    mobileNumber && password
                      ? "bg-[#801323] hover:bg-[#6E101D] text-white shadow-xs cursor-pointer"
                      : "bg-[#D9D9D9] text-white cursor-not-allowed"
                  }`}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordMode(false)}
                  className="text-xs font-medium text-[#801323] hover:underline"
                >
                  ← Login with OTP instead
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 5. AUTHENTIC 4-COLUMN FOOTER (Exact Text & Styling from Live Site) */}
      {/* ========================================================================= */}
      <footer className="bg-[#F6F2EC] text-[#2A2A2A] border-t border-[#E5DDD2] pt-12 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10">
            {/* Column 1: LET US HELP YOU */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                LET US HELP YOU
              </h3>
              <ul className="space-y-2 text-xs text-[#555555]">
                <li>
                  <Link href="/account" className="hover:text-[#801323] transition-colors">
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#801323] transition-colors">
                    Bulk Orders
                  </Link>
                </li>
                <li>
                  <Link href="/stores" className="hover:text-[#801323] transition-colors">
                    Store Locator
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#801323] transition-colors">
                    Furniture Warranty Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: SUPPORT */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                SUPPORT
              </h3>
              <ul className="space-y-2 text-xs text-[#555555]">
                <li>
                  <Link href="/contact" className="hover:text-[#801323] transition-colors">
                    Customer Service
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#801323] transition-colors">
                    How To Order
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#801323] transition-colors">
                    Billing & Payments
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#801323] transition-colors">
                    Shipping & Delivery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: COMPANY */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                COMPANY
              </h3>
              <ul className="space-y-2 text-xs text-[#555555]">
                <li>
                  <Link href="/about" className="hover:text-[#801323] transition-colors">
                    Investor Relations
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#801323] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#801323] transition-colors">
                    In The News
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#801323] transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: ABOUT FABINDIA */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                ABOUT FABINDIA
              </h3>
              <ul className="space-y-2 text-xs text-[#555555]">
                <li>
                  <Link href="/about" className="hover:text-[#801323] transition-colors">
                    65 years of Fabindia
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#801323] transition-colors">
                    Philosophy
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#801323] transition-colors">
                    Organic Certification
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#801323] transition-colors">
                    The Fabindia School
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Row */}
          <div className="pt-6 border-t border-[#E5DDD2] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#777777]">
            <p>© {new Date().getFullYear()} Fabindia. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-[#801323] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/about" className="hover:text-[#801323] transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 6. FLOATING WHATSAPP CHAT BUTTON (Bottom-Right, Matching Screenshot) */}
      {/* ========================================================================= */}
      <a
        href="https://wa.me/918010012345?text=Hi%20Fabindia%20Customer%20Support"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
        aria-label="Chat with Fabindia on WhatsApp"
      >
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#801323] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
