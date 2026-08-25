"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminFormShell } from "@/components/admin/AdminFormShell";
import { Panel } from "@/components/admin/Panel";
import { FormField } from "@/components/admin/FormField";
import { createClient, updateClient } from "@/lib/actions/clients";
import type { ClientActionState } from "@/lib/actions/clients";
import { CLIENT_STATUSES } from "@/lib/validations/client.schema";

const STATUS_LABELS: Record<string, string> = {
  lead: "Lead",
  proposal_sent: "Proposal Sent",
  negotiating: "Negotiating",
  won: "Won",
  lost: "Lost",
};

interface PipelineFormProps {
  client?: {
    id: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string | null;
    serviceInterest: string | null;
    status: string;
    estimatedValue: number | null;
  };
}

const initialState: ClientActionState = { success: false, error: "" };

export function PipelineForm({ client }: PipelineFormProps) {
  const router = useRouter();
  const isEdit = !!client;

  const action = isEdit
    ? updateClient.bind(null, client.id)
    : createClient;

  const [state, formAction, pending] = useActionState(
    action as (prev: ClientActionState | null, fd: FormData) => Promise<ClientActionState>,
    initialState
  );

  useEffect(() => {
    if (state.success) router.push("/admin/pipeline");
  }, [state.success, router]);

  const fe = (state as { fieldErrors?: Record<string, string[]> }).fieldErrors ?? {};

  return (
    <AdminFormShell
      title={isEdit ? `Edit — ${client.companyName}` : "New Client"}
      backHref="/admin/pipeline"
      backLabel="Pipeline"
      actions={
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/pipeline")}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em] transition-colors"
            style={{ color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border-strong)" }}
          >
            Cancel
          </button>
          <button
            form="pipeline-form"
            type="submit"
            disabled={pending}
            className="rounded-[var(--radius-sm)] px-4 py-2 font-technical text-[11px] uppercase tracking-[0.08em] transition-opacity disabled:opacity-60"
            style={{ background: "var(--admin-brand)", color: "#fff" }}
          >
            {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Client"}
          </button>
        </div>
      }
    >
      <form id="pipeline-form" action={formAction} className="flex flex-col gap-4">
        {state.error && !state.success && (
          <p className="rounded-[var(--radius-sm)] px-4 py-3 font-technical text-[11px]"
            style={{ background: "var(--admin-danger-bg)", color: "var(--admin-danger)", border: "1px solid #FECACA" }}>
            {state.error}
          </p>
        )}

        <Panel accent title="Company">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Company Name"
              name="companyName"
              required
              error={fe.companyName?.[0]}
              inputProps={{ defaultValue: client?.companyName }}
            />
            <FormField
              label="Service Interest"
              name="serviceInterest"
              error={fe.serviceInterest?.[0]}
              inputProps={{ defaultValue: client?.serviceInterest ?? "" }}
            />
          </div>
        </Panel>

        <Panel accent title="Contact">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Contact Name"
              name="contactName"
              required
              error={fe.contactName?.[0]}
              inputProps={{ defaultValue: client?.contactName }}
            />
            <FormField
              label="Contact Email"
              name="contactEmail"
              required
              error={fe.contactEmail?.[0]}
              inputProps={{ type: "email", defaultValue: client?.contactEmail }}
            />
            <FormField
              label="Phone (E.164)"
              name="contactPhone"
              error={fe.contactPhone?.[0]}
              hint="+2319876543"
              inputProps={{ defaultValue: client?.contactPhone ?? "" }}
            />
          </div>
        </Panel>

        <Panel accent title="Deal">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="status"
                className="font-technical text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--admin-text-secondary)" }}
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={client?.status ?? "lead"}
                className="rounded-[var(--radius-sm)] px-3 py-2 text-sm outline-none"
                style={{
                  background: "var(--admin-surface)",
                  border: "1px solid var(--admin-border-strong)",
                  color: "var(--admin-text-primary)",
                }}
              >
                {CLIENT_STATUSES.map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <FormField
              label="Estimated Value (USD)"
              name="estimatedValue"
              error={fe.estimatedValue?.[0]}
              inputProps={{
                type: "number",
                min: "0",
                step: "0.01",
                defaultValue: client?.estimatedValue?.toString() ?? "",
              }}
            />
          </div>
        </Panel>
      </form>
    </AdminFormShell>
  );
}
