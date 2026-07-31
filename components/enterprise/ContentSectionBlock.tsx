import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeInImage } from "@/components/enterprise/FadeInImage";
import type { ContentSection } from "@/lib/about-data";

interface ContentSectionBlockProps {
  data: ContentSection;
  bg?: string;
}

export function ContentSectionBlock({ data, bg = "bg-white" }: ContentSectionBlockProps) {
  const { eyebrow, body, points, collage, imageLeft } = data;

  const images = (
    <div className={`relative h-[380px] ${imageLeft ? "order-last lg:order-first" : ""}`}>
      <div className={`absolute ${imageLeft ? "left-0" : "right-0"} top-0 h-[400px] w-[80%] overflow-hidden rounded-2xl`}>
        <FadeInImage src={collage.primary.src} alt={collage.primary.alt} fill sizes="(min-width: 1024px) 35vw, 75vw" className="object-cover" />
      </div>
      <div className={`absolute bottom-12 right-5 ${imageLeft ? "right-0" : "left-0"} h-[260px] w-[35%] overflow-hidden rounded-2xl border-4 border-white shadow-lg`}>
        <FadeInImage src={collage.secondary.src} alt={collage.secondary.alt} fill sizes="(min-width: 1024px) 25vw, 55vw" className="object-cover" />
      </div>
    </div>
  );

  const text = (
    <div>
      <h1 className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
        <span className="w-1 h-6 bg-brand rounded-full" />{eyebrow}
        <span className="hidden sm:block w-64 h-px bg-brand" />
      </h1>
      <p className="mt-4 text-base leading-relaxed text-neutral-600">{body}</p>
      <ul className="mt-6 space-y-3">
        {points.map((pt) => (
          <li key={pt} className="flex items-start gap-3">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand" strokeWidth={1.75} />
            <span className="text-sm text-neutral-700">{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className={`${bg} py-20`}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {imageLeft ? <>{images}{text}</> : <>{text}{images}</>}
        </div>
      </Container>
    </section>
  );
}
