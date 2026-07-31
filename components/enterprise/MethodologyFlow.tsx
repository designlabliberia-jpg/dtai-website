"use client";

import { motion } from "framer-motion";

interface MethodologyFlowProps {
  steps: string[];
}

export function MethodologyFlow({ steps }: MethodologyFlowProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-neutral-300/60 bg-infra-midnight p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-3">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
      </div>

      <div className="mb-6 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
        <span className="font-technical text-[10px] uppercase tracking-wide text-neutral-400">
          Delivery Sequence
        </span>
      </div>

      <div className="flex flex-col gap-0 md:flex-row md:items-stretch md:gap-0">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-1 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.12, ease: [0.2, 0, 0, 1] }}
              className="flex flex-1 flex-col rounded-md border border-white/10 bg-white/[0.03] p-5"
            >
              <span className="font-technical text-xs text-tech-blue">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-neutral-200">
                {step}
              </p>
            </motion.div>

            {i < steps.length - 1 && (
              <>
                {/* horizontal connector, desktop */}
                <div className="hidden w-8 shrink-0 items-center justify-center md:flex">
                  <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                    <line
                      x1="0"
                      y1="8"
                      x2="24"
                      y2="8"
                      stroke="var(--color-tech-blue)"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />
                    <path
                      d="M24 3L29 8L24 13"
                      stroke="var(--color-tech-blue)"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                      fill="none"
                    />
                  </svg>
                </div>
                {/* vertical connector, mobile */}
                <div className="flex h-8 shrink-0 items-center justify-center md:hidden">
                  <svg width="16" height="32" viewBox="0 0 16 32" fill="none">
                    <line
                      x1="8"
                      y1="0"
                      x2="8"
                      y2="24"
                      stroke="var(--color-tech-blue)"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />
                    <path
                      d="M3 24L8 29L13 24"
                      stroke="var(--color-tech-blue)"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                      fill="none"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
