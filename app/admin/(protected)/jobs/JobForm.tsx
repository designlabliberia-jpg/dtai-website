"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminFormShell } from "@/components/admin/AdminFormShell";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { SlugField } from "@/components/admin/SlugField";
import { ArrayField } from "@/components/admin/ArrayField";
import { createJob, updateJob } from "@/lib/actions/jobs";
import type { JobActionState } from "@/lib/actions/jobs";
import { JOB_TYPES, JOB_CATEGORIES } from "@/lib/validations/job.schema";

interface JobFormProps {
  job?: {
    id: string; slug: string; title: string; description: string; location: string;
    type: string; category: string; minQualifications: string[];
    preferredQualifications: string[]; aboutJob: string | null;
    active: boolean; order: number;
  };
}

const init: JobActionState = { success: false, error: "" };

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

export function JobForm({ job }: JobFormProps) {
  const router = useRouter();
  const isEdit = !!job;
  const [title, setTitle] = useState(job?.title ?? "");

  const action = isEdit ? updateJob.bind(null, job.id) : createJob;
  const [state, formAction, pending] = useActionState(
    action as (prev: JobActionState | null, fd: FormData) => Promise<JobActionState>,
    init
  );

  useEffect(() => {
    if (state.success) router.push("/admin/jobs");
  }, [state.success, router]);

  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};

  return (
    <AdminFormShell
      title={isEdit ? `Edit — ${job.title}` : "New Job Listing"}
      backHref="/admin/jobs"
      backLabel="Jobs"
      actions={
        <div className="flex gap-3">
          <button type="button" onClick={() => router.push("/admin/jobs")}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em]"
            style={{ color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border-strong)" }}>
            Cancel
          </button>
          <button form="job-form" type="submit" disabled={pending}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em] disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}>
            {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Job"}
          </button>
        </div>
      }
    >
      <form id="job-form" action={formAction} className="flex flex-col gap-4">
        {!state.success && state.error && (
          <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid #FECACA" }}>
            {state.error}
          </p>
        )}

        <Panel accent title="Identity">
          <div className="flex flex-col gap-4">
            <FormField label="Title" name="title" required error={fe.title?.[0]}
              inputProps={{ defaultValue: job?.title, onChange: (e) => setTitle(e.target.value) }} />
            <SlugField name="slug" sourceValue={title} defaultValue={job?.slug} error={fe.slug?.[0]} />
          </div>
        </Panel>

        <Panel accent title="Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Location" name="location" required error={fe.location?.[0]}
              inputProps={{ defaultValue: job?.location }} />
            <div className="flex flex-col gap-1.5">
              <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--admin-text-secondary)" }}>Type</label>
              <select name="type" defaultValue={job?.type ?? "Full-time"} style={selectStyle}>
                {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--admin-text-secondary)" }}>Category</label>
              <select name="category" defaultValue={job?.category ?? "Engineering"} style={selectStyle}>
                {JOB_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--admin-text-secondary)" }}>Order</label>
              <input name="order" type="number" min="0" defaultValue={job?.order ?? 0} style={selectStyle} />
            </div>
          </div>
        </Panel>

        <Panel accent title="Description">
          <FormField label="Job Description" name="description" as="textarea" rows={4} required
            error={fe.description?.[0]} inputProps={{ defaultValue: job?.description }} />
        </Panel>

        <Panel accent title="Qualifications">
          <div className="flex flex-col gap-4">
            <ArrayField label="Minimum Qualifications" name="minQualifications"
              defaultValue={job?.minQualifications} error={fe.minQualifications?.[0]}
              placeholder="Add qualification…" />
            <ArrayField label="Preferred Qualifications" name="preferredQualifications"
              defaultValue={job?.preferredQualifications}
              placeholder="Add preferred qualification…" />
          </div>
        </Panel>

        <Panel accent title="About This Role">
          <FormField label="About Job (optional)" name="aboutJob" as="textarea" rows={4}
            inputProps={{ defaultValue: job?.aboutJob ?? "" }} />
        </Panel>

        <Panel accent title="Visibility">
          <div className="flex items-center gap-3">
            <label className="font-technical text-[10px] uppercase tracking-[0.1em]"
              style={{ color: "var(--admin-text-secondary)" }}>Active</label>
            <input type="hidden" name="active" value="false" />
            <input type="checkbox" name="active" value="true"
              defaultChecked={job?.active ?? true}
              className="h-4 w-4 accent-[var(--admin-brand)]" />
          </div>
        </Panel>
      </form>
    </AdminFormShell>
  );
}
