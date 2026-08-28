"use client";

import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { PipelineActions } from "./PipelineActions";

interface Client {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  status: string;
  estimatedValue: number | null;
  createdAt: Date;
  _count: { notes: number };
}

const columns = [
  {
    key: "company",
    header: "Company",
    render: (r: Client) => (
      <Link
        href={`/admin/pipeline/${r.id}`}
        className="font-medium transition-colors"
        style={{ color: "var(--admin-text-primary)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}
      >
        {r.companyName}
      </Link>
    ),
  },
  {
    key: "contact",
    header: "Contact",
    render: (r: Client) => (
      <div className="flex flex-col gap-0.5">
        <span style={{ color: "var(--admin-text-primary)" }}>{r.contactName}</span>
        <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
          {r.contactEmail}
        </span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "140px",
    render: (r: Client) => <StatusBadge status={r.status as "lead"} />,
  },
  {
    key: "value",
    header: "Est. Value",
    width: "120px",
    render: (r: Client) =>
      r.estimatedValue != null ? (
        <span className="font-technical text-[11px] tabular-nums" style={{ color: "var(--admin-text-primary)" }}>
          ${r.estimatedValue.toLocaleString()}
        </span>
      ) : (
        <span style={{ color: "var(--admin-text-muted)" }}>—</span>
      ),
  },
  {
    key: "notes",
    header: "Notes",
    width: "80px",
    render: (r: Client) => (
      <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
        {r._count.notes}
      </span>
    ),
  },
  {
    key: "created",
    header: "Added",
    width: "110px",
    render: (r: Client) => (
      <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
        {r.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    width: "60px",
    render: (r: Client) => <PipelineActions id={r.id} />,
  },
];

export function PipelineTable({ clients }: { clients: Client[] }) {
  return (
    <AdminTable
      rows={clients}
      getRowKey={(r) => r.id}
      emptyMessage="No pipeline clients yet."
      columns={columns}
    />
  );
}
