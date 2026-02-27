"use client";

import { useRef, useTransition } from "react";
import { addChecklistItem } from "@/app/(dashboard)/dashboard/checklist/actions";
import { CHECKLIST_CATEGORIES } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ChecklistAddForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await addChecklistItem(formData);
      formRef.current?.reset();
    });
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 p-4 border border-foreground/[0.06] rounded-xl bg-foreground/[0.01]"
    >
      <input
        name="title"
        type="text"
        placeholder="Add a new item..."
        required
        className="flex-1 rounded-xl border border-foreground/[0.06] bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10"
      />
      <select
        name="category"
        required
        className="rounded-xl border border-foreground/[0.06] bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_8px_center] bg-no-repeat pr-8"
      >
        {CHECKLIST_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
