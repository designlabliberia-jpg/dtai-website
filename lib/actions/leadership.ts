"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission, can } from "@/lib/rbac";
import { leadershipSchema } from "@/lib/validations/leadership.schema";
import { submitForApproval } from "./approvals";

export type LeadershipActionState =
  | { success: true; id?: string; pendingApproval?: boolean }
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
  const user = await requirePermission("leadership:write");
  const parsed = parseMember(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  const canPublish = can(user, "leadership:publish");
  const member = await db.leadershipMember.create({ data: { ...parsed.data, published: canPublish ? (parsed.data.published ?? false) : false } });
  if (!canPublish && (parsed.data.published ?? false)) {
    await submitForApproval("leadership", member.id, parsed.data.name);
    revalidatePath("/admin/leadership");
    return { success: true, id: member.id, pendingApproval: true };
  }
  revalidatePath("/admin/leadership");
  return { success: true, id: member.id };
}

export async function updateLeadershipMember(
  id: string,
  _prev: LeadershipActionState | null,
  formData: FormData
): Promise<LeadershipActionState> {
  const user = await requirePermission("leadership:write");
  const parsed = parseMember(formData);
  if (!parsed.success) return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  const canPublish = can(user, "leadership:publish");
  await db.leadershipMember.update({ where: { id }, data: { ...parsed.data, published: canPublish ? (parsed.data.published ?? false) : false } });
  if (!canPublish && (parsed.data.published ?? false)) {
    await submitForApproval("leadership", id, parsed.data.name);
    revalidatePath("/admin/leadership");
    return { success: true, pendingApproval: true };
  }
  revalidatePath("/admin/leadership");
  return { success: true };
}

export async function toggleLeadershipPublished(
  id: string,
  value: boolean
): Promise<{ pendingApproval?: boolean }> {
  const user = await requirePermission("leadership:write");
  if (!value) {
    await db.leadershipMember.update({ where: { id }, data: { published: false } });
    await db.contentApproval.deleteMany({ where: { entityType: "leadership", entityId: id } });
    revalidatePath("/admin/leadership");
    return {};
  }
  if (can(user, "leadership:publish")) {
    await db.leadershipMember.update({ where: { id }, data: { published: true } });
    revalidatePath("/admin/leadership");
    return {};
  }
  const member = await db.leadershipMember.findUnique({ where: { id }, select: { name: true } });
  await submitForApproval("leadership", id, member?.name ?? id);
  revalidatePath("/admin/leadership");
  return { pendingApproval: true };
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
