"use client";

import { useState, useTransition } from "react";
import { deleteTable, assignGuestToTable } from "@/app/(dashboard)/dashboard/seating/actions";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { TableEditForm } from "./table-edit-form";
import type { Table, Guest } from "@prisma/client";

export function TableCard({
  table,
  assignedGuests,
  unassignedGuests,
}: {
  table: Table;
  assignedGuests: Guest[];
  unassignedGuests: Guest[];
}) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => {
      deleteTable(table.id);
    });
  }

  function handleRemoveGuest(guestId: string) {
    startTransition(() => {
      assignGuestToTable(guestId, null);
    });
  }

  function handleAddGuest(e: React.ChangeEvent<HTMLSelectElement>) {
    const guestId = e.target.value;
    if (!guestId) return;
    e.target.value = "";
    startTransition(() => {
      assignGuestToTable(guestId, table.id);
    });
  }

  const isFull = assignedGuests.length >= table.capacity;

  return (
    <>
      <Card className={cn("group", isPending && "opacity-60")}>
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-foreground">{table.name}</h3>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-foreground/30 hover:text-foreground transition-colors p-1"
                aria-label="Edit table"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10 2L12 4L5 11H3V9L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="text-foreground/30 hover:text-red-500 transition-colors p-1"
                aria-label="Delete table"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <ProgressBar value={assignedGuests.length} max={table.capacity} />

          {assignedGuests.length > 0 && (
            <div className="flex flex-col gap-1">
              {assignedGuests.map((guest) => (
                <div key={guest.id} className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-foreground/[0.02]">
                  <span className="text-xs text-foreground/70">{guest.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveGuest(guest.id)}
                    className="text-foreground/20 hover:text-red-500 transition-colors p-0.5"
                    aria-label={`Remove ${guest.name}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {!isFull && unassignedGuests.length > 0 && (
            <select
              onChange={handleAddGuest}
              defaultValue=""
              className="w-full text-xs rounded-lg border border-dashed border-foreground/10 bg-foreground/[0.01] px-2 py-1.5 text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
            >
              <option value="">+ Add guest...</option>
              {unassignedGuests.map((guest) => (
                <option key={guest.id} value={guest.id}>{guest.name}</option>
              ))}
            </select>
          )}
        </div>
      </Card>
      {editing && <TableEditForm table={table} open={editing} onClose={() => setEditing(false)} />}
    </>
  );
}
