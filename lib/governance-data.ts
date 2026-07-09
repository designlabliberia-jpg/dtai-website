export interface GovernancePage {
  slug: string;
  title: string;
  summary: string;
  points: string[];
}

export const governancePages: GovernancePage[] = [
  {
    slug: "philosophy",
    title: "Security Philosophy",
    summary: "Security is a design input, established before implementation begins — not a post-launch patch.",
    points: [
      "Threat modeling performed at the architecture stage",
      "Security requirements documented before development starts",
      "Every deployment verified against defined security gates",
    ],
  },
  {
    slug: "development-standards",
    title: "Development Standards",
    summary: "Consistent, documented engineering standards applied across every project and team.",
    points: [
      "Enforced code review before any merge to production",
      "Typed, tested codebases as a baseline requirement",
      "Documentation required for architecture and handover",
    ],
  },
  {
    slug: "data-protection",
    title: "Data Protection",
    summary: "Data handling practices built around the sensitivity of institutional and citizen data.",
    points: [
      "Data access governed by least-privilege principles",
      "Clear data lineage and retention policies per project",
      "Encryption in transit and at rest for sensitive data",
    ],
  },
  {
    slug: "reliability-practices",
    title: "Reliability Practices",
    summary: "Operational practices designed to keep mission-critical systems running as intended.",
    points: [
      "Monitoring and alerting configured before go-live",
      "Documented incident response procedures",
      "Redundancy and failover planning for critical systems",
    ],
  },
  {
    slug: "governance-model",
    title: "Governance Model",
    summary: "Clear accountability structures for how systems are reviewed, approved, and maintained.",
    points: [
      "Defined review and approval gates at each delivery phase",
      "Clear ownership for post-launch maintenance",
      "Transparent escalation paths for institutional stakeholders",
    ],
  },
];

export function getGovernancePageBySlug(slug: string) {
  return governancePages.find((g) => g.slug === slug);
}
