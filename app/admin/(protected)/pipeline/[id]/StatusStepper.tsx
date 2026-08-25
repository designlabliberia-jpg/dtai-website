"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateClientStatus } from "@/lib/actions/clients";
import { CLIENT_STATUSES } from "@/lib/validations/client.schema";
import type { ClientStatus } from "@/lib/validations/client.schema";

const LABELS: Record<ClientStatus, string> = {
  lead: "Lead",
  proposal_sent: "Proposal",
  negotiating: "Negotiating",
  won: "Won",
  lost: "Lost",
};

const COLORS: Record<ClientStatus, string> = {
  lead: "var(--admin-brand)",
  proposal_sent: "var(--admin-accent)",
  negotiating: "#C2410C",
  won: "var(--admin-success)",
  lost: "var(--admin-text-muted)",
};

interface StatusStepperProps {
  clientId: string;
  currentStatus: string;
}

export function StatusStepper({ clientId, currentStatus }: StatusStepperProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleStep(status: ClientStatus) {
    if (status === currentStatus) return;
    startTransition(async () => {
      await updateClientStatus(clientId, status);
      router.refresh();
    });
  }

  const currentIdx = CLIENT_STATUSES.indexOf(currentStatus as ClientStatus);

  return (
    <div
      className="flex items-center gap-0 overflow-hidden rounded-[var(--radius-md)]"
      style={{
        background: "var(--admin-surface)",
        border: "1px solid var(--admin-border)",
        boxShadow: "var(--admin-shadow-panel)",
        borderTop: "2px solid var(--admin-brand)",
      }}
    >
      {CLIENT_STATUSES.map((status, i) => {
        const active = status === currentStatus;
        const past = i < currentIdx;
        const color = COLORS[status];

        return (
          <button
            key={status}
            type="button"
            onClick={() => handleStep(status)}
            disabled={pending}
            className="group relative flex flex-1 flex-col items-center gap-1.5 px-3 py-4 transition-colors disabled:opacity-60"
            style={{
              background: active ? `${color}14` : "transparent",
              borderRight: i < CLIENT_STATUSES.length - 1 ? "1px solid var(--admin-border)" : "none",
            }}
          >
            {/* Connector line */}
            {i > 0 && (
              <div
                className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2"
                style={{ background: past || active ? color : "var(--admin-border)" }}
              />
            )}

            {/* Step dot */}
            <div
              className="h-2 w-2 rounded-full transition-colors"
              style={{
                background: active || past ? color : "var(--admin-border-strong)",
                boxShadow: active ? `0 0 0 3px ${color}22` : "none",
              }}
            />

            <span
              className="font-technical text-[9px] uppercase tracking-[0.1em] transition-colors"
              style={{ color: active ? color : "var(--admin-text-muted)" }}
            >
              {LABELS[status]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
