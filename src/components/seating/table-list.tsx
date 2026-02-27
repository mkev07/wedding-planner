import { TableCard } from "./table-card";
import { UnassignedGuests } from "./unassigned-guests";
import { EmptyState } from "@/components/ui/empty-state";
import type { Table, Guest } from "@prisma/client";

export function TableList({
  tables,
  guests,
}: {
  tables: Table[];
  guests: Guest[];
}) {
  const unassigned = guests.filter((g) => !g.tableId);

  if (tables.length === 0) {
    return <EmptyState title="No tables" description="Add your first table to start arranging seating." />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            assignedGuests={guests.filter((g) => g.tableId === table.id)}
            unassignedGuests={unassigned}
          />
        ))}
      </div>
      <UnassignedGuests guests={unassigned} />
    </div>
  );
}
