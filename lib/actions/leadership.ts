"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/rbac";
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
    order: 0,
  });
}

export async function createLeadershipMember(
  _prev: LeadershipActionState | null,
  formData: FormData
): Promise<LeadershipActionState> {
  await requirePermission("leadership:write");
  const parsed = parseMember(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  const member = await db.leadershipMember.create({ data: parsed.data });
  revalidatePath("/admin/leadership");
  return { success: true, id: member.id };
}

export async function updateLeadershipMember(
  id: string,
  _prev: LeadershipActionState | null,
  formData: FormData
): Promise<LeadershipActionState> {
  await requirePermission("leadership:write");
  const parsed = parseMember(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  await db.leadershipMember.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/leadership");
  return { success: true };
}

export async function toggleLeadershipPublished(id: string, value: boolean): Promise<void> {
  await requirePermission("leadership:write");
  await db.leadershipMember.update({ where: { id }, data: { published: value } });
  revalidatePath("/admin/leadership");
}

export async function getPublishedLeadershipMembers() {
  try {
    const rows = await db.leadershipMember.findMany({
      where: { published: true, deletedAt: null },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (!rows.length) return null;
    return rows.map((m) => ({
      id: m.memberId,
      name: m.name,
      title: m.title,
      division: m.division as import("@/lib/leadership-data").LeadershipMember["division"],
      focus: m.focus,
      bio: m.bio,
      image: m.imageUrl ?? null,
      linkedin: m.linkedin ?? "",
    }));
  } catch {
    return null;
  }
}

export async function deleteLeadershipMember(id: string): Promise<void> {
  await requirePermission("leadership:delete");
  await db.leadershipMember.update({ where: { id }, data: { deletedAt: new Date() } });
  revalidatePath("/admin/leadership");
}
