"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { partnerSchema } from "@/lib/validations/partner.schema";

export type PartnerActionState =
  | { success: true; id?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function parsePartner(formData: FormData) {
  return partnerSchema.safeParse({
    title: formData.get("title"),
    logoUrl: formData.get("logoUrl"),
    type: formData.get("type"),
    slug: formData.get("slug") || undefined,
    summary: formData.get("summary") || undefined,
    points: formData.getAll("points"),
    order: Number(formData.get("order") ?? 0),
  });
}

export async function createPartner(
  _prev: PartnerActionState | null,
  formData: FormData
): Promise<PartnerActionState> {
  const parsed = parsePartner(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const partner = await db.partner.create({ data: parsed.data });
  revalidatePath("/admin/partners");
  return { success: true, id: partner.id };
}

export async function updatePartner(
  id: string,
  _prev: PartnerActionState | null,
  formData: FormData
): Promise<PartnerActionState> {
  const parsed = parsePartner(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  await db.partner.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/partners");
  return { success: true };
}

export async function deletePartner(id: string): Promise<void> {
  await db.partner.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/partners");
}
