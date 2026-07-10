"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, LayoutGrid, Zap, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";

const stages: {
  label: string;
  title: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Manual Process",
    title: "Paper-based, siloed record keeping",
    detail:
      "Requests move on paper between offices. Status is tracked in ledgers. Errors and delays are discovered only when someone asks.",
    icon: FileText,
  },
  {
    label: "Digital Workflow",
    title: "Structured, trackable digital process",
    detail:
      "The same steps are captured in a defined digital workflow. Every request has a status, an owner, and a timestamp.",
    icon: LayoutGrid,
  },
  {
    label: "Automation",
    title: "Routing and validation handled automatically",
    detail:
      "Rules-based routing moves requests to the right reviewer automatically. Validation catches missing data before it reaches a human.",
    icon: Zap,
  },
  {
    label: "Outcome",
    title: "Faster, auditable, accountable",
    detail:
      "Processing time drops, every action is logged, and institutional leadership can see exactly where a request stands at any moment.",
    icon: TrendingUp,
  },
];

export function WorkflowDemo() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-neutral-50 py-24">
      <Container>
        <div className="mb-12 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-brand">
            Workflow Demonstration
          </span>
          <h2 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            From manual process to measurable outcome
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            A representative pattern from how DTAI digitizes institutional
            workflows. Step through each stage.
          </p>
        </div>

        {/* Animated flow diagram */}
        <div className="rounded-lg border border-neutral-300/60 bg-white p-6 sm:p-8">
          <div className="flex items-center">
            {stages.map((s, i) => {
              const Icon = s.icon;
              const isDone = i < active;
              const isActive = i === active;
              const isReached = i <= active;

              return (
                <div key={s.label} className="flex flex-1 items-center last:flex-none">
                  <button
                    onClick={() => setActive(i)}
                    className="flex flex-col items-center gap-2 outline-none"
                    aria-label={`View stage ${i + 1}: ${s.label}`}
                    aria-current={isActive}
                  >
                    <div className="relative flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 rounded-full bg-tech-blue/20"
                          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <div
                        className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-standard sm:h-14 sm:w-14 ${
                          isReached
                            ? "border-tech-blue bg-tech-blue/10"
                            : "border-neutral-300 bg-neutral-50"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={isReached ? "text-tech-blue" : "text-neutral-400"}
                          strokeWidth={1.75}
                        />
                      </div>
                    </div>
                    <span
                      className={`hidden max-w-[80px] text-center font-technical text-[10px] uppercase tracking-wide sm:block ${
                        isReached ? "text-neutral-900" : "text-neutral-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>

                  {i < stages.length - 1 && (
                    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-neutral-200 sm:mx-3">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-tech-blue"
                        initial={false}
                        animate={{ width: isDone ? "100%" : "0%" }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {stages.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActive(i)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-micro ${
                active === i
                  ? "bg-brand text-white"
                  : "bg-white text-neutral-700 border border-neutral-300 hover:border-brand"
              }`}
            >
              {String(i + 1).padStart(2, "0")} — {s.label}
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[180px] rounded-lg border border-neutral-300/60 bg-white p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="font-technical text-xs uppercase tracking-wide text-brand">
                Stage {active + 1} of {stages.length}
              </span>
              <h3 className="mt-2 font-primary text-xl font-semibold text-neutral-900">
                {stages[active].title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
                {stages[active].detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 flex gap-2">
          {stages.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-standard ${
                i <= active ? "bg-tech-blue" : "bg-neutral-200"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
