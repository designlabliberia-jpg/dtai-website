import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { partnerLogos } from "@/lib/partners-data";
import { PartnerSliderLazy } from "@/components/enterprise/PartnerSliderLazy";

export function PartnerCard() {
  return (
    <section id="partners" className="bg-white py-16">
      <Container>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          {/* Left — 60% */}
          <div className="lg:w-[50%] lg:sticky lg:top-24 flex flex-col justify-center">
            <p className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
              <span className="w-1 h-6 bg-brand rounded-full" />
              Our Partners
              <span className="hidden sm:block w-48 h-px bg-brand" />
            </p>

            <h3 className="mt-4 font-primary font-bold leading-snug tracking-tight text-neutral-900">
              We Work With The {" "}
              <span className="text-brand">Best In Business</span>
            </h3>

            <p className="mt-4 text-neutral-600 leading-relaxed max-w-lg">
              We partner with organisations across sectors to design, deploy, and sustain digital infrastructure that drives measurable outcomes. From government to enterprise, our solutions are built to scale.
            </p>

            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 self-start rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand/90 transition-colors"
            >
              Work With Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — 40% */}
          <div className="lg:w-[50%]">
            <PartnerSliderLazy logos={partnerLogos} />
          </div>
        </div>
      </Container>
    </section>
  );
}
