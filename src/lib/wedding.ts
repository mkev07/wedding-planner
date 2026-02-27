import { db } from "./db";

export async function getDefaultWedding() {
  let wedding = await db.wedding.findFirst();
  if (!wedding) {
    wedding = await db.wedding.create({
      data: {
        name: "Our Wedding",
        budget: 30000,
      },
    });
  }
  return wedding;
}
