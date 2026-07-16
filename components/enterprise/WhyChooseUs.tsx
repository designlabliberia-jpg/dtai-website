"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { WhyChooseCard } from "@/components/enterprise/WhyChooseCard";

const reasons = [
  {
    title: "Innovative & Customer-Focused",
    description:
      "Every solution we deliver starts with a deep understanding of your goals. We combine creative problem-solving with customer-first thinking to build software that is intuitive, impactful, and aligned with the real-world needs of your users and organization.",
  },
  {
    title: "Secure, Scalable & Reliable",
    description:
      "Our systems are engineered to perform under pressure. With advanced cybersecurity protocols, resilient cloud architecture, and rigorous quality assurance, your platforms remain protected, highly available, and ready to scale as your operations grow.",
  },
  {
    title: "Customized to Your Exact Needs",
    description:
      "We do not believe in off-the-shelf software. Whether you need a hospital information system, a secure e-voting platform, or a GIS mapping tool, every solution is purpose-built to address the precise operational challenges of your institution.",
  },
  {
    title: "Experienced & Engineering-Led",
    description:
      "Our team brings deep expertise across enterprise software, cloud infrastructure, and systems integration. We apply proven software engineering practices and rigorous development standards to deliver solutions that are robust, maintainable, and built to last.",
  },
  {
    title: "Modern & Globally Standardized",
    description:
      "We build with the latest technologies and adhere to international software engineering standards. From cloud-native architectures to compliant data environments, our solutions keep your organization current, competitive, and aligned with global best practices.",
  },
  {
    title: "Dedicated to Your Long-Term Success",
    description:
      "Our commitment does not end at deployment. We provide comprehensive onboarding, continuous technical maintenance, and responsive long-term support — ensuring your systems evolve with your needs and your team is always empowered to perform at its best.",
  },
];

const SLIDE_SIZE = 3;
const TOTAL_SLIDES = Math.ceil(reasons.length / SLIDE_SIZE);

export function WhyChooseUs() {
  const [slide, setSlide] = useState(0);
  const prev = () => setSlide((s) => Math.max(s - 1, 0));
  const next = () => setSlide((s) => Math.min(s + 1, TOTAL_SLIDES - 1));
  const visible = reasons.slice(slide * SLIDE_SIZE, slide * SLIDE_SIZE + SLIDE_SIZE);

  return (
    <section className="bg-white py-20">
      <Container>
        {/* Centered label */}
        <div className="flex items-center justify-center gap-4">
          <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" /> <span className="w-1 h-6 bg-brand" />
          <p className="font-technical text-sm uppercase tracking-widest text-neutral-500 whitespace-nowrap">
            Why Choose Us
          </p>
          <span className="w-1 h-6 bg-brand" /> <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
        </div>

        {/* Horizontal rule + heading */}
        <div className="border-t border-neutral-200 pt-8 mb-12 text-center">
          <h3 className="font-primary font-bold text-neutral-900 max-w-2xl mx-auto leading-tight">
            At DTAI, our clients{" "}
            <span className="text-brand">enjoy services that</span> are:
          </h3>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {visible.map((r) => (
            <WhyChooseCard key={r.title} title={r.title} description={r.description} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            disabled={slide === 0}
            aria-label="Previous"
            className="text-neutral-400 hover:text-brand disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === slide ? "w-10 bg-brand" : "w-6 bg-neutral-300"
              }`}
            />
          ))}

          <button
            onClick={next}
            disabled={slide === TOTAL_SLIDES - 1}
            aria-label="Next"
            className="text-neutral-400 hover:text-brand disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </Container>
    </section>
  );
}
