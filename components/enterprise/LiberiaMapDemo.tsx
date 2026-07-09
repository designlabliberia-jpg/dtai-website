"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { liberiaCounties, type CountyData } from "@/lib/liberia-counties-data";

const scoreColor: Record<string, string> = {
  High: "var(--color-tech-blue)",
  Moderate: "#E0B84B",
  Low: "var(--color-neutral-600)",
};

export function LiberiaMapDemo() {
  const [hovered, setHovered] = useState<CountyData | null>(null);
  const [selected, setSelected] = useState<CountyData | null>(null);

  const display = hovered || selected;

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-4 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-brand">
            GIS Demonstration &mdash; Liberia
          </span>
          <h2 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Spatial data by county
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Hover or tap a county to see how spatial and connectivity data
            supports institutional decision-making. Layout is schematic;
            figures shown are illustrative placeholder data.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-lg border border-neutral-300/60 bg-neutral-950 p-4">
            <svg viewBox="0 0 500 420" className="h-full w-full">
              <defs>
                <pattern id="lib-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--color-neutral-800)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="500" height="420" fill="url(#lib-grid)" />

              {liberiaCounties.map((county) => {
                const isActive = display?.id === county.id;
                return (
                  <g
                    key={county.id}
                    onMouseEnter={() => setHovered(county)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(county)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={county.gridX}
                      cy={county.gridY}
                      r={isActive ? 16 : 12}
                      fill={scoreColor[county.connectivityScore]}
                      opacity={isActive ? 0.9 : 0.55}
                      style={{ transition: "all 200ms ease" }}
                    />
                    <text
                      x={county.gridX}
                      y={county.gridY + 28}
                      textAnchor="middle"
                      fill={isActive ? "white" : "var(--color-neutral-600)"}
                      fontSize="9"
                      fontFamily="var(--font-technical)"
                      style={{ transition: "fill 200ms ease" }}
                    >
                      {county.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div>
            <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-600">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: scoreColor.High }} />
                High connectivity
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: scoreColor.Moderate }} />
                Moderate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: scoreColor.Low }} />
                Low
              </span>
            </div>

            <div className="min-h-[220px] rounded-lg border border-neutral-300/60 bg-neutral-50 p-6">
              <AnimatePresence mode="wait">
                {display ? (
                  <motion.div
                    key={display.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-primary text-lg font-semibold text-neutral-900">
                      {display.name}
                    </h3>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div className="flex justify-between border-b border-neutral-200 pb-2">
                        <dt className="text-neutral-500">Population (est.)</dt>
                        <dd className="font-technical text-neutral-900">{display.population}</dd>
                      </div>
                      <div className="flex justify-between border-b border-neutral-200 pb-2">
                        <dt className="text-neutral-500">Connectivity</dt>
                        <dd className="font-technical text-neutral-900">{display.connectivityScore}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-neutral-500">Active Projects</dt>
                        <dd className="font-technical text-neutral-900">{display.activeProjects}</dd>
                      </div>
                    </dl>
                  </motion.div>
                ) : (
                  <p className="text-sm text-neutral-500">
                    Hover or select a county to view its data.
                  </p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
