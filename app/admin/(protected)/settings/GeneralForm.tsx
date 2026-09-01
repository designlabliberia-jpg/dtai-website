"use client";

import { useActionState, useState } from "react";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { saveSettings } from "@/lib/actions/settings";
import type { SettingsActionState } from "@/lib/actions/settings";

interface Props {
  settings: {
    name: string; fullName: string; tagline: string; description: string;
    logoUrl: string; siteUrl: string; contactEmail: string; directLine: string | null;
    whatsappNumber: string | null; facebookUrl: string | null; linkedinUrl: string | null; web3formsKey: string;
  } | null;
}

const init: SettingsActionState = { success: false, error: "" };

export function GeneralForm({ settings: s }: Props) {
  const [state, formAction, pending] = useActionState(saveSettings, init);
  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};

  const existingWa = s?.whatsappNumber ?? "";
  const [waDigits, setWaDigits] = useState(existingWa.startsWith("+") ? existingWa.slice(1) : existingWa);

  const [dlDigits, setDlDigits] = useState(s?.directLine ?? "");

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.success && (
        <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
          style={{ background: "var(--admin-success-bg)", color: "var(--admin-success)", border: "1px solid #BBF7D0" }}>
          Settings saved.
        </p>
      )}
      {!state.success && state.error && (
        <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
          style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid #FECACA" }}>
          {state.error}
        </p>
      )}

      <Panel accent title="Identity">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Short Name" name="name" required error={fe.name?.[0]} inputProps={{ defaultValue: s?.name }} />
          <FormField label="Full Name" name="fullName" required error={fe.fullName?.[0]} inputProps={{ defaultValue: s?.fullName }} />
          <FormField label="Tagline" name="tagline" required error={fe.tagline?.[0]} inputProps={{ defaultValue: s?.tagline }} />
          <FormField label="Site URL" name="siteUrl" required error={fe.siteUrl?.[0]} inputProps={{ type: "url", defaultValue: s?.siteUrl }} />
        </div>
      </Panel>

      <Panel accent title="Description">
        <FormField label="Site Description" name="description" as="textarea" rows={3} required error={fe.description?.[0]} inputProps={{ defaultValue: s?.description }} />
      </Panel>

      <Panel accent title="Contact & Social">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Contact Email" name="contactEmail" required error={fe.contactEmail?.[0]} inputProps={{ type: "email", defaultValue: s?.contactEmail }} />
          <div className="flex flex-col gap-1.5">
            <label className="font-technical text-[10px] uppercase tracking-[0.1em]" style={{ color: "var(--admin-text-secondary)" }}>WhatsApp</label>
            <div className="flex overflow-hidden rounded-[var(--radius-sm)]" style={{ border: fe.whatsappNumber?.[0] ? "1px solid var(--admin-danger)" : "1px solid var(--admin-border-strong)" }}>
              <span className="flex items-center px-3 text-sm select-none" style={{ background: "var(--admin-surface-2)", color: "var(--admin-text-muted)", borderRight: "1px solid var(--admin-border-strong)" }}>+</span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="2319876543"
                value={waDigits}
                onChange={(e) => setWaDigits(e.target.value.replace(/\D/g, ""))}
                className="flex-1 px-3 py-2 text-sm outline-none"
                style={{ background: "var(--admin-surface)", color: "var(--admin-text-primary)" }}
              />
            </div>
            <input type="hidden" name="whatsappNumber" value={waDigits ? `+${waDigits}` : ""} />
            {fe.whatsappNumber?.[0] && (
              <p className="font-technical text-[10px]" style={{ color: "var(--admin-danger)" }}>{fe.whatsappNumber[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-technical text-[10px] uppercase tracking-[0.1em]" style={{ color: "var(--admin-text-secondary)" }}>Direct Line / Toll-Free</label>
            <input
              type="tel"
              inputMode="numeric"
              name="directLine"
              placeholder="08001234567 or 2319876543"
              value={dlDigits}
              onChange={(e) => setDlDigits(e.target.value.replace(/\D/g, ""))}
              className="px-3 py-2 text-sm outline-none rounded-[var(--radius-sm)]"
              style={{
                border: fe.directLine?.[0] ? "1px solid var(--admin-danger)" : "1px solid var(--admin-border-strong)",
                background: "var(--admin-surface)",
                color: "var(--admin-text-primary)",
              }}
            />
            {fe.directLine?.[0] && (
              <p className="font-technical text-[10px]" style={{ color: "var(--admin-danger)" }}>{fe.directLine[0]}</p>
            )}
          </div>
          <FormField label="Facebook URL" name="facebookUrl" error={fe.facebookUrl?.[0]} inputProps={{ type: "url", defaultValue: s?.facebookUrl ?? "" }} />
          <FormField label="LinkedIn URL" name="linkedinUrl" error={fe.linkedinUrl?.[0]} inputProps={{ type: "url", defaultValue: s?.linkedinUrl ?? "" }} />
        </div>
      </Panel>

      <Panel accent title="Assets & Keys">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ImageUploadField label="Logo" name="logoUrl" required error={fe.logoUrl?.[0]} defaultValue={s?.logoUrl} />
          <FormField label="Web3Forms Key" name="web3formsKey" required error={fe.web3formsKey?.[0]} inputProps={{ defaultValue: s?.web3formsKey }} />
        </div>
      </Panel>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-[var(--radius-sm)] px-5 py-2.5 font-technical text-[11px] uppercase tracking-[0.08em] transition-opacity disabled:opacity-60"
          style={{ background: "var(--admin-brand)", color: "#fff" }}
        >
          {pending ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
