"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { partnerCategories } from "@/lib/partners-data";

const CYCLE_MS = 3000;

export function PartnerSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % partnerCategories.length);
    }, CYCLE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const partner = partnerCategories[active];

  return (
    <div
      className="relative flex w-full max-w-[420px] flex-col overflow-hidden rounded-xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.55),0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Corner accents */}
      <div className="pointer-events-none absolute inset-4">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
      </div>

      {/* Image top */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={partner.title}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={partner.src}
              alt={partner.title}
              fill
              className="object-cover"
              sizes="320px"
            />
            {/* gradient fade into card body */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-900 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text bottom */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-5 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={partner.title + "-text"}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="flex flex-1 flex-col"
          >
            <span className="font-technical text-xs uppercase tracking-wide text-tech-blue/50">
              Sector {active + 1} of {partnerCategories.length}
            </span>
            <h2 className="mt-2 font-primary text-lg font-semibold leading-snug text-tech-blue sm:text-xl">
              {partner.title}
            </h2>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed">
              {partner.summary}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot navigation */}
      <div className="relative z-10 flex justify-center gap-2 py-4">
        {partnerCategories.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => setActive(i)}
            aria-label={`Show ${p.title}`}
            className={`h-1.5 rounded-full transition-all duration-standard ${
              i === active ? "w-6 bg-tech-blue" : "w-1.5 bg-black/20 hover:bg-black/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
