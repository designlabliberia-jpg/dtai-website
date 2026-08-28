"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import {
  settingsSchema, pageSeoSchema,
  aboutProfileSchema, aboutMissionSchema, aboutVisionSchema,
  aboutValuesSchema, aboutCommitmentSchema, aboutWhySchema,
} from "@/lib/validations/settings.schema";

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

// ── Shared about upsert helper ────────────────────────────────────────────
async function upsertAbout(data: Record<string, unknown>) {
  await db.aboutSettings.upsert({
    where: { id: "global" },
    update: data,
    create: { id: "global", ...data },
  });
  revalidatePath("/company/overview");
}

function getFields(formData: FormData, keys: string[]) {
  return Object.fromEntries(keys.map((k) => [k, formData.get(k)]));
}

export async function saveAboutProfile(
  _prev: SettingsActionState | null,
  formData: FormData
): Promise<SettingsActionState> {
  const parsed = aboutProfileSchema.safeParse(getFields(formData, [
    "profileEyebrow", "profileHeading", "profileHeadingAccent", "profileParagraphs",
    "profilePrimaryImage", "profilePrimaryImageAlt", "profileSecondaryImage", "profileSecondaryImageAlt",
  ]));
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  await upsertAbout(parsed.data);
  return { success: true };
}

export async function saveAboutMission(
  _prev: SettingsActionState | null,
  formData: FormData
): Promise<SettingsActionState> {
  const parsed = aboutMissionSchema.safeParse(getFields(formData, [
    "missionBody", "missionPoints",
    "missionPrimaryImage", "missionPrimaryImageAlt", "missionSecondaryImage", "missionSecondaryImageAlt",
  ]));
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  await upsertAbout(parsed.data);
  return { success: true };
}

export async function saveAboutVision(
  _prev: SettingsActionState | null,
  formData: FormData
): Promise<SettingsActionState> {
  const parsed = aboutVisionSchema.safeParse(getFields(formData, [
    "visionBody", "visionPoints",
    "visionPrimaryImage", "visionPrimaryImageAlt", "visionSecondaryImage", "visionSecondaryImageAlt",
  ]));
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  await upsertAbout(parsed.data);
  return { success: true };
}

export async function saveAboutValues(
  _prev: SettingsActionState | null,
  formData: FormData
): Promise<SettingsActionState> {
  const parsed = aboutValuesSchema.safeParse(getFields(formData, ["valuesLabels"]));
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  await upsertAbout(parsed.data);
  return { success: true };
}

export async function saveAboutCommitment(
  _prev: SettingsActionState | null,
  formData: FormData
): Promise<SettingsActionState> {
  const parsed = aboutCommitmentSchema.safeParse(getFields(formData, [
    "commitmentBody", "commitmentPoints",
    "commitmentPrimaryImage", "commitmentPrimaryImageAlt", "commitmentSecondaryImage", "commitmentSecondaryImageAlt",
  ]));
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  await upsertAbout(parsed.data);
  return { success: true };
}

export async function saveAboutWhy(
  _prev: SettingsActionState | null,
  formData: FormData
): Promise<SettingsActionState> {
  const parsed = aboutWhySchema.safeParse(getFields(formData, [
    "whyTitle", "whyHeading", "whyHeadingAccent",
    "why1Title", "why1Description", "why2Title", "why2Description",
    "why3Title", "why3Description", "why4Title", "why4Description",
    "why5Title", "why5Description", "why6Title", "why6Description",
  ]));
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  await upsertAbout(parsed.data);
  return { success: true };
}
