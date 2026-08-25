"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminFormShell } from "@/components/admin/AdminFormShell";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { createLeadershipMember, updateLeadershipMember } from "@/lib/actions/leadership";
import type { LeadershipActionState } from "@/lib/actions/leadership";
import { DIVISIONS } from "@/lib/validations/leadership.schema";

interface LeadershipFormProps {
  member?: {
    id: string; memberId: string; name: string; title: string;
    division: string; focus: string; bio: string;
    imageUrl: string | null; linkedin: string | null; order: number;
  };
}

const init: LeadershipActionState = { success: false, error: "" };

const selectStyle = {
  background: "var(--admin-surface)",
  border: "1px solid var(--admin-border-strong)",
  color: "var(--admin-text-primary)",
  borderRadius: "var(--radius-sm)",
  fontSize: "0.875rem",
  width: "100%",
  padding: "0.5rem 0.75rem",
  outline: "none",
} as const;

export function LeadershipForm({ member: m }: LeadershipFormProps) {
  const router = useRouter();
  const isEdit = !!m;

  const action = isEdit
    ? updateLeadershipMember.bind(null, m.id)
    : createLeadershipMember;

  const [state, formAction, pending] = useActionState(
    action as (prev: LeadershipActionState | null, fd: FormData) => Promise<LeadershipActionState>,
    init
  );

  useEffect(() => {
    if (state.success) router.push("/admin/leadership");
  }, [state.success, router]);

  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};

  return (
    <AdminFormShell
      title={isEdit ? `Edit — ${m.name}` : "New Member"}
      backHref="/admin/leadership"
      backLabel="Leadership"
      actions={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/leadership")}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border-strong)" }}
          >
            Cancel
          </button>
          <button
            form="leadership-form"
            type="submit"
            disabled={pending}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em] disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Member"}
          </button>
        </div>
      }
    >
      <form id="leadership-form" action={formAction} className="flex flex-col gap-4">
        {!state.success && state.error && (
          <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid rgba(239,68,68,0.3)" }}>
            {state.error}
          </p>
        )}

        <Panel accent title="Identity">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Member ID"
              name="memberId"
              required
              error={fe.memberId?.[0]}
              hint="Uppercase, e.g. GK-001"
              inputProps={{ defaultValue: m?.memberId }}
            />
            <FormField
              label="Full Name"
              name="name"
              required
              error={fe.name?.[0]}
              inputProps={{ defaultValue: m?.name }}
            />
            <FormField
              label="Title / Role"
              name="title"
              required
              error={fe.title?.[0]}
              inputProps={{ defaultValue: m?.title }}
            />
            <div className="flex flex-col gap-1.5">
              <label
                className="font-technical text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--admin-text-secondary)" }}
              >
                Division
              </label>
              <select name="division" defaultValue={m?.division ?? DIVISIONS[0]} style={selectStyle}>
                {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <FormField
              label="Focus Area"
              name="focus"
              required
              error={fe.focus?.[0]}
              inputProps={{ defaultValue: m?.focus }}
            />
            <div className="flex flex-col gap-1.5">
              <label
                className="font-technical text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--admin-text-secondary)" }}
              >
                Order
              </label>
              <input name="order" type="number" min="0" defaultValue={m?.order ?? 0} style={selectStyle} />
            </div>
          </div>
        </Panel>

        <Panel accent title="Profile">
          <div className="flex flex-col gap-4">
            <FormField
              label="Bio"
              name="bio"
              as="textarea"
              rows={5}
              required
              error={fe.bio?.[0]}
              inputProps={{ defaultValue: m?.bio }}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label="Image URL"
                name="imageUrl"
                error={fe.imageUrl?.[0]}
                hint="Relative path or HTTPS URL"
                inputProps={{ defaultValue: m?.imageUrl ?? "" }}
              />
              <FormField
                label="LinkedIn URL"
                name="linkedin"
                error={fe.linkedin?.[0]}
                inputProps={{ type: "url", defaultValue: m?.linkedin ?? "" }}
              />
            </div>
          </div>
        </Panel>
      </form>
    </AdminFormShell>
  );
}
