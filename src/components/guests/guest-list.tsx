"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GuestRow } from "./guest-row";
import { EmptyState } from "@/components/ui/empty-state";
import type { Guest } from "@prisma/client";

const TABS = [
  { label: "All", value: "all" },
  { label: "Accepted", value: "accepted" },
  { label: "Pending", value: "pending" },
  { label: "Declined", value: "declined" },
] as const;

export function GuestList({ guests }: { guests: Guest[] }) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? guests : guests.filter((g) => g.rsvpStatus === filter);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 p-1 bg-foreground/[0.03] rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setFilter(tab.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              filter === tab.value
                ? "bg-white text-foreground shadow-sm"
                : "text-foreground/40 hover:text-foreground/60"
            )}
          >
            {tab.label}
            <span className="ml-1.5 text-foreground/30">
              {tab.value === "all"
                ? guests.length
                : guests.filter((g) => g.rsvpStatus === tab.value).length}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No guests" description={filter === "all" ? "Add your first guest to get started." : `No guests with ${filter} status.`} />
      ) : (
        <div className="border border-foreground/[0.06] rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-foreground/[0.02]">
                <th className="px-4 py-2.5 text-xs font-medium text-foreground/40 uppercase tracking-wide">Name</th>
                <th className="px-4 py-2.5 text-xs font-medium text-foreground/40 uppercase tracking-wide hidden sm:table-cell">Email</th>
                <th className="px-4 py-2.5 text-xs font-medium text-foreground/40 uppercase tracking-wide hidden md:table-cell">Group</th>
                <th className="px-4 py-2.5 text-xs font-medium text-foreground/40 uppercase tracking-wide">RSVP</th>
                <th className="px-4 py-2.5 text-xs font-medium text-foreground/40 uppercase tracking-wide hidden lg:table-cell">Dietary</th>
                <th className="px-4 py-2.5 w-20"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((guest) => (
                <GuestRow key={guest.id} guest={guest} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
