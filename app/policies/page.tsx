import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E6E0D8]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Policies & Terms" }]} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
            Trust & Transparency
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2A2A2A]">
            Fabindia Customer Policies
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B]">
            Learn about our shipping timelines, 14-day doorstep return policy, and commitment to consumer privacy.
          </p>
        </div>

        <div className="bg-white border border-[#E6E0D8] p-8 space-y-8 shadow-xs text-xs text-[#6B6B6B] leading-relaxed">
          <section className="space-y-3 pb-6 border-b border-[#E6E0D8]">
            <h2 className="font-serif text-xl text-[#2A2A2A] font-bold">
              1. Shipping & Doorstep Delivery
            </h2>
            <p>
              Fabindia provides complimentary express delivery across India on all prepaid and Cash-on-Delivery (COD) orders of value ₹1,499 and above. For orders under ₹1,499, a nominal flat delivery charge of ₹150 is applied at checkout.
            </p>
            <p>
              In-stock apparel, personal care, and organic food items typically ship within 24 to 48 hours. Handcrafted solid wood furniture and custom-loomed rugs require specialised white-glove transport and are delivered within 5 to 10 business days.
            </p>
          </section>

          <section className="space-y-3 pb-6 border-b border-[#E6E0D8]">
            <h2 className="font-serif text-xl text-[#2A2A2A] font-bold">
              2. 14-Day Returns & Easy Exchanges
            </h2>
            <p>
              If you are not completely satisfied with the fit or style of your handcrafted apparel, you may initiate a return or exchange within 14 calendar days of delivery.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Items must be unworn, unwashed, and returned in their original packaging with intact artisan tags.</li>
              <li>Free doorstep pickup will be arranged for your convenience.</li>
              <li>Refunds for prepaid orders are credited back to the original payment source within 3–5 working days. COD orders are refunded via direct bank transfer or store credit vouchers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#2A2A2A] font-bold">
              3. Privacy & Secure Transactions
            </h2>
            <p>
              Your personal information, delivery addresses, and payment details are encrypted using industry-standard 256-bit SSL protocols. Fabindia never stores complete card numbers or CVVs on our servers. We do not sell or trade your data to third-party advertisers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
