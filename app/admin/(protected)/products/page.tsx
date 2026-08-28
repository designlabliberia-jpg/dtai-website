import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProductsTable } from "./ProductsTable";

export default async function ProductsPage() {
  const products = await db.product.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    select: { id: true, name: true, tagline: true, status: true, published: true, imageUrl: true },
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
        <ProductsTable products={products} />
      </Panel>
    </div>
  );
}
