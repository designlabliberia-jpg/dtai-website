interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSegment[];
  size?: number;
  thickness?: number;
}

export function DonutChart({ data, size = 120, thickness = 18 }: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  let offset = 0;

  const segments = data.map((seg) => {
    const dash = (seg.value / total) * circumference;
    const gap = circumference - dash;
    const rotation = (offset / total) * 360 - 90;
    offset += seg.value;
    return { ...seg, dash, gap, rotation };
  });

  return (
    <div className="flex items-center gap-5">
      {/* Ring */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shrink-0"
        aria-hidden
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--admin-surface-2)"
          strokeWidth={thickness}
        />
        {/* Segments */}
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${seg.dash} ${seg.gap}`}
            strokeLinecap="butt"
            transform={`rotate(${seg.rotation} ${cx} ${cy})`}
          />
        ))}
        {/* Center total */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={14}
          fontWeight={600}
          fill="var(--admin-text-primary)"
          fontFamily="var(--font-primary)"
        >
          {total}
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {data.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: seg.color }}
            />
            <span
              className="font-technical text-[10px] uppercase tracking-[0.08em]"
              style={{ color: "var(--admin-text-secondary)" }}
            >
              {seg.label}
            </span>
            <span
              className="ml-auto font-technical text-[11px] font-medium tabular-nums"
              style={{ color: "var(--admin-text-primary)" }}
            >
              {seg.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
