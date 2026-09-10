"use client";

import Link from "next/link";
import { ShieldCheck, RotateCcw, Sparkles, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#EFEAE4] text-[#2A2A2A] border-t border-[#DED7CE] pt-12 pb-10">
      {/* Main 4-Column Links Section (Matching Real Fabindia Exactly) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-[#D8D0C5]">
          {/* Column 1: LET US HELP YOU */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              LET US HELP YOU
            </h3>
            <ul className="space-y-2.5 text-xs text-[#555555]">
              <li>
                <Link href="/account?tab=orders" className="hover:text-[#8B2331] transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/category/services" className="hover:text-[#8B2331] transition-colors">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-[#8B2331] transition-colors">
                  Store Locator
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-[#8B2331] transition-colors">
                  Furniture Warranty Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: SUPPORT */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              SUPPORT
            </h3>
            <ul className="space-y-2.5 text-xs text-[#555555]">
              <li>
                <Link href="/contact" className="hover:text-[#8B2331] transition-colors">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#8B2331] transition-colors">
                  How To Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#8B2331] transition-colors">
                  Billing & Payments
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-[#8B2331] transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              COMPANY
            </h3>
            <ul className="space-y-2.5 text-xs text-[#555555]">
              <li>
                <Link href="/about" className="hover:text-[#8B2331] transition-colors">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8B2331] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8B2331] transition-colors">
                  In The News
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8B2331] transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: ABOUT FABINDIA */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              ABOUT FABINDIA
            </h3>
            <ul className="space-y-2.5 text-xs text-[#555555]">
              <li>
                <Link href="/about" className="hover:text-[#8B2331] transition-colors">
                  65 years of Fabindia
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8B2331] transition-colors">
                  Philosophy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8B2331] transition-colors">
                  Organic Certification
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8B2331] transition-colors">
                  The Fabindia School
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Accepted Payments & Legal Info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
          <div className="flex flex-wrap items-center gap-2 text-[10px]">
            <span className="font-semibold text-[#333333] mr-1">100% Secure Payment:</span>
            <span className="px-2 py-0.5 bg-white border border-[#D8D0C5] text-[#333333] font-bold">UPI</span>
            <span className="px-2 py-0.5 bg-white border border-[#D8D0C5] text-[#333333] font-bold">VISA</span>
            <span className="px-2 py-0.5 bg-white border border-[#D8D0C5] text-[#333333] font-bold">Mastercard</span>
            <span className="px-2 py-0.5 bg-white border border-[#D8D0C5] text-[#333333] font-bold">RuPay</span>
            <span className="px-2 py-0.5 bg-white border border-[#D8D0C5] text-[#333333] font-bold">Net Banking</span>
            <span className="px-2 py-0.5 bg-white border border-[#D8D0C5] text-[#333333] font-bold">Cash on Delivery</span>
          </div>

          <div className="text-[11px] text-[#666666] text-center sm:text-right">
            <span>Customer Support: </span>
            <a href="tel:1800100123" className="text-[#8B2331] font-semibold hover:underline">
              1800-100-1234
            </a>{" "}
            | <a href="mailto:support@fabindia.net" className="hover:underline">support@fabindia.net</a>
          </div>
        </div>

        <div className="pt-4 text-center sm:text-left text-[11px] text-[#888888] flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} Fabindia Overseas Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/policies" className="hover:text-[#8B2331]">Privacy Policy</Link>
            <Link href="/policies" className="hover:text-[#8B2331]">Terms & Conditions</Link>
            <Link href="/policies" className="hover:text-[#8B2331]">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
