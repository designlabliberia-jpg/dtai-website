"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { UserActions } from "./UserActions";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: Date;
  role: { name: string; label: string };
};

const columns = [
  {
    key: "name",
    header: "User",
    render: (u: UserRow) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-[13px] font-medium" style={{ color: "var(--admin-text-primary)" }}>
          {u.name}
        </span>
        <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
          {u.email}
        </span>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (u: UserRow) => (
      <span
        className="inline-flex items-center rounded-full px-2 py-0.5 font-technical text-[9px] uppercase tracking-[0.1em]"
        style={{ background: "var(--admin-info-bg)", color: "var(--admin-brand)", border: "1px solid var(--admin-border-accent)" }}
      >
        {u.role.label}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "90px",
    render: (u: UserRow) => <StatusBadge status={u.active ? "active" : "inactive"} />,
  },
  {
    key: "joined",
    header: "Joined",
    width: "110px",
    render: (u: UserRow) => (
      <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
        {u.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    width: "80px",
    render: (u: UserRow) => <UserActions id={u.id} active={u.active} roleName={u.role.name} />,
  },
];

export function UsersTable({ users }: { users: UserRow[] }) {
  return (
    <AdminTable
      rows={users}
      getRowKey={(u) => u.id}
      emptyMessage="No users found."
      columns={columns}
    />
  );
}
