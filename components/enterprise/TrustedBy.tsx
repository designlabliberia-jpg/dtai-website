import Image from "next/image";
import { partnerLogo } from "@/lib/partners-data";

const track = [...partnerLogo, ...partnerLogo];

export function TrustedBy() {
  return (
    <section className="py-8 overflow-hidden">
      <div className="flex items-center justify-center gap-4 mb-2">
        <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
        <span className="w-1 h-6 bg-brand" />
        <h1 className="font-technical text-sm uppercase tracking-widest text-neutral whitespace-nowrap">Trusted By</h1>
        <span className="w-1 h-6 bg-brand" />
        <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
      </div>

      <p className="text-center  font-technical text-xs uppercase tracking-widest text-neutral-600 text-sm mb-8">
        40+ partners have put their trust in us
      </p>

      <div className="relative flex">
        <div className="flex gap-10 marquee">
          {track.map((partner, i) => (
            <div key={i} className="flex flex-col items-center gap-3 shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-neutral-200 shadow-sm bg-white group">
                <Image
                  src={partner.src}
                  alt={partner.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
