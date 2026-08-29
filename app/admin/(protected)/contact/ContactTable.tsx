"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ContactActions } from "./ContactActions";

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  status: string;
  createdAt: Date;
}

const columns = [
  {
    key: "name",
    header: "Name",
    render: (r: Submission) => (
      <span className="font-medium" style={{ color: "var(--admin-text-primary)" }}>
        {r.name}
      </span>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (r: Submission) => (
      <span style={{ color: "var(--admin-text-muted)" }}>{r.email}</span>
    ),
  },
  {
    key: "subject",
    header: "Subject",
    render: (r: Submission) => r.subject,
  },
  {
    key: "status",
    header: "Status",
    width: "120px",
    render: (r: Submission) => <StatusBadge status={r.status as never} />,
  },
  {
    key: "date",
    header: "Received",
    width: "140px",
    render: (r: Submission) =>
      new Date(r.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    key: "actions",
    header: "Actions",
    width: "80px",
    render: (r: Submission) => <ContactActions id={r.id} status={r.status} />,
  },
];

export function ContactTable({ submissions }: { submissions: Submission[] }) {
  return (
    <AdminTable
      rows={submissions}
      getRowKey={(r) => r.id}
      emptyMessage="No contact submissions yet."
      columns={columns}
    />
  );
}
