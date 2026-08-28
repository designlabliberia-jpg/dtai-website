"use client";

import Image from "next/image";
import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { PartnerActions } from "./PartnerActions";

interface Partner {
  id: string;
  title: string;
  type: string;
  slug: string | null;
  order: number;
  logoUrl: string;
}

const columns = [
  {
    key: "title",
    header: "Title",
    render: (r: Partner) => (
      <Link
        href={`/admin/partners/${r.id}`}
        className="flex items-center gap-3 font-medium transition-colors"
        style={{ color: "var(--admin-text-primary)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}
      >
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded bg-neutral-100">
          <Image src={r.logoUrl} alt={r.title} fill className="object-contain p-0.5" sizes="32px" />
        </div>
        {r.title}
      </Link>
    ),
  },
  {
    key: "type",
    header: "Type",
    width: "110px",
    render: (r: Partner) => <StatusBadge status={r.type === "logo" ? "active" : "new"} />,
  },
  {
    key: "slug",
    header: "Slug",
    width: "140px",
    render: (r: Partner) => (
      <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
        {r.slug ?? "—"}
      </span>
    ),
  },
  {
    key: "order",
    header: "Order",
    width: "70px",
    render: (r: Partner) => (
      <span className="font-technical text-[11px] tabular-nums" style={{ color: "var(--admin-text-muted)" }}>
        {r.order}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    width: "80px",
    render: (r: Partner) => <PartnerActions id={r.id} />,
  },
];

export function PartnersTable({ partners }: { partners: Partner[] }) {
  return (
    <AdminTable
      rows={partners}
      getRowKey={(r) => r.id}
      emptyMessage="No partners yet."
      columns={columns}
    />
  );
}
