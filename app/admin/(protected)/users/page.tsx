import Link from "next/link";
import { Plus } from "lucide-react";
import { requirePermission } from "@/lib/rbac";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { UsersTable } from "./UsersTable";

export default async function UsersPage() {
  await requirePermission("users:read");

  const users = await db.adminUser.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true, name: true, email: true, active: true, roleId: true, createdAt: true,
      role: { select: { name: true, label: true } },
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Users"
        description="Manage admin users and their role assignments."
        action={
          <Link
            href="/admin/users/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            <Plus size={13} /> New User
          </Link>
        }
      />
      <Panel accent padding="none">
        <UsersTable users={users} />
      </Panel>
    </div>
  );
}
