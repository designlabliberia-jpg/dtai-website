interface ColumnChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}

export function ColumnChart({
  data,
  height = 80,
  color = "var(--admin-brand)",
}: ColumnChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barWidth = 100 / (data.length * 2 - 1); // percent width per bar with equal gaps

  return (
    <div className="flex flex-col gap-2">
      {/* Bars */}
      <div className="flex items-end gap-1" style={{ height }}>
        {data.map((item, i) => {
          const pct = (item.value / max) * 100;
          return (
            <div
              key={i}
              className="group relative flex flex-1 flex-col items-center justify-end"
              style={{ height }}
            >
              {/* Tooltip on hover */}
              <div
                className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded px-1.5 py-0.5 font-technical text-[9px] font-medium opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: "var(--admin-brand-deep)",
                  color: "var(--admin-text-inverse)",
                  whiteSpace: "nowrap",
                }}
              >
                {item.value}
              </div>
              <div
                className="w-full rounded-t-[2px] transition-all duration-300 ease-[var(--ease-system)]"
                style={{
                  height: `${Math.max(pct, item.value > 0 ? 4 : 0)}%`,
                  background: color,
                  opacity: 0.85,
                  minHeight: item.value > 0 ? 3 : 0,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* X-axis labels */}
      <div className="flex gap-1">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex-1 text-center font-technical text-[9px] uppercase tracking-wide"
            style={{ color: "var(--admin-text-muted)" }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
