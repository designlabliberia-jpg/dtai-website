"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

const nodes = [
  { cx: 150, cy: 200, r: 4 },
  { cx: 420, cy: 320, r: 5 },
  { cx: 700, cy: 180, r: 4 },
  { cx: 980, cy: 380, r: 5 },
  { cx: 600, cy: 560, r: 4 },
  { cx: 900, cy: 620, r: 5 },
];

const connections = [
  { x1: 150, y1: 200, x2: 420, y2: 320 },
  { x1: 420, y1: 320, x2: 700, y2: 180 },
  { x1: 700, y1: 180, x2: 980, y2: 380 },
  { x1: 420, y1: 320, x2: 600, y2: 560 },
  { x1: 600, y1: 560, x2: 900, y2: 620 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-infra-midnight text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--color-neutral-600)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#grid)" />

          <g stroke="var(--color-tech-blue)" strokeWidth="1" opacity="0.6">
            {connections.map((c, i) => (
              <motion.line
                key={i}
                x1={c.x1}
                y1={c.y1}
                x2={c.x2}
                y2={c.y2}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + i * 0.15,
                  ease: [0.2, 0, 0, 1],
                }}
              />
            ))}
          </g>

          <g fill="var(--color-tech-blue)">
            {nodes.map((n, i) => (
              <motion.circle
                key={i}
                cx={n.cx}
                cy={n.cy}
                r={n.r}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + i * 0.12,
                  ease: [0.2, 0, 0, 1],
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      <Container className="relative py-32 md:py-40">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mb-6 inline-block font-technical text-xs uppercase tracking-wide text-titanium-silver"
        >
          Digital Infrastructure Engineering
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="max-w-3xl font-primary text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
        >
          Engineering Africa&rsquo;s Digital Infrastructure
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300"
        >
          DTAI designs, builds, and operates secure digital systems that
          enable governments, institutions, and enterprises to deliver
          critical services.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/capabilities"
            className="rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-micro hover:bg-tech-blue"
          >
            Explore Capabilities
          </Link>
          <Link
            href="/case-studies"
            className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors duration-micro hover:border-tech-blue hover:text-tech-blue"
          >
            View Case Studies
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
