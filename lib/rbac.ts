import { redirect } from "next/navigation";
import { getSession } from "./auth";
import { db } from "./db";
import type { Permission } from "./permissions";

export type ResolvedUser = {
  id: string;
  name: string;
  email: string;
  role: { name: string; label: string; permissions: Record<string, boolean> };
};

export async function getAuthUser(): Promise<ResolvedUser | null> {
  const session = await getSession();
  if (!session.adminId) return null;
  const user = await db.adminUser.findUnique({
    where: { id: session.adminId, active: true },
    select: {
      id: true,
      name: true,
      email: true,
      role: { select: { name: true, label: true, permissions: true } },
    },
  });
  if (!user) return null;
  return {
    ...user,
    role: {
      ...user.role,
      permissions: (user.role.permissions ?? {}) as Record<string, boolean>,
    },
  };
}

export async function requireAuth(): Promise<ResolvedUser> {
  const user = await getAuthUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function requirePermission(permission: Permission): Promise<ResolvedUser> {
  const user = await requireAuth();
  if (can(user, permission)) return user;
  redirect("/admin");
}

export function can(user: ResolvedUser, permission: Permission): boolean {
  if (user.role.name === "super_admin") return true;
  return user.role.permissions[permission] === true;
}
