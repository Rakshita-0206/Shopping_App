"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ANNOUNCEMENTS = [
  {
    text: "Discover Svarnim – A festive collection crafted for every celebration.",
    linkText: "Shop Now",
    linkUrl: "/category/new-arrivals",
  },
  {
    text: "Complimentary Express Delivery across India on orders above ₹1,499.",
    linkText: "Explore",
    linkUrl: "/category/women",
  },
  {
    text: "Sustaining 55,000+ rural artisans & traditional Indian handlooms.",
    linkText: "Our Story",
    linkUrl: "/about",
  },
  {
    text: "Join Fabfamily & unlock 10% off your first handcrafted order with code FAB10.",
    linkText: "Join Now",
    linkUrl: "/category/sale",
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="bg-[#8B2331] text-white text-[11px] sm:text-xs font-medium py-2 px-3 relative z-40 border-b border-[#6E1B26]">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <button
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="p-1 text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="overflow-hidden flex-1 text-center px-2">
          <p className="font-sans tracking-wide">
            <span>{current.text}</span>{" "}
            <Link
              href={current.linkUrl}
              className="underline underline-offset-2 font-semibold hover:text-[#FAF6F0] ml-1.5 transition-colors"
            >
              {current.linkText}
            </Link>
          </p>
        </div>

        <button
          onClick={handleNext}
          aria-label="Next announcement"
          className="p-1 text-white/70 hover:text-white transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
