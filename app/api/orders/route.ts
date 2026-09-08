import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const status = searchParams.get("status");
    const limit = Math.max(1, Math.min(50, Number(searchParams.get("limit") || 20)));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (email) where.email = { equals: email.toLowerCase() };
    if (status) where.orderStatus = status;

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      paymentMethod = "upi",
      couponCode,
      fabcoinsUsed = 0,
    } = body;

    // Validate required shipping fields
    if (!fullName || !email || !phone || !address || !city || !state || !pincode) {
      return NextResponse.json(
        { success: false, error: "Missing required shipping details" },
        { status: 400 }
      );
    }

    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    // Compute server-side subtotal
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subtotal = items.reduce((sum: number, item: any) => {
      const price = Number(item.price || item.product?.price || 0);
      const qty = Number(item.quantity || 1);
      return sum + price * qty;
    }, 0);

    // Validate and apply coupon if provided
    let discount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });
      if (coupon && coupon.isActive && subtotal >= coupon.minOrderValue) {
        discount = Math.round((subtotal * coupon.discountPercent) / 100);
      }
    }

    // Free shipping above ₹1499, else ₹150
    const shippingFee = subtotal - discount >= 1499 ? 0 : 150;

    // Deduct fabcoins if applied
    const coinDiscount = Math.min(Number(fabcoinsUsed) || 0, Math.max(0, subtotal - discount));
    const total = Math.max(0, subtotal - discount - coinDiscount + shippingFee);

    // Calculate earned loyalty coins (5% of net spend)
    const fabcoinsEarned = Math.round((subtotal - discount) * 0.05);

    // Unique Order Reference
    const orderId = "FAB-" + Math.floor(100000 + Math.random() * 900000);

    // Save order in database
    const newOrder = await prisma.order.create({
      data: {
        id: orderId,
        fullName,
        email: email.toLowerCase(),
        phone,
        address,
        city,
        state,
        pincode,
        subtotal,
        discount: discount + coinDiscount,
        shippingFee,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
        orderStatus: "confirmed",
        couponCode: couponCode || null,
        fabcoinsUsed: coinDiscount,
        fabcoinsEarned,
        items: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          create: items.map((item: any) => ({
            productId: item.productId || item.product?.id || null,
            productName: item.productName || item.product?.name || "Artisanal Product",
            productImage:
              item.productImage ||
              item.product?.images?.[0] ||
              "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
            size: item.size || item.selectedSize || "Standard",
            color: item.color || item.selectedColor || "Natural",
            quantity: Number(item.quantity || 1),
            price: Number(item.price || item.product?.price || 0),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to place order" },
      { status: 500 }
    );
  }
}
