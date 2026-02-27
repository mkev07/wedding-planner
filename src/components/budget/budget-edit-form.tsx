"use client";

import { useRef, useTransition } from "react";
import { updateBudgetItem } from "@/app/(dashboard)/dashboard/budget/actions";
import { BUDGET_CATEGORIES } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import type { BudgetItem } from "@prisma/client";

export function BudgetEditForm({
  item,
  open,
  onClose,
}: {
  item: BudgetItem;
  open: boolean;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateBudgetItem(item.id, formData);
      onClose();
    });
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Budget Item">
      <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
        <Select label="Category" name="category" defaultValue={item.category}>
          {BUDGET_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
        <Input label="Description" name="description" required defaultValue={item.description} />
        <Input label="Estimated Amount" name="estimatedAmount" type="number" min="0" step="0.01" defaultValue={item.estimatedAmount} />
        <Input label="Actual Amount" name="actualAmount" type="number" min="0" step="0.01" defaultValue={item.actualAmount} />
        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Modal>
  );
}
