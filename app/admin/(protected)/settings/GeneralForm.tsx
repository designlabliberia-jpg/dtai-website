"use client";

import { useActionState } from "react";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { saveSettings } from "@/lib/actions/settings";
import type { SettingsActionState } from "@/lib/actions/settings";

interface Props {
  settings: {
    name: string; fullName: string; tagline: string; description: string;
    logoUrl: string; siteUrl: string; contactEmail: string; whatsappNumber: string;
    facebookUrl: string | null; linkedinUrl: string | null; web3formsKey: string;
  } | null;
}

const init: SettingsActionState = { success: false, error: "" };

export function GeneralForm({ settings: s }: Props) {
  const [state, formAction, pending] = useActionState(saveSettings, init);
  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};

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
          <FormField label="WhatsApp (E.164)" name="whatsappNumber" error={fe.whatsappNumber?.[0]} inputProps={{ defaultValue: s?.whatsappNumber }} />
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
