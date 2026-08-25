"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { toggleJobActive, deleteJob } from "@/lib/actions/jobs";

export function JobActions({ id, active }: { id: string; active: boolean }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <PublishToggle
        id={id}
        published={active}
        onToggle={(_, v) => toggleJobActive(id, v)}
        labelOn="Active"
        labelOff="Inactive"
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
  );
}
