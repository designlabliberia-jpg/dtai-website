"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function markContactRead(id: string): Promise<void> {
  await db.contactSubmission.update({ where: { id }, data: { status: "read" } });
  revalidatePath("/admin/contact");
}

export async function deleteContactSubmission(id: string): Promise<void> {
  await db.contactSubmission.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/contact");
}
