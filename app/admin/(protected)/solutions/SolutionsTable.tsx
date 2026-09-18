"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { toggleSolutionPublished, deleteSolution } from "@/lib/actions/solutions";

interface Solution {
  id: string;
  title: string;
  summary: string;
  published: boolean;
}

function SolutionActions({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/solutions/${id}`} title="Edit"
        className="transition-colors" style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}>
        <Pencil size={13} />
      </Link>
      <button type="button" disabled={pending}
        onClick={() => startTransition(async () => { await deleteSolution(id); router.refresh(); })}
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
    render: (r: Solution) => (
      <Link
        href={`/admin/solutions/${r.id}`}
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
    key: "summary",
    header: "Summary",
    render: (r: Solution) => (
      <span className="line-clamp-1 text-sm" style={{ color: "var(--admin-text-secondary)" }}>
        {r.summary}
      </span>
    ),
  },
  {
    key: "visible",
    header: "Visible",
    width: "100px",
    render: (r: Solution) => (
      <PublishToggle id={r.id} published={r.published} onToggle={(_, v) => toggleSolutionPublished(r.id, v)} />
    ),
  },
  {
    key: "actions",
    header: "Actions",
    width: "80px",
    render: (r: Solution) => <SolutionActions id={r.id} />,
  },
];

export function SolutionsTable({ solutions }: { solutions: Solution[] }) {
  return (
    <AdminTable
      rows={solutions}
      getRowKey={(r) => r.id}
      emptyMessage="No solutions yet."
      columns={columns}
    />
  );
}
