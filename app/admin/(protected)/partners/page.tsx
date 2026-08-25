import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { PartnerActions } from "./PartnerActions";

export default async function PartnersPage() {
  const partners = await db.partner.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }],
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Partners"
        description="Manage partner logos and category partner profiles."
        action={
          <Link
            href="/admin/partners/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            <Plus size={13} />
            New Partner
          </Link>
        }
      />
      <Panel accent padding="none">
        <AdminTable
          rows={partners}
          getRowKey={(r) => r.id}
          emptyMessage="No partners yet."
          columns={[
            {
              key: "title",
              header: "Title",
              render: (r) => (
                <Link
                  href={`/admin/partners/${r.id}`}
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
              key: "type",
              header: "Type",
              width: "110px",
              render: (r) => <StatusBadge status={r.type === "logo" ? "active" : "new"} />,
            },
            {
              key: "slug",
              header: "Slug",
              width: "140px",
              render: (r) => (
                <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
                  {r.slug ?? "—"}
                </span>
              ),
            },
            {
              key: "order",
              header: "Order",
              width: "70px",
              render: (r) => (
                <span className="font-technical text-[11px] tabular-nums" style={{ color: "var(--admin-text-muted)" }}>
                  {r.order}
                </span>
              ),
            },
            {
              key: "actions",
              header: "",
              width: "80px",
              render: (r) => <PartnerActions id={r.id} />,
            },
          ]}
        />
      </Panel>
    </div>
  );
}
