export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function generateRsvpToken() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 10; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

export function formatCurrency(amount: number) {
  return "$" + amount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export const CHECKLIST_CATEGORIES = [
  "12+ Months Before",
  "9-12 Months Before",
  "6-9 Months Before",
  "3-6 Months Before",
  "1-3 Months Before",
  "Week Of",
] as const;

export type ChecklistCategory = (typeof CHECKLIST_CATEGORIES)[number];

export const BUDGET_CATEGORIES = [
  "Venue",
  "Catering",
  "Photography",
  "Videography",
  "Flowers & Decor",
  "Music & Entertainment",
  "Attire",
  "Stationery",
  "Transportation",
  "Favors & Gifts",
  "Beauty",
  "Rentals",
  "Other",
] as const;

export const VENDOR_CATEGORIES = [
  "Venue",
  "Caterer",
  "Photographer",
  "Videographer",
  "Florist",
  "DJ / Band",
  "Baker",
  "Officiant",
  "Hair & Makeup",
  "Planner / Coordinator",
  "Rentals",
  "Transportation",
  "Stationery",
  "Other",
] as const;

export const RSVP_STATUSES = ["pending", "accepted", "declined"] as const;

export const BOOKING_STATUSES = ["researching", "contacted", "booked", "paid"] as const;

export const GUEST_GROUPS = [
  "Family",
  "Friends",
  "Work",
  "Partner's Family",
  "Partner's Friends",
  "Other",
] as const;
