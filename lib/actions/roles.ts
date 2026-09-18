"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/rbac";
import { roleSchema } from "@/lib/validations/role.schema";

export type RoleActionState =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function createRole(
  _prev: RoleActionState | null,
  formData: FormData
): Promise<RoleActionState> {
  await requirePermission("roles:write");

  const rawPermissions: Record<string, boolean> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("perm:")) {
      rawPermissions[key.slice(5)] = value === "true";
    }
  }

  const parsed = roleSchema.safeParse({
    name: formData.get("name"),
    label: formData.get("label"),
    permissions: rawPermissions,
  });

  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const exists = await db.role.findUnique({ where: { name: parsed.data.name } });
  if (exists) return { success: false, error: "A role with this name already exists." };

  await db.role.create({ data: parsed.data });
  revalidatePath("/admin/roles");
  return { success: true };
}

export async function updateRole(
  id: string,
  _prev: RoleActionState | null,
  formData: FormData
): Promise<RoleActionState> {
  await requirePermission("roles:write");

  const role = await db.role.findUnique({ where: { id } });
  if (!role) return { success: false, error: "Role not found." };

  const rawPermissions: Record<string, boolean> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("perm:")) {
      rawPermissions[key.slice(5)] = value === "true";
    }
  }

  const parsed = roleSchema.safeParse({
    name: role.isSystem ? role.name : formData.get("name"),
    label: formData.get("label"),
    permissions: rawPermissions,
  });

  if (!parsed.success) {
    return { success: false, error: "Please fix the errors below.", fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  await db.role.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/roles");
  return { success: true };
}

export async function deleteRole(id: string): Promise<{ error?: string }> {
  await requirePermission("roles:write");

  const role = await db.role.findUnique({ where: { id }, include: { _count: { select: { users: true } } } });
  if (!role) return { error: "Role not found." };
  if (role.isSystem) return { error: "System roles cannot be deleted." };
  if (role._count.users > 0) return { error: "Reassign all users before deleting this role." };

  await db.role.delete({ where: { id } });
  revalidatePath("/admin/roles");
  return {};
}
