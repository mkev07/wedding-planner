"use client";

import { useRef, useState, useTransition } from "react";
import { addTable } from "@/app/(dashboard)/dashboard/seating/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

export function TableAddForm() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await addTable(formData);
      formRef.current?.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Table</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Add Table">
        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
          <Input label="Table Name" name="name" required placeholder="e.g. Table 1 - Family" />
          <Input label="Capacity" name="capacity" type="number" min="1" defaultValue="8" />
          <div className="flex justify-end gap-2 mt-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Table"}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
