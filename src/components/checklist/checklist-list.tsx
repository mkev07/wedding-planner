import type { ChecklistItem } from "@prisma/client";
import { CHECKLIST_CATEGORIES } from "@/lib/utils";
import { ChecklistCategoryGroup } from "./checklist-category-group";

export function ChecklistList({ items }: { items: ChecklistItem[] }) {
  const grouped = CHECKLIST_CATEGORIES.map((category) => ({
    category,
    items: items
      .filter((item) => item.category === category)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col gap-3">
      {grouped.map((group) => (
        <ChecklistCategoryGroup
          key={group.category}
          category={group.category}
          items={group.items}
        />
      ))}
    </div>
  );
}
