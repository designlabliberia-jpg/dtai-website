import type { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
  accent?: boolean;       // 2px top border in brand blue
  grid?: boolean;         // engineering grid texture overlay
  title?: string;         // optional section label
  action?: ReactNode;     // optional top-right action slot
  padding?: "default" | "none";
}

export function Panel({
  children,
  className = "",
  accent = false,
  grid = false,
  title,
  action,
  padding = "default",
}: PanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-md)] ${className}`}
      style={{
        background: "var(--admin-surface)",
        border: "1px solid var(--admin-border)",
        boxShadow: "var(--admin-shadow-panel)",
        ...(accent && { borderTop: "2px solid var(--admin-brand)" }),
      }}
    >
      {/* Engineering grid texture */}
      {grid && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--admin-grid-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--admin-grid-color) 1px, transparent 1px)
            `,
            backgroundSize: "var(--admin-grid-size) var(--admin-grid-size)",
          }}
        />
      )}

      {/* Title bar */}
      {(title || action) && (
        <div
          className="relative z-10 flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid var(--admin-border)" }}
        >
          {title && (
            <span
              className="font-technical text-[10px] uppercase tracking-[0.12em]"
              style={{ color: "var(--admin-text-muted)" }}
            >
              {title}
            </span>
          )}
          {action && <div className="ml-auto">{action}</div>}
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 ${padding === "default" ? "p-5" : ""}`}>
        {children}
      </div>
    </div>
  );
}
