import { BUDGET_CATEGORIES } from "@/lib/utils";
import { BudgetCategoryGroup } from "./budget-category-group";
import type { BudgetItem } from "@prisma/client";

export function BudgetList({ items }: { items: BudgetItem[] }) {
  const grouped = BUDGET_CATEGORIES.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col gap-3">
      {grouped.map((group) => (
        <BudgetCategoryGroup
          key={group.category}
          category={group.category}
          items={group.items}
        />
      ))}
    </div>
  );
}
