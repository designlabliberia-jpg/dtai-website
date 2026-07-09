import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Privacy Policy — DTAI",
  description:
    "How Digital Technology Associates Inc. (DTAI) collects, uses, and protects information.",
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Overview",
    body: [
      "Digital Technology Associates Inc. (\u201cDTAI,\u201d \u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d) respects the privacy of visitors to this website and the institutions, organizations, and individuals we work with. This Privacy Policy explains what information we collect, how we use it, and the choices available to you.",
      "By using this website, you agree to the practices described in this policy. If you do not agree, please discontinue use of the site.",
    ],
  },
  {
    heading: "2. Information We Collect",
    body: [
      "We collect information you voluntarily provide when you submit a contact or inquiry form, including your name, organization, email address, phone number, and the contents of your message.",
      "We also collect limited technical information automatically when you visit our site, such as browser type, device type, general location (derived from IP address), pages visited, and referring URLs. This information is used in aggregate for analytics and site reliability purposes and is not used to identify individual visitors.",
    ],
  },
  {
    heading: "3. How We Use Information",
    body: [
      "Information submitted through our contact form is used solely to respond to your inquiry, evaluate potential engagements, and communicate with you about our services. We do not sell, rent, or trade personal information to third parties.",
      "Technical and analytics information is used to understand site performance, improve user experience, and maintain the security and reliability of our platform.",
    ],
  },
  {
    heading: "4. Data Sharing",
    body: [
      "We do not share personal information with third parties except where required to operate our business (for example, hosting and infrastructure providers bound by confidentiality obligations), to comply with legal obligations, or with your explicit consent.",
    ],
  },
  {
    heading: "5. Data Retention",
    body: [
      "We retain inquiry and contact information for as long as necessary to respond to your request and maintain a record of institutional communications, or as required by applicable law. You may request deletion of your information at any time by contacting us directly.",
    ],
  },
  {
    heading: "6. Data Security",
    body: [
      "DTAI applies engineering and organizational safeguards appropriate to the sensitivity of the information we handle, consistent with the security practices described in our Security & Governance documentation. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "7. Your Rights",
    body: [
      "Depending on your jurisdiction, you may have the right to access, correct, or request deletion of personal information we hold about you. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    heading: "8. Cookies",
    body: [
      "This site may use minimal, functional cookies necessary for basic site operation. We do not use cookies for third-party advertising or cross-site tracking.",
    ],
  },
  {
    heading: "9. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. The \u201cLast updated\u201d date below reflects the most recent revision.",
    ],
  },
  {
    heading: "10. Contact",
    body: [
      "Questions about this Privacy Policy or how your information is handled can be directed to us through the Contact page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        <span className="font-technical text-xs uppercase tracking-wide text-brand">
          Legal
        </span>
        <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Privacy Policy
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
