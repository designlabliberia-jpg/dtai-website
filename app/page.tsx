import { Hero } from "@/components/enterprise/Hero";
import { LatestNews } from "@/components/enterprise/LatestNews";
import { CapabilityOverview } from "@/components/enterprise/CapabilityOverview";
import { FinalConversion } from "@/components/enterprise/FinalConversion";
import { ProductsOverview } from "@/components/enterprise/ProductsOverview";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsOverview />
      <LatestNews />
      <CapabilityOverview />
      <FinalConversion />
    </>
  );
}
