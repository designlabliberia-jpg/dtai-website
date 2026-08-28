"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ApplicationActions } from "./ApplicationActions";

interface Application {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: Date;
  jobListing: { title: string };
}

const columns = [
  {
    key: "name",
    header: "Applicant",
    render: (r: Application) => (
      <span className="font-medium" style={{ color: "var(--admin-text-primary)" }}>
        {r.fullName}
      </span>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (r: Application) => (
      <span style={{ color: "var(--admin-text-muted)" }}>{r.email}</span>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (r: Application) => r.jobListing.title,
  },
  {
    key: "status",
    header: "Status",
    width: "140px",
    render: (r: Application) => <StatusBadge status={r.status as never} />,
  },
  {
    key: "date",
    header: "Applied",
    width: "140px",
    render: (r: Application) =>
      new Date(r.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    key: "actions",
    header: "",
    width: "80px",
    render: (r: Application) => <ApplicationActions id={r.id} status={r.status} />,
  },
];

export function ApplicationsTable({ applications }: { applications: Application[] }) {
  return (
    <AdminTable
      rows={applications}
      getRowKey={(r) => r.id}
      emptyMessage="No applications yet."
      columns={columns}
    />
  );
}
