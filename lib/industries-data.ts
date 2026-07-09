export interface Industry {
  slug: string;
  title: string;
  summary: string;
  keyNeeds: string[];
  relatedCapabilities: string[];
}

export const industries: Industry[] = [
  {
    slug: "government",
    title: "Government",
    summary: "Digital systems for public agencies delivering services at national and local levels.",
    keyNeeds: ["Reliability under public scrutiny", "Interoperability across agencies", "Long-term maintainability"],
    relatedCapabilities: ["digital-infrastructure", "cybersecurity", "digital-transformation"],
  },
  {
    slug: "elections",
    title: "Elections",
    summary: "Technical infrastructure for election management bodies requiring verifiable, secure processes.",
    keyNeeds: ["End-to-end verifiability", "Independent security review", "Transparent data handling"],
    relatedCapabilities: ["cybersecurity", "digital-infrastructure", "data-platforms"],
  },
  {
    slug: "finance",
    title: "Finance",
    summary: "Systems for financial institutions operating under regulatory and data-security requirements.",
    keyNeeds: ["Regulatory compliance", "Transaction integrity", "Auditability"],
    relatedCapabilities: ["cybersecurity", "data-platforms", "cloud-solutions"],
  },
  {
    slug: "education",
    title: "Education",
    summary: "Platforms supporting educational institutions and administrative systems.",
    keyNeeds: ["Scalable access management", "Data privacy for student records", "Administrative workflow support"],
    relatedCapabilities: ["cloud-solutions", "data-platforms", "digital-transformation"],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    summary: "Digital infrastructure for institutions managing sensitive health data and service delivery.",
    keyNeeds: ["Patient data protection", "System reliability", "Regulatory alignment"],
    relatedCapabilities: ["cybersecurity", "data-platforms", "cloud-solutions"],
  },
  {
    slug: "enterprise",
    title: "Enterprise",
    summary: "Systems for enterprises managing complex, multi-location, or multi-department operations.",
    keyNeeds: ["Operational scalability", "Integration with existing systems", "Internal workflow efficiency"],
    relatedCapabilities: ["cloud-solutions", "digital-transformation", "software-engineering"],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug);
}
