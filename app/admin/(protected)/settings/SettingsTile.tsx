"use client";

import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export function SettingsTile({ icon: Icon, title, description, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-3 rounded-[var(--radius-md)] p-6 text-center transition-all"
      style={{
        background: "var(--admin-surface)",
        border: "1px solid var(--admin-border)",
        boxShadow: "var(--admin-shadow-panel)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--admin-brand)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--admin-shadow-raised)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--admin-border)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--admin-shadow-panel)";
      }}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: "var(--admin-surface-2)" }}
      >
        <Icon size={26} style={{ color: "var(--admin-brand)" }} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-1">
        <span
          className="font-technical text-[11px] uppercase tracking-[0.1em]"
          style={{ color: "var(--admin-brand)" }}
        >
          {title}
        </span>
        <span className="text-[11px] leading-snug" style={{ color: "var(--admin-text-muted)" }}>
          {description}
        </span>
      </div>
    </button>
  );
}
