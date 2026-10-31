"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
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

  const createAccount = formData.get("createAccount") === "1";
  const email = (formData.get("accountEmail") as string | null)?.toLowerCase().trim();
  const password = formData.get("accountPassword") as string | null;

  if (createAccount) {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email ?? "");
    if (!emailValid) return { success: false, error: "Enter a valid email address for the admin account." };
    if (!password || password.length < 8) return { success: false, error: "Password must be at least 8 characters." };
    const exists = await db.adminUser.findUnique({ where: { email: email! } });
    if (exists) return { success: false, error: "An admin account with that email already exists." };
  }

  const member = await db.$transaction(async (tx) => {
    const m = await tx.leadershipMember.create({ data: { ...parsed.data, published: canPublish ? (parsed.data.published ?? false) : false } });
    if (createAccount) {
      const leadershipRole = await tx.role.findUnique({ where: { name: "leadership" } });
      if (!leadershipRole) throw new Error("Leadership role not found. Run the seed first.");
      const passwordHash = await bcrypt.hash(password!, 12);
      await tx.adminUser.create({
        data: { name: parsed.data.name, email: email!, passwordHash, roleId: leadershipRole.id, leadershipMemberId: m.id },
      });
    }
    return m;
  });

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

export async function provisionLeadershipAccount(
  id: string,
  email: string,
  password: string
): Promise<{ error?: string }> {
  await requirePermission("users:write");
  email = email.toLowerCase().trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (!emailValid) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const member = await db.leadershipMember.findUnique({ where: { id }, select: { name: true, adminUser: { select: { id: true } } } });
  if (!member) return { error: "Member not found." };
  if (member.adminUser) return { error: "This member already has an admin account." };

  const exists = await db.adminUser.findUnique({ where: { email } });
  if (exists) return { error: "An admin account with that email already exists." };

  const leadershipRole = await db.role.findUnique({ where: { name: "leadership" } });
  if (!leadershipRole) return { error: "Leadership role not found. Run the seed first." };

  const passwordHash = await bcrypt.hash(password, 12);
  await db.adminUser.create({
    data: { name: member.name, email, passwordHash, roleId: leadershipRole.id, leadershipMemberId: id },
  });
  revalidatePath("/admin/leadership");
  return {};
}
