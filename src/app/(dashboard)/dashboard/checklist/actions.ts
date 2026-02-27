"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";

export async function toggleChecklistItem(id: string) {
  const item = await db.checklistItem.findUnique({ where: { id } });
  if (!item) return;

  await db.checklistItem.update({
    where: { id },
    data: { completed: !item.completed },
  });

  revalidatePath("/dashboard/checklist");
  revalidatePath("/dashboard");
}

export async function addChecklistItem(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;

  if (!title?.trim() || !category) return;

  const wedding = await getDefaultWedding();

  const maxOrder = await db.checklistItem.findFirst({
    where: { weddingId: wedding.id, category },
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });

  await db.checklistItem.create({
    data: {
      title: title.trim(),
      category,
      sortOrder: (maxOrder?.sortOrder ?? 0) + 1,
      weddingId: wedding.id,
    },
  });

  revalidatePath("/dashboard/checklist");
  revalidatePath("/dashboard");
}

export async function deleteChecklistItem(id: string) {
  await db.checklistItem.delete({ where: { id } });
  revalidatePath("/dashboard/checklist");
  revalidatePath("/dashboard");
}

export async function updateChecklistItem(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const notes = formData.get("notes") as string;

  if (!title?.trim()) return;

  await db.checklistItem.update({
    where: { id },
    data: {
      title: title.trim(),
      notes: notes?.trim() || null,
    },
  });

  revalidatePath("/dashboard/checklist");
}
