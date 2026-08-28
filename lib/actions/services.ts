"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { serviceSchema } from "@/lib/validations/service.schema";
import { services as fallbackServices } from "@/lib/services-data";

export type DbService = {
  id: string;
  slug: string;
  icon: string;
  profileEyebrow: string;
  profileHeading: string;
  profileHeadingAccent: string | null;
  profileParagraphs: string[];
  profilePrimaryImageUrl: string;
  profilePrimaryImageAlt: string;
  published: boolean;
  order: number;
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
      id: s.slug,
      slug: s.slug,
      icon: s.icon,
      profileEyebrow: s.profile.eyebrow,
      profileHeading: s.profile.heading,
      profileHeadingAccent: s.profile.headingAccent ?? null,
      profileParagraphs: s.profile.paragraphs,
      profilePrimaryImageUrl: s.profile.collage.primary.src,
      profilePrimaryImageAlt: s.profile.collage.primary.alt,
      published: true,
      order: i,
      methodology: s.methodology.map((m, j) => ({ id: `${s.slug}-${j}`, ...m, order: j })),
    }));
  }
}

export type ServiceActionState =
  | { success: true; id?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function parseService(formData: FormData) {
  return serviceSchema.safeParse({
    slug: formData.get("slug"),
    icon: formData.get("icon"),
    profileEyebrow: formData.get("profileEyebrow"),
    profileHeading: formData.get("profileHeading"),
    profileHeadingAccent: formData.get("profileHeadingAccent") || undefined,
    profileParagraphs: formData.getAll("profileParagraphs"),
    profilePrimaryImageUrl: formData.get("profilePrimaryImageUrl"),
    profilePrimaryImageAlt: formData.get("profilePrimaryImageAlt"),
    published: formData.get("published") === "true",
    order: Number(formData.get("order") ?? 0),
  });
}

export async function createService(
  _prev: ServiceActionState | null,
  formData: FormData
): Promise<ServiceActionState> {
  const parsed = parseService(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const service = await db.service.create({ data: parsed.data });
  revalidatePath("/admin/services");
  return { success: true, id: service.id };
}

export async function updateService(
  id: string,
  _prev: ServiceActionState | null,
  formData: FormData
): Promise<ServiceActionState> {
  const parsed = parseService(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  await db.service.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/services");
  return { success: true };
}

export async function toggleServicePublished(id: string, value: boolean): Promise<void> {
  await db.service.update({ where: { id }, data: { published: value } });
  revalidatePath("/admin/services");
}

export async function deleteService(id: string): Promise<void> {
  await db.service.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/services");
}
