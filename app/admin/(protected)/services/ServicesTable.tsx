"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { toggleServicePublished, deleteService } from "@/lib/actions/services";

interface Service {
  id: string;
  profileEyebrow: string;
  published: boolean;
  _count: { solutions: number };
}

function ServiceActions({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/services/${id}`} title="Edit"
        className="transition-colors" style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}>
        <Pencil size={13} />
      </Link>
      <button type="button" disabled={pending}
        onClick={() => startTransition(async () => { await deleteService(id); router.refresh(); })}
        title="Archive" className="transition-colors disabled:opacity-40"
        style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-danger)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}>
        <Trash2 size={13} />
      </button>
    </div>
  );
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
    key: "solutions",
    header: "Solutions",
    width: "90px",
    render: (r: Service) => (
      <span className="font-technical text-[11px] tabular-nums" style={{ color: "var(--admin-text-muted)" }}>
        {r._count.solutions}
      </span>
    ),
  },
  {
    key: "visible",
    header: "Visible",
    width: "100px",
    render: (r: Service) => (
      <PublishToggle id={r.id} published={r.published} onToggle={(_, v) => toggleServicePublished(r.id, v)} />
    ),
  },
  {
    key: "actions",
    header: "Actions",
    width: "80px",
    render: (r: Service) => <ServiceActions id={r.id} />,
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
