import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";
import { PageHeader } from "@/components/ui/page-header";
import { TimelineList } from "@/components/timeline/timeline-list";
import { TimelineAddForm } from "@/components/timeline/timeline-add-form";

export default async function TimelinePage() {
  const wedding = await getDefaultWedding();
  const events = await db.timelineEvent.findMany({
    where: { weddingId: wedding.id },
    orderBy: { date: "asc" },
  });

  return (
    <>
      <PageHeader
        title="Timeline"
        description="Your wedding countdown — every milestone from now to the big day."
        action={<TimelineAddForm />}
      />

      <TimelineList events={events} />
    </>
  );
}
