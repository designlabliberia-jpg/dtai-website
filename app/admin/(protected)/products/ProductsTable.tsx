"use client";

import Image from "next/image";
import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ContentActions } from "@/components/admin/ContentActions";
import { toggleProductPublished, deleteProduct } from "@/lib/actions/products";

interface Product {
  id: string;
  name: string;
  tagline: string;
  status: string;
  published: boolean;
  profilePrimaryImageUrl: string;
}

const columns = [
  {
    key: "name",
    header: "Name",
    render: (r: Product) => (
      <Link
        href={`/admin/products/${r.id}`}
        className="flex items-center gap-3 font-medium transition-colors"
        style={{ color: "var(--admin-text-primary)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}
      >
        <div className="relative h-8 w-12 shrink-0 overflow-hidden rounded bg-neutral-100">
          <Image src={r.profilePrimaryImageUrl} alt={r.name} fill className="object-cover" sizes="48px" />
        </div>
        {r.name}
      </Link>
    ),
  },
  {
    key: "tagline",
    header: "Tagline",
    render: (r: Product) => (
      <span style={{ color: "var(--admin-text-secondary)" }}>{r.tagline}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "130px",
    render: (r: Product) => (
      <StatusBadge status={r.published ? "Live" : (r.status as "In Development")} />
    ),
  },
  {
    key: "actions",
    header: "",
    width: "100px",
    render: (r: Product) => (
      <ContentActions
        id={r.id}
        editHref={`/admin/products/${r.id}`}
        published={r.published}
        onToggle={toggleProductPublished}
        onDelete={deleteProduct}
      />
    ),
  },
];

export function ProductsTable({ products }: { products: Product[] }) {
  return (
    <AdminTable
      rows={products}
      getRowKey={(r) => r.id}
      emptyMessage="No products yet."
      columns={columns}
    />
  );
}
