interface BarChartItem {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartItem[];
  height?: number;
  showValues?: boolean;
  showPercent?: boolean;
}

export function BarChart({
  data,
  showValues = true,
  showPercent = false,
}: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const total = data.reduce((s, d) => s + d.value, 0) || 1;

  return (
    <div className="flex flex-col gap-2.5">
      {data.map((item, i) => {
        const pct = (item.value / max) * 100;
        const sharePct = Math.round((item.value / total) * 100);

        return (
          <div key={i} className="flex items-center gap-3">
            {/* Label */}
            <span
              className="w-28 shrink-0 truncate font-technical text-[10px] uppercase tracking-[0.08em] text-right"
              style={{ color: "var(--admin-text-secondary)" }}
            >
              {item.label}
            </span>

            {/* Bar track */}
            <div
              className="relative flex-1 overflow-hidden rounded-full"
              style={{
                height: 6,
                background: "var(--admin-surface-2)",
                border: "1px solid var(--admin-border)",
              }}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-[var(--ease-system)]"
                style={{
                  width: `${pct}%`,
                  background: item.color ?? "var(--admin-brand)",
                }}
              />
            </div>

            {/* Value / percent */}
            {showValues && (
              <span
                className="w-10 shrink-0 font-technical text-[11px] font-medium tabular-nums"
                style={{ color: "var(--admin-text-primary)" }}
              >
                {showPercent ? `${sharePct}%` : item.value}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
