import { ProfileBlock } from "@/components/enterprise/ProfileBlock";
import { OpenPositions } from "@/components/enterprise/OpenPositions";
import { ContactSection } from "@/components/enterprise/ContactSection";
import { createPageMetadata } from "@/lib/seo";
import { getPublishedJobs } from "@/lib/actions/jobs";
import { db } from "@/lib/db";
import { careerProfile } from "@/lib/careers-data";

export const metadata = createPageMetadata(
  "Careers",
  "Join the engineering team building Africa's digital infrastructure."
);

export default async function CareersPage() {
  const [jobs, pageProfiles] = await Promise.all([
    getPublishedJobs(),
    db.pageProfileSettings.findUnique({ where: { id: "global" } }),
  ]);

  const profile = pageProfiles?.careersEyebrow
    ? {
        eyebrow: pageProfiles.careersEyebrow,
        heading: pageProfiles.careersHeading,
        headingAccent: pageProfiles.careersHeadingAccent || undefined,
        paragraphs: pageProfiles.careersParagraphs,
        collage: {
          primary: {
            src: pageProfiles.careersPrimaryImageUrl || careerProfile.collage.primary.src,
            alt: pageProfiles.careersPrimaryImageAlt || careerProfile.collage.primary.alt,
          },
        },
      }
    : careerProfile;

  return (
    <>
      <ProfileBlock data={profile} />
      <OpenPositions jobs={jobs} />
      <ContactSection />
    </>
  );
}
