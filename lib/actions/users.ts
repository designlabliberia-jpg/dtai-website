"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/rbac";
import { getSession } from "@/lib/auth";
import { createUserSchema, updateUserSchema } from "@/lib/validations/user.schema";

export type UserActionState =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function createUser(
  _prev: UserActionState | null,
  formData: FormData
): Promise<UserActionState> {
  await requirePermission("users:write");

  const parsed = createUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    roleId: formData.get("roleId"),
  });

  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const exists = await db.adminUser.findUnique({ where: { email: parsed.data.email } });
  if (exists) return { success: false, error: "A user with this email already exists." };

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await db.adminUser.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      roleId: parsed.data.roleId,
    },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function updateUser(
  id: string,
  _prev: UserActionState | null,
  formData: FormData
): Promise<UserActionState> {
  await requirePermission("users:write");
  const session = await getSession();

  const parsed = updateUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    roleId: formData.get("roleId"),
    password: formData.get("password") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const emailConflict = await db.adminUser.findFirst({
    where: { email: parsed.data.email, NOT: { id } },
  });
  if (emailConflict) return { success: false, error: "Email is already in use." };

  const data: Record<string, unknown> = {
    name: parsed.data.name,
    email: parsed.data.email,
    ...(session.adminId !== id && { roleId: parsed.data.roleId }),
  };
  if (parsed.data.password) {
    data.passwordHash = await bcrypt.hash(parsed.data.password, 12);
  }

  await db.adminUser.update({ where: { id }, data });
  revalidatePath("/admin/users");
  return { success: true };
}

export async function deactivateUser(id: string): Promise<{ error?: string }> {
  await requirePermission("users:delete");

  const user = await db.adminUser.findUnique({
    where: { id },
    include: { role: { select: { name: true } } },
  });
  if (!user) return { error: "User not found." };
  if (user.role.name === "super_admin") return { error: "Cannot deactivate a super admin." };

  await db.adminUser.update({ where: { id }, data: { active: false } });
  revalidatePath("/admin/users");
  return {};
}

export async function reactivateUser(id: string): Promise<void> {
  await requirePermission("users:write");
  await db.adminUser.update({ where: { id }, data: { active: true } });
  revalidatePath("/admin/users");
}
