import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { ContentActions } from "@/components/admin/ContentActions";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { toggleServicePublished, deleteService } from "@/lib/actions/services";

export default async function ServicesPage() {
  const services = await db.service.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { methodology: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Services"
        description="Manage service offerings and methodology steps."
        action={
          <Link href="/admin/services/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ background: "var(--admin-brand)", color: "#fff" }}>
            <Plus size={13} />New Service
          </Link>
        }
      />
      <Panel accent padding="none">
        <AdminTable
          rows={services}
          getRowKey={(r) => r.id}
          emptyMessage="No services yet."
          columns={[
            {
              key: "title",
              header: "Title",
              render: (r) => (
                <Link href={`/admin/services/${r.id}`}
                  className="font-medium transition-colors"
                  style={{ color: "var(--admin-text-primary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}>
                  {r.title}
                </Link>
              ),
            },
            { key: "icon", header: "Icon", width: "80px", render: (r) => <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>{r.icon}</span> },
            { key: "steps", header: "Steps", width: "70px", render: (r) => <span className="font-technical text-[11px] tabular-nums" style={{ color: "var(--admin-text-muted)" }}>{r._count.methodology}</span> },
            { key: "published", header: "Published", width: "100px", render: (r) => <StatusBadge status={r.published ? "Live" : "inactive"} /> },
            {
              key: "actions", header: "", width: "100px",
              render: (r) => (
                <ContentActions id={r.id} editHref={`/admin/services/${r.id}`}
                  published={r.published} onToggle={toggleServicePublished} onDelete={deleteService} />
              ),
            },
          ]}
        />
      </Panel>
    </div>
  );
}
