"use client";

import { useRef, useTransition } from "react";
import { updateVendor } from "@/app/(dashboard)/dashboard/vendors/actions";
import { VENDOR_CATEGORIES, BOOKING_STATUSES } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import type { Vendor } from "@prisma/client";

export function VendorEditForm({
  vendor,
  open,
  onClose,
}: {
  vendor: Vendor;
  open: boolean;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateVendor(vendor.id, formData);
      onClose();
    });
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Vendor">
      <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
        <Input label="Vendor Name" name="name" required defaultValue={vendor.name} />
        <Select label="Category" name="category" defaultValue={vendor.category}>
          {VENDOR_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
        <Input label="Contact Name" name="contactName" defaultValue={vendor.contactName ?? ""} />
        <Input label="Contact Email" name="contactEmail" type="email" defaultValue={vendor.contactEmail ?? ""} />
        <Input label="Contact Phone" name="contactPhone" type="tel" defaultValue={vendor.contactPhone ?? ""} />
        <Input label="Cost" name="cost" type="number" min="0" step="0.01" defaultValue={vendor.cost} />
        <Select label="Booking Status" name="bookingStatus" defaultValue={vendor.bookingStatus}>
          {BOOKING_STATUSES.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </Select>
        <Textarea label="Notes" name="notes" defaultValue={vendor.notes ?? ""} />
        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Modal>
  );
}
