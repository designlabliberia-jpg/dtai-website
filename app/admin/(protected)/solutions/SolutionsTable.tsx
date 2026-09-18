"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { ApprovalToast } from "@/components/admin/ApprovalToast";
import { toggleSolutionPublished, deleteSolution } from "@/lib/actions/solutions";

interface Solution {
  id: string;
  title: string;
  summary: string;
  published: boolean;
  approvalStatus: "pending" | "rejected" | null;
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

export function SolutionsTable({ solutions }: { solutions: Solution[] }) {
  const [toast, setToast] = useState<string | null>(null);

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
        <PublishToggle
          id={r.id}
          published={r.published}
          onToggle={(_, v) => toggleSolutionPublished(r.id, v)}
          approvalStatus={r.approvalStatus}
          onPendingApproval={(name) => setToast(name ?? r.title)}
          itemName={r.title}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "80px",
      render: (r: Solution) => <SolutionActions id={r.id} />,
    },
  ];

  return (
    <>
      <ApprovalToast title={toast ?? ""} visible={!!toast} onDismiss={() => setToast(null)} />
      <AdminTable rows={solutions} getRowKey={(r) => r.id} emptyMessage="No solutions yet." columns={columns} />
    </>
  );
}
