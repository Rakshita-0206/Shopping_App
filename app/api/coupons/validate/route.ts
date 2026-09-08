import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, cartTotal = 0 } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { success: false, error: "Coupon code is required" },
        { status: 400 }
      );
    }

    const normalizedCode = code.trim().toUpperCase();

    const coupon = await prisma.coupon.findUnique({
      where: { code: normalizedCode },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired coupon code" },
        { status: 404 }
      );
    }

    if (cartTotal < coupon.minOrderValue) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum order value of ₹${coupon.minOrderValue.toLocaleString("en-IN")} required for this coupon`,
        },
        { status: 400 }
      );
    }

    const discountAmount = Math.round((cartTotal * coupon.discountPercent) / 100);

    return NextResponse.json({
      success: true,
      data: {
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        minOrderValue: coupon.minOrderValue,
        discountAmount,
      },
    });
  } catch (error) {
    console.error("POST /api/coupons/validate error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
