"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission, can } from "@/lib/rbac";
import { jobSchema } from "@/lib/validations/job.schema";
import { submitForApproval } from "./approvals";

export type JobActionState =
  | { success: true; id?: string; pendingApproval?: boolean }
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
  const user = await requirePermission("jobs:write");
  const parsed = parseJob(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  const canPublish = can(user, "jobs:publish");
  const job = await db.jobListing.create({ data: { ...parsed.data, active: canPublish ? parsed.data.active : false } });
  if (!canPublish && parsed.data.active) {
    await submitForApproval("job", job.id, parsed.data.title);
    revalidatePath("/admin/jobs");
    return { success: true, id: job.id, pendingApproval: true };
  }
  revalidatePath("/admin/jobs");
  return { success: true, id: job.id };
}

export async function updateJob(
  id: string,
  _prev: JobActionState | null,
  formData: FormData
): Promise<JobActionState> {
  const user = await requirePermission("jobs:write");
  const parsed = parseJob(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  const canPublish = can(user, "jobs:publish");
  await db.jobListing.update({ where: { id }, data: { ...parsed.data, active: canPublish ? parsed.data.active : false } });
  if (!canPublish && parsed.data.active) {
    await submitForApproval("job", id, parsed.data.title);
    revalidatePath("/admin/jobs");
    return { success: true, pendingApproval: true };
  }
  revalidatePath("/admin/jobs");
  return { success: true };
}

export async function toggleJobActive(
  id: string,
  value: boolean
): Promise<{ pendingApproval?: boolean }> {
  const user = await requirePermission("jobs:write");
  if (!value) {
    await db.jobListing.update({ where: { id }, data: { active: false } });
    await db.contentApproval.deleteMany({ where: { entityType: "job", entityId: id } });
    revalidatePath("/admin/jobs");
    return {};
  }
  if (can(user, "jobs:publish")) {
    await db.jobListing.update({ where: { id }, data: { active: true } });
    revalidatePath("/admin/jobs");
    return {};
  }
  const job = await db.jobListing.findUnique({ where: { id }, select: { title: true } });
  await submitForApproval("job", id, job?.title ?? id);
  revalidatePath("/admin/jobs");
  return { pendingApproval: true };
}

export async function deleteJob(id: string): Promise<void> {
  await requirePermission("jobs:delete");
  await db.jobListing.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/jobs");
}

export type PublishedJob = {
  id: string; slug: string; title: string; description: string;
  location: string; type: string; category: string;
  minQualifications: string[]; preferredQualifications: string[]; aboutJob: string | null;
};

export async function getPublishedJobs(): Promise<PublishedJob[]> {
  return db.jobListing.findMany({
    where: { active: true, deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    select: {
      id: true, slug: true, title: true, description: true,
      location: true, type: true, category: true,
      minQualifications: true, preferredQualifications: true, aboutJob: true,
    },
  });
}
