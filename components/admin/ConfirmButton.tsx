"use client";

import { useState, useTransition } from "react";
import type { LucideIcon } from "lucide-react";

interface ConfirmButtonProps {
  onConfirm: () => Promise<void>;
  icon: LucideIcon;
  confirmIcon?: LucideIcon;
  title?: string;
  confirmTitle?: string;
  danger?: boolean;
}

export function ConfirmButton({
  onConfirm,
  icon: Icon,
  confirmIcon: ConfirmIcon,
  title = "Delete",
  confirmTitle = "Confirm?",
  danger = true,
}: ConfirmButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!confirming) {
      setConfirming(true);
      // Auto-reset after 3s if no second click
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    startTransition(async () => {
      await onConfirm();
      setConfirming(false);
    });
  }

  const ActiveIcon = confirming && ConfirmIcon ? ConfirmIcon : Icon;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      title={confirming ? confirmTitle : title}
      className="flex items-center gap-1 rounded px-1.5 py-1 font-technical text-[9px] uppercase tracking-wide transition-all duration-150 disabled:opacity-40"
      style={{
        color: confirming
          ? danger ? "var(--admin-danger)" : "var(--admin-brand)"
          : "var(--admin-text-muted)",
        background: confirming
          ? danger ? "var(--admin-danger-bg)" : "var(--admin-info-bg)"
          : "transparent",
        border: confirming
          ? danger ? "1px solid var(--admin-danger)" : "1px solid var(--admin-border-accent)"
          : "1px solid transparent",
      }}
    >
      <ActiveIcon size={12} />
      {confirming && <span>{confirmTitle}</span>}
    </button>
  );
}
