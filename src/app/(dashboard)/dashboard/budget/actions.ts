"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getDefaultWedding } from "@/lib/wedding";

export async function addBudgetItem(formData: FormData) {
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const estimatedAmount = parseFloat(formData.get("estimatedAmount") as string) || 0;
  const actualAmount = parseFloat(formData.get("actualAmount") as string) || 0;

  if (!description?.trim() || !category) return;

  const wedding = await getDefaultWedding();

  await db.budgetItem.create({
    data: {
      category,
      description: description.trim(),
      estimatedAmount,
      actualAmount,
      weddingId: wedding.id,
    },
  });

  revalidatePath("/dashboard/budget");
  revalidatePath("/dashboard");
}

export async function updateBudgetItem(id: string, formData: FormData) {
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const estimatedAmount = parseFloat(formData.get("estimatedAmount") as string) || 0;
  const actualAmount = parseFloat(formData.get("actualAmount") as string) || 0;

  if (!description?.trim() || !category) return;

  await db.budgetItem.update({
    where: { id },
    data: {
      category,
      description: description.trim(),
      estimatedAmount,
      actualAmount,
    },
  });

  revalidatePath("/dashboard/budget");
  revalidatePath("/dashboard");
}

export async function deleteBudgetItem(id: string) {
  await db.budgetItem.delete({ where: { id } });
  revalidatePath("/dashboard/budget");
  revalidatePath("/dashboard");
}

export async function toggleBudgetItemPaid(id: string) {
  const item = await db.budgetItem.findUnique({ where: { id } });
  if (!item) return;

  await db.budgetItem.update({
    where: { id },
    data: { paid: !item.paid },
  });

  revalidatePath("/dashboard/budget");
  revalidatePath("/dashboard");
}
