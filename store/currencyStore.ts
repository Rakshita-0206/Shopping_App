import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  rate: number; // conversion from INR
}

export const COUNTRIES: CountryOption[] = [
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", symbol: "₹", rate: 1 },
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", symbol: "$", rate: 0.012 },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", symbol: "£", rate: 0.0095 },
  { code: "AE", name: "UAE", flag: "🇦🇪", currency: "AED", symbol: "AED ", rate: 0.044 },
];

interface CurrencyState {
  currentCountry: CountryOption;
  setCountry: (country: CountryOption) => void;
  formatPrice: (amountInInr: number) => string;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currentCountry: COUNTRIES[0],
      setCountry: (country) => set({ currentCountry: country }),
      formatPrice: (amountInInr) => {
        const { currentCountry } = get();
        if (currentCountry.currency === "INR") {
          return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }).format(amountInInr);
        }
        const converted = amountInInr * currentCountry.rate;
        return `${currentCountry.symbol}${converted.toFixed(2)}`;
      },
    }),
    {
      name: "fabindia_currency_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
