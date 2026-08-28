"use client";

import Image from "next/image";
import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";
import { LeadershipActions } from "./LeadershipActions";

type Member = {
  id: string;
  name: string;
  title: string;
  division: string;
  order: number;
  imageUrl: string | null;
};

export function LeadershipTable({ members }: { members: Member[] }) {
  return (
    <AdminTable
      rows={members}
      getRowKey={(r) => r.id}
      emptyMessage="No leadership members yet."
      columns={[
        {
          key: "name",
          header: "Name",
          render: (r) => (
            <Link
              href={`/admin/leadership/${r.id}`}
              className="flex items-center gap-3 font-medium transition-colors"
              style={{ color: "var(--admin-text-primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                {r.imageUrl ? (
                  <Image src={r.imageUrl} alt={r.name} fill className="object-cover" sizes="32px" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-technical text-[10px] uppercase" style={{ color: "var(--admin-text-muted)" }}>
                    {r.name[0]}
                  </span>
                )}
              </div>
              {r.name}
            </Link>
          ),
        },
        {
          key: "title",
          header: "Title",
          render: (r) => <span style={{ color: "var(--admin-text-secondary)" }}>{r.title}</span>,
        },
        {
          key: "division",
          header: "Division",
          width: "130px",
          render: (r) => (
            <span className="font-technical text-[10px] uppercase tracking-[0.08em]" style={{ color: "var(--admin-text-muted)" }}>
              {r.division}
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
          render: (r) => <LeadershipActions id={r.id} />,
        },
      ]}
    />
  );
}
