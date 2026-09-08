"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  X,
  Calculator,
} from "lucide-react";
import { useToastStore } from "@/store/toastStore";

// Top Carousel Images (Exact assets from fabfamily.fabindia.com)
const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: "https://cf.getxeno.com/1818/static_images/aboutCarousel1.webp",
    alt: "FabFamily Loyalty Program - Celebrate Handcrafted Traditions",
  },
  {
    id: 2,
    image: "https://cf.getxeno.com/1818/static_images/aboutCarousel02.webp",
    alt: "FabFamily Exclusive Benefits and Experiences",
  },
  {
    id: 3,
    image: "https://cf.getxeno.com/1818/static_images/aboutCarousel3.webp",
    alt: "Earn Fabcoins Across 350+ Stores & Online",
  },
];

// Three-Box Program Highlights
const THREE_BOX_ITEMS = [
  {
    title: "New Launches",
    image: "https://cf.getxeno.com/1818/static_images/new_launches.webp",
    link: "/category/new-arrivals",
    label: "Explore Fresh Drops",
  },
  {
    title: "Curated Rewards",
    image: "https://cf.getxeno.com/1818/static_images/curated_rewards1.webp",
    link: "#rewards",
    label: "View Member Rewards",
  },
  {
    title: "What's Trending",
    image: "https://cf.getxeno.com/1818/static_images/whats_trending.webp",
    link: "/category/women",
    label: "Artisanal Bestsellers",
  },
];

// 5 Tiers of Joy Specifications (Exact thresholds & benefits)
const TIERS_DATA = [
  {
    name: "BRONZE",
    tagline: "Our Base Tier",
    badgeColor: "bg-[#8D5B4C] text-white",
    borderColor: "border-[#8D5B4C]",
    headerBg: "bg-[#FAF0EC]",
    rate: "Base Tier",
    spend: "On Any Purchase",
    benefits: ["Our Base Tier", "Access to Curated Rewards"],
  },
  {
    name: "SILVER",
    tagline: "1% Fabcoins Earned",
    badgeColor: "bg-[#7A8B99] text-white",
    borderColor: "border-[#7A8B99]",
    headerBg: "bg-[#F0F4F8]",
    rate: "1% Fabcoins",
    spend: "Rs. 20,000 Annual Spend",
    benefits: [
      "1% Fabcoins Earned on Shopping",
      "Rs. 20,000 Annual Purchase Eligibility",
      "Access to Curated Rewards",
    ],
  },
  {
    name: "GOLD",
    tagline: "3% Fabcoins Earned",
    badgeColor: "bg-[#C29B38] text-white",
    borderColor: "border-[#C29B38]",
    headerBg: "bg-[#FDF8EB]",
    rate: "3% Fabcoins",
    spend: "Rs. 50,000 Annual Spend",
    benefits: [
      "3% Fabcoins Earned on Shopping",
      "Rs. 50,000 Annual Purchase Eligibility",
      "Access to Curated Rewards",
      "Preview to Launch of Collection",
      "Preview to Sale",
    ],
  },
  {
    name: "PLATINUM",
    tagline: "5% Fabcoins Earned",
    badgeColor: "bg-[#475569] text-white",
    borderColor: "border-[#475569]",
    headerBg: "bg-[#F1F5F9]",
    rate: "5% Fabcoins",
    spend: "Rs. 1,00,000 Annual Spend",
    benefits: [
      "5% Fabcoins Earned on Shopping",
      "Rs. 1,00,000 Annual Purchase Eligibility",
      "Access to Curated Rewards",
      "Preview to Launch of Collection",
      "Preview to Sale",
      "Shopping by Appointment",
    ],
  },
  {
    name: "BLACK",
    tagline: "10% Fabcoins Earned",
    badgeColor: "bg-[#111827] text-white",
    borderColor: "border-[#111827]",
    headerBg: "bg-[#F3F4F6]",
    rate: "10% Fabcoins",
    spend: "Rs. 2,00,000 Annual Spend",
    benefits: [
      "10% Fabcoins Earned on Shopping",
      "Rs. 2,00,000 Annual Purchase Eligibility",
      "Access to Curated Rewards",
      "Preview to Launch of Collection",
      "Preview to Sale",
      "Shopping by Appointment",
      "Shop from Home (excluding furniture)",
      "Relationship Manager",
    ],
  },
];

// Shared Values Community Sponsors (Exact logos from fabfamily.fabindia.com)
const SPONSOR_LOGOS = [
  { name: "Indian Accent", logo: "https://cf.getxeno.com/1818/static_images/sponsorLogo/indianAccent.webp" },
  { name: "The Oberoi Group", logo: "https://cf.getxeno.com/1818/static_images/sponsorLogo/theOberoiGroup.webp" },
  { name: "WWF", logo: "https://cf.getxeno.com/1818/static_images/sponsorLogo/wwf.webp" },
  { name: "Mahindra", logo: "https://cf.getxeno.com/1818/static_images/sponsorLogo/mahindra.webp" },
  { name: "CSE", logo: "https://cf.getxeno.com/1818/static_images/sponsorLogo/cse.webp" },
  { name: "Fabindia Foods", logo: "https://cf.getxeno.com/1818/static_images/sponsorLogo/fabindiaFoods.webp" },
  { name: "CogitoHub", logo: "https://cf.getxeno.com/1818/static_images/sponsorLogo/cogitoHub.webp" },
  { name: "Tenacious Bee Collective", logo: "https://cf.getxeno.com/1818/static_images/sponsorLogo/tenaciousBeeCollective.webp" },
  { name: "Fabhome", logo: "https://cf.getxeno.com/1818/static_images/sponsorLogo/fabhome.webp" },
];

export default function FabFamilyPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [annualSpend, setAnnualSpend] = useState<number>(35000);
  const { showToast } = useToastStore();

  // Auto-advance carousel every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  // Calculate dynamic tier from annual spend
  const calculatedTier = () => {
    if (annualSpend >= 200000) return { name: "BLACK", rate: 10, coins: Math.round(annualSpend * 0.1) };
    if (annualSpend >= 100000) return { name: "PLATINUM", rate: 5, coins: Math.round(annualSpend * 0.05) };
    if (annualSpend >= 50000) return { name: "GOLD", rate: 3, coins: Math.round(annualSpend * 0.03) };
    if (annualSpend >= 20000) return { name: "SILVER", rate: 1, coins: Math.round(annualSpend * 0.01) };
    return { name: "BRONZE", rate: 0, coins: 0 };
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      showToast({ title: "Invalid Mobile", description: "Please enter a valid 10-digit mobile number." });
      return;
    }
    setIsJoined(true);
    showToast({
      title: "Welcome to FabFamily!",
      description: `Membership activated for ${fullName || mobileNumber}.`,
    });
  };

  const tierInfo = calculatedTier();

  return (
    <div className="min-h-screen bg-white text-[#2A2A2A] font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. FABFAMILY SUB-HEADER BAR */}
      {/* ========================================================================= */}
      <nav className="sticky top-20 z-30 w-full bg-white border-b border-[#E6E0D8] shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/fabfamily" className="relative w-36 sm:w-44 h-9 block">
            <Image
              src="https://cf.getxeno.com/1818/static_images/fabFamilyLogo.webp"
              alt="FabFamily - Fabindia Loyalty Program"
              fill
              priority
              className="object-contain object-left"
              sizes="180px"
            />
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-6 sm:space-x-10 text-xs tracking-wider uppercase font-medium">
            <Link
              href="/fabfamily"
              className="text-[#8B2331] font-bold border-b-2 border-[#8B2331] pb-1"
            >
              ABOUT
            </Link>
            <a
              href="#rewards"
              className="text-[#4A4A4A] hover:text-[#8B2331] transition-colors pb-1"
            >
              REWARDS
            </a>
            <Link
              href="/"
              className="text-[#4A4A4A] hover:text-[#8B2331] transition-colors pb-1"
            >
              SHOPPING
            </Link>
          </div>

          {/* Join / Login CTA */}
          <div>
            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="px-4 sm:px-6 py-2 bg-[#8B2331] hover:bg-[#701C27] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              JOIN OR LOGIN
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. HERO CAROUSEL (Exact 3 WebP Slides with Left/Right Arrow Mockups) */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#FAF6F0]">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[620px]">
          {CAROUSEL_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevSlide}
            aria-label="Previous slide"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 cursor-pointer hover:scale-110 transition-transform"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11">
              <Image
                src="https://cf.getxeno.com/1818/static_images/Circle_Left_Arrow.webp"
                alt="Previous"
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
          </button>
          <button
            onClick={handleNextSlide}
            aria-label="Next slide"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 cursor-pointer hover:scale-110 transition-transform"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11">
              <Image
                src="https://cf.getxeno.com/1818/static_images/Circle_Right_Arrow.webp"
                alt="Next"
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
          </button>

          {/* Carousel Dot Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
            {CAROUSEL_SLIDES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentSlide(dotIdx)}
                aria-label={`Slide ${dotIdx + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  dotIdx === currentSlide ? "bg-[#8B2331] scale-125" : "bg-red-200 hover:bg-red-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THREE-BOX SECTION: OPENS UP A WORLD OF REWARDS */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto text-center">
        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-[#6B6B6B] mb-1">
          AN EXCLUSIVE MEMBERSHIP PROGRAM THAT
        </p>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#2A2A2A] tracking-wide mb-10 sm:mb-12">
          OPENS UP A WORLD <span className="font-serif italic font-normal text-[#8B2331]">of</span> REWARDS.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {THREE_BOX_ITEMS.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="group relative overflow-hidden bg-[#FAF6F0] border border-[#E6E0D8] shadow-xs block"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ALTERNATING HERITAGE STORY SECTIONS (3 Rows with Overlapping White Box) */}
      {/* ========================================================================= */}
      <section className="py-8 space-y-12 sm:space-y-16 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Row 1: Image Left, Floating Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-10 bg-[#FAF6F0] p-6 sm:p-10 border border-[#E6E0D8]">
          <div className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="https://cf.getxeno.com/1818/static_images/fabFamily_1.webp"
              alt="FabFamily Circle"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="lg:col-span-6">
            <div className="bg-white p-8 sm:p-12 border border-[#E6E0D8] shadow-sm space-y-6">
              <p className="text-sm sm:text-base text-[#3A3A3A] leading-relaxed">
                <strong className="font-serif text-lg sm:text-xl text-[#8B2331]">
                  Fab<em>family </em>
                </strong>
                is a close-knit circle of those of us who cherish the rich cultural heritage of our country as well as the progressive values that we all hold dear.
              </p>
              <div>
                <button
                  onClick={() => setIsJoinModalOpen(true)}
                  className="px-7 py-3 bg-[#8B2331] hover:bg-[#701C27] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-xs"
                >
                  JOIN US
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Reversed (Card Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-10 p-6 sm:p-10 border border-[#E6E0D8] bg-white">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#FAF6F0] p-8 sm:p-12 border border-[#E6E0D8] shadow-sm space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B2331]">
                AN ALLIANCE OF OVER
              </h3>
              <p className="text-sm sm:text-base text-[#3A3A3A] leading-relaxed">
                <strong className="text-xl sm:text-2xl font-serif text-[#2A2A2A] block my-1">
                  5 MILLION
                </strong>
                conscious consumers and a growing number of purpose-driven businesses & organizations that are a part of our Shared Values Community.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden order-1 lg:order-2">
            <Image
              src="https://cf.getxeno.com/1818/static_images/fabFamily_2.webp"
              alt="Alliance of 5 Million"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Row 3: Image Left, Floating Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-10 bg-[#FAF6F0] p-6 sm:p-10 border border-[#E6E0D8]">
          <div className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="https://cf.getxeno.com/1818/static_images/fabFamily_3.webp"
              alt="Thank You"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="lg:col-span-6">
            <div className="bg-white p-8 sm:p-12 border border-[#E6E0D8] shadow-sm space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B2331]">
                FABFAMILY IS OUR WAY OF SAYING
              </h3>
              <p className="text-sm sm:text-base text-[#3A3A3A] leading-relaxed">
                <strong className="text-xl sm:text-2xl font-serif text-[#8B2331] block my-1">
                  ‘‘THANK YOU’’
                </strong>
                to all of you - for helping us craft a brand that is loved and admired by many, for standing by us for over 60 years of our existence, and for believing in the things that truly matter: this planet and its people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BECOMING A MEMBER IS SUPER EASY! */}
      {/* ========================================================================= */}
      <section className="relative py-16 sm:py-20 my-10 overflow-hidden bg-[#FAF6F0] border-y border-[#E6E0D8]">
        {/* Background Texture Asset */}
        <div className="absolute inset-0 z-0 opacity-15">
          <Image
            src="https://cf.getxeno.com/1818/static_images/becomeMemberBg.webp"
            alt="Membership Pattern"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2A2A2A] tracking-wide">
              BECOMING A MEMBER <em className="italic font-normal text-[#8B2331]">is</em> SUPER EASY!
            </h2>
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
              Make the most of our program&apos;s offerings. Head to our stores or register here today! From exclusive collection previews to curated experiences,{" "}
              <strong className="font-bold text-[#8B2331] uppercase tracking-wide">WE HAVE IT ALL!</strong>
            </p>
          </div>

          {/* 3 Step Process: Enroll, Earn, Enjoy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
            <div className="bg-white p-8 border border-[#E6E0D8] shadow-xs text-center space-y-2.5">
              <span className="w-10 h-10 rounded-full bg-[#8B2331] text-white font-serif font-bold text-base flex items-center justify-center mx-auto mb-4">
                1
              </span>
              <h3 className="font-serif text-xl text-[#2A2A2A] font-bold">Enroll</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Become a member and get access to exclusive in-store and online offers.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#E6E0D8] shadow-xs text-center space-y-2.5">
              <span className="w-10 h-10 rounded-full bg-[#8B2331] text-white font-serif font-bold text-base flex items-center justify-center mx-auto mb-4">
                2
              </span>
              <h3 className="font-serif text-xl text-[#2A2A2A] font-bold">Earn</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Shop across our stores or online and earn Fabcoins on your transactions.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#E6E0D8] shadow-xs text-center space-y-2.5">
              <span className="w-10 h-10 rounded-full bg-[#8B2331] text-white font-serif font-bold text-base flex items-center justify-center mx-auto mb-4">
                3
              </span>
              <h3 className="font-serif text-xl text-[#2A2A2A] font-bold">Enjoy</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Spend your Fabcoins on more shopping or with our rewards partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TIERS OF JOY (Phone Mockup + 5 Tier Cards) */}
      {/* ========================================================================= */}
      <section id="tiers" className="py-14 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header with Phone Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 mb-14">
          <div className="md:col-span-4 relative h-64 sm:h-80 w-full">
            <Image
              src="https://cf.getxeno.com/1818/static_images/tiersOfJoyPhoneImg.webp"
              alt="FabFamily Tiers of Joy App"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="md:col-span-8 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
              Privilege Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#2A2A2A] tracking-tight">
              Tiers Of Joy
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-2xl leading-relaxed">
              With enriched incentives, bespoke privileges and the opportunity to earn increasing amounts of Fabcoins - in our stores and on our website - at every step of your journey.
            </p>
          </div>
        </div>

        {/* 5 Tier Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
          {TIERS_DATA.map((tier, idx) => (
            <div
              key={idx}
              className={`flex flex-col bg-white border-2 ${tier.borderColor} shadow-xs transition-all hover:shadow-lg`}
            >
              {/* Tier Header */}
              <div className={`p-5 text-center ${tier.headerBg} border-b ${tier.borderColor}`}>
                <h3 className="font-serif text-2xl font-bold tracking-wide text-[#2A2A2A]">
                  {tier.name}
                </h3>
                <span className="text-[11px] font-semibold text-[#8B2331] block mt-1">
                  {tier.rate}
                </span>
                <span className="text-[10px] text-[#6B6B6B] block">
                  {tier.spend}
                </span>
              </div>

              {/* Benefits List */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 text-xs text-[#3A3A3A]">
                <ul className="space-y-2.5">
                  {tier.benefits.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B2331] mt-1.5 shrink-0" />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. INTERACTIVE FABCOINS CALCULATOR (Real-time Engagement) */}
      {/* ========================================================================= */}
      <section className="py-12 bg-[#FAF6F0] border-y border-[#E6E0D8]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-10 border border-[#E6E0D8] shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E6E0D8]">
              <Calculator className="w-6 h-6 text-[#8B2331]" />
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#2A2A2A] font-bold">
                  Fabcoins & Tier Simulator
                </h3>
                <p className="text-xs text-[#6B6B6B]">
                  Estimate your annual shopping to see your tier upgrade and Fabcoins earned.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-[#6B6B6B]">Estimated Annual Spend:</span>
                    <span className="text-lg font-serif text-[#8B2331]">
                      ₹{annualSpend.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="250000"
                    step="5000"
                    value={annualSpend}
                    onChange={(e) => setAnnualSpend(Number(e.target.value))}
                    className="w-full accent-[#8B2331] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#888] mt-1 font-mono">
                    <span>₹5,000</span>
                    <span>₹2,50,000+</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 bg-[#FAF6F0] border border-[#E6E0D8]">
                    <span className="text-[10px] text-[#6B6B6B] block">Earn Rate</span>
                    <strong className="text-sm text-[#8B2331]">{tierInfo.rate}%</strong>
                  </div>
                  <div className="p-3 bg-[#FAF6F0] border border-[#E6E0D8]">
                    <span className="text-[10px] text-[#6B6B6B] block">Fabcoins</span>
                    <strong className="text-sm text-[#2A2A2A]">{tierInfo.coins}</strong>
                  </div>
                  <div className="p-3 bg-[#FAF6F0] border border-[#E6E0D8]">
                    <span className="text-[10px] text-[#6B6B6B] block">Cash Value</span>
                    <strong className="text-sm text-[#2A2A2A]">₹{tierInfo.coins}</strong>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 bg-[#FAF6F0] p-6 border border-[#E6E0D8] text-center space-y-3">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#8B2331]">
                  Your Projected Status
                </span>
                <h4 className="text-2xl font-serif font-bold text-[#2A2A2A]">
                  {tierInfo.name} TIER
                </h4>
                <p className="text-xs text-[#6B6B6B]">
                  1 Fabcoin = ₹1 at checkout across 350+ stores nationwide & fabindia.com.
                </p>
                <button
                  onClick={() => setIsJoinModalOpen(true)}
                  className="w-full py-2.5 bg-[#8B2331] hover:bg-[#701C27] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Claim My Membership
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. THESE FABCOINS ARE WAITING FOR YOU! (Shopping & Referrals) */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#FAF6F0] p-8 sm:p-12 border border-[#E6E0D8] space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2A2A2A] tracking-wide font-bold">
              THESE FABCOINS ARE WAITING FOR YOU!
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold text-[#8B2331]">
              HERE ARE THREE EASY WAYS TO EARN FABCOINS!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-8 border border-[#E6E0D8] shadow-xs text-center space-y-2">
              <h3 className="font-serif text-xl text-[#8B2331] font-bold">Shopping</h3>
              <p className="text-xs text-[#4A4A4A] font-semibold leading-relaxed tracking-wide">
                SHOP! SHOP! SHOP! EARN UPTO 10 FABCOINS FOR EVERY RS. 100 SPENT!
              </p>
            </div>

            <div className="bg-white p-8 border border-[#E6E0D8] shadow-xs text-center space-y-2">
              <h3 className="font-serif text-xl text-[#8B2331] font-bold">Referrals</h3>
              <p className="text-xs text-[#4A4A4A] font-semibold leading-relaxed tracking-wide">
                YOU CAN EARN UPTO 300 FABCOINS WHEN YOU REFER A FRIEND!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. EXPLORE OUR SHARED VALUES COMMUNITY (Sponsors Grid + Banner) */}
      {/* ========================================================================= */}
      <section id="rewards" className="py-14 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#6B6B6B] block mb-1">
          Explore
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#2A2A2A] tracking-wide mb-10">
          <em className="font-serif italic font-normal text-[#8B2331]">Our </em> SHARED VALUES COMMUNITY
        </h2>

        {/* 9 Sponsor Logos Rail */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 items-center justify-center mb-10 bg-white p-6 border border-[#E6E0D8]">
          {SPONSOR_LOGOS.map((sp, idx) => (
            <div
              key={idx}
              className="relative h-14 w-full flex items-center justify-center p-2 grayscale hover:grayscale-0 transition-all hover:scale-105"
            >
              <Image
                src={sp.logo}
                alt={sp.name}
                fill
                className="object-contain"
                sizes="120px"
              />
            </div>
          ))}
        </div>

        {/* Bottom Banner Image */}
        <div className="relative w-full aspect-[21/7] max-h-[360px] overflow-hidden border border-[#E6E0D8] shadow-xs">
          <Image
            src="https://cf.getxeno.com/1818/static_images/sponsorSectionBanner.webp"
            alt="Shared Values Community Partner Banner"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. INTERACTIVE JOIN OR LOGIN MODAL */}
      {/* ========================================================================= */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white max-w-md w-full p-8 border border-[#E6E0D8] shadow-2xl relative space-y-6">
            <button
              onClick={() => {
                setIsJoinModalOpen(false);
                setIsJoined(false);
              }}
              className="absolute top-4 right-4 text-[#6B6B6B] hover:text-[#2A2A2A] p-1"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="relative w-36 h-8 mx-auto mb-2">
                <Image
                  src="https://cf.getxeno.com/1818/static_images/fabFamilyLogo.webp"
                  alt="FabFamily"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2A2A2A]">
                {isJoined ? "Welcome to the Family!" : "Join or Sign In"}
              </h3>
              <p className="text-xs text-[#6B6B6B]">
                {isJoined
                  ? "Your FabFamily membership is active. Earn Fabcoins on every order."
                  : "Enter your mobile number to unlock bespoke privileges and 1 Fabcoin = ₹1 rewards."}
              </p>
            </div>

            {!isJoined ? (
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#2A2A2A] block mb-1">
                    Mobile Number
                  </label>
                  <div className="flex border border-[#E6E0D8] focus-within:border-[#8B2331]">
                    <span className="px-3 py-2 bg-[#FAF6F0] text-xs text-[#6B6B6B] border-r border-[#E6E0D8]">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                      placeholder="9876543210"
                      className="w-full px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A2A2A] block mb-1">
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g. Ananya Sharma"
                    className="w-full px-3 py-2 border border-[#E6E0D8] text-xs focus:outline-none focus:border-[#8B2331]"
                  />
                </div>

                <div className="text-[11px] text-[#6B6B6B] leading-relaxed">
                  By continuing, you agree to Fabindia&apos;s FabFamily Terms & Conditions and Privacy Policy.
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#8B2331] hover:bg-[#701C27] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-xs"
                >
                  Verify & Continue
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <div className="p-4 bg-[#FAF6F0] border border-[#E6E0D8] text-xs text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Member Status:</span>
                    <strong className="text-[#8B2331]">Active • Bronze Tier</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Starting Fabcoins:</span>
                    <strong className="text-[#2A2A2A]">100 Welcome Bonus</strong>
                  </div>
                </div>
                <button
                  onClick={() => setIsJoinModalOpen(false)}
                  className="w-full py-2.5 bg-[#8B2331] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Start Shopping Handcrafts
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
