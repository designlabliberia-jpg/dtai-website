"use client";

import { motion } from "framer-motion";
import {
  ScanSearch, Code2, FileCheck2, Map, Wifi, BarChart3,
  ClipboardList, ShieldCheck, FileText, Network, LayoutDashboard,
  Plug, Activity, BellRing, GitMerge, type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import type { MethodologyStep } from "@/lib/services-data";

const ICON_MAP: Record<string, LucideIcon> = {
  ScanSearch, Code2, FileCheck2, Map, Wifi, BarChart3,
  ClipboardList, ShieldCheck, FileText, Network, LayoutDashboard,
  Plug, Activity, BellRing, GitMerge,
};


const WAVE_PATH =
  "M 0,110 C 40,110 60,110 100,110 C 160,110 200,30 300,30 C 400,30 440,110 500,50 C 540,20 580,20 600,20";

// [x%, y in viewBox] for each node — used to place the icon circle
const NODES: { xPct: number; cy: number }[] = [
  { xPct: 100 / 600, cy: 110 }, // step 1 — low left
  { xPct: 300 / 600, cy: 30  }, // step 2 — high centre
  { xPct: 500 / 600, cy: 50  }, // step 3 — high right
];

// viewBox height
const VB_H = 160;

interface Props { steps: MethodologyStep[] }

export function MethodologyFlow({ steps }: Props) {
  return (
    <section className="bg-neutral-50 py-8 sm:py-12">
      <Container>

        {/* ── Section heading ── */}
        <div className="flex items-center justify-center gap-4 mb-4 sm:mb-8">
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
          <span className="w-1 h-6 bg-brand" />
          <h2 className="font-technical text-sm uppercase tracking-widest text-neutral-500 whitespace-nowrap">
            Methodology
          </h2>
          <span className="w-1 h-6 bg-brand" />
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
        </div>

        {/* ── Desktop wave (md+) ── */}
        <div className="relative hidden md:block" style={{ height: "360px" }}>

          {/* SVG wave — fills the full width, fixed height */}
          <svg
            viewBox={`0 0 600 ${VB_H}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden
          >
            <path
              d={WAVE_PATH}
              stroke="#00A6FF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          {/* Step cards + icon nodes */}
          {steps.map((step, i) => {
            const Icon = ICON_MAP[step.icon] ?? ScanSearch;
            const { xPct, cy } = NODES[i];
            // Convert SVG coords → % of container
            const leftPct  = xPct * 100;
            const topPct   = (cy / VB_H) * 100;
            // Step 1: text above icon; Steps 2&3: text below icon
            const textAbove = i === 0;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: textAbove ? -16 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.14, ease: [0.2, 0, 0, 1] }}
                className="absolute"
                style={{ left: `${leftPct}%`, top: `${topPct}%`, transform: "translate(-50%, -50%)" }}
              >
                {/* Text block — above or below the icon */}
                <div
                  className={`absolute w-44 ${
                    textAbove
                      ? "bottom-[calc(100%+12px)] left-0"
                      : "top-[calc(100%+12px)] left-0"
                  }`}
                >
                  {/* Ghost number — large, sits to the right of the text */}
                  <div className="relative">
                    <span
                      className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none font-primary text-[4.5rem] font-bold leading-none text-neutral-200"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <h3 className="relative font-primary text-lg font-bold text-brand leading-snug">
                      {step.title}
                    </h3>
                    <p className="relative mt-1.5 text-xs leading-relaxed text-neutral-500">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon circle — sits exactly on the wave node */}
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/30 bg-white shadow-md">
                  <Icon size={18} className="text-brand" />
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* ── Mobile vertical list (< md) ── */}
        <ol className="relative flex flex-col md:hidden">
          <span className="absolute left-5 top-5 bottom-5 w-px bg-brand/20" aria-hidden />
          {steps.map((step, i) => {
            const Icon = ICON_MAP[step.icon] ?? ScanSearch;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.12, ease: [0.2, 0, 0, 1] }}
                className="relative flex items-start gap-5 py-6"
              >
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-white shadow-sm">
                  <Icon size={18} className="text-brand" />
                </span>
                <div className="pt-1">
                  <span className="font-technical text-xs text-brand/60 tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-0.5 font-primary text-sm font-semibold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>

      </Container>
    </section>
  );
}
