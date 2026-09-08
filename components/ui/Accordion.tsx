"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  title?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  items?: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  items,
  defaultOpenId,
  allowMultiple = false,
}: AccordionProps) {
  // Single accordion mode
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Multiple items mode
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  if (title && children) {
    return (
      <div className="border-b border-[#E6E0D8] py-3">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-1 text-left text-xs uppercase tracking-wider font-bold text-[#2A2A2A] hover:text-[#8B2331] transition-colors"
        >
          <span>{title}</span>
          <ChevronDown
            className={`w-4 h-4 text-[#6B6B6B] transition-transform duration-300 ${
              isOpen ? "rotate-180 text-[#8B2331]" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="pt-2 pb-1 text-xs text-[#6B6B6B] leading-relaxed animate-fade-in">
            {children}
          </div>
        )}
      </div>
    );
  }

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="divide-y divide-[#E6E0D8] border-t border-b border-[#E6E0D8]">
      {items?.map((item) => {
        const open = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-3">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between py-1 text-left text-xs uppercase tracking-wider font-bold text-[#2A2A2A] hover:text-[#8B2331] transition-colors"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#6B6B6B] transition-transform duration-300 ${
                  open ? "rotate-180 text-[#8B2331]" : ""
                }`}
              />
            </button>
            {open && (
              <div className="pt-2 pb-1 text-xs text-[#6B6B6B] leading-relaxed animate-fade-in">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
