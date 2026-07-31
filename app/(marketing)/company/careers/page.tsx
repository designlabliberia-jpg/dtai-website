import { ProfileBlock } from "@/components/enterprise/ProfileBlock";
import { OpenPositions } from "@/components/enterprise/OpenPositions";

import { createPageMetadata } from "@/lib/seo";
import { careerProfile } from "@/lib/careers-data";
import { ContactSection } from "@/components/enterprise/ContactSection";

export const metadata = createPageMetadata(
  "Careers",
  "Join the engineering team building Africa's digital infrastructure."
);


export default function CareersPage() {
  return (
    <>
      <ProfileBlock data={careerProfile} />

      <OpenPositions />

      <ContactSection />
    </>
  );
}
