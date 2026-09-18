import Link from "next/link";
import { Plus } from "lucide-react";
import { requirePermission } from "@/lib/rbac";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { RolesTable } from "./RolesTable";

export default async function RolesPage() {
  await requirePermission("roles:read");

  const roles = await db.role.findMany({
    orderBy: [{ isSystem: "desc" }, { createdAt: "asc" }],
    include: { _count: { select: { users: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Roles"
        description="Define roles and assign granular permissions to each."
        action={
          <Link
            href="/admin/roles/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            <Plus size={13} /> New Role
          </Link>
        }
      />
      <Panel accent padding="none">
        <RolesTable roles={roles} />
      </Panel>
    </div>
  );
}
