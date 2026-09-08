import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const search = searchParams.get("search");
    const tag = searchParams.get("tag");
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const sortBy = searchParams.get("sortBy") || "featured";
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.max(1, Math.min(100, Number(searchParams.get("limit") || 24)));
    const skip = (page - 1) * limit;

    // Build Prisma query filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (category && category !== "all") {
      where.category = category;
    }

    if (subcategory) {
      where.subcategory = subcategory;
    }

    if (tag) {
      where.tag = tag;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { artisanStory: { contains: search } },
        { subcategory: { contains: search } },
        { categoryName: { contains: search } },
      ];
    }

    // Build sorting
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = { createdAt: "desc" };
    if (sortBy === "price-asc") orderBy = { price: "asc" };
    else if (sortBy === "price-desc") orderBy = { price: "desc" };
    else if (sortBy === "rating") orderBy = { rating: "desc" };
    else if (sortBy === "featured") orderBy = [{ isFeatured: "desc" }, { rating: "desc" }];

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          images: true,
          colors: true,
        },
      }),
    ]);

    // Format products for frontend consumption
    const formatted = products.map((p) => ({
      ...p,
      fabricAndCare: p.fabricAndCare ? JSON.parse(p.fabricAndCare) : [],
      sizes: p.sizes ? JSON.parse(p.sizes) : [],
      images: p.images.map((img) => img.url),
      colors: p.colors.map((col) => ({
        name: col.name,
        hex: col.hex,
        image: col.image || undefined,
      })),
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      slug,
      category,
      categoryName,
      subcategory,
      price,
      mrp,
      originalPrice,
      discountPct,
      fabric,
      description,
      artisanStory,
      fabricAndCare,
      shippingInfo,
      tag,
      inStock = true,
      rating = 4.5,
      reviewsCount = 0,
      isFeatured = false,
      isNew = false,
      isSale = false,
      sizes = [],
      images = [],
      colors = [],
    } = body;

    if (!name || !slug || !category || !price) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, slug, category, price)" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        id: id || `prod-${Date.now()}`,
        name,
        slug,
        category,
        categoryName: categoryName || category,
        subcategory: subcategory || "General",
        price: Number(price),
        mrp: mrp ? Number(mrp) : undefined,
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        discountPct: discountPct ? Number(discountPct) : undefined,
        fabric,
        description: description || "",
        artisanStory: artisanStory || "",
        fabricAndCare: JSON.stringify(fabricAndCare || []),
        shippingInfo: shippingInfo || "Standard 3-5 days delivery",
        tag,
        inStock: Boolean(inStock),
        rating: Number(rating),
        reviewsCount: Number(reviewsCount),
        isFeatured: Boolean(isFeatured),
        isNew: Boolean(isNew),
        isSale: Boolean(isSale),
        sizes: JSON.stringify(sizes || []),
        images: {
          create: images.map((url: string, index: number) => ({
            url,
            isPrimary: index === 0,
          })),
        },
        colors: {
          create: colors.map((col: { name: string; hex: string; image?: string }) => ({
            name: col.name,
            hex: col.hex,
            image: col.image,
          })),
        },
      },
      include: {
        images: true,
        colors: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...newProduct,
          fabricAndCare: JSON.parse(newProduct.fabricAndCare),
          sizes: JSON.parse(newProduct.sizes),
          images: newProduct.images.map((img) => img.url),
          colors: newProduct.colors.map((c) => ({
            name: c.name,
            hex: c.hex,
            image: c.image || undefined,
          })),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
