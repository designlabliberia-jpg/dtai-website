import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ContentActions } from "@/components/admin/ContentActions";
import { toggleProductPublished, deleteProduct } from "@/lib/actions/products";

export default async function ProductsPage() {
  const products = await db.product.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Products"
        description="Manage published product listings."
        action={
          <Link href="/admin/products/new"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ background: "var(--admin-brand)", color: "#fff" }}>
            <Plus size={13} />New Product
          </Link>
        }
      />
      <Panel accent padding="none">
        <AdminTable
          rows={products}
          getRowKey={(r) => r.id}
          emptyMessage="No products yet."
          columns={[
            {
              key: "name",
              header: "Name",
              render: (r) => (
                <Link href={`/admin/products/${r.id}`}
                  className="font-medium transition-colors"
                  style={{ color: "var(--admin-text-primary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}>
                  {r.name}
                </Link>
              ),
            },
            { key: "tagline", header: "Tagline", render: (r) => <span style={{ color: "var(--admin-text-secondary)" }}>{r.tagline}</span> },
            { key: "status", header: "Status", width: "130px", render: (r) => <StatusBadge status={r.status as "In Development"} /> },
            {
              key: "published",
              header: "Published",
              width: "100px",
              render: (r) => <StatusBadge status={r.published ? "Live" : "inactive"} />,
            },
            {
              key: "actions",
              header: "",
              width: "100px",
              render: (r) => (
                <ContentActions
                  id={r.id}
                  editHref={`/admin/products/${r.id}`}
                  published={r.published}
                  onToggle={toggleProductPublished}
                  onDelete={deleteProduct}
                />
              ),
            },
          ]}
        />
      </Panel>
    </div>
  );
}
