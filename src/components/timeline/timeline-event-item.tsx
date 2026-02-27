"use client";

import { useState, useTransition } from "react";
import { toggleTimelineEvent, deleteTimelineEvent } from "@/app/(dashboard)/dashboard/timeline/actions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TimelineEditForm } from "./timeline-edit-form";
import type { TimelineEvent } from "@prisma/client";

export function TimelineEventItem({ event }: { event: TimelineEvent }) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticCompleted, setOptimisticCompleted] = useState(event.completed);

  const isPast = event.date ? new Date(event.date) < new Date() : false;
  const dotColor = optimisticCompleted
    ? "bg-foreground"
    : isPast
      ? "bg-amber-400"
      : "bg-foreground/10 border-2 border-foreground/20";

  function handleToggle() {
    setOptimisticCompleted(!optimisticCompleted);
    startTransition(() => {
      toggleTimelineEvent(event.id);
    });
  }

  function handleDelete() {
    startTransition(() => {
      deleteTimelineEvent(event.id);
    });
  }

  return (
    <div className={cn("group relative flex gap-4 pb-8 last:pb-0", isPending && "opacity-60")}>
      {/* Vertical line */}
      <div className="absolute left-[11px] top-6 bottom-0 w-px bg-foreground/[0.08] group-last:hidden" />

      {/* Dot */}
      <button
        type="button"
        onClick={handleToggle}
        className={cn("relative z-10 mt-1 h-[22px] w-[22px] shrink-0 rounded-full transition-all", dotColor)}
        aria-label={optimisticCompleted ? "Mark as incomplete" : "Mark as complete"}
      >
        {optimisticCompleted && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className={cn("text-sm font-medium", optimisticCompleted ? "text-foreground/40 line-through" : "text-foreground")}>
              {event.title}
            </span>
            {event.date && (
              <p className="text-xs text-foreground/40 mt-0.5">
                {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {event.category && (
              <Badge variant="default">{event.category}</Badge>
            )}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-foreground/30 hover:text-foreground transition-colors p-1"
                aria-label="Edit event"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10 2L12 4L5 11H3V9L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="text-foreground/30 hover:text-red-500 transition-colors p-1"
                aria-label="Delete event"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {editing && <TimelineEditForm event={event} open={editing} onClose={() => setEditing(false)} />}
    </div>
  );
}
