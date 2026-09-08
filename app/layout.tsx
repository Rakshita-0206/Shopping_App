import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ToastContainer from "@/components/ui/Toast";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Online Shopping for Women, Men, Kids and Home & Living | Fabindia",
  description:
    "Shop online for Women, Men, Kids, Home & Living, Personal Care and Organic Food. Fabindia's Online Shopping Site brings a variety of Stylish Clothing, Accessories, Home and Furniture products. Best Online Fashion Store. ✯COD ✯Easy Returns ✯Free Shipping*",
  keywords: [
    "fabindia",
    "online shopping india",
    "women kurtas",
    "chanderi silk saree",
    "chikankari",
    "men khadi kurta",
    "home and living",
    "solid sheesham furniture",
    "organic food",
    "fabessentials",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF6F0] text-[#2A2A2A] selection:bg-[#8B2331] selection:text-white">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <CartDrawer />
        <ToastContainer />
      </body>
    </html>
  );
}
