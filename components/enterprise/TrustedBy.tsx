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

      <div className="relative flex overflow-hidden">
        <div className="flex gap-10 marquee">
          {track.map((partner, i) => (
            <div key={i} className="group relative flex flex-col items-center gap-3 shrink-0">
              <button
                type="button"
                aria-label={partner.title}
                className="w-16 h-16 rounded-full overflow-hidden border border-neutral-200 shadow-sm bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Image
                  src={partner.src}
                  alt={partner.title}
                  width={20}
                  height={20}
                  className="w-full h-full object-contain object-center grayscale transition-all duration-300 group-hover:grayscale-0 group-focus:grayscale-0 group-active:grayscale-0"
                />
              </button>
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100">
                {partner.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
