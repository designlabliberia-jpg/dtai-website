import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { SparkLine } from "./SparkLine";

interface KpiTileProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  delta?: number;        // percentage change vs prior period
  spark?: number[];      // 7-day trend data
  format?: "number" | "currency" | "percent";
  href?: string;
}

function formatValue(value: number | string, format: KpiTileProps["format"]) {
  if (typeof value === "string") return value;
  if (format === "currency") return `$${value.toLocaleString()}`;
  if (format === "percent") return `${value}%`;
  return value.toLocaleString();
}

export function KpiTile({
  label,
  value,
  icon: Icon,
  delta,
  spark,
  format = "number",
}: KpiTileProps) {
  const hasDelta = delta !== undefined;
  const positive = (delta ?? 0) > 0;
  const neutral = delta === 0;

  return (
    <div
      className="relative overflow-hidden rounded-[var(--radius-md)] p-5 flex flex-col gap-3"
      style={{
        background: "var(--admin-surface)",
        border: "1px solid var(--admin-border)",
        boxShadow: "var(--admin-shadow-panel)",
        borderTop: "2px solid var(--admin-brand)",
      }}
    >
      {/* Engineering grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--admin-grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--admin-grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "var(--admin-grid-size) var(--admin-grid-size)",
        }}
      />

      {/* Top row: icon + delta */}
      <div className="relative flex items-center justify-between">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)]"
          style={{ background: "var(--admin-info-bg)" }}
        >
          <Icon size={15} style={{ color: "var(--admin-brand)" }} />
        </div>

        {hasDelta && (
          <span
            className="flex items-center gap-1 font-technical text-[10px] font-medium"
            style={{
              color: neutral
                ? "var(--admin-text-muted)"
                : positive
                ? "var(--admin-success)"
                : "var(--admin-danger)",
            }}
          >
            {neutral ? (
              <Minus size={10} />
            ) : positive ? (
              <TrendingUp size={10} />
            ) : (
              <TrendingDown size={10} />
            )}
            {neutral ? "—" : `${positive ? "+" : ""}${delta}%`}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="relative">
        <p
          className="text-2xl font-semibold leading-none tracking-tight"
          style={{ color: "var(--admin-text-primary)" }}
        >
          {formatValue(value, format)}
        </p>
        <p
          className="mt-1.5 font-technical text-[10px] uppercase tracking-[0.1em]"
          style={{ color: "var(--admin-text-muted)" }}
        >
          {label}
        </p>
      </div>

      {/* Sparkline */}
      {spark && spark.length >= 2 && (
        <div className="relative">
          <SparkLine data={spark} width={120} height={28} />
        </div>
      )}
    </div>
  );
}
