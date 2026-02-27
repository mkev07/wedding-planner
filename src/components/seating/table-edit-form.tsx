"use client";

import { useRef, useTransition } from "react";
import { updateTable } from "@/app/(dashboard)/dashboard/seating/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import type { Table } from "@prisma/client";

export function TableEditForm({
  table,
  open,
  onClose,
}: {
  table: Table;
  open: boolean;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateTable(table.id, formData);
      onClose();
    });
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Table">
      <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
        <Input label="Table Name" name="name" required defaultValue={table.name} />
        <Input label="Capacity" name="capacity" type="number" min="1" defaultValue={table.capacity} />
        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Modal>
  );
}
