"use client";

import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ContentActions } from "@/components/admin/ContentActions";
import { toggleServicePublished, deleteService } from "@/lib/actions/services";

interface Service {
  id: string;
  profileEyebrow: string;
  icon: string;
  published: boolean;
  _count: { methodology: number };
}

const columns = [
  {
    key: "title",
    header: "Title",
    render: (r: Service) => (
      <Link
        href={`/admin/services/${r.id}`}
        className="font-medium transition-colors"
        style={{ color: "var(--admin-text-primary)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}
      >
        {r.profileEyebrow}
      </Link>
    ),
  },
  {
    key: "icon",
    header: "Icon",
    width: "80px",
    render: (r: Service) => (
      <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
        {r.icon}
      </span>
    ),
  },
  {
    key: "steps",
    header: "Steps",
    width: "70px",
    render: (r: Service) => (
      <span className="font-technical text-[11px] tabular-nums" style={{ color: "var(--admin-text-muted)" }}>
        {r._count.methodology}
      </span>
    ),
  },
  {
    key: "published",
    header: "Published",
    width: "100px",
    render: (r: Service) => <StatusBadge status={r.published ? "Live" : "inactive"} />,
  },
  {
    key: "actions",
    header: "",
    width: "100px",
    render: (r: Service) => (
      <ContentActions
        id={r.id}
        editHref={`/admin/services/${r.id}`}
        published={r.published}
        onToggle={toggleServicePublished}
        onDelete={deleteService}
      />
    ),
  },
];

export function ServicesTable({ services }: { services: Service[] }) {
  return (
    <AdminTable
      rows={services}
      getRowKey={(r) => r.id}
      emptyMessage="No services yet."
      columns={columns}
    />
  );
}
