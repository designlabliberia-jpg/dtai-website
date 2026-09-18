"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminFormShell } from "@/components/admin/AdminFormShell";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { PermissionGroup } from "./PermissionGroup";
import { PERMISSION_GROUPS } from "@/lib/permissions";
import { createRole, updateRole } from "@/lib/actions/roles";
import type { RoleActionState } from "@/lib/actions/roles";

interface RoleFormProps {
  role?: {
    id: string;
    name: string;
    label: string;
    isSystem: boolean;
    permissions: Record<string, boolean>;
  };
}

const init: RoleActionState = { success: false, error: "" };

export function RoleForm({ role }: RoleFormProps) {
  const router = useRouter();
  const isEdit = !!role;

  const action = isEdit ? updateRole.bind(null, role.id) : createRole;
  const [state, formAction, pending] = useActionState(
    action as (prev: RoleActionState | null, fd: FormData) => Promise<RoleActionState>,
    init
  );

  useEffect(() => {
    if (state.success) router.push("/admin/roles");
  }, [state.success, router]);

  return (
    <AdminFormShell
      title={isEdit ? `Edit — ${role.label}` : "New Role"}
      backHref="/admin/roles"
      backLabel="Roles"
      actions={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/roles")}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border-strong)" }}
          >
            Cancel
          </button>
          <button
            form="role-form"
            type="submit"
            disabled={pending}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em] disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Role"}
          </button>
        </div>
      }
    >
      <form id="role-form" action={formAction} className="flex flex-col gap-4">
        {!state.success && state.error && (
          <p
            className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid #FECACA" }}
          >
            {state.error}
          </p>
        )}

        <Panel accent title="Identity">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Role Name"
              name="name"
              required
              hint="Lowercase, no spaces (e.g. content_editor)"
              inputProps={{ defaultValue: role?.name, readOnly: role?.isSystem, disabled: role?.isSystem }}
            />
            <FormField
              label="Display Label"
              name="label"
              required
              hint="Human-readable name shown in the UI"
              inputProps={{ defaultValue: role?.label }}
            />
          </div>
          {role?.isSystem && (
            <p className="mt-3 font-technical text-[10px] uppercase tracking-widest" style={{ color: "var(--admin-warning)" }}>
              System role — name is locked.
            </p>
          )}
        </Panel>

        <Panel accent title="Permissions">
          <div className="flex flex-col gap-3">
            {PERMISSION_GROUPS.map((group) => (
              <PermissionGroup
                key={group.label}
                label={group.label}
                keys={group.keys}
                checked={role?.permissions ?? {}}
              />
            ))}
          </div>
        </Panel>
      </form>
    </AdminFormShell>
  );
}
