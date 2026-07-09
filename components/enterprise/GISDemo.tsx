"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";

const layers = [
  {
    id: "base",
    label: "Base Map",
    description: "Administrative boundaries and geography",
    color: "var(--color-neutral-300)",
    alwaysOn: true,
  },
  {
    id: "infrastructure",
    label: "Infrastructure Data",
    description: "Roads, facilities, and utility networks",
    color: "var(--color-tech-blue)",
    alwaysOn: false,
  },
  {
    id: "population",
    label: "Population Density",
    description: "Demographic distribution across regions",
    color: "var(--color-dtai-blue)",
    alwaysOn: false,
  },
  {
    id: "risk",
    label: "Risk / Priority Zones",
    description: "Areas flagged for service gaps or intervention priority",
    color: "#E0B84B",
    alwaysOn: false,
  },
];

// Deterministic pseudo-random points per layer, laid out on a fixed grid
const layerPoints: Record<string, { x: number; y: number; r: number }[]> = {
  infrastructure: [
    { x: 120, y: 90, r: 3 }, { x: 260, y: 140, r: 3 }, { x: 340, y: 80, r: 3 },
    { x: 180, y: 210, r: 3 }, { x: 400, y: 200, r: 3 }, { x: 90, y: 250, r: 3 },
    { x: 300, y: 260, r: 3 },
  ],
  population: [
    { x: 150, y: 120, r: 14 }, { x: 320, y: 100, r: 10 }, { x: 220, y: 220, r: 18 },
    { x: 380, y: 240, r: 8 }, { x: 100, y: 200, r: 6 },
  ],
  risk: [
    { x: 200, y: 160, r: 22 }, { x: 350, y: 190, r: 16 },
  ],
};

export function GISDemo() {
  const [active, setActive] = useState<string[]>([]);

  function toggleLayer(id: string) {
    setActive((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  }

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-12 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-brand">
            GIS Demonstration
          </span>
          <h2 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            From map layers to decision support
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Toggle data layers to see how spatial data compounds into
            actionable insight &mdash; a simplified representation of DTAI&rsquo;s
            GIS and spatial technology work.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-lg border border-neutral-300/60 bg-neutral-950 p-4">
            <svg viewBox="0 0 480 320" className="h-full w-full">
              <defs>
                <pattern id="gis-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--color-neutral-800)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="480" height="320" fill="url(#gis-grid)" />
              {/* Base boundary shape, always visible */}
              <path
                d="M 40 40 L 440 40 L 440 280 L 40 280 Z"
                fill="none"
                stroke="var(--color-neutral-600)"
                strokeWidth="1.5"
              />

              {active.map((layerId) =>
                (layerPoints[layerId] || []).map((pt, i) => {
                  const layer = layers.find((l) => l.id === layerId)!;
                  return (
                    <circle
                      key={`${layerId}-${i}`}
                      cx={pt.x}
                      cy={pt.y}
                      r={pt.r}
                      fill={layer.color}
                      opacity={layerId === "population" || layerId === "risk" ? 0.35 : 0.9}
                    />
                  );
                })
              )}
            </svg>
          </div>

          <div className="space-y-3">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => !layer.alwaysOn && toggleLayer(layer.id)}
                disabled={layer.alwaysOn}
                className={`w-full rounded-md border p-4 text-left transition-colors duration-micro ${
                  layer.alwaysOn
                    ? "cursor-default border-neutral-300 bg-neutral-50"
                    : active.includes(layer.id)
                    ? "border-tech-blue bg-tech-blue/5"
                    : "border-neutral-300 hover:border-tech-blue"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                  <span className="text-sm font-semibold text-neutral-900">
                    {layer.label}
                  </span>
                  {layer.alwaysOn && (
                    <span className="ml-auto font-technical text-[10px] uppercase tracking-wide text-neutral-500">
                      Always on
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                  {layer.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
