"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminFormShell } from "@/components/admin/AdminFormShell";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { createUser, updateUser } from "@/lib/actions/users";
import type { UserActionState } from "@/lib/actions/users";

type RoleOption = { id: string; name: string; label: string };

interface UserFormProps {
  roles: RoleOption[];
  user?: { id: string; name: string; email: string; roleId: string };
  isSelf?: boolean;
}

const init: UserActionState = { success: false, error: "" };

const selectStyle = {
  background: "var(--admin-surface)",
  border: "1px solid var(--admin-border-strong)",
  color: "var(--admin-text-primary)",
  borderRadius: "var(--radius-sm)",
  fontSize: "0.875rem",
  padding: "0.5rem 0.75rem",
  outline: "none",
  width: "100%",
} as const;

export function UserForm({ roles, user, isSelf }: UserFormProps) {
  const router = useRouter();
  const isEdit = !!user;

  const action = isEdit ? updateUser.bind(null, user.id) : createUser;
  const [state, formAction, pending] = useActionState(
    action as (prev: UserActionState | null, fd: FormData) => Promise<UserActionState>,
    init
  );

  useEffect(() => {
    if (state.success) router.push("/admin/users");
  }, [state.success, router]);

  const fe: Record<string, string[]> = (!state.success && (state as { fieldErrors?: Record<string, string[]> }).fieldErrors) || {};

  return (
    <AdminFormShell
      title={isEdit ? `Edit — ${user.name}` : "New User"}
      backHref="/admin/users"
      backLabel="Users"
      actions={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/users")}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border-strong)" }}
          >
            Cancel
          </button>
          <button
            form="user-form"
            type="submit"
            disabled={pending}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em] disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            {pending ? "Saving…" : isEdit ? "Save Changes" : "Create User"}
          </button>
        </div>
      }
    >
      <form id="user-form" action={formAction} className="flex flex-col gap-4">
        {!state.success && state.error && (
          <p
            className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid #FECACA" }}
          >
            {state.error}
          </p>
        )}

        <Panel accent title="Identity">
          <div className="flex flex-col gap-4">
            <FormField label="Full Name" name="name" required error={fe.name?.[0]}
              inputProps={{ defaultValue: user?.name }} />
            <FormField label="Email" name="email" required error={fe.email?.[0]}
              inputProps={{ type: "email", defaultValue: user?.email }} />
          </div>
        </Panel>

        <Panel accent title="Security">
          <FormField
            label={isEdit ? "New Password (leave blank to keep current)" : "Password"}
            name="password"
            required={!isEdit}
            error={fe.password?.[0]}
            inputProps={{ type: "password", autoComplete: "new-password" }}
          />
        </Panel>

        <Panel accent title="Role">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="roleId"
              className="font-technical text-[10px] uppercase tracking-[0.1em]"
              style={{ color: "var(--admin-text-secondary)" }}
            >
              Role <span style={{ color: "var(--admin-danger)" }}>*</span>
            </label>
            <select id="roleId" name="roleId" defaultValue={user?.roleId ?? ""} disabled={isSelf} style={{ ...selectStyle, ...(isSelf ? { opacity: 0.5, cursor: "not-allowed" } : {}) }}>
              <option value="">Select a role…</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>{r.label} ({r.name})</option>
              ))}
            </select>
            {isSelf && (
              <p className="font-technical text-[10px]" style={{ color: "var(--admin-text-muted)" }}>You cannot change your own role.</p>
            )}
            {fe.roleId && (
              <p className="font-technical text-[10px]" style={{ color: "var(--admin-danger)" }}>{fe.roleId[0]}</p>
            )}
          </div>
        </Panel>
      </form>
    </AdminFormShell>
  );
}
