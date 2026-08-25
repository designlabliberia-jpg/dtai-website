"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { jobSchema } from "@/lib/validations/job.schema";

export type JobActionState =
  | { success: true; id?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function parseJob(formData: FormData) {
  return jobSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    type: formData.get("type"),
    category: formData.get("category"),
    minQualifications: formData.getAll("minQualifications"),
    preferredQualifications: formData.getAll("preferredQualifications"),
    aboutJob: formData.get("aboutJob") || undefined,
    active: formData.get("active") === "true",
    order: Number(formData.get("order") ?? 0),
  });
}

export async function createJob(
  _prev: JobActionState | null,
  formData: FormData
): Promise<JobActionState> {
  const parsed = parseJob(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const job = await db.jobListing.create({ data: parsed.data });
  revalidatePath("/admin/jobs");
  return { success: true, id: job.id };
}

export async function updateJob(
  id: string,
  _prev: JobActionState | null,
  formData: FormData
): Promise<JobActionState> {
  const parsed = parseJob(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  await db.jobListing.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/jobs");
  return { success: true };
}

export async function toggleJobActive(id: string, value: boolean): Promise<void> {
  await db.jobListing.update({ where: { id }, data: { active: value } });
  revalidatePath("/admin/jobs");
}

export async function deleteJob(id: string): Promise<void> {
  await db.jobListing.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/jobs");
}
