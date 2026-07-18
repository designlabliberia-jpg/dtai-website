"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getIndustryBySlug } from "@/lib/industries-data";

interface SectorEntry {
  name: string;
  src: string;
  industrySlug: string;
}

const SECTORS: SectorEntry[] = [
  { name: "Government Institutions", src: "/assets/partners/gi.png", industrySlug: "government" },
  { name: "Electoral Management Bodies", src: "/assets/partners/eb.png", industrySlug: "elections" },
  { name: "Healthcare Providers", src: "/assets/partners/hp.png", industrySlug: "healthcare" },
  { name: "Financial Institutions", src: "/assets/partners/fi.png", industrySlug: "finance" },
  { name: "Educational Institutions", src: "/assets/partners/ei.png", industrySlug: "education" },
  { name: "Retail and E-commerce Businesses", src: "/assets/partners/re.png", industrySlug: "retail-ecommerce" },
  { name: "Logistics and Transportation Companies", src: "/assets/partners/lt.png", industrySlug: "logistics-transportation" },
  { name: "Agriculture and Agribusiness", src: "/assets/partners/aa.png", industrySlug: "agriculture-agribusiness" },
  { name: "Hospitality and Tourism", src: "/assets/partners/ht.png", industrySlug: "hospitality-tourism" },
  { name: "Non-Governmental Organizations", src: "/assets/partners/ngos.png", industrySlug: "ngos" },
  { name: "Small and Medium Enterprises", src: "/assets/partners/smes.png", industrySlug: "smes" },
  { name: "International Development Partners", src: "/assets/partners/id.png", industrySlug: "international-development-partners" },
];

const CYCLE_MS = 4000;

export function SectorSpotlight() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SECTORS.length);
    }, CYCLE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const sector = SECTORS[active];
  const industry = getIndustryBySlug(sector.industrySlug);

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-infra-midnight"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-4 sm:inset-6">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
      </div>

      <div className="grid grid-cols-1 items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-[220px_1fr] md:gap-12">
        {/* Animated icon */}
        <div className="relative mx-auto h-40 w-40 shrink-0 sm:h-48 sm:w-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={sector.name}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: -12 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-white/5"
            >
              <div className="relative h-36 w-36 scale-125 sm:h-44 sm:w-44">
                <Image
                  src={sector.src}
                  alt={sector.name}
                  fill
                  className="object-contain"
                  sizes="176px"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Explainer text */}
        <div className="min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={sector.name + "-text"}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
                Sector {active + 1} of {SECTORS.length}
              </span>
              <h3 className="mt-2 font-primary text-2xl font-semibold text-white sm:text-3xl">
                {sector.name}
              </h3>
              {industry && (
                <>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
                    {industry.summary}
                  </p>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-tech-blue transition-colors duration-micro hover:text-white"
                  >
                    View Industry <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="relative z-10 flex justify-center gap-2 pb-6">
        {SECTORS.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setActive(i)}
            aria-label={`Show ${s.name}`}
            className={`h-1.5 rounded-full transition-all duration-standard ${
              i === active ? "w-6 bg-tech-blue" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
