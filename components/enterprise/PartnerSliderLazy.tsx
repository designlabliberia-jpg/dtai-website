"use client";

import dynamic from "next/dynamic";
import type { PartnerLogo } from "@/lib/partners-data";

const PartnerSlider = dynamic(() => import("./PartnerSlider").then((m) => ({ default: m.PartnerSlider })), { ssr: false });

export function PartnerSliderLazy({ logos }: { logos: PartnerLogo[] }) {
  return <PartnerSlider logos={logos} />;
}
