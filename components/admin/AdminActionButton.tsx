"use client";

import type { LucideIcon } from "lucide-react";

interface AdminActionButtonProps {
  icon: LucideIcon;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  hoverColor?: string;
  size?: number;
}

export function AdminActionButton({
  icon: Icon,
  title,
  onClick,
  disabled = false,
  hoverColor = "var(--admin-brand)",
  size = 13,
}: AdminActionButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className="transition-colors disabled:opacity-40"
      style={{ color: "var(--admin-text-muted)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
    >
      <Icon size={size} />
    </button>
  );
}
