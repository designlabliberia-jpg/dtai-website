"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deletePartner } from "@/lib/actions/partners";

export function PartnerActions({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/partners/${id}`}
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
        onClick={() => startTransition(async () => { await deletePartner(id); router.refresh(); })}
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
