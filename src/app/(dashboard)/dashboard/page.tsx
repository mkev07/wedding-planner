import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

async function getStats() {
  const wedding = await getDefaultWedding();

  const [
    checklistTotal,
    checklistCompleted,
    guestTotal,
    guestAccepted,
    guestDeclined,
    budgetItems,
    vendors,
  ] = await Promise.all([
    db.checklistItem.count({ where: { weddingId: wedding.id } }),
    db.checklistItem.count({ where: { weddingId: wedding.id, completed: true } }),
    db.guest.count({ where: { weddingId: wedding.id } }),
    db.guest.count({ where: { weddingId: wedding.id, rsvpStatus: "accepted" } }),
    db.guest.count({ where: { weddingId: wedding.id, rsvpStatus: "declined" } }),
    db.budgetItem.findMany({ where: { weddingId: wedding.id } }),
    db.vendor.findMany({ where: { weddingId: wedding.id } }),
  ]);

  const budgetEstimated = budgetItems.reduce((sum, item) => sum + item.estimatedAmount, 0);
  const budgetActual = budgetItems.reduce((sum, item) => sum + item.actualAmount, 0);
  const vendorTotal = vendors.length;
  const vendorBooked = vendors.filter((v) => v.bookingStatus === "booked" || v.bookingStatus === "paid").length;
  const vendorCost = vendors.reduce((sum, v) => sum + v.cost, 0);

  const daysToGo = wedding.date
    ? Math.max(0, Math.ceil((new Date(wedding.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  return {
    wedding,
    daysToGo,
    checklist: { total: checklistTotal, completed: checklistCompleted },
    guests: {
      total: guestTotal,
      accepted: guestAccepted,
      declined: guestDeclined,
      pending: guestTotal - guestAccepted - guestDeclined,
    },
    budget: {
      total: wedding.budget,
      estimated: budgetEstimated,
      spent: budgetActual,
      remaining: wedding.budget - budgetActual,
    },
    vendors: { total: vendorTotal, booked: vendorBooked, cost: vendorCost },
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <>
      <PageHeader
        title="Overview"
        description={`Welcome back. ${stats.wedding.name} is coming together.`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-foreground/30">
                <path d="M2.5 4.5L4.5 6.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 10.5L4.5 12.5L8.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-medium text-foreground/40 uppercase tracking-wide">Checklist</span>
            </div>
            <div className="text-2xl font-medium tracking-tight">
              {stats.checklist.completed}
              <span className="text-foreground/30 text-lg"> / {stats.checklist.total}</span>
            </div>
            <ProgressBar value={stats.checklist.completed} max={stats.checklist.total} />
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-foreground/30">
                <circle cx="6.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 13C2 10.7909 3.79086 9 6 9C8.20914 9 10 10.7909 10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-medium text-foreground/40 uppercase tracking-wide">Guests</span>
            </div>
            <div className="text-2xl font-medium tracking-tight">
              {stats.guests.total}
              <span className="text-foreground/30 text-lg"> total</span>
            </div>
            <div className="flex gap-3 text-xs text-foreground/50">
              <span className="text-emerald-600">{stats.guests.accepted} accepted</span>
              <span>{stats.guests.pending} pending</span>
              <span className="text-red-500">{stats.guests.declined} declined</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-foreground/30">
                <path d="M8 2V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11 4.5H6.5C5.11929 4.5 4 5.61929 4 7C4 8.38071 5.11929 9.5 6.5 9.5H9.5C10.8807 9.5 12 10.6193 12 12C12 13.3807 10.8807 14.5 9.5 14.5H4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-medium text-foreground/40 uppercase tracking-wide">Budget</span>
            </div>
            <div className="text-2xl font-medium tracking-tight">
              ${stats.budget.spent.toLocaleString()}
              <span className="text-foreground/30 text-lg"> / ${stats.budget.total.toLocaleString()}</span>
            </div>
            <div className="flex gap-3 text-xs text-foreground/50">
              <span>${stats.budget.remaining.toLocaleString()} remaining</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-foreground/30">
                <path d="M2 6L8 2L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 6V12.5C3 13.0523 3.44772 13.5 4 13.5H12C12.5523 13.5 13 13.0523 13 12.5V6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="text-xs font-medium text-foreground/40 uppercase tracking-wide">Vendors</span>
            </div>
            <div className="text-2xl font-medium tracking-tight">
              {stats.vendors.booked}
              <span className="text-foreground/30 text-lg"> / {stats.vendors.total} booked</span>
            </div>
            <div className="text-xs text-foreground/50">
              ${stats.vendors.cost.toLocaleString()} total vendor cost
            </div>
          </div>
        </Card>

        {stats.wedding.date && (
          <Card>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-foreground/30">
                  <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 7H14" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M11 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-medium text-foreground/40 uppercase tracking-wide">Wedding Date</span>
              </div>
              <div className="text-2xl font-medium tracking-tight">
                {new Date(stats.wedding.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="text-xs text-foreground/50">
                {stats.daysToGo} days to go
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
