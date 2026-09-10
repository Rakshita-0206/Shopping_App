"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, Search, Navigation, Building } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface Store {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  timings: string;
  type: "Experience Centre" | "Flagship Store" | "Home & Lifestyle";
}

const STORES: Store[] = [
  {
    id: "delhi-gk1",
    name: "Fabindia Experience Centre - Greater Kailash",
    city: "New Delhi",
    address: "N-Block Market, Greater Kailash Part 1, New Delhi, Delhi 110048",
    phone: "+91 11 4056 7890",
    timings: "10:30 AM - 8:30 PM (Open All Days)",
    type: "Experience Centre",
  },
  {
    id: "delhi-connaught",
    name: "Fabindia Flagship - Connaught Place",
    city: "New Delhi",
    address: "14, N-Block, Middle Circle, Connaught Place, New Delhi, Delhi 110001",
    phone: "+91 11 4151 3456",
    timings: "10:30 AM - 8:30 PM (Open All Days)",
    type: "Flagship Store",
  },
  {
    id: "mumbai-kala-ghoda",
    name: "Fabindia Kala Ghoda Historic Store",
    city: "Mumbai",
    address: "137, J.T. Road, Kala Ghoda, Fort, Mumbai, Maharashtra 400001",
    phone: "+91 22 2262 1234",
    timings: "10:00 AM - 9:00 PM (Open All Days)",
    type: "Experience Centre",
  },
  {
    id: "mumbai-bandra",
    name: "Fabindia Bandra West",
    city: "Mumbai",
    address: "Plot 328, Linking Road, Khar West, Mumbai, Maharashtra 400052",
    phone: "+91 22 2648 7890",
    timings: "10:30 AM - 9:00 PM (Open All Days)",
    type: "Flagship Store",
  },
  {
    id: "bengaluru-indiranagar",
    name: "Fabindia Experience Centre - Indiranagar",
    city: "Bengaluru",
    address: "548, CMH Road, Stage 1, Indiranagar, Bengaluru, Karnataka 560038",
    phone: "+91 80 4125 5678",
    timings: "10:00 AM - 9:00 PM (Open All Days)",
    type: "Experience Centre",
  },
  {
    id: "bengaluru-koramangala",
    name: "Fabindia Koramangala",
    city: "Bengaluru",
    address: "80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    phone: "+91 80 4150 9012",
    timings: "10:30 AM - 8:30 PM (Open All Days)",
    type: "Home & Lifestyle",
  },
  {
    id: "chennai-khader-nawaz",
    name: "Fabindia Nungambakkam",
    city: "Chennai",
    address: "19, Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu 600006",
    phone: "+91 44 2833 4567",
    timings: "10:00 AM - 8:30 PM (Open All Days)",
    type: "Experience Centre",
  },
  {
    id: "kolkata-park-street",
    name: "Fabindia Park Street",
    city: "Kolkata",
    address: "18, Park Street, Park Street area, Kolkata, West Bengal 700071",
    phone: "+91 33 2229 6789",
    timings: "10:30 AM - 8:30 PM (Open All Days)",
    type: "Flagship Store",
  },
  {
    id: "jaipur-c-scheme",
    name: "Fabindia C-Scheme",
    city: "Jaipur",
    address: "Panch Batti, M.I. Road, C Scheme, Ashok Nagar, Jaipur, Rajasthan 302001",
    phone: "+91 141 236 8901",
    timings: "10:00 AM - 8:30 PM (Open All Days)",
    type: "Experience Centre",
  },
];

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");

  const cities = ["All Cities", ...Array.from(new Set(STORES.map((s) => s.city)))];

  const filteredStores = STORES.filter((store) => {
    const matchesCity = selectedCity === "All Cities" || store.city === selectedCity;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      store.name.toLowerCase().includes(query) ||
      store.address.toLowerCase().includes(query) ||
      store.city.toLowerCase().includes(query);
    return matchesCity && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#FAF6F0] pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E6E0D8]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Store Locator" }]} />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
            Find Your Nearest Store
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2A2A2A]">
            Fabindia Stores & Experience Centres
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B]">
            Visit one of our 350+ artisanal stores across India to experience pure handloom fabrics, custom tailoring, organic food tasting, and home design consultations.
          </p>
        </div>

        {/* Search & City Filter Bar */}
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 bg-white p-3 border border-[#E6E0D8] shadow-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8B2331] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, area, or pincode…"
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF6F0] border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
            />
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 text-xs bg-[#FAF6F0] border border-[#E6E0D8] text-[#2A2A2A] font-medium focus:outline-none focus:border-[#8B2331]"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-[#6B6B6B]">
          <span>
            Showing <strong>{filteredStores.length}</strong> stores
          </span>
        </div>

        {/* Store Cards Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-[#E6E0D8] overflow-hidden hover:border-[#8B2331] transition-all shadow-xs flex flex-col justify-between group"
            >
              {/* Stylized Map Preview Placeholder */}
              <div className="relative h-28 w-full bg-[#F4EFE6] overflow-hidden border-b border-[#E6E0D8]">
                <svg className="absolute inset-0 w-full h-full opacity-50" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`map-grid-${store.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#D7CEC2" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#map-grid-${store.id})`} />
                  <path d="M -20 70 Q 120 20, 240 80 T 400 40" fill="none" stroke="#E2D6C5" strokeWidth="5" />
                  <path d="M 80 -10 Q 120 60, 160 140" fill="none" stroke="#E2D6C5" strokeWidth="4" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-[#8B2331]/25 animate-ping" />
                    <div className="relative w-8 h-8 rounded-full bg-[#8B2331] text-white flex items-center justify-center shadow-md">
                      <MapPin className="w-4 h-4 fill-white" />
                    </div>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-[9px] font-bold uppercase tracking-wider text-[#8B2331] bg-white/90 px-2 py-0.5 border border-[#E6E0D8] backdrop-blur-xs">
                  {store.city}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B2331] bg-[#FAF6F0] px-2 py-0.5 border border-[#E6E0D8] inline-block">
                    {store.type}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#2A2A2A] leading-snug">
                    {store.name}
                  </h3>
                  <div className="flex items-start gap-2 text-xs text-[#6B6B6B] pt-1">
                    <MapPin className="w-4 h-4 text-[#8B2331] shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </div>
                </div>

              <div className="space-y-2 pt-3 border-t border-[#E6E0D8] text-xs text-[#6B6B6B]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8B2331]" />
                  <a href={`tel:${store.phone}`} className="hover:text-[#8B2331]">
                    {store.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#8B2331]" />
                  <span>{store.timings}</span>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(store.name + " " + store.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 bg-[#FAF6F0] hover:bg-[#8B2331] hover:text-white text-[#2A2A2A] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-[#E6E0D8]"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
