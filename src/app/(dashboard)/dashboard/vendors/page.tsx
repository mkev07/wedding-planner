import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";
import { formatCurrency } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { VendorList } from "@/components/vendors/vendor-list";
import { VendorAddForm } from "@/components/vendors/vendor-add-form";

export default async function VendorsPage() {
  const wedding = await getDefaultWedding();
  const vendors = await db.vendor.findMany({
    where: { weddingId: wedding.id },
    orderBy: { name: "asc" },
  });

  const totalCost = vendors.reduce((sum, v) => sum + v.cost, 0);
  const bookedCount = vendors.filter((v) => v.bookingStatus === "booked" || v.bookingStatus === "paid").length;

  return (
    <>
      <PageHeader
        title="Vendors"
        description="Keep all your vendor contacts, costs, and booking statuses organized."
        action={<VendorAddForm />}
      />

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <div className="text-2xl font-medium tracking-tight">{vendors.length}</div>
            <div className="text-xs text-foreground/40 mt-1">Total Vendors</div>
          </Card>
          <Card>
            <div className="text-2xl font-medium tracking-tight">{formatCurrency(totalCost)}</div>
            <div className="text-xs text-foreground/40 mt-1">Total Cost</div>
          </Card>
          <Card>
            <div className="text-2xl font-medium tracking-tight text-emerald-600">{bookedCount}</div>
            <div className="text-xs text-foreground/40 mt-1">Booked</div>
          </Card>
        </div>

        <VendorList vendors={vendors} />
      </div>
    </>
  );
}
