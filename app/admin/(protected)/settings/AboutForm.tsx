"use client";

import { useActionState, useState } from "react";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  saveAboutProfile, saveAboutMission, saveAboutVision,
  saveAboutValues, saveAboutCommitment, saveAboutWhy,
} from "@/lib/actions/settings";
import type { SettingsActionState } from "@/lib/actions/settings";
import type { AboutSettings } from "@prisma/client";

const TABS = ["Profile", "Mission", "Vision", "Values", "Commitment", "Why Us"] as const;
type Tab = (typeof TABS)[number];

const init: SettingsActionState = { success: false, error: "" };

function lines(arr: string[]) { return arr.join("\n"); }
function val(a: AboutSettings | null, key: string) {
  return (a as Record<string, string> | null)?.[key] ?? "";
}

function StatusBanner({ state }: { state: SettingsActionState }) {
  if (state.success)
    return (
      <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
        style={{ background: "var(--admin-success-bg)", color: "var(--admin-success)", border: "1px solid #BBF7D0" }}>
        Saved successfully.
      </p>
    );
  if (!state.success && state.error)
    return (
      <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
        style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid #FECACA" }}>
        {state.error}
      </p>
    );
  return null;
}

function SaveButton({ pending }: { pending: boolean }) {
  return (
    <div className="flex justify-end pt-2">
      <button type="submit" disabled={pending}
        className="rounded-[var(--radius-sm)] px-5 py-2.5 font-technical text-[11px] uppercase tracking-[0.08em] transition-opacity disabled:opacity-60"
        style={{ background: "var(--admin-brand)", color: "#fff" }}>
        {pending ? "Saving…" : "Save"}
      </button>
    </div>
  );
}

function ImagePair({ prefix, a, fe }: { prefix: string; a: AboutSettings | null; fe: Record<string, string[]> }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-3">
        <ImageUploadField label="Primary Image" name={`${prefix}PrimaryImage`}
          defaultValue={val(a, `${prefix}PrimaryImage`)} error={fe[`${prefix}PrimaryImage`]?.[0]} />
        <FormField label="Primary Alt" name={`${prefix}PrimaryImageAlt`}
          error={fe[`${prefix}PrimaryImageAlt`]?.[0]}
          inputProps={{ defaultValue: val(a, `${prefix}PrimaryImageAlt`) }} />
      </div>
      <div className="flex flex-col gap-3">
        <ImageUploadField label="Secondary Image" name={`${prefix}SecondaryImage`}
          defaultValue={val(a, `${prefix}SecondaryImage`)} error={fe[`${prefix}SecondaryImage`]?.[0]} />
        <FormField label="Secondary Alt" name={`${prefix}SecondaryImageAlt`}
          error={fe[`${prefix}SecondaryImageAlt`]?.[0]}
          inputProps={{ defaultValue: val(a, `${prefix}SecondaryImageAlt`) }} />
      </div>
    </div>
  );
}

function TabStrip({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-[var(--radius-sm)] p-1"
      style={{ background: "var(--admin-surface-2)", border: "1px solid var(--admin-border)", width: "fit-content" }}>
      {TABS.map((t) => (
        <button key={t} type="button" onClick={() => onChange(t)}
          className="rounded-[var(--radius-sm)] px-3 py-1.5 font-technical text-[10px] uppercase tracking-[0.1em] transition-colors"
          style={{
            background: active === t ? "var(--admin-surface)" : "transparent",
            color: active === t ? "var(--admin-brand)" : "var(--admin-text-muted)",
            boxShadow: active === t ? "var(--admin-shadow-panel)" : "none",
            borderBottom: active === t ? "2px solid var(--admin-brand)" : "2px solid transparent",
          }}>
          {t}
        </button>
      ))}
    </div>
  );
}

// ── Per-tab forms, each with its own isolated action state ──────────────────

function ProfileTab({ a }: { a: AboutSettings | null }) {
  const [state, action, pending] = useActionState(saveAboutProfile, init);
  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};
  return (
    <form action={action} className="flex flex-col gap-4">
      <StatusBanner state={state} />
      <Panel accent title="Profile">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField label="Eyebrow" name="profileEyebrow" error={fe.profileEyebrow?.[0]} inputProps={{ defaultValue: a?.profileEyebrow }} />
            <FormField label="Heading" name="profileHeading" error={fe.profileHeading?.[0]} inputProps={{ defaultValue: a?.profileHeading }} />
            <FormField label="Heading Accent" name="profileHeadingAccent" error={fe.profileHeadingAccent?.[0]} inputProps={{ defaultValue: a?.profileHeadingAccent }} />
          </div>
          <FormField label="Paragraphs (one per line)" name="profileParagraphs" as="textarea" rows={5}
            error={fe.profileParagraphs?.[0]} inputProps={{ defaultValue: lines(a?.profileParagraphs ?? []) }} />
          <ImagePair prefix="profile" a={a} fe={fe} />
        </div>
      </Panel>
      <SaveButton pending={pending} />
    </form>
  );
}

function MissionTab({ a }: { a: AboutSettings | null }) {
  const [state, action, pending] = useActionState(saveAboutMission, init);
  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};
  return (
    <form action={action} className="flex flex-col gap-4">
      <StatusBanner state={state} />
      <Panel accent title="Mission">
        <div className="flex flex-col gap-4">
          <FormField label="Body" name="missionBody" as="textarea" rows={3} error={fe.missionBody?.[0]} inputProps={{ defaultValue: a?.missionBody }} />
          <FormField label="Points (one per line)" name="missionPoints" as="textarea" rows={4}
            error={fe.missionPoints?.[0]} inputProps={{ defaultValue: lines(a?.missionPoints ?? []) }} />
          <ImagePair prefix="mission" a={a} fe={fe} />
        </div>
      </Panel>
      <SaveButton pending={pending} />
    </form>
  );
}

function VisionTab({ a }: { a: AboutSettings | null }) {
  const [state, action, pending] = useActionState(saveAboutVision, init);
  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};
  return (
    <form action={action} className="flex flex-col gap-4">
      <StatusBanner state={state} />
      <Panel accent title="Vision">
        <div className="flex flex-col gap-4">
          <FormField label="Body" name="visionBody" as="textarea" rows={3} error={fe.visionBody?.[0]} inputProps={{ defaultValue: a?.visionBody }} />
          <FormField label="Points (one per line)" name="visionPoints" as="textarea" rows={4}
            error={fe.visionPoints?.[0]} inputProps={{ defaultValue: lines(a?.visionPoints ?? []) }} />
          <ImagePair prefix="vision" a={a} fe={fe} />
        </div>
      </Panel>
      <SaveButton pending={pending} />
    </form>
  );
}

function ValuesTab({ a }: { a: AboutSettings | null }) {
  const [state, action, pending] = useActionState(saveAboutValues, init);
  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};
  return (
    <form action={action} className="flex flex-col gap-4">
      <StatusBanner state={state} />
      <Panel accent title="What We Stand For">
        <FormField label="Value Labels (one per line)" name="valuesLabels" as="textarea" rows={6}
          error={fe.valuesLabels?.[0]} inputProps={{ defaultValue: lines(a?.valuesLabels ?? []) }} />
      </Panel>
      <SaveButton pending={pending} />
    </form>
  );
}

function CommitmentTab({ a }: { a: AboutSettings | null }) {
  const [state, action, pending] = useActionState(saveAboutCommitment, init);
  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};
  return (
    <form action={action} className="flex flex-col gap-4">
      <StatusBanner state={state} />
      <Panel accent title="Commitment">
        <div className="flex flex-col gap-4">
          <FormField label="Body" name="commitmentBody" as="textarea" rows={3} error={fe.commitmentBody?.[0]} inputProps={{ defaultValue: a?.commitmentBody }} />
          <FormField label="Points (one per line)" name="commitmentPoints" as="textarea" rows={4}
            error={fe.commitmentPoints?.[0]} inputProps={{ defaultValue: lines(a?.commitmentPoints ?? []) }} />
          <ImagePair prefix="commitment" a={a} fe={fe} />
        </div>
      </Panel>
      <SaveButton pending={pending} />
    </form>
  );
}

function WhyUsTab({ a }: { a: AboutSettings | null }) {
  const [state, action, pending] = useActionState(saveAboutWhy, init);
  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};
  return (
    <form action={action} className="flex flex-col gap-4">
      <StatusBanner state={state} />
      <Panel accent title="Why Choose Us">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField label="Section Title" name="whyTitle" error={fe.whyTitle?.[0]} inputProps={{ defaultValue: a?.whyTitle }} />
            <FormField label="Heading" name="whyHeading" error={fe.whyHeading?.[0]} inputProps={{ defaultValue: a?.whyHeading }} />
            <FormField label="Heading Accent" name="whyHeadingAccent" error={fe.whyHeadingAccent?.[0]} inputProps={{ defaultValue: a?.whyHeadingAccent }} />
          </div>
          {([1, 2, 3, 4, 5, 6] as const).map((n) => (
            <div key={n} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label={`Card ${n} Title`} name={`why${n}Title`} error={fe[`why${n}Title`]?.[0]}
                inputProps={{ defaultValue: val(a, `why${n}Title`) }} />
              <FormField label={`Card ${n} Description`} name={`why${n}Description`} as="textarea" rows={3}
                error={fe[`why${n}Description`]?.[0]}
                inputProps={{ defaultValue: val(a, `why${n}Description`) }} />
            </div>
          ))}
        </div>
      </Panel>
      <SaveButton pending={pending} />
    </form>
  );
}

const TAB_COMPONENTS: Record<Tab, React.ComponentType<{ a: AboutSettings | null }>> = {
  Profile:    ProfileTab,
  Mission:    MissionTab,
  Vision:     VisionTab,
  Values:     ValuesTab,
  Commitment: CommitmentTab,
  "Why Us":   WhyUsTab,
};

export function AboutForm({ about: a }: { about: AboutSettings | null }) {
  const [tab, setTab] = useState<Tab>("Profile");
  const ActiveTab = TAB_COMPONENTS[tab];

  return (
    <div className="flex flex-col gap-4">
      <TabStrip active={tab} onChange={setTab} />
      <ActiveTab a={a} />
    </div>
  );
}
