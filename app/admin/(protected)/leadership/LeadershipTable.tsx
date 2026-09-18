"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { toggleLeadershipPublished, deleteLeadershipMember } from "@/lib/actions/leadership";

type Member = {
  id: string;
  name: string;
  title: string;
  division: string;
  published: boolean;
  imageUrl: string | null;
};

function MemberActions({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/leadership/${id}`} title="Edit"
        className="transition-colors" style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}>
        <Pencil size={13} />
      </Link>
      <button type="button" disabled={pending}
        onClick={() => startTransition(async () => { await deleteLeadershipMember(id); router.refresh(); })}
        title="Archive" className="transition-colors disabled:opacity-40"
        style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-danger)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}>
        <Trash2 size={13} />
      </button>
    </div>
  );
}

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
          key: "visible",
          header: "Visible",
          width: "100px",
          render: (r) => (
            <PublishToggle id={r.id} published={r.published} onToggle={(_, v) => toggleLeadershipPublished(r.id, v)} labelOn="Visible" labelOff="Hidden" />
          ),
        },
        {
          key: "actions",
          header: "Actions",
          width: "80px",
          render: (r) => <MemberActions id={r.id} />,
        },
      ]}
    />
  );
}
