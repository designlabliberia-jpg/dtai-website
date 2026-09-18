"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission, can } from "@/lib/rbac";
import { serviceSchema } from "@/lib/validations/service.schema";
import { services as fallbackServices } from "@/lib/services-data";
import { submitForApproval } from "./approvals";

export type DbService = {
  id: string; slug: string;
  profileEyebrow: string; profileHeading: string; profileHeadingAccent: string | null;
  profileParagraphs: string[]; profilePrimaryImageUrl: string; profilePrimaryImageAlt: string;
  published: boolean; order: number;
  methodology: { id: string; title: string; description: string; icon: string; order: number }[];
};

export async function getPublishedServices(): Promise<DbService[]> {
  try {
    return await db.service.findMany({
      where: { published: true, deletedAt: null },
      orderBy: [{ order: "asc" }],
      include: { methodology: { orderBy: { order: "asc" } } },
    });
  } catch {
    return fallbackServices.map((s, i) => ({
      id: s.slug, slug: s.slug,
      profileEyebrow: s.profile.eyebrow, profileHeading: s.profile.heading,
      profileHeadingAccent: s.profile.headingAccent ?? null,
      profileParagraphs: s.profile.paragraphs,
      profilePrimaryImageUrl: s.profile.collage.primary.src,
      profilePrimaryImageAlt: s.profile.collage.primary.alt,
      published: true, order: i,
      methodology: s.methodology.map((m, j) => ({ id: `${s.slug}-${j}`, ...m, order: j })),
    }));
  }
}

export type ServiceActionState =
  | { success: true; id?: string; pendingApproval?: boolean }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function parseService(formData: FormData) {
  return serviceSchema.safeParse({
    slug: formData.get("slug"),
    profileEyebrow: formData.get("profileEyebrow"),
    profileHeading: formData.get("profileHeading"),
    profileHeadingAccent: formData.get("profileHeadingAccent") || undefined,
    profileParagraphs: formData.getAll("profileParagraphs"),
    profilePrimaryImageUrl: formData.get("profilePrimaryImageUrl"),
    profilePrimaryImageAlt: formData.get("profilePrimaryImageAlt"),
    published: formData.get("published") === "true",
  });
}

export async function createService(
  _prev: ServiceActionState | null,
  formData: FormData
): Promise<ServiceActionState> {
  const user = await requirePermission("services:write");
  const parsed = parseService(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  const canPublish = can(user, "services:publish");
  const service = await db.service.create({ data: { ...parsed.data, published: canPublish ? parsed.data.published : false } });
  if (!canPublish && parsed.data.published) {
    await submitForApproval("service", service.id, parsed.data.slug);
    revalidatePath("/admin/services");
    return { success: true, id: service.id, pendingApproval: true };
  }
  revalidatePath("/admin/services");
  return { success: true, id: service.id };
}

export async function updateService(
  id: string,
  _prev: ServiceActionState | null,
  formData: FormData
): Promise<ServiceActionState> {
  const user = await requirePermission("services:write");
  const parsed = parseService(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  const canPublish = can(user, "services:publish");
  await db.service.update({ where: { id }, data: { ...parsed.data, published: canPublish ? parsed.data.published : false } });
  if (!canPublish && parsed.data.published) {
    await submitForApproval("service", id, parsed.data.slug);
    revalidatePath("/admin/services");
    return { success: true, pendingApproval: true };
  }
  revalidatePath("/admin/services");
  return { success: true };
}

export async function toggleServicePublished(id: string, value: boolean): Promise<void> {
  await requirePermission("services:publish");
  await db.service.update({ where: { id }, data: { published: value } });
  revalidatePath("/admin/services");
}

export async function deleteService(id: string): Promise<void> {
  await requirePermission("services:delete");
  await db.service.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/services");
}
