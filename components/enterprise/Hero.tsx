"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";

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

const heroImages = [
  { src: "/assets/hero/team-at-work1.jpg", alt: "DTAI engineering team at work" },
  { src: "/assets/hero/team-at-work2.jpg", alt: "DTAI engineering team at work" },
];

export function Hero() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImage((i) => (i + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-infra-midnight text-white">
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

      {/* Real photo panel, right side, fading into background, auto-rotating */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[44%] lg:block"
      >
        <div className="relative h-full w-full overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={heroImages[activeImage].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[activeImage].src}
                alt={heroImages[activeImage].alt}
                fill
                priority
                sizes="44vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Fade into background: left edge */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--color-infra-midnight) 0%, rgba(7,24,39,0.75) 12%, rgba(7,24,39,0) 45%)",
            }}
          />
          {/* Fade into background: top edge */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, var(--color-infra-midnight) 0%, rgba(7,24,39,0) 22%)",
            }}
          />
          {/* Fade into background: bottom edge */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, var(--color-infra-midnight) 0%, rgba(7,24,39,0) 30%)",
            }}
          />
          {/* Corner fix: reinforces blend specifically at top-left, where the
              two linear fades above don't fully overlap and a hard edge can
              otherwise remain visible */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(220px 220px at 0% 0%, var(--color-infra-midnight) 0%, rgba(7,24,39,0.6) 45%, rgba(7,24,39,0) 75%)",
            }}
          />
          {/* Subtle brand-blue tint for cohesion with the rest of the Hero */}
          <div className="absolute inset-0 bg-dtai-blue/10 mix-blend-overlay" />
        </div>
      </motion.div>

      <Container className="relative z-10 py-28 md:py-36">
        <div className="lg:max-w-[54%]">
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
