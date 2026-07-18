import fs from "fs";

const content = `"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function SectorsParallaxBackdrop({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-12%", "12%"]
  );

  return (
    <div ref={ref} className="relative overflow-hidden rounded-lg">
      <motion.div style={{ y }} className="absolute inset-[-12%] -z-10">
        <Image
          src="/assets/hero/team-at-work2.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-infra-midnight/85 via-infra-midnight/75 to-infra-midnight/90" />

      <div className="pointer-events-none absolute inset-4 z-10">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
      </div>

      <div className="relative z-10 px-4 py-10 sm:px-8">{children}</div>
    </div>
  );
}
`;

fs.writeFileSync("components/enterprise/SectorsParallaxBackdrop.tsx", content);
console.log("Created components/enterprise/SectorsParallaxBackdrop.tsx");
