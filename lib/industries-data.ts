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
  {
    slug: "retail-ecommerce",
    title: "Retail and E-commerce",
    summary: "Digital storefronts and back-office systems for retailers managing online and in-person sales.",
    keyNeeds: ["Reliable transaction handling", "Inventory and order visibility", "Scalable customer-facing platforms"],
    relatedCapabilities: ["web-application-development", "mobile-application-development", "data-platforms"],
  },
  {
    slug: "logistics-transportation",
    title: "Logistics and Transportation",
    summary: "Systems for organizations coordinating the movement of goods, fleets, and personnel.",
    keyNeeds: ["Route and asset visibility", "Integration with field operations", "Dependable infrastructure at scale"],
    relatedCapabilities: ["gis-spatial-technology", "digital-infrastructure", "data-platforms"],
  },
  {
    slug: "agriculture-agribusiness",
    title: "Agriculture and Agribusiness",
    summary: "Technology supporting agricultural producers and agribusinesses from field data to supply chain.",
    keyNeeds: ["Field and land data mapping", "Supply chain tracking", "Access in low-connectivity areas"],
    relatedCapabilities: ["gis-spatial-technology", "data-platforms", "mobile-application-development"],
  },
  {
    slug: "hospitality-tourism",
    title: "Hospitality and Tourism",
    summary: "Platforms for hospitality and tourism operators managing bookings, guests, and visitor services.",
    keyNeeds: ["Booking and reservation reliability", "Guest-facing digital experience", "Seasonal scalability"],
    relatedCapabilities: ["web-application-development", "mobile-application-development", "cloud-solutions"],
  },
  {
    slug: "ngos",
    title: "NGOs",
    summary: "Systems for non-governmental organizations managing programs, beneficiaries, and donor reporting.",
    keyNeeds: ["Program and beneficiary data management", "Donor-ready reporting", "Cost-conscious, sustainable systems"],
    relatedCapabilities: ["data-platforms", "digital-transformation", "cloud-solutions"],
  },
  {
    slug: "smes",
    title: "SMEs",
    summary: "Right-sized digital systems for small and medium enterprises formalizing or growing their operations.",
    keyNeeds: ["Affordable, right-sized systems", "Room to scale without rebuilding", "Practical integration with existing tools"],
    relatedCapabilities: ["it-consulting-systems-integration", "cloud-solutions", "software-engineering"],
  },
  {
    slug: "international-development-partners",
    title: "International Development Partners",
    summary: "Technical systems for development partners and implementing agencies running programs on the ground.",
    keyNeeds: ["Rigorous monitoring and evaluation data", "Interoperability across partner systems", "Geographic and demographic data accuracy"],
    relatedCapabilities: ["data-platforms", "digital-transformation", "gis-spatial-technology"],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug);
}
