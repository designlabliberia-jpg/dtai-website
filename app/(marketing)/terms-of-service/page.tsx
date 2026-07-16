import { Container } from "@/components/layout/Container";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Terms of Service",
  "Terms governing use of the Digital Technology Associates Inc. (DTAI) website."
);

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Acceptance of Terms",
    body: [
      "These Terms of Service (\u201cTerms\u201d) govern your access to and use of this website, operated by Digital Technology Associates Inc. (\u201cDTAI,\u201d \u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d). By accessing or using this site, you agree to be bound by these Terms. If you do not agree, please discontinue use of the site.",
    ],
  },
  {
    heading: "2. Purpose of This Site",
    body: [
      "This website is provided for informational purposes to describe DTAI's services, solutions, and engagement process, and to facilitate inquiries from prospective clients, partners, and institutions. Nothing on this site constitutes a binding offer, contract, or guarantee of services absent a separately executed agreement.",
    ],
  },
  {
    heading: "3. Intellectual Property",
    body: [
      "All content on this site, including text, graphics, logos, diagrams, and design elements, is the property of DTAI or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from this content without prior written permission, except for personal, non-commercial reference.",
    ],
  },
  {
    heading: "4. Illustrative and Placeholder Content",
    body: [
      "Certain demonstrations, figures, and data visualizations on this site (including GIS and workflow demonstrations) are illustrative or based on representative placeholder data intended to demonstrate methodology, and do not represent live client data or verified statistics unless explicitly stated otherwise.",
    ],
  },
  {
    heading: "5. Submissions Through Contact Forms",
    body: [
      "Information you submit through our contact or inquiry forms is used in accordance with our Privacy Policy. Submitting an inquiry does not create a client relationship, obligation, or contractual commitment on the part of DTAI.",
    ],
  },
  {
    heading: "6. Acceptable Use",
    body: [
      "You agree not to use this site to: violate any applicable law or regulation; attempt to gain unauthorized access to our systems or data; interfere with the security or normal operation of the site; or misrepresent your identity or affiliation when submitting an inquiry.",
    ],
  },
  {
    heading: "7. No Warranty",
    body: [
      "This site and its content are provided \u201cas is\u201d without warranties of any kind, express or implied. While we make reasonable efforts to keep information accurate and current, DTAI does not warrant that content is complete, error-free, or continuously available.",
    ],
  },
  {
    heading: "8. Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, DTAI shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, this website.",
    ],
  },
  {
    heading: "9. External Links",
    body: [
      "This site may reference or link to third-party organizations, technologies, or partners. DTAI is not responsible for the content, accuracy, or practices of external sites.",
    ],
  },
  {
    heading: "10. Changes to These Terms",
    body: [
      "We may revise these Terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised Terms. The \u201cLast updated\u201d date below reflects the most recent revision.",
    ],
  },
  {
    heading: "11. Governing Law",
    body: [
      "These Terms are governed by applicable law in the jurisdiction in which DTAI is registered to operate, without regard to conflict-of-law principles, unless otherwise required by a separately executed client agreement.",
    ],
  },
  {
    heading: "12. Contact",
    body: [
      "Questions about these Terms can be directed to us through the Contact page.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        <span className="font-technical text-xs uppercase tracking-wide text-brand">
          Legal
        </span>
        <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 font-technical text-xs uppercase tracking-wide text-neutral-500">
          Last updated: July 9, 2026
        </p>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-primary text-xl font-semibold text-neutral-900">
                {s.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-neutral-700">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
