"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/Container";

interface PageHeroBannerProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function PageHeroBanner({ eyebrow, title, subtitle, icon }: PageHeroBannerProps) {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative overflow-hidden bg-infra-midnight py-16 text-white sm:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 15% 20%, rgba(0,166,255,0.14), transparent 65%)",
        }}
      />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 800 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke="var(--color-tech-blue)" strokeWidth="1" opacity="0.5">
          <line x1="60" y1="40" x2="220" y2="100" />
          <line x1="220" y1="100" x2="180" y2="220" />
          <line x1="220" y1="100" x2="400" y2="60" />
          <line x1="400" y1="60" x2="560" y2="140" />
          <line x1="560" y1="140" x2="520" y2="260" />
          <line x1="560" y1="140" x2="720" y2="90" />
          <line x1="400" y1="60" x2="380" y2="220" />
        </g>
        <g fill="var(--color-tech-blue)">
          <circle cx="60" cy="40" r="3" />
          <circle cx="220" cy="100" r="3" />
          <circle cx="180" cy="220" r="3" />
          <circle cx="400" cy="60" r="3" />
          <circle cx="560" cy="140" r="3" />
          <circle cx="520" cy="260" r="3" />
          <circle cx="720" cy="90" r="3" />
          <circle cx="380" cy="220" r="3" />
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-6">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
      </div>

      <Container className="relative max-w-3xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex items-start gap-4 sm:gap-5"
        >
          {Icon && (
            <motion.div
              variants={item}
              className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-tech-blue/15 sm:h-14 sm:w-14"
            >
              {!reduceMotion && (
                <span className="absolute inset-0 -z-10 animate-pulse rounded-md bg-tech-blue/10" aria-hidden />
              )}
              {icon}
            </motion.div>
          )}
          <div className="min-w-0">
            <motion.div variants={item} className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                {!reduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tech-blue opacity-75" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-tech-blue" />
              </span>
              <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
                {eyebrow}
              </span>
            </motion.div>
            <motion.h1
              variants={item}
              className="mt-2 max-w-xl font-primary text-2xl font-semibold text-white sm:text-3xl md:text-4xl"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                variants={item}
                className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
