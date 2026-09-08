"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E6E0D8]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B2331]">
            We're Here For You
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#2A2A2A]">
            Contact Fabindia Customer Care
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-xl mx-auto">
            Have questions about an order, custom sizing, handloom authenticity, or store locations? Our concierge team is happy to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[#E6E0D8] text-center space-y-2 shadow-xs">
            <div className="w-12 h-12 bg-[#FAF6F0] rounded-full flex items-center justify-center mx-auto text-[#8B2331]">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#2A2A2A]">Call Us</h3>
            <p className="text-xs text-[#6B6B6B]">1800-100-1234 (Toll Free)</p>
            <p className="text-[11px] text-[#6B6B6B]">Mon - Sat: 9:00 AM - 7:00 PM</p>
          </div>

          <div className="p-6 bg-white border border-[#E6E0D8] text-center space-y-2 shadow-xs">
            <div className="w-12 h-12 bg-[#FAF6F0] rounded-full flex items-center justify-center mx-auto text-[#8B2331]">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#2A2A2A]">Email Us</h3>
            <p className="text-xs text-[#6B6B6B]">support@fabindia.net</p>
            <p className="text-[11px] text-[#6B6B6B]">Response within 24 hours</p>
          </div>

          <div className="p-6 bg-white border border-[#E6E0D8] text-center space-y-2 shadow-xs">
            <div className="w-12 h-12 bg-[#FAF6F0] rounded-full flex items-center justify-center mx-auto text-[#8B2331]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#2A2A2A]">Headquarters</h3>
            <p className="text-xs text-[#6B6B6B]">Plot 10, Local Shopping Centre</p>
            <p className="text-[11px] text-[#6B6B6B]">Sector B, Pocket 7, Vasant Kunj, New Delhi 110070</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-[#E6E0D8] p-8 max-w-2xl mx-auto shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#2A2A2A] mb-4 text-center">
            Send Us a Message
          </h2>

          {submitted ? (
            <div className="p-6 bg-[#FAF6F0] border border-[#8B2331] text-center space-y-2 animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-[#8B2331] mx-auto" />
              <h3 className="font-serif text-base font-bold text-[#2A2A2A]">Message Received!</h3>
              <p className="text-xs text-[#6B6B6B]">
                Thank you for reaching out. A representative will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2A2A]">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="w-full p-2.5 bg-[#FAF6F0] border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2A2A]">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full p-2.5 bg-[#FAF6F0] border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2A2A]">Subject / Order ID (if applicable)</label>
                <input
                  type="text"
                  placeholder="e.g. Order #FAB-123456 or Sizing Query"
                  className="w-full p-2.5 bg-[#FAF6F0] border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2A2A]">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you today?"
                  className="w-full p-2.5 bg-[#FAF6F0] border border-[#E6E0D8] focus:border-[#8B2331] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#8B2331] hover:bg-[#6E1B26] text-white font-bold uppercase tracking-wider text-xs transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
