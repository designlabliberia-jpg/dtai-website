import { Hero } from "@/components/enterprise/Hero";
import { CapabilityOverview } from "@/components/enterprise/CapabilityOverview";
import { GovernmentTechnology } from "@/components/enterprise/GovernmentTechnology";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityOverview />
      <GovernmentTechnology />
    </>
  );
}
