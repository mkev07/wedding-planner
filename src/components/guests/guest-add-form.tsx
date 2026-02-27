"use client";

import { useRef, useState, useTransition } from "react";
import { addGuest } from "@/app/(dashboard)/dashboard/guests/actions";
import { RSVP_STATUSES, GUEST_GROUPS } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";

export function GuestAddForm() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await addGuest(formData);
      formRef.current?.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Guest</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Add Guest">
        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
          <Input label="Name" name="name" required placeholder="Full name" />
          <Input label="Email" name="email" type="email" placeholder="email@example.com" />
          <Select label="RSVP Status" name="rsvpStatus">
            {RSVP_STATUSES.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </Select>
          <Select label="Group" name="group">
            <option value="">No group</option>
            {GUEST_GROUPS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </Select>
          <Textarea label="Dietary Notes" name="dietaryNotes" placeholder="Any dietary requirements..." />
          <div className="flex justify-end gap-2 mt-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Guest"}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
