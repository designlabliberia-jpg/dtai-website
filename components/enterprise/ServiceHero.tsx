import Image from "next/image";
import { Container } from "@/components/layout/Container";

interface ServiceHeroProps {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function ServiceHero({ slug, eyebrow, title, subtitle }: ServiceHeroProps) {
  return (
    <section className="relative flex h-[420px] w-full items-end overflow-hidden sm:h-[480px]">
      <Image
        src={`/assets/services/${slug}.jpg`}
        alt={title}
        fill
        priority
        sizes="100vw"
        quality={75}
        className="object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,24,39,0.35) 0%, rgba(7,24,39,0.55) 50%, rgba(7,24,39,0.92) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-6 sm:inset-8">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-tech-blue/50" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-tech-blue/50" />
      </div>

      <Container className="relative z-10 max-w-3xl pb-10 sm:pb-12">
        <span className="font-technical text-xs uppercase tracking-wide text-tech-blue">
          {eyebrow}
        </span>
        <h1 className="mt-2 font-primary text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-200 sm:text-base">
          {subtitle}
        </p>
      </Container>
    </section>
  );
}
