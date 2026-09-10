"use client";

import { useToastStore } from "@/store/toastStore";
import { CheckCircle2, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start justify-between gap-3 p-4 bg-[#1F2A44] text-white shadow-2xl border-l-4 border-[#8B2331] animate-fade-in"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-stone-300 mt-0.5">{toast.description}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-white p-1"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
