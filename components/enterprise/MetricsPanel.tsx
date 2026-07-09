interface Metric {
  value: string;
  label: string;
}

interface MetricsPanelProps {
  metrics: Metric[];
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="border-l-2 border-tech-blue pl-4">
          <div className="font-technical text-2xl font-semibold text-neutral-900 md:text-3xl">
            {metric.value}
          </div>
          <div className="mt-1 text-sm text-neutral-600">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
