"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { reviewApproval } from "@/lib/actions/approvals";

type ApprovalRow = {
  id: string;
  entityType: string;
  entityId: string;
  entityTitle: string;
  status: "pending" | "approved" | "rejected";
  requestedById: string;
  note: string | null;
  createdAt: Date;
  requester?: { name: string };
};

const ENTITY_LABEL: Record<string, string> = {
  product: "Product", service: "Service", solution: "Solution", article: "Article",
};

export function ApprovalsTable({ approvals }: { approvals: ApprovalRow[] }) {
  return (
    <AdminTable
      rows={approvals}
      getRowKey={(a) => a.id}
      emptyMessage="No pending approvals."
      columns={[
        {
          key: "entity",
          header: "Content",
          render: (a) => (
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-medium" style={{ color: "var(--admin-text-primary)" }}>{a.entityTitle || a.entityId}</span>
              <span
                className="inline-flex w-fit items-center rounded-full px-2 py-0.5 font-technical text-[9px] uppercase tracking-widest"
                style={{ background: "var(--admin-surface-2)", color: "var(--admin-text-muted)", border: "1px solid var(--admin-border)" }}
              >
                {ENTITY_LABEL[a.entityType] ?? a.entityType}
              </span>
            </div>
          ),
        },
        {
          key: "requestedBy",
          header: "Requested By",
          render: (a) => (
            <span className="font-technical text-[11px]" style={{ color: "var(--admin-text-secondary)" }}>
              {a.requester?.name ?? a.requestedById}
            </span>
          ),
        },
        {
          key: "status",
          header: "Status",
          width: "100px",
          render: (a) => <StatusBadge status={a.status === "pending" ? "reviewing" : a.status === "approved" ? "responded" : "rejected"} />,
        },
        {
          key: "date",
          header: "Submitted",
          width: "110px",
          render: (a) => (
            <span className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>
              {a.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          ),
        },
        {
          key: "actions",
          header: "",
          width: "120px",
          render: (a) => a.status === "pending" ? <ReviewActions approval={a} /> : null,
        },
      ]}
    />
  );
}

function ReviewActions({ approval }: { approval: ApprovalRow }) {
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState("");
  const router = useRouter();

  function handle(status: "approved" | "rejected") {
    startTransition(async () => {
      const res = await reviewApproval(approval.id, status, note || undefined);
      if (!res.success) alert(res.error);
      else router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-1.5">
      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full rounded px-2 py-1 text-[11px]"
        style={{
          background: "var(--admin-surface-2)",
          border: "1px solid var(--admin-border)",
          color: "var(--admin-text-primary)",
          outline: "none",
        }}
      />
      <div className="flex gap-1.5">
        <button
          type="button"
          disabled={pending}
          onClick={() => handle("approved")}
          title="Approve"
          className="flex items-center gap-1 rounded px-2 py-1 font-technical text-[9px] uppercase tracking-wide transition-colors disabled:opacity-40"
          style={{ background: "var(--admin-success-bg)", color: "var(--admin-success)", border: "1px solid var(--admin-success)" }}
        >
          <CheckCircle size={11} /> Approve
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => handle("rejected")}
          title="Reject"
          className="flex items-center gap-1 rounded px-2 py-1 font-technical text-[9px] uppercase tracking-wide transition-colors disabled:opacity-40"
          style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid var(--admin-danger)" }}
        >
          <XCircle size={11} /> Reject
        </button>
      </div>
    </div>
  );
}
