"use client";

import { useActionState, useState } from "react";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { savePageProfiles } from "@/lib/actions/settings";
import type { SettingsActionState } from "@/lib/actions/settings";
import type { PageProfileSettings } from "@prisma/client";

const TABS = ["Careers", "Products", "Services"] as const;
type Tab = (typeof TABS)[number];

const PREFIX: Record<Tab, string> = {
  Careers:  "careers",
  Products: "products",
  Services: "services",
};

const init: SettingsActionState = { success: false, error: "" };

function val(p: PageProfileSettings | null, key: string) {
  return (p as Record<string, unknown> | null)?.[key] as string ?? "";
}
function lines(p: PageProfileSettings | null, key: string) {
  return ((p as Record<string, unknown> | null)?.[key] as string[] ?? []).join("\n");
}

export function PageProfilesForm({ data: p }: { data: PageProfileSettings | null }) {
  const [tab, setTab] = useState<Tab>("Careers");
  const [state, action, pending] = useActionState(savePageProfiles, init);
  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};
  const pfx = PREFIX[tab];

  return (
    <div className="flex flex-col gap-4">
      {/* Tab strip */}
      <div className="flex gap-1 rounded-[var(--radius-sm)] p-1" style={{ background: "var(--admin-surface-2)", border: "1px solid var(--admin-border)", width: "fit-content" }}>
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className="rounded-[var(--radius-sm)] px-3 py-1.5 font-technical text-[10px] uppercase tracking-[0.1em] transition-colors"
            style={{
              background: tab === t ? "var(--admin-surface)" : "transparent",
              color: tab === t ? "var(--admin-brand)" : "var(--admin-text-muted)",
              boxShadow: tab === t ? "var(--admin-shadow-panel)" : "none",
              borderBottom: tab === t ? "2px solid var(--admin-brand)" : "2px solid transparent",
            }}>
            {t}
          </button>
        ))}
      </div>

      <form action={action} className="flex flex-col gap-4">
        {state.success && (
          <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-success-bg)", color: "var(--admin-success)", border: "1px solid #BBF7D0" }}>
            Saved successfully.
          </p>
        )}
        {!state.success && state.error && (
          <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid #FECACA" }}>
            {state.error}
          </p>
        )}

        {/* Hidden fields for the other two tabs so they aren't wiped on save */}
        {TABS.filter((t) => t !== tab).map((t) => {
          const px = PREFIX[t];
          return (
            <span key={t} style={{ display: "none" }}>
              <input type="hidden" name={`${px}Eyebrow`}          value={val(p, `${px}Eyebrow`)} />
              <input type="hidden" name={`${px}Heading`}          value={val(p, `${px}Heading`)} />
              <input type="hidden" name={`${px}HeadingAccent`}    value={val(p, `${px}HeadingAccent`)} />
              {((p as Record<string, unknown> | null)?.[`${px}Paragraphs`] as string[] ?? []).map((line, i) => (
                <input key={i} type="hidden" name={`${px}Paragraphs`} value={line} />
              ))}
              <input type="hidden" name={`${px}PrimaryImageUrl`}  value={val(p, `${px}PrimaryImageUrl`)} />
              <input type="hidden" name={`${px}PrimaryImageAlt`}  value={val(p, `${px}PrimaryImageAlt`)} />
            </span>
          );
        })}

        <Panel accent title={`${tab} Profile Section`}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField label="Eyebrow" name={`${pfx}Eyebrow`} error={fe[`${pfx}Eyebrow`]?.[0]}
                inputProps={{ defaultValue: val(p, `${pfx}Eyebrow`), key: pfx + "ey" }} />
              <FormField label="Heading" name={`${pfx}Heading`} error={fe[`${pfx}Heading`]?.[0]}
                inputProps={{ defaultValue: val(p, `${pfx}Heading`), key: pfx + "h" }} />
              <FormField label="Heading Accent" name={`${pfx}HeadingAccent`} error={fe[`${pfx}HeadingAccent`]?.[0]}
                inputProps={{ defaultValue: val(p, `${pfx}HeadingAccent`), key: pfx + "ha" }} />
            </div>
            <FormField label="Paragraphs (one per line)" name={`${pfx}Paragraphs`} as="textarea" rows={4}
              error={fe[`${pfx}Paragraphs`]?.[0]}
              inputProps={{ defaultValue: lines(p, `${pfx}Paragraphs`), key: pfx + "para" }} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ImageUploadField label="Primary Image" name={`${pfx}PrimaryImageUrl`}
                defaultValue={val(p, `${pfx}PrimaryImageUrl`)} error={fe[`${pfx}PrimaryImageUrl`]?.[0]} key={pfx + "img"} />
              <FormField label="Primary Image Alt" name={`${pfx}PrimaryImageAlt`} error={fe[`${pfx}PrimaryImageAlt`]?.[0]}
                inputProps={{ defaultValue: val(p, `${pfx}PrimaryImageAlt`), key: pfx + "alt" }} />
            </div>
          </div>
        </Panel>

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={pending}
            className="rounded-[var(--radius-sm)] px-5 py-2.5 font-technical text-[11px] uppercase tracking-[0.08em] transition-opacity disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}>
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
