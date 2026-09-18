"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { toggleProductPublished, deleteProduct } from "@/lib/actions/products";

interface Product {
  id: string;
  name: string;
  tagline: string;
  status: string;
  published: boolean;
  profilePrimaryImageUrl: string;
}

function ProductActions({ id }: Readonly<{ id: string }>) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/products/${id}`} title="Edit"
        className="transition-colors" style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}>
        <Pencil size={13} />
      </Link>
      <button type="button" disabled={pending}
        onClick={() => startTransition(async () => { await deleteProduct(id); router.refresh(); })}
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
    key: "visible",
    header: "Visible",
    width: "100px",
    render: (r: Product) => (
      <PublishToggle id={r.id} published={r.published} onToggle={(_, v) => toggleProductPublished(r.id, v)} />
    ),
  },
  {
    key: "actions",
    header: "Actions",
    width: "80px",
    render: (r: Product) => <ProductActions id={r.id} />,
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
