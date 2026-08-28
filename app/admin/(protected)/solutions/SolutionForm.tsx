"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminFormShell } from "@/components/admin/AdminFormShell";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { createSolution, updateSolution } from "@/lib/actions/solutions";
import type { SolutionActionState } from "@/lib/actions/solutions";

interface SolutionFormProps {
  solution?: {
    id: string; title: string; summary: string;
    serviceId: string | null; published: boolean; order: number;
  };
  services: { id: string; profileEyebrow: string; slug: string }[];
}

const init: SolutionActionState = { success: false, error: "" };

const selectStyle = {
  background: "var(--admin-surface)", border: "1px solid var(--admin-border-strong)",
  color: "var(--admin-text-primary)", borderRadius: "var(--radius-sm)",
  fontSize: "0.875rem", width: "100%", padding: "0.5rem 0.75rem", outline: "none",
} as const;

export function SolutionForm({ solution: s, services }: SolutionFormProps) {
  const router = useRouter();
  const isEdit = !!s;

  const action = isEdit ? updateSolution.bind(null, s.id) : createSolution;
  const [state, formAction, pending] = useActionState(
    action as (prev: SolutionActionState | null, fd: FormData) => Promise<SolutionActionState>,
    init
  );

  useEffect(() => { if (state.success) router.push("/admin/solutions"); }, [state.success, router]);

  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};

  return (
    <AdminFormShell
      title={isEdit ? `Edit — ${s.title}` : "New Solution"}
      backHref="/admin/solutions" backLabel="Solutions"
      actions={
        <div className="flex gap-3">
          <button type="button" onClick={() => router.push("/admin/solutions")}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border-strong)" }}>
            Cancel
          </button>
          <button form="solution-form" type="submit" disabled={pending}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em] disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}>
            {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Solution"}
          </button>
        </div>
      }
    >
      <form id="solution-form" action={formAction} className="flex flex-col gap-4">
        {!state.success && state.error && (
          <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid #FECACA" }}>
            {state.error}
          </p>
        )}

        <Panel accent title="Identity">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Title" name="title" required error={fe.title?.[0]}
                inputProps={{ defaultValue: s?.title }} />
              <div className="flex flex-col gap-1.5">
                <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--admin-text-secondary)" }}>Order</label>
                <input name="order" type="number" min="0" defaultValue={s?.order ?? 0} style={selectStyle} />
              </div>
            </div>
            <FormField label="Summary" name="summary" as="textarea" rows={2} required
              error={fe.summary?.[0]} inputProps={{ defaultValue: s?.summary }} />
            <div className="flex flex-col gap-1.5">
              <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--admin-text-secondary)" }}>Service</label>
              <select name="serviceId" defaultValue={s?.serviceId ?? ""} style={selectStyle}>
                <option value="">— None —</option>
                {services.map((svc) => (
                  <option key={svc.id} value={svc.id}>{svc.profileEyebrow}</option>
                ))}
              </select>
            </div>
          </div>
        </Panel>

        <Panel accent title="Visibility">
          <div className="flex items-center gap-3">
            <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
              style={{ color: "var(--admin-text-secondary)" }}>Published</label>
            <input type="hidden" name="published" value="false" />
            <input type="checkbox" name="published" value="true"
              defaultChecked={s?.published ?? false}
              className="h-4 w-4 accent-[var(--admin-brand)]" />
          </div>
        </Panel>
      </form>
    </AdminFormShell>
  );
}
