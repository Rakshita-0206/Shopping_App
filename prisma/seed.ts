import { PrismaClient } from "@prisma/client";
import { PRODUCTS } from "../data/products";
import { CATEGORIES } from "../data/categories";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Clean existing records
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productColor.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();

  console.log("🧹 Cleaned existing records.");

  // 2. Seed Categories
  for (const cat of CATEGORIES) {
    await prisma.category.create({
      data: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        bannerImage: cat.bannerImage,
        featuredImage: cat.featuredImage,
        featuredTitle: cat.featuredTitle,
        subcategories: JSON.stringify(cat.subcategories),
      },
    });
  }
  console.log(`✅ Seeded ${CATEGORIES.length} categories.`);

  // 3. Seed Products
  for (const p of PRODUCTS) {
    await prisma.product.create({
      data: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        categoryName: p.categoryName,
        subcategory: p.subcategory,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        mrp: p.mrp ?? null,
        discountPct: p.discountPct ?? null,
        fabric: p.fabric ?? null,
        description: p.description,
        artisanStory: p.artisanStory,
        fabricAndCare: JSON.stringify(p.fabricAndCare || []),
        shippingInfo: p.shippingInfo,
        tag: p.tag ?? null,
        inStock: p.inStock,
        rating: p.rating,
        reviewsCount: p.reviewsCount,
        isFeatured: p.isFeatured ?? false,
        isNew: p.isNew ?? false,
        isSale: p.isSale ?? false,
        sizes: JSON.stringify(p.sizes || []),
        images: {
          create: p.images.map((url, idx) => ({
            url,
            isPrimary: idx === 0,
          })),
        },
        colors: {
          create: (p.colors || []).map((c) => ({
            name: c.name,
            hex: c.hex,
            image: c.image ?? null,
          })),
        },
      },
    });
  }
  console.log(`✅ Seeded ${PRODUCTS.length} products with images & colors.`);

  // 4. Seed Coupons
  const coupons = [
    { code: "HERITAGE10", discountPercent: 10, minOrderValue: 999 },
    { code: "WELCOME15", discountPercent: 15, minOrderValue: 1499 },
    { code: "FESTIVE20", discountPercent: 20, minOrderValue: 2999 },
  ];

  for (const c of coupons) {
    await prisma.coupon.create({
      data: {
        code: c.code,
        discountPercent: c.discountPercent,
        minOrderValue: c.minOrderValue,
        isActive: true,
      },
    });
  }
  console.log(`✅ Seeded ${coupons.length} coupons.`);

  // 5. Seed Sample Orders
  const sampleOrder = await prisma.order.create({
    data: {
      id: "FAB-928174",
      fullName: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "9876543210",
      address: "Flat 402, Lotus Residency, MG Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      subtotal: 8780,
      discount: 0,
      shippingFee: 0,
      total: 8780,
      paymentMethod: "upi",
      paymentStatus: "paid",
      orderStatus: "delivered",
      fabcoinsEarned: 439,
      items: {
        create: [
          {
            productId: "w-01",
            productName: "Handblock Indigo Ajrakh Cotton Kurta",
            productImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
            size: "M",
            color: "Indigo Blue",
            quantity: 1,
            price: 2290,
          },
          {
            productId: "w-02",
            productName: "Chanderi Silk Saree with Zari Palla",
            productImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
            size: "Free Size",
            color: "Raw Silk Off-White",
            quantity: 1,
            price: 6490,
          },
        ],
      },
    },
  });

  console.log(`✅ Seeded sample order ${sampleOrder.id}`);
  console.log("🎉 Database seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
