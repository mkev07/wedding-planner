import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { GuestList } from "@/components/guests/guest-list";
import { GuestAddForm } from "@/components/guests/guest-add-form";

export default async function GuestsPage() {
  const wedding = await getDefaultWedding();
  const guests = await db.guest.findMany({
    where: { weddingId: wedding.id },
    orderBy: { name: "asc" },
  });

  const accepted = guests.filter((g) => g.rsvpStatus === "accepted").length;
  const pending = guests.filter((g) => g.rsvpStatus === "pending").length;
  const declined = guests.filter((g) => g.rsvpStatus === "declined").length;

  return (
    <>
      <PageHeader
        title="Guests"
        description="Manage your guest list, RSVPs, and dietary requirements."
        action={<GuestAddForm />}
      />

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card>
            <div className="text-2xl font-medium tracking-tight">{guests.length}</div>
            <div className="text-xs text-foreground/40 mt-1">Total</div>
          </Card>
          <Card>
            <div className="text-2xl font-medium tracking-tight text-emerald-600">{accepted}</div>
            <div className="text-xs text-foreground/40 mt-1">Accepted</div>
          </Card>
          <Card>
            <div className="text-2xl font-medium tracking-tight">{pending}</div>
            <div className="text-xs text-foreground/40 mt-1">Pending</div>
          </Card>
          <Card>
            <div className="text-2xl font-medium tracking-tight text-red-500">{declined}</div>
            <div className="text-xs text-foreground/40 mt-1">Declined</div>
          </Card>
        </div>

        <GuestList guests={guests} />
      </div>
    </>
  );
}
