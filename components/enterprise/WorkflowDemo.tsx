"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";

const stages = [
  {
    label: "Manual Process",
    title: "Paper-based, siloed record keeping",
    detail:
      "Requests move on paper between offices. Status is tracked in ledgers. Errors and delays are discovered only when someone asks.",
  },
  {
    label: "Digital Workflow",
    title: "Structured, trackable digital process",
    detail:
      "The same steps are captured in a defined digital workflow. Every request has a status, an owner, and a timestamp.",
  },
  {
    label: "Automation",
    title: "Routing and validation handled automatically",
    detail:
      "Rules-based routing moves requests to the right reviewer automatically. Validation catches missing data before it reaches a human.",
  },
  {
    label: "Outcome",
    title: "Faster, auditable, accountable",
    detail:
      "Processing time drops, every action is logged, and institutional leadership can see exactly where a request stands at any moment.",
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

        <div className="flex flex-wrap gap-3">
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
              <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
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
