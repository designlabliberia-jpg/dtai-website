import dynamic from "next/dynamic";
import { ScrollToHash } from "@/components/layout/ScrollToHash";
import { whyChooseUsReasons } from "@/lib/about-data";
import { ProductsOverview } from "@/components/enterprise/ProductsOverview";
import { ContactSection } from "@/components/enterprise/ContactSection";
import { getSiteSettings } from "@/lib/site-settings";

const Hero = dynamic(() => import("@/components/enterprise/Hero").then((m) => ({ default: m.Hero })));
const PartnerCard = dynamic(() => import("@/components/enterprise/PartnerCard").then((m) => ({ default: m.PartnerCard })));
const LatestNews = dynamic(() => import("@/components/enterprise/LatestNews").then((m) => ({ default: m.LatestNews })));
const ServiceOverview = dynamic(() => import("@/components/enterprise/ServiceOverview").then((m) => ({ default: m.ServiceOverview })));
const WhyChooseUs = dynamic(() => import("@/components/enterprise/WhyChooseUs").then((m) => ({ default: m.WhyChooseUs })));
const TrustedBy = dynamic(() => import("@/components/enterprise/TrustedBy").then((m) => ({ default: m.TrustedBy })));

export default async function Home() {
  const settings = await getSiteSettings();
  return (
    <>
      <ScrollToHash />
      <Hero />
      <TrustedBy />
      <ServiceOverview />
      <PartnerCard />
      <LatestNews />
      <ProductsOverview />
      <WhyChooseUs items={whyChooseUsReasons} />
      <ContactSection info={settings} />
    </>
  );
}
