export interface Solution {
  slug: string;
  title: string;
  summary: string;
  focusAreas: string[];
  proofPoints: string[];
}

export const solutions: Solution[] = [
  {
    slug: "government-technology",
    title: "Government Technology",
    summary:
      "Core digital platforms that government agencies rely on for daily service delivery and public accountability.",
    focusAreas: [
      "Citizen-facing service platforms",
      "Internal agency operations systems",
      "Cross-agency data interoperability",
    ],
    proofPoints: [
      "Built to documented reliability and auditability standards",
      "Designed for handover across administrations, not tied to one team",
    ],
  },
  {
    slug: "election-technology",
    title: "Election Technology",
    summary:
      "End-to-end technical workflows covering the full election data lifecycle, from polling station to verified results.",
    focusAreas: [
      "Polling station data capture",
      "Observer and monitoring tooling",
      "Secure data transmission and verification",
      "Results aggregation and reporting dashboards",
    ],
    proofPoints: [
      "Workflow designed around independent verification at every stage",
      "Security review required before any election-facing deployment",
    ],
  },
  {
    slug: "public-sector-platforms",
    title: "Public Sector Platforms",
    summary:
      "Institutional platforms built for public bodies operating under regulatory and compliance scrutiny.",
    focusAreas: [
      "Regulatory reporting systems",
      "Public records and case management",
      "Institutional workflow digitization",
    ],
    proofPoints: [
      "Compliance requirements mapped before implementation",
      "Access and audit trails built into the platform layer",
    ],
  },
  {
    slug: "enterprise-systems",
    title: "Enterprise Systems",
    summary:
      "Scalable systems for enterprises operating complex, multi-department, or multi-location operations.",
    focusAreas: [
      "Operations and resource management platforms",
      "Enterprise data integration",
      "Internal tooling and workflow automation",
    ],
    proofPoints: [
      "Architected for multi-team, multi-department scale",
      "Integration-first design to fit existing enterprise systems",
    ],
  },
  {
    slug: "custom-digital-platforms",
    title: "Custom Digital Platforms",
    summary:
      "Purpose-built platforms for institutions whose requirements don't fit off-the-shelf software.",
    focusAreas: [
      "Requirements-driven architecture",
      "Bespoke workflow and data modeling",
      "Long-term maintenance and evolution planning",
    ],
    proofPoints: [
      "Every custom platform begins with a documented requirements and architecture phase",
      "Built for handover and long-term institutional ownership",
    ],
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
