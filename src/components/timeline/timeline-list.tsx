import { TimelineEventItem } from "./timeline-event-item";
import { EmptyState } from "@/components/ui/empty-state";
import type { TimelineEvent } from "@prisma/client";

export function TimelineList({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return <EmptyState title="No events" description="Add your first timeline event to get started." />;
  }

  return (
    <div className="pl-2">
      {events.map((event) => (
        <TimelineEventItem key={event.id} event={event} />
      ))}
    </div>
  );
}
