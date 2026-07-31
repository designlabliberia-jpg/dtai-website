"use client";

import { motion } from "framer-motion";

interface ProcessStep {
  title: string;
  detail: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-neutral-300/60 bg-infra-midnight p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-3">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
      </div>

      <div className="mb-8 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
        <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-400">
          Delivery Timeline
        </span>
      </div>

      <div className="relative">
        <div className="absolute bottom-2 left-[15px] top-2 w-px bg-white/10" />

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
              className="relative flex gap-5 pl-0"
            >
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-tech-blue/50 bg-infra-midnight">
                <span className="font-technical text-xs text-tech-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="pt-1">
                <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
