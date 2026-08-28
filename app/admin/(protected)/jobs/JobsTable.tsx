"use client";

import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { JobActions } from "./JobActions";

interface Job {
  id: string;
  title: string;
  type: string;
  category: string;
  location: string;
  active: boolean;
  _count: { applications: number };
}

const columns = [
  {
    key: "title",
    header: "Title",
    render: (r: Job) => (
      <Link
        href={`/admin/jobs/${r.id}`}
        className="font-medium transition-colors"
        style={{ color: "var(--admin-text-primary)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}
      >
        {r.title}
      </Link>
    ),
  },
  {
    key: "meta",
    header: "Type / Category",
    render: (r: Job) => (
      <div className="flex flex-col gap-0.5">
        <span style={{ color: "var(--admin-text-primary)" }}>{r.type}</span>
        <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
          {r.category}
        </span>
      </div>
    ),
  },
  {
    key: "location",
    header: "Location",
    render: (r: Job) => <span style={{ color: "var(--admin-text-secondary)" }}>{r.location}</span>,
  },
  {
    key: "apps",
    header: "Applications",
    width: "110px",
    render: (r: Job) => (
      <span className="font-technical text-[11px] tabular-nums" style={{ color: "var(--admin-text-primary)" }}>
        {r._count.applications}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "100px",
    render: (r: Job) => <StatusBadge status={r.active ? "active" : "inactive"} />,
  },
  {
    key: "actions",
    header: "",
    width: "80px",
    render: (r: Job) => <JobActions id={r.id} active={r.active} />,
  },
];

export function JobsTable({ jobs }: { jobs: Job[] }) {
  return (
    <AdminTable
      rows={jobs}
      getRowKey={(r) => r.id}
      emptyMessage="No job listings yet."
      columns={columns}
    />
  );
}
