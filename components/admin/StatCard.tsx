import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  href?: string;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div
      className="flex items-center gap-4 rounded-[var(--radius-md)] p-5"
      style={{
        background: "var(--admin-surface)",
        border: "1px solid var(--admin-border)",
        boxShadow: "var(--admin-shadow-panel)",
      }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)]"
        style={{ background: "var(--admin-info-bg)" }}
      >
        <Icon size={18} style={{ color: "var(--admin-brand)" }} />
      </div>
      <div>
        <p
          className="font-technical text-[10px] uppercase tracking-widest"
          style={{ color: "var(--admin-text-muted)" }}
        >
          {label}
        </p>
        <p
          className="mt-0.5 text-2xl font-semibold"
          style={{ color: "var(--admin-text-primary)" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
