"use client";

import { useRef, useState, useTransition } from "react";
import { addBudgetItem } from "@/app/(dashboard)/dashboard/budget/actions";
import { BUDGET_CATEGORIES } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";

export function BudgetAddForm() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await addBudgetItem(formData);
      formRef.current?.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Item</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Add Budget Item">
        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
          <Select label="Category" name="category" required>
            {BUDGET_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          <Input label="Description" name="description" required placeholder="e.g. Venue deposit" />
          <Input label="Estimated Amount" name="estimatedAmount" type="number" min="0" step="0.01" placeholder="0" />
          <Input label="Actual Amount" name="actualAmount" type="number" min="0" step="0.01" placeholder="0" />
          <div className="flex justify-end gap-2 mt-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Item"}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
