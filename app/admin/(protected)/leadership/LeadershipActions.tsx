"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteLeadershipMember } from "@/lib/actions/leadership";

export function LeadershipActions({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/leadership/${id}`}
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
        onClick={() => startTransition(async () => { await deleteLeadershipMember(id); router.refresh(); })}
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
