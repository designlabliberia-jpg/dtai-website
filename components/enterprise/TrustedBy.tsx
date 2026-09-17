import { db } from "@/lib/db";
import { partnerLogo } from "@/lib/partners-data";
import { PartnerLogo } from "./PartnerLogo";

export async function TrustedBy() {
  const dbPartners = await db.partner
    .findMany({ where: { type: "logo", deletedAt: null }, orderBy: { order: "asc" } })
    .catch(() => []);

  const logos = dbPartners.length
    ? dbPartners.map((p) => ({ title: p.title, src: p.logoUrl }))
    : partnerLogo;

  const track = [...logos, ...logos];

  return (
    <section className="py-8 overflow-hidden">
      <div className="flex items-center justify-center gap-4 mb-2">
        <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
        <span className="w-1 h-6 bg-brand" />
        <h1 className="font-technical text-sm uppercase tracking-widest text-neutral whitespace-nowrap">Trusted By</h1>
        <span className="w-1 h-6 bg-brand" />
        <span className="hidden sm:flex flex-1 max-w-[16rem] h-px bg-brand" />
      </div>

      <p className="text-center font-technical text-xs uppercase tracking-widest text-neutral-600 text-sm mb-8">
        40+ partners have put their trust in us
      </p>

      <div className="relative flex overflow-x-hidden overflow-y-visible">
        <div className="flex gap-10 marquee pb-10">
          {track.map((partner, i) => (
            <PartnerLogo key={i} title={partner.title} src={partner.src} />
          ))}
        </div>
      </div>
    </section>
  );
}
