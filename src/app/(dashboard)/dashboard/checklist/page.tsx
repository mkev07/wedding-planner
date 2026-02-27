import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";
import { PageHeader } from "@/components/ui/page-header";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ChecklistList } from "@/components/checklist/checklist-list";
import { ChecklistAddForm } from "@/components/checklist/checklist-add-form";

export default async function ChecklistPage() {
  const wedding = await getDefaultWedding();
  const items = await db.checklistItem.findMany({
    where: { weddingId: wedding.id },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  const completed = items.filter((i) => i.completed).length;

  return (
    <>
      <PageHeader
        title="Checklist"
        description="Track every task from 12+ months out to the big day."
      />

      <div className="flex flex-col gap-6">
        <ProgressBar value={completed} max={items.length} />
        <ChecklistAddForm />
        <ChecklistList items={items} />
      </div>
    </>
  );
}
