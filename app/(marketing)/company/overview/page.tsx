import { ProfileBlock } from "@/components/enterprise/ProfileBlock";
import { ContentSectionBlock } from "@/components/enterprise/ContentSectionBlock";
import { ValuesSlider } from "@/components/enterprise/ValuesSlider";
import { WhyChooseUs } from "@/components/enterprise/WhyChooseUs";
import { LeadershipSection } from "@/components/enterprise/LeadershipSection";
import { createPageMetadata } from "@/lib/seo";
import {
  aboutProfile,
  aboutMission,
  aboutVision,
  coreValues,
  whyChooseUsReasons,
  aboutCommitment,
} from "@/lib/about-data";

export const metadata = createPageMetadata(
  "About DTAI",
  "Digital Technologies Associates Incorporated, delivering digital transformation and environmental solutions across Africa and beyond."
);

export default function AboutPage() {
  return (
    <>
      <ProfileBlock data={aboutProfile} />

      <ValuesSlider values={coreValues} />

      <ContentSectionBlock data={aboutMission} bg="bg-neutral-50" />

      <ContentSectionBlock data={aboutVision} bg="bg-white" />

      <ContentSectionBlock data={aboutCommitment} bg="bg-neutral-50" />

      <WhyChooseUs items={whyChooseUsReasons} />

      <LeadershipSection />
    </>
  );
}
