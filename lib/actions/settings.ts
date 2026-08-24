"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { settingsSchema, pageSeoSchema } from "@/lib/validations/settings.schema";

export type SettingsActionState =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function saveSettings(
  _prev: SettingsActionState | null,
  formData: FormData
): Promise<SettingsActionState> {
  const parsed = settingsSchema.safeParse({
    name: formData.get("name"),
    fullName: formData.get("fullName"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    logoUrl: formData.get("logoUrl"),
    siteUrl: formData.get("siteUrl"),
    contactEmail: formData.get("contactEmail"),
    whatsappNumber: formData.get("whatsappNumber"),
    facebookUrl: formData.get("facebookUrl"),
    linkedinUrl: formData.get("linkedinUrl"),
    web3formsKey: formData.get("web3formsKey"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await db.siteSettings.upsert({
    where: { id: "global" },
    update: parsed.data,
    create: { id: "global", ...parsed.data },
  });

  revalidatePath("/", "layout");
  return { success: true };
}

export async function savePageSeo(
  _prev: SettingsActionState | null,
  formData: FormData
): Promise<SettingsActionState> {
  const parsed = pageSeoSchema.safeParse({
    pageSlug: formData.get("pageSlug"),
    title: formData.get("title"),
    description: formData.get("description"),
    ogImageUrl: formData.get("ogImageUrl"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await db.pageSeo.upsert({
    where: { pageSlug: parsed.data.pageSlug },
    update: parsed.data,
    create: parsed.data,
  });

  revalidatePath(`/${parsed.data.pageSlug}`);
  return { success: true };
}
