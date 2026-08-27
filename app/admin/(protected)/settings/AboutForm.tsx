"use client";

import { useActionState } from "react";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { saveAboutSettings } from "@/lib/actions/settings";
import type { SettingsActionState } from "@/lib/actions/settings";

interface Props {
  about: {
    mission: string; vision: string; aboutHeading: string; aboutSubheading: string;
    aboutDescription: string; heroImageUrl: string; teamImageUrl: string;
    officeImageUrl: string; valuesHeading: string; valuesDescription: string;
  } | null;
}

const init: SettingsActionState = { success: false, error: "" };

export function AboutForm({ about: a }: Props) {
  const [state, formAction, pending] = useActionState(saveAboutSettings, init);
  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.success && (
        <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
          style={{ background: "var(--admin-success-bg)", color: "var(--admin-success)", border: "1px solid #BBF7D0" }}>
          About settings saved.
        </p>
      )}

      <Panel accent title="Mission & Vision">
        <div className="flex flex-col gap-4">
          <FormField label="Mission" name="mission" as="textarea" rows={3} error={fe.mission?.[0]} inputProps={{ defaultValue: a?.mission }} />
          <FormField label="Vision" name="vision" as="textarea" rows={3} error={fe.vision?.[0]} inputProps={{ defaultValue: a?.vision }} />
        </div>
      </Panel>

      <Panel accent title="About Section">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Heading" name="aboutHeading" error={fe.aboutHeading?.[0]} inputProps={{ defaultValue: a?.aboutHeading }} />
            <FormField label="Subheading" name="aboutSubheading" error={fe.aboutSubheading?.[0]} inputProps={{ defaultValue: a?.aboutSubheading }} />
          </div>
          <FormField label="Description" name="aboutDescription" as="textarea" rows={4} error={fe.aboutDescription?.[0]} inputProps={{ defaultValue: a?.aboutDescription }} />
        </div>
      </Panel>

      <Panel accent title="Images">
        <div className="flex flex-col gap-4">
          <ImageUploadField label="Hero Image" name="heroImageUrl" error={fe.heroImageUrl?.[0]} defaultValue={a?.heroImageUrl} />
          <ImageUploadField label="Team Image" name="teamImageUrl" error={fe.teamImageUrl?.[0]} defaultValue={a?.teamImageUrl} />
          <ImageUploadField label="Office Image" name="officeImageUrl" error={fe.officeImageUrl?.[0]} defaultValue={a?.officeImageUrl} />
        </div>
      </Panel>

      <Panel accent title="Values Section">
        <div className="flex flex-col gap-4">
          <FormField label="Values Heading" name="valuesHeading" error={fe.valuesHeading?.[0]} inputProps={{ defaultValue: a?.valuesHeading }} />
          <FormField label="Values Description" name="valuesDescription" as="textarea" rows={3} error={fe.valuesDescription?.[0]} inputProps={{ defaultValue: a?.valuesDescription }} />
        </div>
      </Panel>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-[var(--radius-sm)] px-5 py-2.5 font-technical text-[11px] uppercase tracking-[0.08em] transition-opacity disabled:opacity-60"
          style={{ background: "var(--admin-brand)", color: "#fff" }}
        >
          {pending ? "Saving…" : "Save About"}
        </button>
      </div>
    </form>
  );
}
