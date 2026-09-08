import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Deduplicate initial 'Home' link if caller passed it as the first item
  const displayItems = items.filter(
    (item, idx) => !(idx === 0 && item.label.trim().toLowerCase() === "home")
  );

  return (
    <nav aria-label="Breadcrumb" className="py-2.5">
      <ol className="flex items-center space-x-2 text-xs text-[#6B6B6B] font-sans">
        <li>
          <Link href="/" className="hover:text-[#8B2331] transition-colors">
            Home
          </Link>
        </li>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-[#B0A8A0]" />
              {isLast || !item.href ? (
                <span className="text-[#2A2A2A] font-semibold truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[#8B2331] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
