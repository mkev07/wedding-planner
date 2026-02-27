import { VendorCard } from "./vendor-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Vendor } from "@prisma/client";

export function VendorList({ vendors }: { vendors: Vendor[] }) {
  if (vendors.length === 0) {
    return <EmptyState title="No vendors" description="Add your first vendor to get started." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
}
