import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";
import { PageHeader } from "@/components/ui/page-header";
import { TableList } from "@/components/seating/table-list";
import { TableAddForm } from "@/components/seating/table-add-form";

export default async function SeatingPage() {
  const wedding = await getDefaultWedding();

  const [tables, guests] = await Promise.all([
    db.table.findMany({
      where: { weddingId: wedding.id },
      orderBy: { name: "asc" },
    }),
    db.guest.findMany({
      where: { weddingId: wedding.id },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <>
      <PageHeader
        title="Seating"
        description="Arrange tables and assign guests to create the perfect seating plan."
        action={<TableAddForm />}
      />

      <TableList tables={tables} guests={guests} />
    </>
  );
}
