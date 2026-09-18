"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { ApprovalToast } from "@/components/admin/ApprovalToast";
import { toggleJobActive, deleteJob } from "@/lib/actions/jobs";

export function JobActions({
  id,
  active,
  title,
  approvalStatus,
}: {
  id: string;
  active: boolean;
  title: string;
  approvalStatus: "pending" | "rejected" | null;
}) {
  const [pending, startTransition] = useTransition();
  const [toast, setToast] = useState(false);
  const router = useRouter();

  return (
    <>
      <ApprovalToast title={title} visible={toast} onDismiss={() => setToast(false)} />
      <div className="flex items-center gap-2">
        <PublishToggle
          id={id}
          published={active}
          onToggle={(_, v) => toggleJobActive(id, v)}
          labelOn="Active"
          labelOff="Inactive"
          approvalStatus={approvalStatus}
          onPendingApproval={() => setToast(true)}
          itemName={title}
        />
        <Link
          href={`/admin/jobs/${id}`}
          title="Edit"
          className="transition-colors"
          style={{ color: "var(--admin-text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
        >
          <Pencil size={13} />
        </Link>
        <button
          type="button"
          disabled={pending}
          onClick={() => startTransition(async () => { await deleteJob(id); router.refresh(); })}
          title="Archive"
          className="transition-colors disabled:opacity-40"
          style={{ color: "var(--admin-text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-danger)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </>
  );
}
