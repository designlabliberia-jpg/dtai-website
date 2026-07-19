import Image from "next/image";
import { Container } from "@/components/layout/Container";
import type { ProfileSection } from "@/lib/about-data";

interface ProfileBlockProps {
  data: ProfileSection;
}

export function ProfileBlock({ data }: ProfileBlockProps) {
  const { eyebrow, heading, headingAccent, paragraphs, collage } = data;

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
               <span className="w-1 h-6 bg-brand rounded-full" />{eyebrow}
              <span className="hidden sm:block w-64 h-px bg-brand" />
               </h1>
            <h1 className="mt-3 font-primary text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
              {heading} <span className="text-brand">{headingAccent}</span>
            </h1>
            {paragraphs.map((p, i) => (
              <p key={i} className={`${i === 0 ? "mt-6" : "mt-4"} text-base leading-relaxed text-neutral-600`}>{p}</p>
            ))}
          </div>

          <div className="relative h-[420px]">
            <div
              className="absolute right-0 top-0 h-[400px] w-[85%] overflow-hidden rounded-2xl">
              <Image src={collage.primary.src} alt={collage.primary.alt} fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" priority />
               {/* Notch overlay */}
              <div className="absolute bottom-0 left-0 h-[160px] w-[140px] bg-white rounded-tr-2xl rounded-bl-2xl" />
            </div>

            {/* Logo circle */}
            <div className="absolute bottom-2 left-[calc(23%_-_70px)] h-[160px] w-[160px] overflow-hidden rounded-full border-4 border-white shadow-xl bg-white">
              <Image src={collage.secondary.src} alt={collage.secondary.alt} fill sizes="120px" className="object-contain p-2" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
