"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";

export async function addTimelineEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const category = formData.get("category") as string;

  if (!title?.trim()) return;

  const wedding = await getDefaultWedding();

  await db.timelineEvent.create({
    data: {
      title: title.trim(),
      date: date ? new Date(date) : null,
      category: category || null,
      weddingId: wedding.id,
    },
  });

  revalidatePath("/dashboard/timeline");
  revalidatePath("/dashboard");
}

export async function updateTimelineEvent(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const category = formData.get("category") as string;

  if (!title?.trim()) return;

  await db.timelineEvent.update({
    where: { id },
    data: {
      title: title.trim(),
      date: date ? new Date(date) : null,
      category: category || null,
    },
  });

  revalidatePath("/dashboard/timeline");
  revalidatePath("/dashboard");
}

export async function deleteTimelineEvent(id: string) {
  await db.timelineEvent.delete({ where: { id } });
  revalidatePath("/dashboard/timeline");
  revalidatePath("/dashboard");
}

export async function toggleTimelineEvent(id: string) {
  const event = await db.timelineEvent.findUnique({ where: { id } });
  if (!event) return;

  await db.timelineEvent.update({
    where: { id },
    data: { completed: !event.completed },
  });

  revalidatePath("/dashboard/timeline");
  revalidatePath("/dashboard");
}
