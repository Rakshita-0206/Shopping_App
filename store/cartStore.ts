import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string;
  discountPercent: number;
  appliedFabcoins: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, selectedSize: string, selectedColor: string, quantity?: number) => void;
  removeItem: (productId: string, selectedSize: string, selectedColor: string) => void;
  updateQuantity: (productId: string, selectedSize: string, selectedColor: string, quantity: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  applyFabcoins: (coins: number) => void;
  removeFabcoins: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getGrandTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: "",
      discountPercent: 0,
      appliedFabcoins: 0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, selectedSize, selectedColor, quantity = 1) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
        );

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [...currentItems, { product, selectedSize, selectedColor, quantity }],
            isOpen: true,
          });
        }
      },

      removeItem: (productId, selectedSize, selectedColor) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
              )
          ),
        }));
      },

      updateQuantity: (productId, selectedSize, selectedColor, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedSize, selectedColor);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.product.id === productId &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor
            ) {
              return { ...item, quantity };
            }
            return item;
          }),
        }));
      },

      applyCoupon: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === "HERITAGE10" || clean === "FAB10" || clean === "SUTRA10") {
          set({ couponCode: clean, discountPercent: 10 });
          return true;
        } else if (clean === "WELCOME15") {
          set({ couponCode: clean, discountPercent: 15 });
          return true;
        }
        return false;
      },

      removeCoupon: () => {
        set({ couponCode: "", discountPercent: 0 });
      },

      applyFabcoins: (coins: number) => {
        set({ appliedFabcoins: Math.max(0, Math.round(coins)) });
      },

      removeFabcoins: () => {
        set({ appliedFabcoins: 0 });
      },

      clearCart: () => set({ items: [], couponCode: "", discountPercent: 0, appliedFabcoins: 0 }),

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const percent = get().discountPercent;
        return percent > 0 ? Math.round((subtotal * percent) / 100) : 0;
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        // Free shipping above 1499
        return subtotal >= 1499 ? 0 : 150;
      },

      getGrandTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        const fabcoinsDeduction = get().appliedFabcoins || 0;
        return Math.max(0, subtotal - discount - fabcoinsDeduction + shipping);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "sutra_cart_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        discountPercent: state.discountPercent,
        appliedFabcoins: state.appliedFabcoins,
      }),
    }
  )
);
