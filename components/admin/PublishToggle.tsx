"use client";

import { useTransition, useOptimistic } from "react";

interface PublishToggleProps {
  id: string;
  published: boolean;
  onToggle: (id: string, value: boolean) => Promise<void>;
  labelOn?: string;
  labelOff?: string;
}

export function PublishToggle({
  id,
  published,
  onToggle,
  labelOn = "Live",
  labelOff = "Draft",
}: PublishToggleProps) {
  const [pending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(published);

  function handleToggle() {
    const next = !optimistic;
    startTransition(async () => {
      setOptimistic(next);
      await onToggle(id, next);
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
        style={{ background: optimistic ? "var(--admin-success)" : "var(--admin-text-muted)" }}
      />
      {optimistic ? labelOn : labelOff}
    </button>
  );
}
