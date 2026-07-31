"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const CIRCLE_RADIUS = 19;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const SHOW_AFTER_PX = 480;

export function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(pct);
      setVisible(scrollTop > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const dashOffset = CIRCLE_CIRCUMFERENCE * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
          className="group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-infra-midnight/90 shadow-lg backdrop-blur-sm transition-colors duration-micro hover:bg-infra-midnight sm:bottom-8 sm:right-8"
        >
          <svg
            viewBox="0 0 44 44"
            className="absolute inset-0 h-full w-full -rotate-90"
          >
            {/* Track */}
            <circle
              cx="22"
              cy="22"
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
            />
            {/* Progress */}
            <circle
              cx="22"
              cy="22"
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="var(--color-tech-blue)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 80ms linear" }}
            />
          </svg>

          <ArrowUp
            size={16}
            strokeWidth={2}
            className="relative text-white transition-transform duration-micro group-hover:-translate-y-0.5"
          />

          {/* Corner tick, echoes the dossier/technical styling used elsewhere on the site */}
          <span className="pointer-events-none absolute -right-1 -top-1 h-2 w-2 rounded-full bg-tech-blue">
            <span className="absolute inset-0 animate-ping rounded-full bg-tech-blue opacity-60" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
