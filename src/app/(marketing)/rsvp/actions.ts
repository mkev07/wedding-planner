"use server";

import { db } from "@/lib/db";

export async function lookupGuest(query: string) {
  if (!query?.trim()) return { guests: [] };

  const search = query.trim();

  const guests = await db.guest.findMany({
    where: {
      OR: [
        { name: { contains: search } },
        { email: { contains: search } },
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      rsvpStatus: true,
      dietaryNotes: true,
    },
  });

  return { guests };
}

export async function submitRsvp(
  guestId: string,
  rsvpStatus: string,
  dietaryNotes: string,
) {
  if (!guestId || !rsvpStatus) return { error: "Missing fields" };

  const guest = await db.guest.findUnique({ where: { id: guestId } });
  if (!guest) return { error: "Guest not found" };

  await db.guest.update({
    where: { id: guestId },
    data: {
      rsvpStatus,
      dietaryNotes: dietaryNotes?.trim() || null,
    },
  });

  return { success: true };
}

export async function submitRsvpByToken(
  token: string,
  rsvpStatus: string,
  dietaryNotes: string,
) {
  if (!token || !rsvpStatus) return { error: "Missing fields" };

  const guest = await db.guest.findUnique({ where: { rsvpToken: token } });
  if (!guest) return { error: "Guest not found" };

  await db.guest.update({
    where: { rsvpToken: token },
    data: {
      rsvpStatus,
      dietaryNotes: dietaryNotes?.trim() || null,
    },
  });

  return { success: true, name: guest.name };
}
