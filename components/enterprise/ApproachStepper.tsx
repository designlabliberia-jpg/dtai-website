"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { approachSteps } from "@/lib/approach-data";
import { services } from "@/lib/services-data";

export function ApproachStepper() {
  const [active, setActive] = useState(0);
  const step = approachSteps[active];
  const relatedCaps = services.filter((c) =>
    step.relatedCapabilities.includes(c.slug)
  );

  return (
    <div>
      {/* Step selector */}
      <div className="flex flex-wrap gap-2">
        {approachSteps.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => setActive(i)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-micro ${
              active === i
                ? "bg-brand text-white"
                : "border border-neutral-300 text-neutral-700 hover:border-brand"
            }`}
          >
            {String(i + 1).padStart(2, "0")} — {s.title}
          </button>
        ))}
      </div>

      {/* Progress line */}
      <div className="mt-4 flex gap-2">
        {approachSteps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-standard ${
              i <= active ? "bg-tech-blue" : "bg-neutral-200"
            }`}
          />
        ))}
      </div>

      {/* Active step detail */}
      <div className="mt-8 min-h-[280px] rounded-lg border border-neutral-300/60 bg-white p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
              Phase {active + 1} of {approachSteps.length}
            </span>
            <h3 className="mt-2 font-primary text-xl font-semibold text-neutral-900">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {step.detail}
            </p>

            <div className="mt-6">
              <h4 className="font-technical text-[11px] uppercase tracking-wide text-neutral-500">
                Deliverables
              </h4>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {step.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-neutral-700">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-tech-blue" strokeWidth={1.75} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {(relatedCaps.length > 0 || step.governanceLink) && (
              <div className="mt-6 flex flex-wrap gap-2 border-t border-neutral-200 pt-5">
                {relatedCaps.map((ser) => (
                  <Link
                    key={ser.slug}
                    href={`/services/${ser.slug}`}
                    className="rounded-full border border-neutral-300/60 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors duration-micro hover:border-tech-blue hover:text-brand"
                  >
                    {ser.title}
                  </Link>
                ))}
                {step.governanceLink && (
                  <Link
                    href={step.governanceLink.href}
                    className="rounded-full border border-tech-blue/40 bg-tech-blue/5 px-3 py-1.5 text-xs font-medium text-tech-blue transition-colors duration-micro hover:bg-tech-blue/10"
                  >
                    {step.governanceLink.label} &rarr;
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
