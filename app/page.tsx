import dynamic from "next/dynamic";
import { ScrollToHash } from "@/components/layout/ScrollToHash";

const Hero = dynamic(() => import("@/components/enterprise/Hero").then((m) => ({ default: m.Hero })));
const ProductsOverview = dynamic(() => import("@/components/enterprise/ProductsOverview").then((m) => ({ default: m.ProductsOverview })));
const PartnerCard = dynamic(() => import("@/components/enterprise/PartnerCard").then((m) => ({ default: m.PartnerCard })));
const LatestNews = dynamic(() => import("@/components/enterprise/LatestNews").then((m) => ({ default: m.LatestNews })));
const ServiceOverview = dynamic(() => import("@/components/enterprise/ServiceOverview").then((m) => ({ default: m.ServiceOverview })));
const WhyChooseUs = dynamic(() => import("@/components/enterprise/WhyChooseUs").then((m) => ({ default: m.WhyChooseUs })));
const ContactSection = dynamic(() => import("@/components/enterprise/ContactSection").then((m) => ({ default: m.ContactSection })));


export default function Home() {
  return (
    <>
      <ScrollToHash />
      <Hero />
      <PartnerCard />
      <ServiceOverview />
      <LatestNews />
      <ProductsOverview />
      <WhyChooseUs />
      <ContactSection />
    </>
  );
}
