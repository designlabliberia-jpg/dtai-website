"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { serviceSchema } from "@/lib/validations/service.schema";

export type ServiceActionState =
  | { success: true; id?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function parseService(formData: FormData) {
  // Parse methodology steps from indexed fields
  const stepCount = Number(formData.get("stepCount") ?? 0);
  const methodology = Array.from({ length: stepCount }, (_, i) => ({
    title: formData.get(`step_title_${i}`) as string,
    description: formData.get(`step_description_${i}`) as string,
    icon: formData.get(`step_icon_${i}`) as string,
    order: i,
  }));

  return serviceSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    icon: formData.get("icon"),
    summary: formData.get("summary"),
    solutions: formData.getAll("solutions"),
    methodology,
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
  const { methodology, ...data } = parsed.data;
  const service = await db.service.create({
    data: {
      ...data,
      methodology: { create: methodology },
    },
  });
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
  const { methodology, ...data } = parsed.data;
  await db.service.update({
    where: { id },
    data: {
      ...data,
      methodology: {
        deleteMany: {},
        create: methodology,
      },
    },
  });
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
