import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";

interface PageHeroBannerProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}

export function PageHeroBanner({ eyebrow, title, subtitle, icon: Icon }: PageHeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-infra-midnight py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-6">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/40" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/40" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-tech-blue/40" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-tech-blue/40" />
      </div>

      <Container className="max-w-3xl">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-tech-blue/15">
              <Icon size={26} className="text-tech-blue" strokeWidth={1.5} />
            </div>
          )}
          <div>
            <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
              {eyebrow}
            </span>
            <h1 className="mt-2 max-w-xl font-primary text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
