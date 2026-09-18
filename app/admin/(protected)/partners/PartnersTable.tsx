"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { togglePartnerPublished, deletePartner } from "@/lib/actions/partners";

interface Partner {
  id: string;
  title: string;
  type: string;
  slug: string | null;
  published: boolean;
  logoUrl: string;
}

function PartnerActions({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/partners/${id}`} title="Edit"
        className="transition-colors" style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}>
        <Pencil size={13} />
      </Link>
      <button type="button" disabled={pending}
        onClick={() => startTransition(async () => { await deletePartner(id); router.refresh(); })}
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
    render: (r: Partner) => (
      <span
        className="inline-flex items-center rounded-full px-2 py-0.5 font-technical text-[9px] uppercase tracking-[0.1em]"
        style={r.type === "logo"
          ? { background: "var(--admin-info-bg)", color: "var(--admin-brand)", border: "1px solid var(--admin-border-accent)" }
          : { background: "var(--admin-success-bg)", color: "var(--admin-success)", border: "1px solid var(--admin-success)" }
        }
      >
        {r.type === "logo" ? "Partner" : "Industry"}
      </span>
    ),
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
    key: "visible",
    header: "Visible",
    width: "100px",
    render: (r: Partner) => (
      <PublishToggle id={r.id} published={r.published} onToggle={(_, v) => togglePartnerPublished(r.id, v)} labelOn="Visible" labelOff="Hidden" />
    ),
  },
  {
    key: "actions",
    header: "Actions",
    width: "80px",
    render: (r: Partner) => <PartnerActions id={r.id} />,
  },
];

const filterBtnStyle = (active: boolean) => ({
  background: active ? "var(--admin-brand)" : "var(--admin-surface-2)",
  color: active ? "#fff" : "var(--admin-text-secondary)",
  border: `1px solid ${active ? "var(--admin-brand)" : "var(--admin-border-strong)"}`,
});

export function PartnersTable({ partners }: { partners: Partner[] }) {
  const [filter, setFilter] = useState<"all" | "logo" | "category">("all");
  const filtered = filter === "all" ? partners : partners.filter((p) => p.type === filter);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-4 pt-4">
        {(["all", "logo", "category"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className="rounded-full px-3 py-1 font-technical text-[9px] uppercase tracking-[0.1em] transition-colors"
            style={filterBtnStyle(filter === f)}
          >
            {f === "all" ? "All" : f === "logo" ? "Partners" : "Industries"}
          </button>
        ))}
      </div>
      <AdminTable
        rows={filtered}
        getRowKey={(r) => r.id}
        emptyMessage="No partners yet."
        columns={columns}
      />
    </div>
  );
}
