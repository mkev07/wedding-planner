"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";

export async function addTable(formData: FormData) {
  const name = formData.get("name") as string;
  const capacity = parseInt(formData.get("capacity") as string) || 8;

  if (!name?.trim()) return;

  const wedding = await getDefaultWedding();

  await db.table.create({
    data: {
      name: name.trim(),
      capacity,
      weddingId: wedding.id,
    },
  });

  revalidatePath("/dashboard/seating");
}

export async function updateTable(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const capacity = parseInt(formData.get("capacity") as string) || 8;

  if (!name?.trim()) return;

  await db.table.update({
    where: { id },
    data: {
      name: name.trim(),
      capacity,
    },
  });

  revalidatePath("/dashboard/seating");
}

export async function deleteTable(id: string) {
  // Unassign all guests first
  await db.guest.updateMany({
    where: { tableId: id },
    data: { tableId: null },
  });

  await db.table.delete({ where: { id } });
  revalidatePath("/dashboard/seating");
}

export async function assignGuestToTable(guestId: string, tableId: string | null) {
  await db.guest.update({
    where: { id: guestId },
    data: { tableId },
  });

  revalidatePath("/dashboard/seating");
}
