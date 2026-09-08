"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, ShieldCheck, RotateCcw, Sparkles, Truck, MapPin } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#1F2A44] text-[#FAF6F0] border-t border-[#E6E0D8] pt-14 pb-8">
      {/* Brand Values Strip */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-stone-700/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#8B2331] text-[#FAF6F0] shrink-0">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold tracking-wider text-white uppercase">
                60+ Years of Craft Heritage
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Directly connecting 55,000+ certified rural artisans & traditional weaver cooperatives.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#8B2331] text-[#FAF6F0] shrink-0">
              <Truck className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold tracking-wider text-white uppercase">
                Free Shipping Above ₹1,499
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Complimentary doorstep delivery on all prepaid & COD orders across India.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#8B2331] text-[#FAF6F0] shrink-0">
              <RotateCcw className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold tracking-wider text-white uppercase">
                Easy 14-Day Returns
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Hassle-free exchanges and returns with doorstep pick-up across 20,000+ pin codes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#8B2331] text-[#FAF6F0] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold tracking-wider text-white uppercase">
                100% Sustainable & Natural
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Pure vegetable dyes, certified organic pantry, and zero toxic synthetics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand Info & Socials */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-tight text-[#FAF6F0]">
                fabindia
              </span>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold mt-0.5">
                CELEBRATE INDIA
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed">
              Celebrating India's hereditary crafts, handloom weaves, and natural living since 1960.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com/fabindia"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#8B2331] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/fabindia"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#8B2331] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.198 21.5h4v-8.01h2.604l.39-3.024h-2.994V8.54c0-.877.244-1.474 1.5-1.474h1.6V4.359c-.277-.037-1.229-.12-2.336-.12-2.311 0-3.894 1.411-3.894 4.004v2.224h-2.61v3.024h2.61v8.017z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/fabindia"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#8B2331] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://pinterest.com/fabindia"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#8B2331] transition-colors"
                aria-label="Pinterest"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.373-.053.224-.174.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Customer Service */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Customer Service
            </h3>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQs & Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About Fabindia */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              About Fabindia
            </h3>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Heritage & Story
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Artisans & Handloom
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Sustainability & Fair Trade
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Careers at Fabindia
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Media & Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link href="/stores" className="hover:text-white transition-colors">
                  Find a Store
                </Link>
              </li>
              <li>
                <Link href="/category/fabfamily" className="hover:text-white transition-colors">
                  Fabfamily Rewards
                </Link>
              </li>
              <li>
                <Link href="/category/services" className="hover:text-white transition-colors">
                  Custom Tailoring & Alterations
                </Link>
              </li>
              <li>
                <Link href="/category/services" className="hover:text-white transition-colors">
                  Bulk & Corporate Gifting
                </Link>
              </li>
              <li>
                <Link href="/category/collection" className="hover:text-white transition-colors">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Policies & Newsletter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Policies
            </h3>
            <ul className="space-y-2 text-xs text-stone-300 mb-4">
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Return & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Security & Fraud Protection
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white block mb-1.5">
                Download Mobile App
              </span>
              <div className="flex gap-2">
                <div className="px-2.5 py-1.5 bg-stone-800 border border-stone-700 text-[10px] font-medium text-stone-300">
                  App Store
                </div>
                <div className="px-2.5 py-1.5 bg-stone-800 border border-stone-700 text-[10px] font-medium text-stone-300">
                  Google Play
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accepted Payment Methods Strip */}
        <div className="mt-10 pt-6 border-t border-stone-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-2 text-[10px]">
            <span className="text-stone-300 font-semibold mr-1">100% Secure Payment:</span>
            <span className="px-2 py-1 bg-stone-800 border border-stone-700 font-bold text-white">UPI</span>
            <span className="px-2 py-1 bg-stone-800 border border-stone-700 font-bold text-white">VISA</span>
            <span className="px-2 py-1 bg-stone-800 border border-stone-700 font-bold text-white">Mastercard</span>
            <span className="px-2 py-1 bg-stone-800 border border-stone-700 font-bold text-white">RuPay</span>
            <span className="px-2 py-1 bg-stone-800 border border-stone-700 font-bold text-white">Net Banking</span>
            <span className="px-2 py-1 bg-stone-800 border border-stone-700 font-bold text-white">Cash on Delivery</span>
          </div>

          <div className="text-stone-400 text-xs text-center sm:text-right">
            <span>Customer Support: </span>
            <a href="tel:1800100123" className="text-[#FAF6F0] font-semibold hover:underline">
              1800-100-1234
            </a>{" "}
            | <a href="mailto:support@fabindia.net" className="hover:underline">support@fabindia.net</a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Country Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-stone-800 text-center text-stone-400 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 Fabindia Overseas Pvt. Ltd. All rights reserved.</p>
        <p className="text-stone-400">
          Celebrate India • Handcrafted with pride across 29 states
        </p>
      </div>
    </footer>
  );
}
