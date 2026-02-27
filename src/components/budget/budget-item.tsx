"use client";

import { useState, useTransition } from "react";
import { deleteBudgetItem, toggleBudgetItemPaid } from "@/app/(dashboard)/dashboard/budget/actions";
import { formatCurrency, cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { BudgetEditForm } from "./budget-edit-form";
import type { BudgetItem as BudgetItemType } from "@prisma/client";

export function BudgetItem({ item }: { item: BudgetItemType }) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticPaid, setOptimisticPaid] = useState(item.paid);

  function handleTogglePaid() {
    setOptimisticPaid(!optimisticPaid);
    startTransition(() => {
      toggleBudgetItemPaid(item.id);
    });
  }

  function handleDelete() {
    startTransition(() => {
      deleteBudgetItem(item.id);
    });
  }

  return (
    <>
      <div className={cn("group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-foreground/[0.02]", isPending && "opacity-60")}>
        <Checkbox checked={optimisticPaid} onChange={handleTogglePaid} />
        <div className="flex-1 min-w-0">
          <span className={cn("text-sm", optimisticPaid ? "text-foreground/40 line-through" : "text-foreground")}>
            {item.description}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs shrink-0">
          <span className="text-foreground/40 hidden sm:inline">Est. {formatCurrency(item.estimatedAmount)}</span>
          <span className="font-medium text-foreground">{formatCurrency(item.actualAmount)}</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-foreground/30 hover:text-foreground transition-colors p-1"
            aria-label="Edit item"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 2L12 4L5 11H3V9L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="text-foreground/30 hover:text-red-500 transition-colors p-1"
            aria-label="Delete item"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      {editing && <BudgetEditForm item={item} open={editing} onClose={() => setEditing(false)} />}
    </>
  );
}
