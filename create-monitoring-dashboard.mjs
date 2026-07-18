import fs from "fs";

const content = `"use client";

import { AlertTriangle, CheckCircle2, Activity } from "lucide-react";

interface SensorReading {
  station: string;
  metric: string;
  value: string;
  status: "normal" | "alert";
}

const READINGS: SensorReading[] = [
  { station: "Station 01", metric: "Water Turbidity", value: "3.8 NTU", status: "normal" },
  { station: "Station 02", metric: "River Level", value: "4.2 m", status: "alert" },
  { station: "Station 03", metric: "Air Quality (PM2.5)", value: "18 \u00b5g/m\u00b3", status: "normal" },
  { station: "Station 04", metric: "Soil Moisture", value: "22%", status: "normal" },
];

export function MonitoringDashboard() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-infra-midnight shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Activity size={15} className="text-tech-blue" strokeWidth={1.75} />
          <span className="font-technical text-xs uppercase tracking-wide text-neutral-300">
            Live Monitoring &mdash; Representative View
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-technical text-[10px] uppercase tracking-wide text-neutral-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
          Streaming
        </span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
        {READINGS.map((r) => (
          <div key={r.station} className="bg-infra-midnight p-5">
            <div className="flex items-center justify-between">
              <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-500">
                {r.station}
              </span>
              {r.status === "alert" ? (
                <AlertTriangle size={14} className="text-[#E0B84B]" strokeWidth={1.75} />
              ) : (
                <CheckCircle2 size={14} className="text-tech-blue" strokeWidth={1.75} />
              )}
            </div>
            <p className="mt-2 text-sm text-neutral-300">{r.metric}</p>
            <p className="mt-1 font-technical text-xl font-semibold text-white">{r.value}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 px-5 py-3">
        <span className="font-technical text-[10px] text-neutral-500">
          Illustrative sample &mdash; actual dashboards are configured per deployment and sensor network.
        </span>
      </div>
    </div>
  );
}
`;

fs.writeFileSync("components/enterprise/MonitoringDashboard.tsx", content);
console.log("Created components/enterprise/MonitoringDashboard.tsx");
