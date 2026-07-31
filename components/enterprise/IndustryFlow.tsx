"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldCheck, Cpu, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IndustryFlowProps {
  keyNeeds: string[];
}

const STEP_ICONS: LucideIcon[] = [Search, ShieldCheck, Cpu, Rocket];
const CYCLE_MS = 2600;

export function IndustryFlow({ keyNeeds }: IndustryFlowProps) {
  const steps = [...keyNeeds.slice(0, 3), "Deployed & monitored, long-term"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="relative overflow-hidden rounded-lg border border-neutral-300/60 bg-infra-midnight p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-3">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
      </div>

      <div className="mb-8 flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
        <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-400">
          How We Get There
        </span>
      </div>

      <div className="flex flex-col gap-0 sm:flex-row sm:items-start sm:gap-0">
        {steps.map((step, i) => {
          const Icon = STEP_ICONS[i] ?? Rocket;
          const isActive = i === active;
          const isLast = i === steps.length - 1;

          return (
            <div
              key={step}
              className="relative flex flex-1 flex-col items-start gap-3 sm:items-center sm:text-center"
            >
              <div className="flex w-full items-center sm:contents">
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-infra-midnight transition-colors duration-500"
                  style={{
                    borderColor: isActive ? "var(--color-tech-blue)" : "rgba(255,255,255,0.15)",
                  }}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.75}
                    className={`transition-colors duration-500 ${
                      isActive ? "text-tech-blue" : "text-neutral-500"
                    }`}
                  />
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 rounded-full border border-tech-blue"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {!isLast && (
                  <div className="mx-2 hidden h-px flex-1 bg-white/10 sm:block">
                    <motion.div
                      className="h-full bg-tech-blue"
                      initial={{ width: "0%" }}
                      animate={{ width: i < active ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>

              <p
                className={`max-w-[10rem] text-xs leading-relaxed transition-colors duration-500 ${
                  isActive ? "text-white" : "text-neutral-500"
                }`}
              >
                {step}
              </p>

              {!isLast && (
                <div className="ml-5 h-6 w-px bg-white/10 sm:hidden" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
