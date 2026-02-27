"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";
import { generateRsvpToken } from "@/lib/utils";

export async function addGuest(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const rsvpStatus = formData.get("rsvpStatus") as string;
  const group = formData.get("group") as string;
  const dietaryNotes = formData.get("dietaryNotes") as string;

  if (!name?.trim()) return;

  const wedding = await getDefaultWedding();

  await db.guest.create({
    data: {
      name: name.trim(),
      email: email?.trim() || null,
      rsvpStatus: rsvpStatus || "pending",
      rsvpToken: generateRsvpToken(),
      group: group || null,
      dietaryNotes: dietaryNotes?.trim() || null,
      weddingId: wedding.id,
    },
  });

  revalidatePath("/dashboard/guests");
  revalidatePath("/dashboard");
}

export async function updateGuest(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const rsvpStatus = formData.get("rsvpStatus") as string;
  const group = formData.get("group") as string;
  const dietaryNotes = formData.get("dietaryNotes") as string;

  if (!name?.trim()) return;

  await db.guest.update({
    where: { id },
    data: {
      name: name.trim(),
      email: email?.trim() || null,
      rsvpStatus: rsvpStatus || "pending",
      group: group || null,
      dietaryNotes: dietaryNotes?.trim() || null,
    },
  });

  revalidatePath("/dashboard/guests");
  revalidatePath("/dashboard");
}

export async function deleteGuest(id: string) {
  await db.guest.delete({ where: { id } });
  revalidatePath("/dashboard/guests");
  revalidatePath("/dashboard");
}

export async function updateRsvpStatus(id: string, status: string) {
  await db.guest.update({
    where: { id },
    data: { rsvpStatus: status },
  });
  revalidatePath("/dashboard/guests");
  revalidatePath("/dashboard");
}
