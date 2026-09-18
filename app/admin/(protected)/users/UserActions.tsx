"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, UserX, UserCheck } from "lucide-react";
import { deactivateUser, reactivateUser } from "@/lib/actions/users";

interface UserActionsProps {
  id: string;
  active: boolean;
  roleName: string;
}

export function UserActions({ id, active, roleName }: UserActionsProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/users/${id}`}
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
        disabled={pending || roleName === "super_admin"}
        title={active ? "Deactivate" : "Reactivate"}
        onClick={() =>
          startTransition(async () => {
            if (active) {
              const res = await deactivateUser(id);
              if (res.error) alert(res.error);
            } else {
              await reactivateUser(id);
            }
            router.refresh();
          })
        }
        className="transition-colors disabled:opacity-40"
        style={{ color: "var(--admin-text-muted)" }}
        onMouseEnter={(e) => {
          if (roleName !== "super_admin")
            e.currentTarget.style.color = active ? "var(--admin-danger)" : "var(--admin-success)";
        }}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
      >
        {active ? <UserX size={13} /> : <UserCheck size={13} />}
      </button>
    </div>
  );
}
