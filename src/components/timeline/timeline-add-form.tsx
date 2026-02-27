"use client";

import { useRef, useState, useTransition } from "react";
import { addTimelineEvent } from "@/app/(dashboard)/dashboard/timeline/actions";
import { BUDGET_CATEGORIES } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";

export function TimelineAddForm() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await addTimelineEvent(formData);
      formRef.current?.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Event</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Add Timeline Event">
        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
          <Input label="Title" name="title" required placeholder="e.g. Book photographer" />
          <Input label="Date" name="date" type="date" />
          <Select label="Category" name="category">
            <option value="">No category</option>
            {BUDGET_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          <div className="flex justify-end gap-2 mt-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Event"}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
