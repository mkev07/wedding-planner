"use client";

import { useState, useTransition } from "react";
import { deleteGuest, updateRsvpStatus } from "@/app/(dashboard)/dashboard/guests/actions";
import { RSVP_STATUSES, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { GuestEditForm } from "./guest-edit-form";
import { CopyLinkButton } from "./copy-link-button";
import type { Guest } from "@prisma/client";

const rsvpBadgeVariant: Record<string, "default" | "success" | "danger"> = {
  pending: "default",
  accepted: "success",
  declined: "danger",
};

export function GuestRow({ guest }: { guest: Guest }) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => {
      deleteGuest(guest.id);
    });
  }

  function handleRsvpChange(e: React.ChangeEvent<HTMLSelectElement>) {
    startTransition(() => {
      updateRsvpStatus(guest.id, e.target.value);
    });
  }

  return (
    <tr className={cn("group border-t border-foreground/[0.06] hover:bg-foreground/[0.01] transition-colors", isPending && "opacity-60")}>
      <td className="px-4 py-3 text-sm text-foreground">{guest.name}</td>
      <td className="px-4 py-3 text-sm text-foreground/60 hidden sm:table-cell">{guest.email || "—"}</td>
      <td className="px-4 py-3 text-sm text-foreground/60 hidden md:table-cell">{guest.group || "—"}</td>
      <td className="px-4 py-3">
        <select
          value={guest.rsvpStatus}
          onChange={handleRsvpChange}
          className="text-xs rounded-md border-0 bg-transparent p-0 focus:ring-0 cursor-pointer sm:hidden"
        >
          {RSVP_STATUSES.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <Badge variant={rsvpBadgeVariant[guest.rsvpStatus] ?? "default"} className="hidden sm:inline-flex">
          {guest.rsvpStatus}
        </Badge>
      </td>
      <td className="px-4 py-3 text-sm text-foreground/40 hidden lg:table-cell">{guest.dietaryNotes || "—"}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyLinkButton rsvpToken={guest.rsvpToken} />
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-foreground/30 hover:text-foreground transition-colors p-1"
            aria-label="Edit guest"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 2L12 4L5 11H3V9L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="text-foreground/30 hover:text-red-500 transition-colors p-1"
            aria-label="Delete guest"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {editing && <GuestEditForm guest={guest} open={editing} onClose={() => setEditing(false)} />}
      </td>
    </tr>
  );
}
