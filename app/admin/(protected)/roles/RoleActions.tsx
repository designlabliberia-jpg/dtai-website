"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteRole } from "@/lib/actions/roles";

interface RoleActionsProps {
  id: string;
  isSystem: boolean;
}

export function RoleActions({ id, isSystem }: RoleActionsProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/roles/${id}`}
        title="Edit"
        className="transition-colors"
        style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
      >
        <Pencil size={13} />
      </Link>
      {!isSystem && (
        <button
          type="button"
          disabled={pending}
          title="Delete"
          onClick={() =>
            startTransition(async () => {
              const res = await deleteRole(id);
              if (res.error) alert(res.error);
              else router.refresh();
            })
          }
          className="transition-colors disabled:opacity-40"
          style={{ color: "var(--admin-text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-danger)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
}
