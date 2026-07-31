export interface Industry {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  approach: string;
  keyNeeds: string[];
  relatedCapabilities: string[];
}

export const industries: Industry[] = [
  {
    slug: "government",
    title: "Government",
    summary: "Digital systems for public agencies delivering services at national and local levels.",
    overview:
      "Government systems operate under a different standard than typical software: outages and errors carry institutional and public consequences, not just user inconvenience. Agencies also often need to coordinate across departments with different legacy systems, budgets, and technical capacity — which makes interoperability and long-term maintainability as important as initial delivery.",
    approach:
      "DTAI designs government systems with redundancy, environment separation, and monitoring built in from the architecture stage — not added after launch. We document every design decision so systems remain understandable as administrations and staff change over time.",
    keyNeeds: ["Reliability under public scrutiny", "Interoperability across agencies", "Long-term maintainability"],
    relatedCapabilities: ["digital-infrastructure", "cybersecurity", "digital-transformation"],
  },
  {
    slug: "elections",
    title: "Elections",
    summary: "Technical infrastructure for election management bodies requiring verifiable, secure processes.",
    overview:
      "Election technology carries a uniquely high bar for public trust: every step, from voter data handling to result reporting, needs to be defensible under scrutiny from candidates, observers, and the public. Systems must be secure against manipulation while remaining transparent enough to be independently verified.",
    approach:
      "DTAI treats election systems as requiring independent security review and end-to-end verifiability by design, with transparent data handling practices documented at every stage — not asserted after the fact.",
    keyNeeds: ["End-to-end verifiability", "Independent security review", "Transparent data handling"],
    relatedCapabilities: ["cybersecurity", "digital-infrastructure", "data-platforms"],
  },
  {
    slug: "finance",
    title: "Finance",
    summary: "Systems for financial institutions operating under regulatory and data-security requirements.",
    overview:
      "Financial institutions operate under regulatory frameworks that demand auditability and data integrity at every layer, while also needing systems fast and reliable enough to support real-time transactions. A single integrity failure can carry regulatory, financial, and reputational consequences simultaneously.",
    approach:
      "DTAI builds financial systems with transaction integrity and audit trails as core requirements, not afterthoughts, and designs access control and data handling to align with regulatory compliance obligations from day one.",
    keyNeeds: ["Regulatory compliance", "Transaction integrity", "Auditability"],
    relatedCapabilities: ["cybersecurity", "data-platforms", "cloud-solutions"],
  },
  {
    slug: "education",
    title: "Education",
    summary: "Platforms supporting educational institutions and administrative systems.",
    overview:
      "Educational institutions manage sensitive student data at scale, often across multiple campuses or programs with fluctuating enrollment. Systems need to support administrative workflows reliably while protecting student privacy, without becoming so rigid that they can't adapt as programs grow or change.",
    approach:
      "DTAI designs education platforms around scalable access management and clear data-privacy boundaries for student records, with administrative workflows built to reduce manual overhead rather than add to it.",
    keyNeeds: ["Scalable access management", "Data privacy for student records", "Administrative workflow support"],
    relatedCapabilities: ["cloud-solutions", "data-platforms", "digital-transformation"],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    summary: "Digital infrastructure for institutions managing sensitive health data and service delivery.",
    overview:
      "Healthcare institutions handle some of the most sensitive data any organization manages, while needing systems reliable enough that downtime directly affects patient care. Regulatory alignment isn't optional here — it's a precondition for any system to be usable at all.",
    approach:
      "DTAI builds healthcare systems around patient data protection and system reliability as non-negotiable requirements, with regulatory alignment considered at the architecture stage rather than retrofitted before launch.",
    keyNeeds: ["Patient data protection", "System reliability", "Regulatory alignment"],
    relatedCapabilities: ["cybersecurity", "data-platforms", "cloud-solutions"],
  },
  {
    slug: "enterprise",
    title: "Enterprise",
    summary: "Systems for enterprises managing complex, multi-location, or multi-department operations.",
    overview:
      "Enterprises with multiple locations or departments often accumulate a patchwork of systems that don't talk to each other, creating operational friction and duplicated work. The challenge isn't just building new systems — it's making them integrate cleanly with what already exists.",
    approach:
      "DTAI approaches enterprise engagements by prioritizing integration with existing systems and operational scalability, so new service is additive rather than disruptive to how the organization already runs.",
    keyNeeds: ["Operational scalability", "Integration with existing systems", "Internal workflow efficiency"],
    relatedCapabilities: ["cloud-solutions", "digital-transformation", "software-engineering"],
  },
  {
    slug: "retail-ecommerce",
    title: "Retail and E-commerce",
    summary: "Digital storefronts and back-office systems for retailers managing online and in-person sales.",
    overview:
      "Retail and e-commerce operations live and die by uptime during peak demand — a checkout failure during a sale event is a direct, immediate revenue loss. Businesses also increasingly need online and in-person sales channels to stay synchronized, particularly around inventory and order data.",
    approach:
      "DTAI builds retail platforms for reliable transaction handling under load, with inventory and order visibility designed to stay consistent across every sales channel a business operates.",
    keyNeeds: ["Reliable transaction handling", "Inventory and order visibility", "Scalable customer-facing platforms"],
    relatedCapabilities: ["web-application-development", "mobile-application-development", "data-platforms"],
  },
  {
    slug: "logistics-transportation",
    title: "Logistics and Transportation",
    summary: "Systems for organizations coordinating the movement of goods, fleets, and personnel.",
    overview:
      "Logistics operations depend on real-time visibility into where assets are and how field operations are progressing, often across areas with inconsistent connectivity. Poor visibility doesn't just slow things down — it compounds into missed deliveries and unreliable service commitments.",
    approach:
      "DTAI designs logistics systems around route and asset visibility, with careful integration into field operations and infrastructure built to remain dependable at scale, including in lower-connectivity environments.",
    keyNeeds: ["Route and asset visibility", "Integration with field operations", "Dependable infrastructure at scale"],
    relatedCapabilities: ["gis-spatial-technology", "digital-infrastructure", "data-platforms"],
  },
  {
    slug: "agriculture-agribusiness",
    title: "Agriculture and Agribusiness",
    summary: "Technology supporting agricultural producers and agribusinesses from field data to supply chain.",
    overview:
      "Agricultural technology has to work where connectivity is unreliable, since many of the areas that need field and land data the most have the least infrastructure to support constant connectivity. Supply chain visibility from farm to market is equally important, and equally hard, for the same reason.",
    approach:
      "DTAI builds agriculture systems around field and land data mapping and supply chain tracking, designed from the outset to remain usable in low-connectivity conditions rather than assuming constant access.",
    keyNeeds: ["Field and land data mapping", "Supply chain tracking", "Access in low-connectivity areas"],
    relatedCapabilities: ["gis-spatial-technology", "data-platforms", "mobile-application-development"],
  },
  {
    slug: "hospitality-tourism",
    title: "Hospitality and Tourism",
    summary: "Platforms for hospitality and tourism operators managing bookings, guests, and visitor services.",
    overview:
      "Hospitality operators deal with highly seasonal demand, where a booking system failure during peak season has outsized impact on revenue and guest experience. The guest-facing experience also directly shapes reputation, making reliability and polish equally important.",
    approach:
      "DTAI builds booking and reservation systems for reliability under seasonal demand spikes, with guest-facing experiences designed to reflect well on the operator's brand, not just function adequately.",
    keyNeeds: ["Booking and reservation reliability", "Guest-facing digital experience", "Seasonal scalability"],
    relatedCapabilities: ["web-application-development", "mobile-application-development", "cloud-solutions"],
  },
  {
    slug: "ngos",
    title: "NGOs",
    summary: "Systems for non-governmental organizations managing programs, beneficiaries, and donor reporting.",
    overview:
      "NGOs operate under constant donor accountability requirements, needing to demonstrate program outcomes clearly while managing often-constrained budgets for technology. Systems need to be sustainable to operate long after initial funding for a project has ended.",
    approach:
      "DTAI designs NGO systems around clear program and beneficiary data management with donor-ready reporting built in, and prioritizes cost-conscious, sustainable systems the organization can maintain independently.",
    keyNeeds: ["Program and beneficiary data management", "Donor-ready reporting", "Cost-conscious, sustainable systems"],
    relatedCapabilities: ["data-platforms", "digital-transformation", "cloud-solutions"],
  },
  {
    slug: "smes",
    title: "SMEs",
    summary: "Right-sized digital systems for small and medium enterprises formalizing or growing their operations.",
    overview:
      "Small and medium enterprises often need systems that are affordable today but won't need to be rebuilt from scratch as the business grows. Overbuilt systems waste budget; underbuilt ones become a bottleneck within a year or two.",
    approach:
      "DTAI builds right-sized systems for SMEs — practical and affordable at the current scale, but architected with room to grow, and designed to integrate cleanly with whatever tools the business already relies on.",
    keyNeeds: ["Affordable, right-sized systems", "Room to scale without rebuilding", "Practical integration with existing tools"],
    relatedCapabilities: ["it-consulting-systems-integration", "cloud-solutions", "software-engineering"],
  },
  {
    slug: "international-development-partners",
    title: "International Development Partners",
    summary: "Technical systems for development partners and implementing agencies running programs on the ground.",
    overview:
      "Development partners need rigorous monitoring and evaluation data to demonstrate program impact, often while coordinating across multiple implementing partners with different systems and standards. Geographic and demographic accuracy in program data isn't a nice-to-have — it's foundational to credible reporting.",
    approach:
      "DTAI builds systems for development partners around rigorous M&E data collection, with interoperability across partner systems and geographic/demographic data accuracy treated as core requirements from the start.",
    keyNeeds: ["Rigorous monitoring and evaluation data", "Interoperability across partner systems", "Geographic and demographic data accuracy"],
    relatedCapabilities: ["data-platforms", "digital-transformation", "gis-spatial-technology"],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug);
}
