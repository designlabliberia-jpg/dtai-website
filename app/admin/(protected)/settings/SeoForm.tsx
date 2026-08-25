"use client";

import { useActionState, useState } from "react";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { savePageSeo } from "@/lib/actions/settings";
import type { SettingsActionState } from "@/lib/actions/settings";

const PAGE_SLUGS = [
  "index", "company", "products", "services", "solutions",
  "contact", "security-and-governance", "company/careers",
];

interface SeoRow {
  pageSlug: string;
  title: string | null;
  description: string | null;
  ogImageUrl: string | null;
}

interface Props {
  rows: SeoRow[];
}

const init: SettingsActionState = { success: false, error: "" };

export function SeoForm({ rows }: Props) {
  const [activeSlug, setActiveSlug] = useState(PAGE_SLUGS[0]);
  const [state, formAction, pending] = useActionState(savePageSeo, init);
  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};

  const current = rows.find((r) => r.pageSlug === activeSlug);

  return (
    <div className="flex flex-col gap-4">
      {/* Page selector */}
      <div className="flex flex-wrap gap-2">
        {PAGE_SLUGS.map((slug) => (
          <button
            key={slug}
            type="button"
            onClick={() => setActiveSlug(slug)}
            className="rounded-[var(--radius-sm)] px-3 py-1.5 font-technical text-[10px] uppercase tracking-[0.08em] transition-colors"
            style={{
              background: activeSlug === slug ? "var(--admin-brand)" : "var(--admin-surface-2)",
              color: activeSlug === slug ? "#fff" : "var(--admin-text-muted)",
              border: "1px solid var(--admin-border)",
            }}
          >
            /{slug}
          </button>
        ))}
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="pageSlug" value={activeSlug} />

        {state.success && (
          <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-success-bg)", color: "var(--admin-success)", border: "1px solid #BBF7D0" }}>
            SEO saved for /{activeSlug}.
          </p>
        )}

        <Panel accent title={`SEO — /${activeSlug}`}>
          <div className="flex flex-col gap-4">
            <FormField
              label="Page Title (≤70 chars)"
              name="title"
              error={fe.title?.[0]}
              inputProps={{ defaultValue: current?.title ?? "", key: activeSlug + "-title" }}
            />
            <FormField
              label="Meta Description (≤160 chars)"
              name="description"
              as="textarea"
              rows={3}
              error={fe.description?.[0]}
              inputProps={{ defaultValue: current?.description ?? "", key: activeSlug + "-desc" }}
            />
            <FormField
              label="OG Image URL"
              name="ogImageUrl"
              error={fe.ogImageUrl?.[0]}
              inputProps={{ type: "url", defaultValue: current?.ogImageUrl ?? "", key: activeSlug + "-og" }}
            />
          </div>
        </Panel>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={pending}
            className="rounded-[var(--radius-sm)] px-5 py-2.5 font-technical text-[11px] uppercase tracking-[0.08em] transition-opacity disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            {pending ? "Saving…" : "Save SEO"}
          </button>
        </div>
      </form>
    </div>
  );
}
