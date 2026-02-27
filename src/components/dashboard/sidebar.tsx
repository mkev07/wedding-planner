"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Checklist",
    href: "/dashboard/checklist",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 5L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11L5 13L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Guests",
    href: "/dashboard/guests",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 15C2 12.2386 4.23858 10 7 10C9.76142 10 12 12.2386 12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="13" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 11C15.6569 11.6 16.5 13 16.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Budget",
    href: "/dashboard/budget",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12.5 5H7.25C5.73122 5 4.5 6.23122 4.5 7.75V7.75C4.5 9.26878 5.73122 10.5 7.25 10.5H10.75C12.2688 10.5 13.5 11.7312 13.5 13.25V13.25C13.5 14.7688 12.2688 16 10.75 16H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Timeline",
    href: "/dashboard/timeline",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 5V9L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Vendors",
    href: "/dashboard/vendors",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 7L9 2L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 7V14C3 14.5523 3.44772 15 4 15H14C14.5523 15 15 14.5523 15 14V7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 15V10H11V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Seating",
    href: "/dashboard/seating",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="2" r="1" fill="currentColor" />
        <circle cx="9" cy="16" r="1" fill="currentColor" />
        <circle cx="2" cy="9" r="1" fill="currentColor" />
        <circle cx="16" cy="9" r="1" fill="currentColor" />
        <circle cx="4.05" cy="4.05" r="1" fill="currentColor" />
        <circle cx="13.95" cy="13.95" r="1" fill="currentColor" />
        <circle cx="13.95" cy="4.05" r="1" fill="currentColor" />
        <circle cx="4.05" cy="13.95" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-60 flex-col border-r border-foreground/[0.06] bg-white">
      <div className="p-6">
        <Link href="/" className="font-serif text-xl tracking-tight text-foreground/80">
          Wed
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
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
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-foreground/[0.04] text-foreground font-medium"
                  : "text-foreground/50 hover:text-foreground hover:bg-foreground/[0.02]"
              )}
            >
              <span className={cn(isActive ? "text-foreground" : "text-foreground/40")}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-foreground/[0.06]">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/40 hover:text-foreground/60 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to site
        </Link>
      </div>
    </aside>
  );
}
