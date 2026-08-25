"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { PublishToggle } from "./PublishToggle";

interface ContentActionsProps {
  id: string;
  editHref: string;
  published: boolean;
  onToggle: (id: string, value: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ContentActions({ id, editHref, published, onToggle, onDelete }: ContentActionsProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <PublishToggle id={id} published={published} onToggle={(_, v) => onToggle(id, v)} />
      <Link href={editHref} title="Edit"
        className="transition-colors"
        style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}>
        <Pencil size={13} />
      </Link>
      <button type="button" disabled={pending}
        onClick={() => startTransition(async () => { await onDelete(id); router.refresh(); })}
        title="Archive"
        className="transition-colors disabled:opacity-40"
        style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-danger)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}>
        <Trash2 size={13} />
      </button>
    </div>
  );
}
