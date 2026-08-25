import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface AdminFormShellProps {
  title: string;
  backHref: string;
  backLabel?: string;
  children: ReactNode;
  actions?: ReactNode;   // replaces default save/cancel if provided
}

export function AdminFormShell({
  title,
  backHref,
  backLabel = "Back",
  children,
  actions,
}: AdminFormShellProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link
          href={backHref}
          className="flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-[0.1em] transition-colors"
          style={{ color: "var(--admin-text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
        >
          <ChevronLeft size={11} />
          {backLabel}
        </Link>
        <span
          className="font-technical text-[10px]"
          style={{ color: "var(--admin-border-strong)" }}
        >
          /
        </span>
        <span
          className="font-technical text-[10px] uppercase tracking-[0.1em]"
          style={{ color: "var(--admin-text-secondary)" }}
        >
          {title}
        </span>
      </div>

      {/* Title */}
      <h1
        className="text-[18px] font-semibold leading-tight tracking-tight"
        style={{ color: "var(--admin-text-primary)" }}
      >
        {title}
      </h1>

      {/* Form content */}
      {children}

      {/* Actions */}
      {actions && (
        <div
          className="flex items-center justify-end gap-3 rounded-[var(--radius-md)] px-5 py-4"
          style={{
            background: "var(--admin-surface)",
            border: "1px solid var(--admin-border)",
            boxShadow: "var(--admin-shadow-panel)",
          }}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
