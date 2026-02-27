"use client";

import { useRef, useTransition } from "react";
import { updateGuest } from "@/app/(dashboard)/dashboard/guests/actions";
import { RSVP_STATUSES, GUEST_GROUPS } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import type { Guest } from "@prisma/client";

export function GuestEditForm({
  guest,
  open,
  onClose,
}: {
  guest: Guest;
  open: boolean;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateGuest(guest.id, formData);
      onClose();
    });
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Guest">
      <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
        <Input label="Name" name="name" required defaultValue={guest.name} />
        <Input label="Email" name="email" type="email" defaultValue={guest.email ?? ""} />
        <Select label="RSVP Status" name="rsvpStatus" defaultValue={guest.rsvpStatus}>
          {RSVP_STATUSES.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </Select>
        <Select label="Group" name="group" defaultValue={guest.group ?? ""}>
          <option value="">No group</option>
          {GUEST_GROUPS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Select>
        <Textarea label="Dietary Notes" name="dietaryNotes" defaultValue={guest.dietaryNotes ?? ""} />
        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Modal>
  );
}
