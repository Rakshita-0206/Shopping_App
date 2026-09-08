export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // "women" | "men" | "kids" | "home-living" | "furniture" | "food" | "collection" | "wellness" | "jewellery"
  categoryName: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  mrp?: number;
  discountPct?: number;
  description: string;
  artisanStory: string;
  fabricAndCare: string[];
  shippingInfo: string;
  fabric?: string;
  colors: {
    name: string;
    hex: string;
    image?: string;
  }[];
  sizes: string[];
  images: string[];
  tag?: "New" | "Sale" | "Bestseller" | "Handcrafted" | string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
  subcategories: {
    title: string;
    items: string[];
  }[];
  featuredImage: string;
  featuredTitle: string;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

