"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Accordion from "@/components/ui/Accordion";
import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E6E0D8]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Frequently Asked Questions" }]} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
            Help & Assistance
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2A2A2A]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B]">
            Find answers to commonly asked questions about our handloom garments, sizing, ordering, and artisan authenticity.
          </p>
        </div>

        <div className="bg-white border border-[#E6E0D8] p-6 sm:p-8 space-y-4 shadow-xs">
          <Accordion title="How do I care for naturally dyed and handblock printed garments?" defaultOpen>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Because our authentic Ajrakh, Bagru, and Kalamkari textiles utilize natural vegetable and plant dyes (such as madder, indigo, and pomegranate peel), we recommend washing them separately in cold water with mild organic detergent. Avoid soaking or drying under direct harsh sunlight to preserve the richness of natural pigments.
            </p>
          </Accordion>

          <Accordion title="What is Fabindia's Shipping Policy and Timelines?">
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              We offer complimentary express shipping across India on all orders exceeding ₹1,499. Orders are usually dispatched within 24–48 hours from our central artisan fulfillment hubs and delivered within 2–5 business days depending on destination pincode.
            </p>
          </Accordion>

          <Accordion title="How do I initiate a Return or Exchange?">
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              We provide a hassle-free 14-day return and exchange window from the date of delivery. You can initiate a return directly from your <Link href="/account" className="text-[#8B2331] underline">Account Dashboard</Link> or by contacting our concierge team at support@fabindia.net. Doorstep pickup will be scheduled at no extra charge.
            </p>
          </Accordion>

          <Accordion title="Are your products 100% authentic and ethically crafted?">
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Yes. Fabindia has been committed to community-owned craft enterprises since 1960. We work directly with over 55,000 rural weavers and artisan clusters in 29 Indian states, ensuring that craftspeople receive equitable living wages and safe working conditions without middlemen.
            </p>
          </Accordion>

          <Accordion title="What is the Fabfamily Loyalty Program?">
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Fabfamily is our tiered loyalty rewards program. Members earn points on every purchase online and at any of our 350+ stores, which can be redeemed on future handcrafted purchases. You also receive early access to festive capsule previews and invitations to artisan workshops.
            </p>
          </Accordion>

          <Accordion title="Do you offer custom tailoring or alterations?">
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Yes! Custom alterations and bespoke tailoring are available across all Fabindia Experience Centres nationwide. You can drop off your garment at any store along with your measurements.
            </p>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
