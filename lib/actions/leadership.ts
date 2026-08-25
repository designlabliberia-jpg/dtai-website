"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { leadershipSchema } from "@/lib/validations/leadership.schema";

export type LeadershipActionState =
  | { success: true; id?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

function parseMember(formData: FormData) {
  return leadershipSchema.safeParse({
    memberId: formData.get("memberId"),
    name: formData.get("name"),
    title: formData.get("title"),
    division: formData.get("division"),
    focus: formData.get("focus"),
    bio: formData.get("bio"),
    imageUrl: formData.get("imageUrl") || undefined,
    linkedin: formData.get("linkedin") || undefined,
    order: Number(formData.get("order") ?? 0),
  });
}

export async function createLeadershipMember(
  _prev: LeadershipActionState | null,
  formData: FormData
): Promise<LeadershipActionState> {
  const parsed = parseMember(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const member = await db.leadershipMember.create({ data: parsed.data });
  revalidatePath("/admin/leadership");
  return { success: true, id: member.id };
}

export async function updateLeadershipMember(
  id: string,
  _prev: LeadershipActionState | null,
  formData: FormData
): Promise<LeadershipActionState> {
  const parsed = parseMember(formData);
  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  await db.leadershipMember.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/leadership");
  return { success: true };
}

export async function deleteLeadershipMember(id: string): Promise<void> {
  await db.leadershipMember.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/leadership");
}
