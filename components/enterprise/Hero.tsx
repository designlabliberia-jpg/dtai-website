"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { HeroCodeDemo } from "@/components/enterprise/HeroCodeDemo";

const nodes = [
  { cx: 150, cy: 200, r: 4 },
  { cx: 420, cy: 320, r: 5 },
  { cx: 700, cy: 180, r: 4 },
  { cx: 980, cy: 380, r: 5 },
  { cx: 600, cy: 560, r: 4 },
  { cx: 900, cy: 620, r: 5 },
  { cx: 250, cy: 480, r: 3 },
  { cx: 1050, cy: 200, r: 3 },
];

const connections = [
  { x1: 150, y1: 200, x2: 420, y2: 320 },
  { x1: 420, y1: 320, x2: 700, y2: 180 },
  { x1: 700, y1: 180, x2: 980, y2: 380 },
  { x1: 420, y1: 320, x2: 600, y2: 560 },
  { x1: 600, y1: 560, x2: 900, y2: 620 },
  { x1: 250, y1: 480, x2: 600, y2: 560 },
  { x1: 700, y1: 180, x2: 1050, y2: 200 },
];

export function Hero() {
  return (
    <section data-ambient-zone className="relative overflow-hidden bg-infra-midnight text-white">
      {/* Ambient background layer */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(0,87,184,0.25), transparent 60%)",
          }}
        />
        <motion.svg
          className="h-full w-full opacity-40"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          animate={{ x: [0, 6, 0], y: [0, -4, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--color-neutral-800)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#grid)" />

          <g stroke="var(--color-tech-blue)" strokeWidth="1" opacity="0.55">
            {connections.map((c, i) => (
              <motion.line
                key={i}
                x1={c.x1}
                y1={c.y1}
                x2={c.x2}
                y2={c.y2}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.25, 0.6, 0.25] }}
                transition={{
                  pathLength: { duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.2, 0, 0, 1] },
                  opacity: {
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1 + i * 0.2,
                  },
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
                animate={{ opacity: [0.6, 1, 0.6], scale: 1 }}
                transition={{
                  scale: { duration: 0.4, delay: 0.1 + i * 0.1, ease: [0.2, 0, 0, 1] },
                  opacity: {
                    duration: 2.5 + (i % 4) * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5 + i * 0.15,
                  },
                }}
              />
            ))}
          </g>
        </motion.svg>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,24,39,0) 0%, rgba(7,24,39,0.4) 70%, rgba(7,24,39,0.95) 100%)",
          }}
        />
      </div>

      {/* Continuously-typing code panel, right side — replaces the earlier
          rotating photo carousel entirely. This is the direct fix for
          "doesn't look like a tech company at first glance": it's the
          first thing visible, never stops, and cycles through real,
          representative code across the actual range of services DTAI
          offers (infrastructure/security, mobile, AI, backend). */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.2, 0, 0, 1] }}
        className="pointer-events-auto absolute inset-y-0 right-0 z-[1] hidden w-[46%] items-center lg:flex"
      >
        <div className="w-full px-8 py-16 xl:px-12">
          <HeroCodeDemo />
        </div>
      </motion.div>

      <Container className="relative z-10 py-28 md:py-36">
        <div className="lg:max-w-[52%]">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-tech-blue" />
            <span className="font-technical text-xs uppercase tracking-wide text-titanium-silver">
              Digital Infrastructure Engineering
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="max-w-3xl font-primary text-[2.75rem] font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-5xl xl:text-6xl"
          >
            Engineering Africa&rsquo;s{" "}
            <span className="text-tech-blue">Digital Infrastructure</span>
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
              className="rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-all duration-micro hover:bg-tech-blue hover:shadow-lg"
            >
              Explore Capabilities
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors duration-micro hover:border-tech-blue hover:text-tech-blue"
            >
              Talk to DTAI
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
