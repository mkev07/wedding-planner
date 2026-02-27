"use client";

import { useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { BudgetItem } from "./budget-item";
import type { BudgetItem as BudgetItemType } from "@prisma/client";

export function BudgetCategoryGroup({
  category,
  items,
}: {
  category: string;
  items: BudgetItemType[];
}) {
  const [isOpen, setIsOpen] = useState(true);
  const estimated = items.reduce((sum, i) => sum + i.estimatedAmount, 0);
  const actual = items.reduce((sum, i) => sum + i.actualAmount, 0);

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
          <span className="text-xs text-foreground/30">{items.length} item{items.length !== 1 ? "s" : ""}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-foreground/40 hidden sm:inline">Est. {formatCurrency(estimated)}</span>
          <span className="font-medium text-foreground">{formatCurrency(actual)}</span>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-foreground/[0.06] px-1 py-1">
          {items.map((item) => (
            <BudgetItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
