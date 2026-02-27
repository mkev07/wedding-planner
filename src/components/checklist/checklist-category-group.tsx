"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ChecklistItem as ChecklistItemType } from "@prisma/client";
import { ChecklistItem } from "./checklist-item";

export function ChecklistCategoryGroup({
  category,
  items,
}: {
  category: string;
  items: ChecklistItemType[];
}) {
  const completedCount = items.filter((i) => i.completed).length;
  const allDone = completedCount === items.length && items.length > 0;
  const [isOpen, setIsOpen] = useState(!allDone);

  return (
    <div className="border border-foreground/[0.06] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-foreground/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={cn(
              "text-foreground/30 transition-transform duration-200",
              isOpen && "rotate-90"
            )}
          >
            <path
              d="M5 3L9 7L5 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium text-foreground">{category}</span>
        </div>
        <span
          className={cn(
            "text-xs px-2 py-0.5 rounded-md",
            allDone
              ? "bg-emerald-500/10 text-emerald-700"
              : "bg-foreground/5 text-foreground/40"
          )}
        >
          {completedCount} / {items.length}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-foreground/[0.06] px-1 py-1">
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              id={item.id}
              title={item.title}
              completed={item.completed}
              notes={item.notes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
