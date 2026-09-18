"use client";

import { useTransition, useOptimistic } from "react";
import { Clock } from "lucide-react";

interface PublishToggleProps {
  id: string;
  published: boolean;
  onToggle: (id: string, value: boolean) => Promise<{ pendingApproval?: boolean } | void>;
  labelOn?: string;
  labelOff?: string;
  approvalStatus?: "pending" | "rejected" | null;
  onPendingApproval?: (itemName?: string) => void;
  itemName?: string;
}

export function PublishToggle({
  id,
  published,
  onToggle,
  labelOn = "Live",
  labelOff = "Draft",
  approvalStatus,
  onPendingApproval,
  itemName,
}: PublishToggleProps) {
  const [pending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(published);

  if (approvalStatus === "pending") {
    return (
      <span
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-technical text-[9px] uppercase tracking-[0.1em]"
        style={{ background: "var(--admin-warning-bg, #fef3c7)", color: "#d97706", border: "1px solid #fcd34d" }}
      >
        <Clock size={10} />
        Pending
      </span>
    );
  }

  function handleToggle() {
    const next = !optimistic;
    startTransition(async () => {
      setOptimistic(next);
      const result = await onToggle(id, next);
      if (result?.pendingApproval) {
        setOptimistic(false);
        onPendingApproval?.(itemName);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={pending}
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-technical text-[9px] uppercase tracking-[0.1em] transition-all duration-150 disabled:opacity-60"
      style={{
        background: optimistic ? "var(--admin-success-bg)" : "var(--admin-surface-2)",
        color: optimistic ? "var(--admin-success)" : "var(--admin-text-muted)",
        border: optimistic ? "1px solid #BBF7D0" : "1px solid var(--admin-border-strong)",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background: approvalStatus === "rejected"
            ? "var(--admin-danger)"
            : optimistic ? "var(--admin-success)" : "var(--admin-text-muted)",
        }}
      />
      {optimistic ? labelOn : labelOff}
    </button>
  );
}
