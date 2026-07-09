export interface InsightSection {
  heading?: string;
  body: string;
}

export interface Insight {
  slug: string;
  title: string;
  category: string;
  publishDate: string;
  author: string;
  summary: string;
  sections: InsightSection[];
  relatedCapabilities: string[];
}

export const insights: Insight[] = [
  {
    slug: "digital-infrastructure-resilience",
    title: "Designing for Resilience in National Digital Infrastructure",
    category: "Engineering Insight",
    publishDate: "2026-05-14",
    author: "DTAI Engineering Team",
    summary:
      "Why redundancy planning and environment separation matter more than feature velocity for systems institutions depend on.",
    sections: [
      {
        body:
          "National-scale digital infrastructure fails differently than typical software: outages have institutional and public consequences, not just user inconvenience. This piece outlines DTAI's approach to redundancy planning, environment separation, and monitoring as foundational requirements rather than post-launch additions.",
      },
      {
        heading: "Redundancy as a Design Input, Not a Patch",
        body:
          "Redundancy planning that begins after a system is built tends to bolt failover onto an architecture that was never designed to support it. DTAI treats redundancy as a constraint defined at the architecture stage — alongside data models and access control — so failover paths are native to the system, not layered on afterward.",
      },
      {
        heading: "Environment Separation",
        body:
          "Development, staging, and production environments are kept fully separate, with distinct access controls and data boundaries between them. This limits the blast radius of any single change and ensures that testing against realistic conditions doesn't put live institutional data at risk.",
      },
      {
        heading: "Monitoring from Day One",
        body:
          "Monitoring and alerting are part of the initial deployment, not a follow-up task. For systems that public institutions depend on, the gap between a failure occurring and a failure being detected is itself a risk that has to be engineered against.",
      },
    ],
    relatedCapabilities: ["digital-infrastructure", "cybersecurity"],
  },
];

export function getInsightBySlug(slug: string) {
  return insights.find((i) => i.slug === slug);
}

export function getReadTimeMinutes(insight: Insight): number {
  const wordCount = insight.sections
    .map((s) => `${s.heading ?? ""} ${s.body}`)
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}
