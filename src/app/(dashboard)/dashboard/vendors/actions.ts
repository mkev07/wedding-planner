"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";

export async function addVendor(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const contactName = formData.get("contactName") as string;
  const contactEmail = formData.get("contactEmail") as string;
  const contactPhone = formData.get("contactPhone") as string;
  const cost = parseFloat(formData.get("cost") as string) || 0;
  const bookingStatus = formData.get("bookingStatus") as string;
  const notes = formData.get("notes") as string;

  if (!name?.trim() || !category) return;

  const wedding = await getDefaultWedding();

  await db.vendor.create({
    data: {
      name: name.trim(),
      category,
      contactName: contactName?.trim() || null,
      contactEmail: contactEmail?.trim() || null,
      contactPhone: contactPhone?.trim() || null,
      cost,
      bookingStatus: bookingStatus || "researching",
      notes: notes?.trim() || null,
      weddingId: wedding.id,
    },
  });

  revalidatePath("/dashboard/vendors");
  revalidatePath("/dashboard");
}

export async function updateVendor(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const contactName = formData.get("contactName") as string;
  const contactEmail = formData.get("contactEmail") as string;
  const contactPhone = formData.get("contactPhone") as string;
  const cost = parseFloat(formData.get("cost") as string) || 0;
  const bookingStatus = formData.get("bookingStatus") as string;
  const notes = formData.get("notes") as string;

  if (!name?.trim() || !category) return;

  await db.vendor.update({
    where: { id },
    data: {
      name: name.trim(),
      category,
      contactName: contactName?.trim() || null,
      contactEmail: contactEmail?.trim() || null,
      contactPhone: contactPhone?.trim() || null,
      cost,
      bookingStatus: bookingStatus || "researching",
      notes: notes?.trim() || null,
    },
  });

  revalidatePath("/dashboard/vendors");
  revalidatePath("/dashboard");
}

export async function deleteVendor(id: string) {
  await db.vendor.delete({ where: { id } });
  revalidatePath("/dashboard/vendors");
  revalidatePath("/dashboard");
}

export async function updateBookingStatus(id: string, status: string) {
  await db.vendor.update({
    where: { id },
    data: { bookingStatus: status },
  });
  revalidatePath("/dashboard/vendors");
  revalidatePath("/dashboard");
}
