"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/rbac";
import { partnerSchema } from "@/lib/validations/partner.schema";

export type PartnerActionState =
  | { success: true; id?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function toSlug(title: string) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parsePartner(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const submittedSlug = String(formData.get("slug") ?? "").trim();
  return partnerSchema.safeParse({
    title,
    logoUrl: formData.get("logoUrl"),
    type: formData.get("type"),
    slug: submittedSlug || toSlug(title) || undefined,
    summary: formData.get("summary") || undefined,
    points: [],
    order: 0,
  });
}

export async function createPartner(
  _prev: PartnerActionState | null,
  formData: FormData
): Promise<PartnerActionState> {
  await requirePermission("partners:write");
  const parsed = parsePartner(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  const partner = await db.partner.create({ data: parsed.data });
  revalidatePath("/admin/partners");
  return { success: true, id: partner.id };
}

export async function updatePartner(
  id: string,
  _prev: PartnerActionState | null,
  formData: FormData
): Promise<PartnerActionState> {
  await requirePermission("partners:write");
  const parsed = parsePartner(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  await db.partner.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/partners");
  return { success: true };
}

export async function togglePartnerPublished(id: string, value: boolean): Promise<void> {
  await requirePermission("partners:write");
  await db.partner.update({ where: { id }, data: { published: value } });
  revalidatePath("/admin/partners");
}

export async function deletePartner(id: string): Promise<void> {
  await requirePermission("partners:delete");
  await db.partner.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/partners");
}
