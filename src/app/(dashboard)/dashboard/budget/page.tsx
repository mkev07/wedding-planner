import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";
import { formatCurrency } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BudgetList } from "@/components/budget/budget-list";
import { BudgetAddForm } from "@/components/budget/budget-add-form";

export default async function BudgetPage() {
  const wedding = await getDefaultWedding();
  const items = await db.budgetItem.findMany({
    where: { weddingId: wedding.id },
    orderBy: { category: "asc" },
  });

  const estimated = items.reduce((sum, i) => sum + i.estimatedAmount, 0);
  const spent = items.reduce((sum, i) => sum + i.actualAmount, 0);
  const remaining = wedding.budget - spent;

  return (
    <>
      <PageHeader
        title="Budget"
        description="Track expenses, estimates, and payments across every category."
        action={<BudgetAddForm />}
      />

      <div className="flex flex-col gap-6">
        <Card>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-foreground/40 uppercase tracking-wide">Total Budget</div>
                <div className="text-xl font-medium tracking-tight mt-1">{formatCurrency(wedding.budget)}</div>
              </div>
              <div>
                <div className="text-xs text-foreground/40 uppercase tracking-wide">Estimated</div>
                <div className="text-xl font-medium tracking-tight mt-1">{formatCurrency(estimated)}</div>
              </div>
              <div>
                <div className="text-xs text-foreground/40 uppercase tracking-wide">Spent</div>
                <div className="text-xl font-medium tracking-tight mt-1">{formatCurrency(spent)}</div>
              </div>
              <div>
                <div className="text-xs text-foreground/40 uppercase tracking-wide">Remaining</div>
                <div className="text-xl font-medium tracking-tight mt-1">{formatCurrency(remaining)}</div>
              </div>
            </div>
            <ProgressBar value={spent} max={wedding.budget} />
          </div>
        </Card>

        <BudgetList items={items} />
      </div>
    </>
  );
}
