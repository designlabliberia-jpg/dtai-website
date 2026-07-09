import { Hero } from "@/components/enterprise/Hero";
import { CapabilityOverview } from "@/components/enterprise/CapabilityOverview";
import { GovernmentTechnology } from "@/components/enterprise/GovernmentTechnology";
import { Evidence } from "@/components/enterprise/Evidence";
import { WorkflowDemo } from "@/components/enterprise/WorkflowDemo";
import { LiberiaMapDemo } from "@/components/enterprise/LiberiaMapDemo";
import { SecurityTrust } from "@/components/enterprise/SecurityTrust";
import { EngineeringPhilosophy } from "@/components/enterprise/EngineeringPhilosophy";
import { FinalConversion } from "@/components/enterprise/FinalConversion";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityOverview />
      <GovernmentTechnology />
      <Evidence />
      <WorkflowDemo />
      <LiberiaMapDemo />
      <SecurityTrust />
      <EngineeringPhilosophy />
      <FinalConversion />
    </>
  );
}
