import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type FabfamilyTier = "Bronze" | "Silver" | "Gold" | "Platinum" | "Black";

export interface FabfamilyTransaction {
  id: string;
  date: string;
  type: "earn" | "redeem";
  coins: number;
  note: string;
}

export const TIER_THRESHOLDS = {
  Silver: 20000,
  Gold: 50000,
  Platinum: 100000,
  Black: 200000,
};

export const TIER_RATES: Record<FabfamilyTier, number> = {
  Bronze: 0.005, // 0.5% base
  Silver: 0.01,  // 1%
  Gold: 0.03,    // 3%
  Platinum: 0.05,// 5%
  Black: 0.10,   // 10%
};

interface FabfamilyState {
  isMember: boolean;
  name: string;
  mobile: string;
  email: string;
  tier: FabfamilyTier;
  fabcoins: number;
  totalSpend12mo: number;
  transactions: FabfamilyTransaction[];
  referralCode: string;
  isEnrollModalOpen: boolean;

  openEnrollModal: () => void;
  closeEnrollModal: () => void;
  enroll: (name: string, mobile: string, email: string) => boolean;
  addEarn: (spendAmount: number, note?: string) => { earnedCoins: number; promotedTier: FabfamilyTier | null };
  redeemCoins: (coinsToRedeem: number, note?: string) => boolean;
  getTierRate: (tier?: FabfamilyTier) => number;
  getNextTierProgress: () => { nextTier: FabfamilyTier | null; spendNeeded: number; percent: number };
}

function calculateTier(totalSpend: number): FabfamilyTier {
  if (totalSpend >= TIER_THRESHOLDS.Black) return "Black";
  if (totalSpend >= TIER_THRESHOLDS.Platinum) return "Platinum";
  if (totalSpend >= TIER_THRESHOLDS.Gold) return "Gold";
  if (totalSpend >= TIER_THRESHOLDS.Silver) return "Silver";
  return "Bronze";
}

export const useFabfamilyStore = create<FabfamilyState>()(
  persist(
    (set, get) => ({
      isMember: true, // initialized with sample account for preview, user can also re-enroll
      name: "Priya Sharma",
      mobile: "9876543210",
      email: "priya.sharma@example.com",
      tier: "Gold",
      fabcoins: 1450,
      totalSpend12mo: 58500,
      transactions: [
        {
          id: "TXN-101",
          date: "28 Aug 2026",
          type: "earn",
          coins: 263,
          note: "Earned from Order #FAB-928174 (3% Gold Rate)",
        },
        {
          id: "TXN-102",
          date: "14 Jul 2026",
          type: "earn",
          coins: 254,
          note: "Earned from Order #FAB-819234 (3% Gold Rate)",
        },
        {
          id: "TXN-103",
          date: "02 May 2026",
          type: "redeem",
          coins: 500,
          note: "Redeemed at GK-1 Experience Centre",
        },
        {
          id: "TXN-104",
          date: "15 Jan 2026",
          type: "earn",
          coins: 100,
          note: "Welcome Bonus on Enrollment",
        },
      ],
      referralCode: "FAB-PRIYA77",
      isEnrollModalOpen: false,

      openEnrollModal: () => set({ isEnrollModalOpen: true }),
      closeEnrollModal: () => set({ isEnrollModalOpen: false }),

      enroll: (name, mobile, email) => {
        const cleanMobile = mobile.replace(/\D/g, "");
        if (cleanMobile.length !== 10) return false;

        const code = "FAB-" + (name.slice(0, 4).toUpperCase() || "MEMBER") + Math.floor(100 + Math.random() * 900);
        const welcomeCoins = 100;
        const now = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

        const welcomeTxn: FabfamilyTransaction = {
          id: "TXN-" + Date.now().toString().slice(-6),
          date: now,
          type: "earn",
          coins: welcomeCoins,
          note: "Welcome Bonus on Enrollment",
        };

        set({
          isMember: true,
          name: name.trim(),
          mobile: cleanMobile,
          email: email.trim(),
          tier: "Bronze",
          fabcoins: welcomeCoins,
          totalSpend12mo: 0,
          transactions: [welcomeTxn],
          referralCode: code,
          isEnrollModalOpen: false,
        });

        return true;
      },

      addEarn: (spendAmount, note = "Online Shopping") => {
        const state = get();
        if (!state.isMember) return { earnedCoins: 0, promotedTier: null };

        const currentTier = state.tier;
        const rate = TIER_RATES[currentTier];
        const earnedCoins = Math.max(1, Math.round(spendAmount * rate));

        const newSpend = state.totalSpend12mo + spendAmount;
        const newTier = calculateTier(newSpend);
        const promotedTier = newTier !== currentTier ? newTier : null;

        const now = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
        const txn: FabfamilyTransaction = {
          id: "TXN-" + Date.now().toString().slice(-6),
          date: now,
          type: "earn",
          coins: earnedCoins,
          note: `${note} (${Math.round(rate * 100)}% ${currentTier} tier)`,
        };

        set({
          fabcoins: state.fabcoins + earnedCoins,
          totalSpend12mo: newSpend,
          tier: newTier,
          transactions: [txn, ...state.transactions],
        });

        return { earnedCoins, promotedTier };
      },

      redeemCoins: (coinsToRedeem, note = "Redeemed on Order") => {
        const state = get();
        if (coinsToRedeem <= 0 || coinsToRedeem > state.fabcoins) return false;

        const now = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
        const txn: FabfamilyTransaction = {
          id: "TXN-" + Date.now().toString().slice(-6),
          date: now,
          type: "redeem",
          coins: coinsToRedeem,
          note,
        };

        set({
          fabcoins: state.fabcoins - coinsToRedeem,
          transactions: [txn, ...state.transactions],
        });

        return true;
      },

      getTierRate: (tier) => {
        const t = tier || get().tier;
        return TIER_RATES[t];
      },

      getNextTierProgress: () => {
        const { tier, totalSpend12mo } = get();
        if (tier === "Black") {
          return { nextTier: null, spendNeeded: 0, percent: 100 };
        }

        let nextTier: FabfamilyTier = "Silver";
        let target = TIER_THRESHOLDS.Silver;
        let base = 0;

        if (tier === "Bronze") {
          nextTier = "Silver";
          target = TIER_THRESHOLDS.Silver;
          base = 0;
        } else if (tier === "Silver") {
          nextTier = "Gold";
          target = TIER_THRESHOLDS.Gold;
          base = TIER_THRESHOLDS.Silver;
        } else if (tier === "Gold") {
          nextTier = "Platinum";
          target = TIER_THRESHOLDS.Platinum;
          base = TIER_THRESHOLDS.Gold;
        } else if (tier === "Platinum") {
          nextTier = "Black";
          target = TIER_THRESHOLDS.Black;
          base = TIER_THRESHOLDS.Platinum;
        }

        const spendNeeded = Math.max(0, target - totalSpend12mo);
        const progress = Math.min(100, Math.max(0, ((totalSpend12mo - base) / (target - base)) * 100));

        return { nextTier, spendNeeded, percent: Math.round(progress) };
      },
    }),
    {
      name: "fabindia_fabfamily_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
