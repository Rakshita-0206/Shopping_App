"use client";

import Link from "next/link";
import Image from "next/image";
import { CategoryItem } from "@/types/product";
import { ArrowRight } from "lucide-react";

interface MegaMenuProps {
  category: CategoryItem;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function MegaMenu({
  category,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave || onClose}
      className="absolute top-full left-0 w-full bg-white border-b border-[#E6E0D8] shadow-2xl z-50 animate-fade-in py-8 px-6 lg:px-12 before:content-[''] before:absolute before:-top-3 before:left-0 before:w-full before:h-3"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8">
        {/* Subcategories columns */}
        <div className="col-span-8 grid grid-cols-3 gap-8">
          {category.subcategories.map((sub, idx) => (
            <div key={idx} className="space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-[#8B2331] border-b border-[#E6E0D8] pb-2">
                {sub.title}
              </h3>
              <ul className="space-y-2">
                {sub.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href={`/category/${category.slug}?sub=${encodeURIComponent(item)}`}
                      onClick={onClose}
                      className="text-xs text-[#2A2A2A] hover:text-[#8B2331] hover:underline underline-offset-2 transition-colors block py-0.5"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured Promotional Tile */}
        <div className="col-span-4 border-l border-[#E6E0D8] pl-8">
          <Link
            href={`/category/${category.slug}`}
            onClick={onClose}
            className="group block relative overflow-hidden bg-[#F5EFE6] aspect-[4/3] rounded-none border border-[#E6E0D8]"
          >
            <Image
              src={category.featuredImage}
              alt={category.featuredTitle}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 380px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-[10px] tracking-widest uppercase text-amber-200 font-semibold">
                Curated Collection
              </span>
              <h4 className="text-white font-serif text-lg font-normal mb-1">
                {category.featuredTitle}
              </h4>
              <span className="text-xs text-white flex items-center gap-1 font-medium tracking-wide">
                Shop The Edit <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
          <div className="mt-3.5">
            <Link
              href={`/category/${category.slug}`}
              onClick={onClose}
              className="text-xs uppercase tracking-wider font-bold text-[#8B2331] hover:text-[#6E1B26] flex items-center gap-1.5"
            >
              Explore All {category.name} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
