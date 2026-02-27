import { Card } from "@/components/ui/card";
import type { Guest } from "@prisma/client";

export function UnassignedGuests({ guests }: { guests: Guest[] }) {
  if (guests.length === 0) return null;

  return (
    <Card>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Unassigned Guests</h3>
          <span className="text-xs text-foreground/40">{guests.length} guest{guests.length !== 1 ? "s" : ""}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {guests.map((guest) => (
            <span
              key={guest.id}
              className="text-xs px-2.5 py-1 rounded-lg bg-foreground/[0.03] text-foreground/60"
            >
              {guest.name}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
