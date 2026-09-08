"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, X, SlidersHorizontal } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();

    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Query match
      if (!q) return true;

      const inName = product.name.toLowerCase().includes(q);
      const inDesc = product.description.toLowerCase().includes(q);
      const inSub = product.subcategory.toLowerCase().includes(q);
      const inArtisan = product.artisanStory.toLowerCase().includes(q);
      const inFabric = product.fabric ? product.fabric.toLowerCase().includes(q) : false;
      const inTag = product.tag ? product.tag.toLowerCase().includes(q) : false;

      return inName || inDesc || inSub || inArtisan || inFabric || inTag;
    });
  }, [query, selectedCategory]);

  const sortedResults = useMemo(() => {
    const items = [...searchResults];
    if (sortBy === "price-low") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      items.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    }
    return items;
  }, [searchResults, sortBy]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 space-y-8 bg-[#FAF6F0]">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search Catalog" }]} />

      {/* Search Header Bar */}
      <div className="max-w-2xl mx-auto text-center space-y-4 pt-4">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2A2A2A]">
          Search Our Handcrafted Catalog
        </h1>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Kurtas, Sarees, Home Linen, Furniture, Honey…"
            className="w-full h-12 pl-12 pr-10 bg-white border border-[#E6E0D8] text-xs sm:text-sm text-[#2A2A2A] rounded-full focus:outline-none focus:border-[#8B2331] shadow-xs"
          />
          <SearchIcon className="w-5 h-5 text-[#8B2331] absolute left-4 top-1/2 -translate-y-1/2" />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#2A2A2A]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E6E0D8] pb-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 no-scrollbar">
          {[
            { id: "all", label: "All Items" },
            { id: "women", label: "Women" },
            { id: "men", label: "Men" },
            { id: "kids", label: "Kids" },
            { id: "home-living", label: "Home & Living" },
            { id: "furniture", label: "Furniture" },
            { id: "food", label: "Food & Organics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`text-xs px-3.5 py-1.5 whitespace-nowrap transition-colors rounded-none ${
                selectedCategory === tab.id
                  ? "bg-[#8B2331] text-white font-semibold"
                  : "bg-white text-[#2A2A2A] border border-[#E6E0D8] hover:border-[#8B2331]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs text-[#6B6B6B] shrink-0">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-[#E6E0D8] py-1.5 px-3 text-xs text-[#2A2A2A] focus:outline-none focus:border-[#8B2331]"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
        <span>
          Showing <strong>{sortedResults.length}</strong> results {query && `for "${query}"`}
        </span>
      </div>

      {/* Results Grid */}
      {sortedResults.length === 0 ? (
        <div className="bg-white border border-[#E6E0D8] p-16 text-center space-y-4">
          <p className="font-serif text-lg text-[#2A2A2A]">
            No handcrafted pieces matched your query.
          </p>
          <p className="text-xs text-[#6B6B6B]">
            Try searching for "Kurta", "Chikankari", "Khadi", "Saree", "Honey", or "Table".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-16 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#8B2331] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
