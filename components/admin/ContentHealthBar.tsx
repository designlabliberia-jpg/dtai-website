interface ContentHealthBarProps {
  label: string;
  published: number;
  total: number;
}

export function ContentHealthBar({ label, published, total }: ContentHealthBarProps) {
  const pct = total === 0 ? 0 : Math.round((published / total) * 100);
  const color =
    total === 0 || pct === 0
      ? "var(--admin-danger)"
      : pct >= 50
      ? "var(--admin-success)"
      : "var(--admin-warning)";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span
          className="font-technical text-[10px] uppercase tracking-[0.08em]"
          style={{ color: "var(--admin-text-secondary)" }}
        >
          {label}
        </span>
        <span
          className="font-technical text-[10px] tabular-nums"
          style={{ color: "var(--admin-text-muted)" }}
        >
          {published}/{total}
        </span>
      </div>
      <div
        className="h-1 w-full overflow-hidden rounded-full"
        style={{ background: "var(--admin-surface-2)", border: "1px solid var(--admin-border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-[var(--ease-system)]"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
