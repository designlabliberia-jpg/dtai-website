import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { PipelineActions } from "./PipelineActions";

export default async function PipelinePage() {
  const clients = await db.client.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { notes: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Client Pipeline"
        description="Track prospects from lead to close."
        action={
          <Link
            href="/admin/pipeline/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em] transition-colors"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            <Plus size={13} />
            New Client
          </Link>
        }
      />

      <Panel accent padding="none">
        <AdminTable
          rows={clients}
          getRowKey={(r) => r.id}
          emptyMessage="No pipeline clients yet."
          columns={[
            {
              key: "company",
              header: "Company",
              render: (r) => (
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
              render: (r) => (
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
              render: (r) => <StatusBadge status={r.status as "lead"} />,
            },
            {
              key: "value",
              header: "Est. Value",
              width: "120px",
              render: (r) =>
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
              render: (r) => (
                <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
                  {r._count.notes}
                </span>
              ),
            },
            {
              key: "created",
              header: "Added",
              width: "110px",
              render: (r) => (
                <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
                  {r.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              ),
            },
            {
              key: "actions",
              header: "",
              width: "60px",
              render: (r) => <PipelineActions id={r.id} />,
            },
          ]}
        />
      </Panel>
    </div>
  );
}
