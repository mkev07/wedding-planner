"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11.5" y="11.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Checklist",
    href: "/dashboard/checklist",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3.5 6L5.5 8L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.5 13L5.5 15L9.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 6H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13 13H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Guests",
    href: "/dashboard/guests",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 17C3 13.6863 5.68629 11 9 11C12.3137 11 15 13.6863 15 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Budget",
    href: "/dashboard/budget",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13.5 6H8.25C6.73122 6 5.5 7.23122 5.5 8.75C5.5 10.2688 6.73122 11.5 8.25 11.5H11.75C13.2688 11.5 14.5 12.7312 14.5 14.25C14.5 15.7688 13.2688 17 11.75 17H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "More",
    href: "/dashboard/timeline",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
        <circle cx="4" cy="10" r="1.5" fill="currentColor" />
        <circle cx="16" cy="10" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-foreground/[0.06] bg-white/90 backdrop-blur-xl">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-[48px]",
                isActive
                  ? "text-foreground"
                  : "text-foreground/35"
              )}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
