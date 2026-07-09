export interface Capability {
  slug: string;
  title: string;
  summary: string;
  methodology: string[];
  proofPoints: string[];
}

export const capabilities: Capability[] = [
  {
    slug: "software-engineering",
    title: "Software Engineering",
    summary:
      "Production-grade systems built on disciplined engineering practice, designed to be maintained for years, not months.",
    methodology: [
      "Architecture review before implementation begins",
      "Typed, tested codebases with enforced review gates",
      "Documented handover for long-term maintainability",
    ],
    proofPoints: [
      "Standardized development workflows applied across every engagement",
      "Code review and testing required before any production deployment",
    ],
  },
  {
    slug: "digital-infrastructure",
    title: "Digital Infrastructure",
    summary:
      "Resilient infrastructure foundations engineered for national-scale reliability and long-term operation.",
    methodology: [
      "Redundancy planning built into infrastructure design",
      "Environment separation across development, staging, and production",
      "Monitoring and alerting from day one of deployment",
    ],
    proofPoints: [
      "Infrastructure designed against defined uptime targets",
      "Documented disaster recovery and failover procedures",
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    summary:
      "Security engineered in from architecture, not layered on after deployment.",
    methodology: [
      "Threat modeling at the design stage",
      "Dependency and vulnerability scanning in every pipeline",
      "Least-privilege access across all environments",
    ],
    proofPoints: [
      "Security requirements defined before implementation, not after",
      "Verified at every deployment gate, not only at launch",
    ],
  },
  {
    slug: "data-platforms",
    title: "Data Platforms",
    summary:
      "Structured, governed data systems that institutions can act on with confidence.",
    methodology: [
      "Data governance defined alongside data architecture",
      "Clear data lineage and access controls",
      "Scalable storage and processing matched to institutional need",
    ],
    proofPoints: [
      "Governed data models, not ad hoc spreadsheets",
      "Access and audit controls built into the platform layer",
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    summary:
      "Scalable cloud architecture matched to sovereignty and compliance requirements.",
    methodology: [
      "Environment architecture matched to data sovereignty needs",
      "Cost and scalability modeling before deployment",
      "Automated infrastructure provisioning where appropriate",
    ],
    proofPoints: [
      "Architecture decisions documented against compliance requirements",
      "Environments separated and access-controlled by design",
    ],
  },
  {
    slug: "gis-spatial-technology",
    title: "GIS & Spatial Technology",
    summary:
      "Geographic and spatial systems that turn location data into institutional decisions.",
    methodology: [
      "Spatial data modeling matched to decision-support needs",
      "Layered map architecture for infrastructure and demographic data",
      "Analysis tools built around real operational workflows",
    ],
    proofPoints: [
      "Map layers built from verified infrastructure and spatial datasets",
      "Decision-support tooling, not static map displays",
    ],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    summary:
      "Structured modernization of institutional systems and workflows, from manual process to digital operation.",
    methodology: [
      "Current-state process mapping before any system is built",
      "Phased migration planning to reduce operational risk",
      "Change management built into the delivery timeline",
    ],
    proofPoints: [
      "Manual-to-digital workflow transitions documented step by step",
      "Migration phased to avoid service disruption",
    ],
  },
];

export function getCapabilityBySlug(slug: string) {
  return capabilities.find((c) => c.slug === slug);
}
