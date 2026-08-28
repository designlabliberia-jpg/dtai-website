"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminFormShell } from "@/components/admin/AdminFormShell";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { SlugField } from "@/components/admin/SlugField";
import { ArrayField } from "@/components/admin/ArrayField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createService, updateService } from "@/lib/actions/services";
import type { ServiceActionState } from "@/lib/actions/services";

interface ServiceFormProps {
  service?: {
    id: string;
    slug: string;
    icon: string;
    profileEyebrow: string;
    profileHeading: string;
    profileHeadingAccent: string | null;
    profileParagraphs: string[];
    profilePrimaryImageUrl: string;
    profilePrimaryImageAlt: string;
    published: boolean;
    order: number;
    solutions: { id: string; title: string; published: boolean }[];
  };
}

const init: ServiceActionState = { success: false, error: "" };

const inputStyle = {
  background: "var(--admin-surface)", border: "1px solid var(--admin-border-strong)",
  color: "var(--admin-text-primary)", borderRadius: "var(--radius-sm)",
  fontSize: "0.875rem", width: "100%", padding: "0.5rem 0.75rem", outline: "none",
} as const;

export function ServiceForm({ service: s }: ServiceFormProps) {
  const router = useRouter();
  const isEdit = !!s;
  const [eyebrow, setEyebrow] = useState(s?.profileEyebrow ?? "");

  const action = isEdit ? updateService.bind(null, s.id) : createService;
  const [state, formAction, pending] = useActionState(
    action as (prev: ServiceActionState | null, fd: FormData) => Promise<ServiceActionState>,
    init
  );

  useEffect(() => { if (state.success) router.push("/admin/services"); }, [state.success, router]);

  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};

  return (
    <AdminFormShell
      title={isEdit ? `Edit — ${s.profileEyebrow}` : "New Service"}
      backHref="/admin/services" backLabel="Services"
      actions={
        <div className="flex gap-3">
          <button type="button" onClick={() => router.push("/admin/services")}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border-strong)" }}>
            Cancel
          </button>
          <button form="service-form" type="submit" disabled={pending}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em] disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}>
            {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Service"}
          </button>
        </div>
      }
    >
      <form id="service-form" action={formAction} className="flex flex-col gap-4">
        {!state.success && state.error && (
          <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid #FECACA" }}>
            {state.error}
          </p>
        )}

        <Panel accent title="Identity">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Icon Name" name="icon" required error={fe.icon?.[0]}
                hint="Lucide icon name e.g. Cloud"
                inputProps={{ defaultValue: s?.icon }} />
            </div>
            <SlugField name="slug" sourceValue={eyebrow} defaultValue={s?.slug} error={fe.slug?.[0]} />
            <div className="flex flex-col gap-1.5">
              <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--admin-text-secondary)" }}>Order</label>
              <input name="order" type="number" min="0" defaultValue={s?.order ?? 0} style={inputStyle} />
            </div>
          </div>
        </Panel>

        {isEdit && (
          <Panel accent title={`Linked Solutions (${s.solutions.length})`}>
            {s.solutions.length === 0 ? (
              <p className="font-technical text-[11px]" style={{ color: "var(--admin-text-muted)" }}>
                No solutions linked yet. Create a solution and assign it to this service.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {s.solutions.map((sol) => (
                  <div key={sol.id} className="flex items-center justify-between rounded-[var(--radius-sm)] px-3 py-2"
                    style={{ background: "var(--admin-surface-raised)", border: "1px solid var(--admin-border)" }}>
                    <span className="text-sm" style={{ color: "var(--admin-text-primary)" }}>{sol.title}</span>
                    <span className="font-technical text-[10px] uppercase tracking-[0.08em]"
                      style={{ color: sol.published ? "var(--admin-success)" : "var(--admin-text-muted)" }}>
                      {sol.published ? "Live" : "Draft"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        )}

        <Panel accent title="Profile Section">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Eyebrow" name="profileEyebrow" required error={fe.profileEyebrow?.[0]}
                inputProps={{ defaultValue: s?.profileEyebrow, onChange: (e) => setEyebrow(e.target.value) }} />
              <FormField label="Heading" name="profileHeading" required error={fe.profileHeading?.[0]}
                inputProps={{ defaultValue: s?.profileHeading }} />
              <FormField label="Heading Accent" name="profileHeadingAccent"
                inputProps={{ defaultValue: s?.profileHeadingAccent ?? "" }} />
            </div>
            <ArrayField label="Paragraphs" name="profileParagraphs" defaultValue={s?.profileParagraphs}
              error={fe.profileParagraphs?.[0]} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ImageUploadField label="Primary Image" name="profilePrimaryImageUrl" required
                error={fe.profilePrimaryImageUrl?.[0]} defaultValue={s?.profilePrimaryImageUrl} />
              <FormField label="Primary Image Alt" name="profilePrimaryImageAlt" required
                error={fe.profilePrimaryImageAlt?.[0]} inputProps={{ defaultValue: s?.profilePrimaryImageAlt }} />
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
