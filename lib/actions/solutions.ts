"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { solutionSchema } from "@/lib/validations/solution.schema";

export type SolutionActionState =
  | { success: true; id?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function parseSolution(formData: FormData) {
  return solutionSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    overview: formData.get("overview"),
    focusAreas: formData.getAll("focusAreas"),
    proofPoints: formData.getAll("proofPoints"),
    relatedServices: formData.getAll("relatedServices"),
    snippetFilename: formData.get("snippetFilename") || undefined,
    snippetLanguage: formData.get("snippetLanguage") || undefined,
    snippetCode: formData.get("snippetCode") || undefined,
    published: formData.get("published") === "true",
    order: Number(formData.get("order") ?? 0),
  });
}

export async function createSolution(
  _prev: SolutionActionState | null,
  formData: FormData
): Promise<SolutionActionState> {
  const parsed = parseSolution(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const solution = await db.solution.create({ data: parsed.data });
  revalidatePath("/admin/solutions");
  return { success: true, id: solution.id };
}

export async function updateSolution(
  id: string,
  _prev: SolutionActionState | null,
  formData: FormData
): Promise<SolutionActionState> {
  const parsed = parseSolution(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  await db.solution.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/solutions");
  return { success: true };
}

export async function toggleSolutionPublished(id: string, value: boolean): Promise<void> {
  await db.solution.update({ where: { id }, data: { published: value } });
  revalidatePath("/admin/solutions");
}

export async function deleteSolution(id: string): Promise<void> {
  await db.solution.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/solutions");
}
