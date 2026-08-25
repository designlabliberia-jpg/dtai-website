"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminFormShell } from "@/components/admin/AdminFormShell";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { ArrayField } from "@/components/admin/ArrayField";
import { SlugField } from "@/components/admin/SlugField";
import { createPartner, updatePartner } from "@/lib/actions/partners";
import type { PartnerActionState } from "@/lib/actions/partners";
import { PARTNER_TYPES } from "@/lib/validations/partner.schema";

interface PartnerFormProps {
  partner?: {
    id: string; title: string; logoUrl: string;
    type: string; slug: string | null; summary: string | null;
    points: string[]; order: number;
  };
}

const init: PartnerActionState = { success: false, error: "" };

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

export function PartnerForm({ partner: p }: PartnerFormProps) {
  const router = useRouter();
  const isEdit = !!p;
  const [title, setTitle] = useState(p?.title ?? "");
  const [type, setType] = useState(p?.type ?? "logo");

  const action = isEdit ? updatePartner.bind(null, p.id) : createPartner;
  const [state, formAction, pending] = useActionState(
    action as (prev: PartnerActionState | null, fd: FormData) => Promise<PartnerActionState>,
    init
  );

  useEffect(() => {
    if (state.success) router.push("/admin/partners");
  }, [state.success, router]);

  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};

  return (
    <AdminFormShell
      title={isEdit ? `Edit — ${p.title}` : "New Partner"}
      backHref="/admin/partners"
      backLabel="Partners"
      actions={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/partners")}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border-strong)" }}
          >
            Cancel
          </button>
          <button
            form="partner-form"
            type="submit"
            disabled={pending}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em] disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Partner"}
          </button>
        </div>
      }
    >
      <form id="partner-form" action={formAction} className="flex flex-col gap-4">
        {!state.success && state.error && (
          <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid rgba(239,68,68,0.3)" }}>
            {state.error}
          </p>
        )}

        <Panel accent title="Identity">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Title"
              name="title"
              required
              error={fe.title?.[0]}
              inputProps={{ defaultValue: p?.title, onChange: (e) => setTitle(e.target.value) }}
            />
            <div className="flex flex-col gap-1.5">
              <label
                className="font-technical text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--admin-text-secondary)" }}
              >
                Type
              </label>
              <select
                name="type"
                defaultValue={p?.type ?? "logo"}
                onChange={(e) => setType(e.target.value)}
                style={selectStyle}
              >
                {PARTNER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <FormField
              label="Logo URL"
              name="logoUrl"
              required
              error={fe.logoUrl?.[0]}
              hint="Relative path or HTTPS URL"
              inputProps={{ defaultValue: p?.logoUrl }}
            />
            <div className="flex flex-col gap-1.5">
              <label
                className="font-technical text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--admin-text-secondary)" }}
              >
                Order
              </label>
              <input name="order" type="number" min="0" defaultValue={p?.order ?? 0} style={selectStyle} />
            </div>
          </div>
        </Panel>

        {type === "category" && (
          <Panel accent title="Category Profile">
            <div className="flex flex-col gap-4">
              <SlugField
                name="slug"
                sourceValue={title}
                defaultValue={p?.slug ?? ""}
                error={fe.slug?.[0]}
              />
              <FormField
                label="Summary"
                name="summary"
                as="textarea"
                rows={3}
                error={fe.summary?.[0]}
                inputProps={{ defaultValue: p?.summary ?? "" }}
              />
              <ArrayField
                label="Key Points"
                name="points"
                defaultValue={p?.points}
                error={fe.points?.[0]}
                placeholder="Add point…"
              />
            </div>
          </Panel>
        )}

        {type === "logo" && (
          <>
            <input type="hidden" name="slug" value="" />
            <input type="hidden" name="summary" value="" />
          </>
        )}
      </form>
    </AdminFormShell>
  );
}
