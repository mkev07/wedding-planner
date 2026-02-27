"use client";

import { useRef, useState, useTransition } from "react";
import { addVendor } from "@/app/(dashboard)/dashboard/vendors/actions";
import { VENDOR_CATEGORIES, BOOKING_STATUSES } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";

export function VendorAddForm() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await addVendor(formData);
      formRef.current?.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Vendor</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Add Vendor">
        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
          <Input label="Vendor Name" name="name" required placeholder="e.g. Bella Photography" />
          <Select label="Category" name="category" required>
            {VENDOR_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          <Input label="Contact Name" name="contactName" placeholder="Full name" />
          <Input label="Contact Email" name="contactEmail" type="email" placeholder="email@example.com" />
          <Input label="Contact Phone" name="contactPhone" type="tel" placeholder="(555) 123-4567" />
          <Input label="Cost" name="cost" type="number" min="0" step="0.01" placeholder="0" />
          <Select label="Booking Status" name="bookingStatus">
            {BOOKING_STATUSES.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </Select>
          <Textarea label="Notes" name="notes" placeholder="Any additional notes..." />
          <div className="flex justify-end gap-2 mt-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Vendor"}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
