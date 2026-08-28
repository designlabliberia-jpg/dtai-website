import { db } from "@/lib/db";
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
import type { ProfileSection, ContentSection, WhyChooseItem } from "@/lib/about-data";

export const metadata = createPageMetadata(
  "About DTAI",
  "Digital Technologies Associates Incorporated, delivering digital transformation and environmental solutions across Africa and beyond."
);

export default async function AboutPage() {
  const a = await db.aboutSettings.findUnique({ where: { id: "global" } });

  const profile: ProfileSection = a?.profileHeading
    ? {
        eyebrow: a.profileEyebrow,
        heading: a.profileHeading,
        headingAccent: a.profileHeadingAccent || undefined,
        paragraphs: a.profileParagraphs,
        collage: {
          primary: { src: a.profilePrimaryImage, alt: a.profilePrimaryImageAlt },
          secondary: a.profileSecondaryImage
            ? { src: a.profileSecondaryImage, alt: a.profileSecondaryImageAlt }
            : undefined,
        },
      }
    : aboutProfile;

  const mission: ContentSection = a?.missionBody
    ? {
        eyebrow: "Our Mission",
        body: a.missionBody,
        points: a.missionPoints,
        collage: {
          primary: { src: a.missionPrimaryImage, alt: a.missionPrimaryImageAlt },
          secondary: { src: a.missionSecondaryImage, alt: a.missionSecondaryImageAlt },
        },
        imageLeft: true,
      }
    : aboutMission;

  const vision: ContentSection = a?.visionBody
    ? {
        eyebrow: "Our Vision",
        body: a.visionBody,
        points: a.visionPoints,
        collage: {
          primary: { src: a.visionPrimaryImage, alt: a.visionPrimaryImageAlt },
          secondary: { src: a.visionSecondaryImage, alt: a.visionSecondaryImageAlt },
        },
        imageLeft: false,
      }
    : aboutVision;

  const commitment: ContentSection = a?.commitmentBody
    ? {
        eyebrow: "Our Commitment",
        body: a.commitmentBody,
        points: a.commitmentPoints,
        collage: {
          primary: { src: a.commitmentPrimaryImage, alt: a.commitmentPrimaryImageAlt },
          secondary: { src: a.commitmentSecondaryImage, alt: a.commitmentSecondaryImageAlt },
        },
        imageLeft: true,
      }
    : aboutCommitment;

  const valuesItems = a?.valuesLabels.length ? a.valuesLabels : coreValues.map((v) => v.label);

  const whyItems: WhyChooseItem[] = a?.why1Title
    ? ([1, 2, 3, 4, 5, 6] as const).map((n) => ({
        title: (a as Record<string, string>)[`why${n}Title`] ?? "",
        description: (a as Record<string, string>)[`why${n}Description`] ?? "",
      })).filter((i) => i.title)
    : whyChooseUsReasons;

  return (
    <>
      <ProfileBlock data={profile} />

      <ValuesSlider items={valuesItems} />

      <ContentSectionBlock data={mission} bg="bg-neutral-50" />

      <ContentSectionBlock data={vision} bg="bg-white" />

      <ContentSectionBlock data={commitment} bg="bg-neutral-50" />

      <WhyChooseUs
        items={whyItems}
        heading={a?.whyHeading || undefined}
        headingAccent={a?.whyHeadingAccent || undefined}
      />

      <LeadershipSection />
    </>
  );
}
