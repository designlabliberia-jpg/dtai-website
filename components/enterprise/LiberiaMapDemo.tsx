"use client";

import { useState, useMemo, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { liberiaCounties, getCountyById, type CountyData } from "@/lib/liberia-counties-data";

type Mode = "connectivity" | "population" | "projects";

const modes: { id: Mode; label: string }[] = [
  { id: "connectivity", label: "Connectivity" },
  { id: "population", label: "Population" },
  { id: "projects", label: "Active Projects" },
];

const tierColor = {
  High: "var(--color-tech-blue)",
  Moderate: "#E0B84B",
  Low: "var(--color-neutral-600)",
};

function populationTier(c: CountyData): "High" | "Moderate" | "Low" {
  if (c.populationValue >= 400000) return "High";
  if (c.populationValue >= 150000) return "Moderate";
  return "Low";
}
function projectsTier(c: CountyData): "High" | "Moderate" | "Low" {
  if (c.activeProjects >= 4) return "High";
  if (c.activeProjects >= 2) return "Moderate";
  return "Low";
}
function tierFor(mode: Mode, c: CountyData) {
  if (mode === "connectivity") return c.connectivityScore;
  if (mode === "population") return populationTier(c);
  return projectsTier(c);
}

const FALLBACK_VIEWBOX = "0 0 1000 1000";

// Sparse ambient background nodes — decorative only, positioned around the
// map's edges rather than a full-canvas grid, so it reads as atmosphere
// rather than a container boundary.
const ambientNodes = [
  { x: "6%", y: "18%", delay: 0 },
  { x: "92%", y: "12%", delay: 0.4 },
  { x: "88%", y: "70%", delay: 0.8 },
  { x: "10%", y: "78%", delay: 1.2 },
  { x: "50%", y: "8%", delay: 1.6 },
  { x: "4%", y: "48%", delay: 2 },
  { x: "95%", y: "45%", delay: 2.4 },
];

export function LiberiaMapDemo() {
  const [hovered, setHovered] = useState<CountyData | null>(null);
  const [selected, setSelected] = useState<CountyData | null>(null);
  const [mode, setMode] = useState<Mode>("connectivity");
  const [zoomed, setZoomed] = useState<CountyData | null>(null);
  const [viewBox, setViewBox] = useState(FALLBACK_VIEWBOX);

  const mapGroupRef = useRef<SVGGElement | null>(null);

  useLayoutEffect(() => {
    if (!mapGroupRef.current) return;
    try {
      const bbox = mapGroupRef.current.getBBox();
      if (bbox.width > 0 && bbox.height > 0) {
        const padX = bbox.width * 0.1;
        const padY = bbox.height * 0.1;
        setViewBox(
          `${bbox.x - padX} ${bbox.y - padY} ${bbox.width + padX * 2} ${bbox.height + padY * 2}`
        );
      }
    } catch {
      // getBBox can throw in some SSR/edge rendering paths — fall back silently
    }
  }, []);

  const display = hovered || selected;

  const neighborLines = useMemo(() => {
    if (!display) return [];
    return display.neighbors.map((nId) => getCountyById(nId)).filter(Boolean) as CountyData[];
  }, [display]);

  const mapCenter = useMemo(() => {
    const [x, y, w, h] = viewBox.split(" ").map(Number);
    return { x: x + w / 2, y: y + h / 2 };
  }, [viewBox]);

  // Real aggregate stats, computed directly from the county dataset —
  // not invented figures, just a rollup of what's already there.
  const stats = useMemo(() => {
    const totalPopulation = liberiaCounties.reduce((sum, c) => sum + c.populationValue, 0);
    const totalProjects = liberiaCounties.reduce((sum, c) => sum + c.activeProjects, 0);
    const highConnectivity = liberiaCounties.filter((c) => c.connectivityScore === "High").length;
    return {
      counties: liberiaCounties.length,
      totalPopulation,
      totalProjects,
      highConnectivity,
    };
  }, []);

  function handleCountyClick(county: CountyData) {
    setSelected(county);
    setZoomed((prev) => (prev?.id === county.id ? null : county));
  }

  return (
    <section className="bg-neutral-950 py-24 text-white">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
              GIS Demonstration &mdash; Liberia
            </span>
            <h2 className="mt-3 font-primary text-3xl font-semibold tracking-tight md:text-4xl">
              Spatial data by county
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-300">
              Click a county to zoom in, hover to preview data. County
              boundaries are sourced from real Liberia county-level geometry;
              population, connectivity, and project figures shown are
              illustrative placeholder data pending verified figures.
            </p>
          </div>

          <div className="flex gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors duration-micro ${
                  mode === m.id
                    ? "bg-brand text-white"
                    : "border border-white/20 text-neutral-300 hover:border-tech-blue"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real aggregate stats row, filling space above the map with
            genuine derived data rather than decoration */}
        <div className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 sm:grid-cols-4">
          {[
            { label: "Counties Mapped", value: stats.counties },
            { label: "High Connectivity", value: stats.highConnectivity },
            { label: "Active Projects, All Counties", value: stats.totalProjects },
            { label: "Population Represented (est.)", value: stats.totalPopulation.toLocaleString() },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.03] px-5 py-4">
              <div className="font-technical text-xl font-semibold text-white md:text-2xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs leading-snug text-neutral-400">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>

      {/* Full-bleed map with sparse ambient background — spans full
          viewport width so it never feels boxed in */}
      <div className="relative w-full">
        {/* Ambient atmosphere: soft glow + a few slow-pulsing nodes around
            the edges, filling the surrounding dark space without forming
            a grid or boundary shape */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,166,255,0.06), transparent 70%)",
            }}
          />
          {ambientNodes.map((n, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-tech-blue/40"
              style={{ left: n.x, top: n.y }}
              animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: n.delay,
              }}
            />
          ))}
        </div>

        {zoomed && (
          <button
            onClick={() => setZoomed(null)}
            className="absolute right-6 top-6 z-10 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors duration-micro hover:border-tech-blue"
          >
            Reset View
          </button>
        )}

        <motion.svg
          viewBox={viewBox}
          className="relative h-[560px] w-full md:h-[720px] lg:h-[820px]"
          style={{ overflow: "visible" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <motion.g
            style={{
              transformOrigin: zoomed
                ? `${zoomed.labelX}px ${zoomed.labelY}px`
                : `${mapCenter.x}px ${mapCenter.y}px`,
            }}
            animate={{ scale: zoomed ? 2.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <g ref={mapGroupRef}>
              <AnimatePresence>
                {display &&
                  neighborLines.map((n) => (
                    <motion.line
                      key={`${display.id}-${n.id}`}
                      x1={display.labelX}
                      y1={display.labelY}
                      x2={n.labelX}
                      y2={n.labelY}
                      stroke="var(--color-tech-blue)"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.7 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                    />
                  ))}
              </AnimatePresence>

              {liberiaCounties.map((county) => {
                const isActive = display?.id === county.id;
                const tier = tierFor(mode, county);
                return (
                  <g
                    key={county.id}
                    onMouseEnter={() => setHovered(county)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleCountyClick(county)}
                    className="cursor-pointer"
                  >
                    {isActive && (
                      <motion.circle
                        cx={county.labelX}
                        cy={county.labelY}
                        r={26}
                        fill="none"
                        stroke={tierColor[tier]}
                        strokeWidth="1.2"
                        initial={{ opacity: 0.6, scale: 0.6 }}
                        animate={{ opacity: 0, scale: 1.6 }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <path
                      d={county.path}
                      fill={tierColor[tier]}
                      opacity={isActive ? 0.9 : 0.6}
                      stroke="var(--color-neutral-950)"
                      strokeWidth="2"
                      style={{ transition: "opacity 200ms ease, fill 200ms ease" }}
                    />
                    <text
                      x={county.labelX}
                      y={county.labelY}
                      textAnchor="middle"
                      fill={isActive ? "white" : "var(--color-neutral-300)"}
                      fontSize="13"
                      fontFamily="var(--font-technical)"
                      paintOrder="stroke"
                      stroke="rgba(0,0,0,0.55)"
                      strokeWidth="3"
                      style={{ transition: "fill 200ms ease", pointerEvents: "none" }}
                    >
                      {county.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </g>
          </motion.g>
        </motion.svg>
      </div>

      <Container>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: tierColor.High }}/>
                High
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: tierColor.Moderate }} />
                Moderate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: tierColor.Low }} />
                Low
              </span>
            </div>

            <div className="min-h-[160px] rounded-lg border border-white/10 bg-white/5 p-6">
              <AnimatePresence mode="wait">
                {display ? (
                  <motion.div
                    key={display.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-primary text-lg font-semibold text-white">
                      {display.name}
                    </h3>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <dt className="text-neutral-400">Population (est.)</dt>
                        <dd className="font-technical text-white">{display.population}</dd>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <dt className="text-neutral-400">Connectivity</dt>
                        <dd className="font-technical text-white">{display.connectivityScore}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-neutral-400">Active Projects</dt>
                        <dd className="font-technical text-white">{display.activeProjects}</dd>
                      </div>
                    </dl>
                  </motion.div>
                ) : (
                  <p className="text-sm text-neutral-400">
                    Hover or click a county to view its data. Click again to zoom in.
                  </p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-500">
              About This Demonstration
            </span>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              This map uses real Liberia county boundary data to demonstrate
              DTAI&rsquo;s GIS and spatial technology capability &mdash; the
              same class of tooling used for infrastructure planning,
              service-gap analysis, and regional decision support.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              Population, connectivity, and project figures shown here are
              illustrative placeholders. In a production deployment, this
              same interface would be backed by verified, continuously
              updated data sources.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
