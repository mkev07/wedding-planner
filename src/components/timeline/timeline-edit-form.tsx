"use client";

import { useRef, useTransition } from "react";
import { updateTimelineEvent } from "@/app/(dashboard)/dashboard/timeline/actions";
import { BUDGET_CATEGORIES } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import type { TimelineEvent } from "@prisma/client";

function formatDateForInput(date: Date | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

export function TimelineEditForm({
  event,
  open,
  onClose,
}: {
  event: TimelineEvent;
  open: boolean;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateTimelineEvent(event.id, formData);
      onClose();
    });
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Timeline Event">
      <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
        <Input label="Title" name="title" required defaultValue={event.title} />
        <Input label="Date" name="date" type="date" defaultValue={formatDateForInput(event.date)} />
        <Select label="Category" name="category" defaultValue={event.category ?? ""}>
          <option value="">No category</option>
          {BUDGET_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Modal>
  );
}
