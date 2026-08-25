"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminFormShell } from "@/components/admin/AdminFormShell";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { SlugField } from "@/components/admin/SlugField";
import { ArrayField } from "@/components/admin/ArrayField";
import { createSolution, updateSolution } from "@/lib/actions/solutions";
import type { SolutionActionState } from "@/lib/actions/solutions";

interface SolutionFormProps {
  solution?: {
    id: string; slug: string; title: string; summary: string; overview: string;
    focusAreas: string[]; proofPoints: string[]; relatedServices: string[];
    snippetFilename: string | null; snippetLanguage: string | null;
    snippetCode: string | null; published: boolean; order: number;
  };
}

const init: SolutionActionState = { success: false, error: "" };

const selectStyle = {
  background: "var(--admin-surface)", border: "1px solid var(--admin-border-strong)",
  color: "var(--admin-text-primary)", borderRadius: "var(--radius-sm)",
  fontSize: "0.875rem", width: "100%", padding: "0.5rem 0.75rem", outline: "none",
} as const;

export function SolutionForm({ solution: s }: SolutionFormProps) {
  const router = useRouter();
  const isEdit = !!s;
  const [title, setTitle] = useState(s?.title ?? "");

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
                inputProps={{ defaultValue: s?.title, onChange: (e) => setTitle(e.target.value) }} />
              <div className="flex flex-col gap-1.5">
                <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--admin-text-secondary)" }}>Order</label>
                <input name="order" type="number" min="0" defaultValue={s?.order ?? 0} style={selectStyle} />
              </div>
            </div>
            <SlugField name="slug" sourceValue={title} defaultValue={s?.slug} error={fe.slug?.[0]} />
          </div>
        </Panel>

        <Panel accent title="Content">
          <div className="flex flex-col gap-4">
            <FormField label="Summary" name="summary" as="textarea" rows={2} required
              error={fe.summary?.[0]} inputProps={{ defaultValue: s?.summary }} />
            <FormField label="Overview" name="overview" as="textarea" rows={5} required
              error={fe.overview?.[0]} inputProps={{ defaultValue: s?.overview }} />
          </div>
        </Panel>

        <Panel accent title="Details">
          <div className="flex flex-col gap-4">
            <ArrayField label="Focus Areas" name="focusAreas" defaultValue={s?.focusAreas}
              error={fe.focusAreas?.[0]} placeholder="Add focus area…" />
            <ArrayField label="Proof Points" name="proofPoints" defaultValue={s?.proofPoints}
              error={fe.proofPoints?.[0]} placeholder="Add proof point…" />
            <ArrayField label="Related Services (slugs)" name="relatedServices" defaultValue={s?.relatedServices}
              error={fe.relatedServices?.[0]} placeholder="Add service slug…" />
          </div>
        </Panel>

        <Panel accent title="Code Snippet (optional)">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Filename" name="snippetFilename"
                inputProps={{ defaultValue: s?.snippetFilename ?? "" }} />
              <FormField label="Language" name="snippetLanguage"
                inputProps={{ defaultValue: s?.snippetLanguage ?? "" }} />
            </div>
            <FormField label="Code" name="snippetCode" as="textarea" rows={6}
              inputProps={{ defaultValue: s?.snippetCode ?? "", style: { fontFamily: "var(--font-mono)", fontSize: "0.8rem" } }} />
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
