"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function markApplicationReviewing(id: string): Promise<void> {
  await db.jobApplication.update({ where: { id }, data: { status: "reviewing" } });
  revalidatePath("/admin/applications");
}

export async function deleteApplication(id: string): Promise<void> {
  await db.jobApplication.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/applications");
}
