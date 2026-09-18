"use client";

import { ShieldCheck } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";
import { RoleActions } from "./RoleActions";

export type RoleRow = {
  id: string;
  name: string;
  label: string;
  isSystem: boolean;
  _count: { users: number };
};

const columns = [
  {
    key: "label",
    header: "Role",
    render: (r: RoleRow) => (
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-medium" style={{ color: "var(--admin-text-primary)" }}>
          {r.label}
        </span>
        {r.isSystem && (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-technical text-[9px] uppercase tracking-widest"
            style={{ background: "var(--admin-info-bg)", color: "var(--admin-brand)", border: "1px solid var(--admin-border-accent)" }}
          >
            <ShieldCheck size={9} /> System
          </span>
        )}
      </div>
    ),
  },
  {
    key: "name",
    header: "Identifier",
    render: (r: RoleRow) => (
      <code className="font-technical text-[11px]" style={{ color: "var(--admin-text-muted)" }}>
        {r.name}
      </code>
    ),
  },
  {
    key: "users",
    header: "Users",
    width: "80px",
    render: (r: RoleRow) => (
      <span className="font-technical text-[11px]" style={{ color: "var(--admin-text-secondary)" }}>
        {r._count.users}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    width: "80px",
    render: (r: RoleRow) => <RoleActions id={r.id} isSystem={r.isSystem} />,
  },
];

export function RolesTable({ roles }: { roles: RoleRow[] }) {
  return (
    <AdminTable
      rows={roles}
      getRowKey={(r) => r.id}
      emptyMessage="No roles found."
      columns={columns}
    />
  );
}
