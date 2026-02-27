"use client";

import { useTransition, useState } from "react";
import { toggleChecklistItem, deleteChecklistItem } from "@/app/(dashboard)/dashboard/checklist/actions";
import { cn } from "@/lib/utils";

export function ChecklistItem({
  id,
  title,
  completed,
  notes,
}: {
  id: string;
  title: string;
  completed: boolean;
  notes: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticCompleted, setOptimisticCompleted] = useState(completed);

  function handleToggle() {
    setOptimisticCompleted(!optimisticCompleted);
    startTransition(() => {
      toggleChecklistItem(id);
    });
  }

  function handleDelete() {
    startTransition(() => {
      deleteChecklistItem(id);
    });
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-foreground/[0.02]",
        isPending && "opacity-60"
      )}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-label={optimisticCompleted ? "Mark as incomplete" : "Mark as complete"}
        className={cn(
          "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-all",
          optimisticCompleted
            ? "border-foreground bg-foreground animate-check-pop"
            : "border-foreground/20 bg-white hover:border-foreground/40"
        )}
      >
        {optimisticCompleted && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-white">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <span
          className={cn(
            "text-sm transition-colors",
            optimisticCompleted ? "text-foreground/40 line-through" : "text-foreground"
          )}
        >
          {title}
        </span>
        {notes && (
          <p className="text-xs text-foreground/30 mt-0.5 truncate">{notes}</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 text-foreground/20 hover:text-red-500 transition-all p-1"
        aria-label="Delete item"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
