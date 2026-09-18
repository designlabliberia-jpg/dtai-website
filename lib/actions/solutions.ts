"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission, can } from "@/lib/rbac";
import { solutionSchema } from "@/lib/validations/solution.schema";
import { submitForApproval } from "./approvals";

export type SolutionActionState =
  | { success: true; id?: string; pendingApproval?: boolean }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function parseSolution(formData: FormData) {
  return solutionSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    serviceId: (formData.get("serviceId") as string) || undefined,
    published: formData.get("published") === "true",
    order: Number(formData.get("order") ?? 0),
  });
}

export async function createSolution(
  _prev: SolutionActionState | null,
  formData: FormData
): Promise<SolutionActionState> {
  const user = await requirePermission("solutions:write");
  const parsed = parseSolution(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  const canPublish = can(user, "solutions:publish");
  const solution = await db.solution.create({ data: { ...parsed.data, published: canPublish ? parsed.data.published : false } });
  if (!canPublish && parsed.data.published) {
    await submitForApproval("solution", solution.id, parsed.data.title);
    revalidatePath("/admin/solutions");
    return { success: true, id: solution.id, pendingApproval: true };
  }
  revalidatePath("/admin/solutions");
  return { success: true, id: solution.id };
}

export async function updateSolution(
  id: string,
  _prev: SolutionActionState | null,
  formData: FormData
): Promise<SolutionActionState> {
  const user = await requirePermission("solutions:write");
  const parsed = parseSolution(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  const canPublish = can(user, "solutions:publish");
  await db.solution.update({ where: { id }, data: { ...parsed.data, published: canPublish ? parsed.data.published : false } });
  if (!canPublish && parsed.data.published) {
    await submitForApproval("solution", id, parsed.data.title);
    revalidatePath("/admin/solutions");
    return { success: true, pendingApproval: true };
  }
  revalidatePath("/admin/solutions");
  return { success: true };
}

export async function toggleSolutionPublished(id: string, value: boolean): Promise<void> {
  await requirePermission("solutions:publish");
  await db.solution.update({ where: { id }, data: { published: value } });
  revalidatePath("/admin/solutions");
}

export async function deleteSolution(id: string): Promise<void> {
  await requirePermission("solutions:delete");
  await db.solution.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/solutions");
}
