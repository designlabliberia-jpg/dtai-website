import Link from "next/link";
import { Route } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeroBanner } from "@/components/enterprise/PageHeroBanner";
import { ApproachStepper } from "@/components/enterprise/ApproachStepper";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Our Approach",
  "How DTAI delivers digital infrastructure projects from requirements to long-term operation."
);

export default function OurApproachPage() {
  return (
    <>
      <PageHeroBanner
        eyebrow="Company"
        title="Our Approach"
        subtitle="A consistent delivery process applied across every engagement, regardless of project size or sector. Click through each phase to see what it actually involves."
        icon={<Route size={24} strokeWidth={1.5} />}
      />

      <section className="bg-white py-24">
        <Container className="max-w-3xl">
          <ApproachStepper />

          <div className="mt-14 rounded-lg bg-infra-midnight p-8">
            <p className="font-primary text-lg font-semibold text-white">
              Want to see this applied to your project?
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
              This same process runs across every DTAI engagement — from
              government platforms to enterprise systems.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-micro hover:border-tech-blue hover:text-tech-blue"
              >
                View Solutions
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-tech-blue px-5 py-2.5 text-sm font-semibold text-infra-midnight transition-colors duration-micro hover:bg-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
