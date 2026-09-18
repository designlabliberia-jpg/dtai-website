"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface AdminDrawerProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

export function AdminDrawer({ title, open, onClose, children, maxWidth = "max-w-2xl" }: AdminDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className={`relative z-10 flex w-full ${maxWidth} max-h-[90vh] flex-col overflow-hidden rounded-[var(--radius-md)]`}
        style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", boxShadow: "var(--admin-shadow-modal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex shrink-0 items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid var(--admin-border)", borderTop: "2px solid var(--admin-brand)" }}
        >
          <span className="font-technical text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--admin-text-primary)" }}>
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] transition-colors"
            style={{ color: "var(--admin-text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
          >
            <X size={15} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
