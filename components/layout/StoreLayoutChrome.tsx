"use client";

import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ToastContainer from "@/components/ui/Toast";

export default function StoreLayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFabfamilyRoute = pathname?.startsWith("/fabfamily");
  const isLoginRoute = pathname?.startsWith("/login");

  if (isFabfamilyRoute || isLoginRoute) {
    return (
      <>
        {/* On /fabfamily and /login, render dedicated layouts */}
        <main className="flex-1 w-full">{children}</main>
        <CartDrawer />
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <CartDrawer />
      <ToastContainer />
    </>
  );
}
