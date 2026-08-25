interface SparkLineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export function SparkLine({
  data,
  width = 64,
  height = 24,
  color = "var(--admin-accent)",
}: SparkLineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = pad + (1 - (v - min) / range) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const polyline = points.join(" ");

  // Area fill path
  const first = points[0].split(",");
  const last = points[points.length - 1].split(",");
  const area = `M ${first[0]},${height} L ${polyline.replace(/(\d+\.?\d*),(\d+\.?\d*)/g, "L $1,$2").slice(2)} L ${last[0]},${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden
    >
      <path d={area} fill={color} fillOpacity={0.1} />
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Terminal dot */}
      <circle
        cx={points[points.length - 1].split(",")[0]}
        cy={points[points.length - 1].split(",")[1]}
        r={2}
        fill={color}
      />
    </svg>
  );
}
