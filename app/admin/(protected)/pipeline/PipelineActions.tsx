"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteClient } from "@/lib/actions/clients";

export function PipelineActions({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      await deleteClient(id);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/pipeline/${id}`}
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
        onClick={handleDelete}
        disabled={pending}
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
