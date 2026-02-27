"use client";

import { useState, useTransition } from "react";
import { deleteVendor, updateBookingStatus } from "@/app/(dashboard)/dashboard/vendors/actions";
import { formatCurrency, BOOKING_STATUSES, cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VendorEditForm } from "./vendor-edit-form";
import type { Vendor } from "@prisma/client";

const statusBadgeVariant: Record<string, "default" | "warning" | "success" | "accent"> = {
  researching: "default",
  contacted: "warning",
  booked: "success",
  paid: "accent",
};

export function VendorCard({ vendor }: { vendor: Vendor }) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => {
      deleteVendor(vendor.id);
    });
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    startTransition(() => {
      updateBookingStatus(vendor.id, e.target.value);
    });
  }

  return (
    <>
      <Card className={cn("group relative", isPending && "opacity-60")}>
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-medium text-foreground">{vendor.name}</h3>
              <Badge variant="default" className="mt-1">{vendor.category}</Badge>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-foreground/30 hover:text-foreground transition-colors p-1"
                aria-label="Edit vendor"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10 2L12 4L5 11H3V9L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="text-foreground/30 hover:text-red-500 transition-colors p-1"
                aria-label="Delete vendor"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {(vendor.contactName || vendor.contactEmail || vendor.contactPhone) && (
            <div className="text-xs text-foreground/50 flex flex-col gap-0.5">
              {vendor.contactName && <span>{vendor.contactName}</span>}
              {vendor.contactEmail && <span>{vendor.contactEmail}</span>}
              {vendor.contactPhone && <span>{vendor.contactPhone}</span>}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{formatCurrency(vendor.cost)}</span>
            <select
              value={vendor.bookingStatus}
              onChange={handleStatusChange}
              className="text-xs rounded-md border border-foreground/[0.06] bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-foreground/10"
            >
              {BOOKING_STATUSES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>

          <Badge variant={statusBadgeVariant[vendor.bookingStatus] ?? "default"}>
            {vendor.bookingStatus}
          </Badge>

          {vendor.notes && (
            <p className="text-xs text-foreground/40 border-t border-foreground/[0.06] pt-2">{vendor.notes}</p>
          )}
        </div>
      </Card>
      {editing && <VendorEditForm vendor={vendor} open={editing} onClose={() => setEditing(false)} />}
    </>
  );
}
