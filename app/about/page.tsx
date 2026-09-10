import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Users, ShieldCheck, Leaf } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Our Story & Heritage | Fabindia",
  description:
    "Celebrating India's hereditary handloom weavers, ancient woodblock printing, organic living, and ethical slow craftsmanship since 1960.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-24 bg-[#FAF6F0]">
      {/* Hero Header */}
      <section className="relative h-[55vh] min-h-[420px] bg-[#1F2A44] flex items-center justify-center">
        <Image
          src="/images/hero/slide-1.jpg"
          alt="Weaver working on a traditional wooden handloom"
          fill
          priority
          className="object-cover opacity-45 brightness-75"
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-4">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A059] font-bold">
            CELEBRATE INDIA • ESTD. 1960
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight">
            The Hands That Weave the Soul of India
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 font-light max-w-xl mx-auto leading-relaxed">
            Founded in 1960 by John Bissell with a reverence for ancestral Indian crafts, Fabindia connects over 55,000 rural artisans directly to mindful patrons around the world.
          </p>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B2331] font-bold">
            Our Philosophy
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2A2A2A]">
            Slow, Human, and In Harmony with the Earth
          </h2>
          <div className="w-16 h-[2px] bg-[#8B2331] mx-auto" />
          <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed max-w-3xl mx-auto">
            Before synthetic dyes and automated high-speed mills flattened the landscape of global fashion,
            every Indian village was home to an extraordinary ecosystem of spinners, natural dye masters,
            block carvers, and weavers. A single Chanderi saree took weeks of patient hand-treadling. An Ajrakh textile
            required 14 separate washings in the river and months of sun cure.
          </p>
          <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed max-w-3xl mx-auto">
            At Fabindia, we believe that true luxury is patience. We provide rural artisans with fair sustainable wages,
            access to healthcare, and a national and global canvas to keep generational knowledge vibrant and alive.
          </p>
        </div>
      </section>

      {/* Impact Numbers Grid */}
      <section className="bg-white border-y border-[#E6E0D8] py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <span className="font-serif text-4xl sm:text-5xl text-[#8B2331] font-bold">55,000+</span>
              <p className="text-xs text-[#6B6B6B] uppercase tracking-wider font-semibold">
                Rural Artisans & Weavers
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-4xl sm:text-5xl text-[#8B2331] font-bold">29</span>
              <p className="text-xs text-[#6B6B6B] uppercase tracking-wider font-semibold">
                States Across India
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-4xl sm:text-5xl text-[#8B2331] font-bold">60+</span>
              <p className="text-xs text-[#6B6B6B] uppercase tracking-wider font-semibold">
                Years of Craft Heritage
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-4xl sm:text-5xl text-[#8B2331] font-bold">100%</span>
              <p className="text-xs text-[#6B6B6B] uppercase tracking-wider font-semibold">
                Natural & Sustainable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Artisans Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] bg-white border border-[#E6E0D8]">
            <Image
              src="/images/home/artisan-blockprint.jpg"
              alt="Artisan block printing with teakwood stamp"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B2331] font-bold">
              Community Ownership
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2A2A2A]">
              Craft Companies Owned by the Artisans Themselves
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Through community-owned companies, our artisans are shareholders in the supply chain, ensuring that profits flow directly back into rural education, healthcare, and water conservation in weaving villages.
            </p>
            <div className="pt-2">
              <Link
                href="/category/women"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B2331] hover:bg-[#6E1B26] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Support Our Craft Clusters</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
