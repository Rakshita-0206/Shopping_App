"use client";

import { useState, useMemo, useEffect, use, Suspense } from "react";
import Image from "next/image";
import { notFound, redirect, useSearchParams } from "next/navigation";
import { Filter, X, ChevronDown, SlidersHorizontal, Check } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useCurrencyStore } from "@/store/currencyStore";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const matchesSubcategory = (product: (typeof PRODUCTS)[0], query: string) => {
  const q = query.toLowerCase().trim();
  const pSub = product.subcategory.toLowerCase();
  const pName = product.name.toLowerCase();
  const pDesc = (product.description || "").toLowerCase();
  const pFabric = (product.fabric || "").toLowerCase();
  const pStory = (product.artisanStory || "").toLowerCase();

  // 1. Direct equality or substring containment in subcategory
  if (pSub === q || pSub.includes(q) || q.includes(pSub)) return true;

  // 2. Tokenized word matching (e.g., "Kurta" matches "Kurtas & Tunics", "Chikankari Kurtas", "Classic Long Kurtas")
  const words = q
    .split(/[\s,&/()]+/)
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length >= 4);

  const productText = `${pSub} ${pName} ${pDesc} ${pFabric} ${pStory}`;
  const hasWordMatch = words.some((w) => {
    const stem = w.endsWith("s") ? w.slice(0, -1) : w;
    return productText.includes(stem);
  });
  if (hasWordMatch) return true;

  return false;
};

function CategoryContent({ params }: PageProps) {
  const { slug } = use(params);

  if (slug === "fabfamily") {
    redirect("/fabfamily");
  }

  const searchParams = useSearchParams();
  const subcategoryParam = searchParams.get("sub");

  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const { formatPrice } = useCurrencyStore();

  // Filter & Sort States
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    subcategoryParam ? [subcategoryParam] : []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Synchronize URL search params with active subcategory filters
  useEffect(() => {
    if (subcategoryParam) {
      setSelectedSubcategories([subcategoryParam]);
    } else {
      setSelectedSubcategories([]);
    }
  }, [subcategoryParam]);

  // Available products for this category/page
  const categoryProducts = useMemo(() => {
    if (category.id === "new-arrivals") {
      return PRODUCTS.filter((p) => p.isNew || p.tag === "New" || p.tag === "Bestseller");
    }
    if (category.id === "sale") {
      return PRODUCTS.filter((p) => p.isSale || (p.mrp && p.mrp > p.price));
    }
    if (category.id === "collection") {
      return PRODUCTS.filter((p) => p.category === "collection" || p.tag === "Bestseller");
    }
    const direct = PRODUCTS.filter((p) => p.category === category.id);
    return direct.length > 0 ? direct : PRODUCTS.slice(0, 10);
  }, [category.id]);

  const allSubcategories = useMemo(() => {
    const list = new Set<string>();
    category.subcategories?.forEach((group) => {
      group.items.forEach((item) => list.add(item));
    });
    categoryProducts.forEach((p) => list.add(p.subcategory));
    return Array.from(list);
  }, [category, categoryProducts]);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    categoryProducts.forEach((p) => {
      p.colors.forEach((c) => map.set(c.name, c.hex));
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [categoryProducts]);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    categoryProducts.forEach((p) => {
      p.sizes.forEach((s) => set.add(s));
    });
    return Array.from(set);
  }, [categoryProducts]);

  const allFabrics = useMemo(() => {
    const set = new Set<string>();
    categoryProducts.forEach((p) => {
      if (p.fabric) set.add(p.fabric.split(" ")[0]);
    });
    return Array.from(set);
  }, [categoryProducts]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return categoryProducts
      .filter((product) => {
        // Subcategory filter with smart matching
        if (selectedSubcategories.length > 0) {
          const matched = selectedSubcategories.some((sub) =>
            matchesSubcategory(product, sub)
          );
          if (!matched) return false;
        }

        // Price filter
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
          return false;
        }

        // Color filter
        if (
          selectedColors.length > 0 &&
          !product.colors.some((c) => selectedColors.includes(c.name))
        ) {
          return false;
        }

        // Size filter
        if (
          selectedSizes.length > 0 &&
          !product.sizes.some((s) => selectedSizes.includes(s))
        ) {
          return false;
        }

        // Fabric filter
        if (
          selectedFabrics.length > 0 &&
          !selectedFabrics.some((f) => product.fabric?.toLowerCase().includes(f.toLowerCase()))
        ) {
          return false;
        }

        // Discount filter
        if (minDiscount > 0) {
          const mrp = product.mrp || product.originalPrice || product.price;
          const pct = Math.round(((mrp - product.price) / mrp) * 100);
          if (pct < minDiscount) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low-high") return a.price - b.price;
        if (sortBy === "price-high-low") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") {
          const pctA = a.discountPct || 0;
          const pctB = b.discountPct || 0;
          return pctB - pctA;
        }
        if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [
    categoryProducts,
    selectedSubcategories,
    priceRange,
    selectedColors,
    selectedSizes,
    selectedFabrics,
    minDiscount,
    sortBy,
  ]);

  const activeFilterCount =
    selectedSubcategories.length +
    selectedColors.length +
    selectedSizes.length +
    selectedFabrics.length +
    (minDiscount > 0 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 25000 ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedSubcategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedFabrics([]);
    setMinDiscount(0);
    setPriceRange([0, 25000]);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] pb-20">
      {/* Category Editorial Hero Banner */}
      <div className="relative bg-[#F5EFE6] border-b border-[#E6E0D8] overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 min-h-[220px] sm:min-h-[260px] lg:min-h-[280px]">
          {/* Left: Department Story & Quick Filters */}
          <div className="md:col-span-7 lg:col-span-8 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-3 z-10">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B2331]">
              Artisanal Handcrafts • Heritage Edit
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#2A2A2A]">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-xl font-normal leading-relaxed">
              {category.description}
            </p>
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B2331] mr-1 hidden sm:inline">
                  Popular:
                </span>
                {category.subcategories.flatMap((s) => s.items).slice(0, 6).map((item) => {
                  const isActive = selectedSubcategories.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        if (isActive) {
                          setSelectedSubcategories(selectedSubcategories.filter((s) => s !== item));
                        } else {
                          setSelectedSubcategories([item]);
                        }
                      }}
                      className={`text-[11px] px-3 py-1 rounded-full border transition-all ${
                        isActive
                          ? "bg-[#8B2331] text-white border-[#8B2331] font-semibold shadow-xs"
                          : "bg-white text-[#2A2A2A] border-[#E6E0D8] hover:border-[#8B2331] hover:text-[#8B2331]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Beautifully Placed & Fully Visible Photo */}
          <div className="md:col-span-5 lg:col-span-4 relative h-64 sm:h-72 md:h-auto min-h-[220px] w-full overflow-hidden bg-[#E6E0D8]">
            <Image
              src={category.bannerImage}
              alt={category.name}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            {/* Soft edge blend on desktop */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F5EFE6] to-transparent hidden md:block" />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Breadcrumbs & Product Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E6E0D8]">
          <Breadcrumbs
            items={[
              { label: category.name, href: `/category/${category.slug}` },
              ...(subcategoryParam ? [{ label: subcategoryParam }] : []),
            ]}
          />
          <span className="text-xs text-[#6B6B6B] font-medium">
            Showing <strong className="text-[#2A2A2A]">{filteredProducts.length}</strong> items
          </span>
        </div>

        {/* Toolbar: Filter Toggle & Sort Dropdown */}
        <div className="flex items-center justify-between py-4 border-b border-[#E6E0D8] mb-6">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E6E0D8] text-xs font-semibold uppercase tracking-wider text-[#2A2A2A]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B2331]" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 text-xs text-[#6B6B6B]">
            <SlidersHorizontal className="w-4 h-4 text-[#8B2331]" />
            <span className="font-semibold uppercase tracking-wider text-[#2A2A2A]">
              Filter By
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-[#6B6B6B] hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E6E0D8] text-xs py-2 px-3 text-[#2A2A2A] font-medium focus:outline-none focus:border-[#8B2331]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Applied Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
            <span className="text-xs text-[#6B6B6B] font-medium">Applied:</span>
            {selectedSubcategories.map((sub) => (
              <span
                key={sub}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E6E0D8] text-xs text-[#2A2A2A]"
              >
                {sub}
                <button
                  onClick={() => setSelectedSubcategories(selectedSubcategories.filter((s) => s !== sub))}
                  className="hover:text-[#8B2331]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedColors.map((col) => (
              <span
                key={col}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E6E0D8] text-xs text-[#2A2A2A]"
              >
                Color: {col}
                <button
                  onClick={() => setSelectedColors(selectedColors.filter((c) => c !== col))}
                  className="hover:text-[#8B2331]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedSizes.map((sz) => (
              <span
                key={sz}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E6E0D8] text-xs text-[#2A2A2A]"
              >
                Size: {sz}
                <button
                  onClick={() => setSelectedSizes(selectedSizes.filter((s) => s !== sz))}
                  className="hover:text-[#8B2331]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {minDiscount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E6E0D8] text-xs text-[#2A2A2A]">
                Min {minDiscount}% Off
                <button onClick={() => setMinDiscount(0)} className="hover:text-[#8B2331]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-[#8B2331] hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Layout: Desktop Filter Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 pr-4 border-r border-[#E6E0D8]">
            {/* Category / Subcategory Filter */}
            {allSubcategories.length > 0 && (
              <div className="space-y-3 pb-5 border-b border-[#E6E0D8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A2A2A]">
                  Subcategory
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                  {allSubcategories.map((sub) => {
                    const checked = selectedSubcategories.includes(sub);
                    return (
                      <label
                        key={sub}
                        className="flex items-center gap-2 text-xs text-[#2A2A2A] hover:text-[#8B2331] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            if (checked) {
                              setSelectedSubcategories(selectedSubcategories.filter((s) => s !== sub));
                            } else {
                              setSelectedSubcategories([...selectedSubcategories, sub]);
                            }
                          }}
                          className="w-3.5 h-3.5 accent-[#8B2331]"
                        />
                        <span>{sub}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Range Filter */}
            <div className="space-y-3 pb-5 border-b border-[#E6E0D8]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A2A2A]">
                  Max Price
                </h4>
                <span className="text-xs font-semibold text-[#8B2331]">
                  {formatPrice(priceRange[1])}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-[#8B2331] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#6B6B6B]">
                <span>{formatPrice(500)}</span>
                <span>{formatPrice(25000)}</span>
              </div>
            </div>

            {/* Size Filter */}
            {allSizes.length > 0 && (
              <div className="space-y-3 pb-5 border-b border-[#E6E0D8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A2A2A]">
                  Size
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {allSizes.map((size) => {
                    const active = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          if (active) {
                            setSelectedSizes(selectedSizes.filter((s) => s !== size));
                          } else {
                            setSelectedSizes([...selectedSizes, size]);
                          }
                        }}
                        className={`text-xs px-2.5 py-1 border transition-colors ${
                          active
                            ? "bg-[#8B2331] text-white border-[#8B2331]"
                            : "bg-white text-[#2A2A2A] border-[#E6E0D8] hover:border-[#8B2331]"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Swatch Filter */}
            {allColors.length > 0 && (
              <div className="space-y-3 pb-5 border-b border-[#E6E0D8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A2A2A]">
                  Color
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((c) => {
                    const active = selectedColors.includes(c.name);
                    return (
                      <button
                        key={c.name}
                        onClick={() => {
                          if (active) {
                            setSelectedColors(selectedColors.filter((col) => col !== c.name));
                          } else {
                            setSelectedColors([...selectedColors, c.name]);
                          }
                        }}
                        className={`w-6 h-6 rounded-full border transition-transform flex items-center justify-center ${
                          active
                            ? "ring-2 ring-[#8B2331] scale-110 border-white"
                            : "border-[#E6E0D8] hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                        aria-label={`Filter by color ${c.name}`}
                      >
                        {active && <Check className="w-3 h-3 text-white drop-shadow-xs" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Discount Filter */}
            <div className="space-y-2 pb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A2A2A]">
                Discount
              </h4>
              <div className="space-y-1.5 text-xs">
                {[10, 20, 30, 50].map((pct) => (
                  <label
                    key={pct}
                    className="flex items-center gap-2 cursor-pointer text-[#2A2A2A] hover:text-[#8B2331]"
                  >
                    <input
                      type="radio"
                      name="discount"
                      checked={minDiscount === pct}
                      onChange={() => setMinDiscount(minDiscount === pct ? 0 : pct)}
                      className="accent-[#8B2331]"
                    />
                    <span>{pct}% and above</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E6E0D8] p-12 text-center space-y-3 my-8">
                <p className="text-sm font-serif text-[#2A2A2A]">
                  No handcrafted pieces match your current filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-[#8B2331] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6E1B26]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProducts.length && (
                  <div className="text-center pt-6">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 8)}
                      className="px-8 py-3 bg-white border border-[#8B2331] text-[#8B2331] hover:bg-[#8B2331] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Load More Products
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 z-10 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#E6E0D8] pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A2A2A]">
                Filters
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-[#6B6B6B] hover:text-[#2A2A2A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Subcategories */}
            {allSubcategories.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B2331]">
                  Subcategory
                </span>
                <div className="space-y-1.5 pl-1">
                  {allSubcategories.map((sub) => {
                    const checked = selectedSubcategories.includes(sub);
                    return (
                      <label key={sub} className="flex items-center gap-2 text-xs text-[#2A2A2A]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            if (checked) {
                              setSelectedSubcategories(selectedSubcategories.filter((s) => s !== sub));
                            } else {
                              setSelectedSubcategories([...selectedSubcategories, sub]);
                            }
                          }}
                          className="accent-[#8B2331]"
                        />
                        <span>{sub}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-[#E6E0D8] flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 bg-[#FAF6F0] text-xs font-bold text-[#2A2A2A] uppercase"
              >
                Clear
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#8B2331] text-xs font-bold text-white uppercase"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#8B2331] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CategoryContent {...props} />
    </Suspense>
  );
}
