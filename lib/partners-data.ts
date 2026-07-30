export interface PartnerCategory {
  slug: string;
  title: string;
  src: string;
  summary: string;
  points: string[];
}

export const partnerCategories: PartnerCategory[] = [
  {
    slug: "government-institutions",
    title: "Government Institutions",
    src: "/assets/partners/gi.png",
    summary: "Partnering with government bodies to deliver secure, citizen-centric digital systems and public service infrastructure.",
    points: [
      "National and local government digital transformation programmes",
      "Secure identity and civil registry systems",
      "Public service delivery platforms built for scale",
    ],
  },
  {
    slug: "electoral-management-bodies",
    title: "Electoral Management Bodies",
    src: "/assets/partners/eb.png",
    summary: "Supporting electoral commissions with transparent, auditable technology that upholds the integrity of democratic processes.",
    points: [
      "Voter registration and biometric verification systems",
      "Results transmission and tallying platforms",
      "Election observation and audit trail tooling",
    ],
  },
  {
    slug: "healthcare-providers",
    title: "Healthcare Providers",
    src: "/assets/partners/hp.png",
    summary: "Enabling healthcare organisations to manage patient data, streamline operations, and improve service delivery outcomes.",
    points: [
      "Electronic health records and patient management systems",
      "Health facility and supply chain tracking",
      "Telemedicine and remote care infrastructure",
    ],
  },
  {
    slug: "financial-institutions",
    title: "Financial Institutions",
    src: "/assets/partners/fi.png",
    summary: "Delivering compliant, resilient fintech infrastructure for banks, microfinance bodies, and payment service providers.",
    points: [
      "Core banking integrations and digital onboarding",
      "Fraud detection and transaction monitoring",
      "Regulatory reporting and compliance tooling",
    ],
  },
  {
    slug: "educational-institutions",
    title: "Educational Institutions",
    src: "/assets/partners/ei.png",
    summary: "Empowering schools, universities, and training bodies with platforms that modernise learning and administration.",
    points: [
      "Student information and enrolment management systems",
      "E-learning platforms and digital content delivery",
      "Examination and certification management",
    ],
  },
  {
    slug: "retail-ecommerce",
    title: "Retail and E-commerce Businesses",
    src: "/assets/partners/re.png",
    summary: "Helping retail and e-commerce operators scale with reliable platforms for sales, inventory, and customer engagement.",
    points: [
      "Point-of-sale and inventory management systems",
      "E-commerce storefronts and order fulfilment platforms",
      "Customer analytics and loyalty programme tooling",
    ],
  },
  {
    slug: "logistics-transportation",
    title: "Logistics and Transportation Companies",
    src: "/assets/partners/lt.png",
    summary: "Providing logistics and transport operators with real-time visibility, route optimisation, and fleet management tools.",
    points: [
      "Fleet tracking and telematics integration",
      "Route planning and last-mile delivery optimisation",
      "Cargo and warehouse management systems",
    ],
  },
  {
    slug: "agriculture-agribusiness",
    title: "Agriculture and Agribusiness",
    src: "/assets/partners/aa.png",
    summary: "Supporting agribusinesses and smallholder networks with data-driven tools for production, traceability, and market access.",
    points: [
      "Farm management and crop monitoring platforms",
      "Supply chain traceability from field to market",
      "Agricultural finance and input distribution systems",
    ],
  },
  {
    slug: "hospitality-tourism",
    title: "Hospitality and Tourism",
    src: "/assets/partners/ht.png",
    summary: "Equipping hospitality and tourism businesses with digital tools to enhance guest experiences and operational efficiency.",
    points: [
      "Property management and booking systems",
      "Guest experience and loyalty platforms",
      "Tourism destination and operator management tools",
    ],
  },
  {
    slug: "ngos",
    title: "Non-Governmental Organizations",
    src: "/assets/partners/ngos.png",
    summary: "Enabling NGOs to manage programmes, beneficiaries, and reporting with transparent, field-ready digital systems.",
    points: [
      "Beneficiary registration and case management platforms",
      "Programme monitoring and evaluation tooling",
      "Donor reporting and grant management systems",
    ],
  },
  {
    slug: "smes",
    title: "Small and Medium Enterprises",
    src: "/assets/partners/smes.png",
    summary: "Giving SMEs access to enterprise-grade digital tools that are affordable, easy to deploy, and built to grow with them.",
    points: [
      "Business management and accounting platforms",
      "Digital storefront and payment integration",
      "CRM and customer communication tooling",
    ],
  },
  {
    slug: "ecosystem",
    title: "Ecosystem Partners",
    src: "/assets/partners/ecosystem.png",
    summary: "The broader ecosystem of organizations and communities DTAI collaborates with to drive digital transformation across sectors.",
    points: [
      "Technology alliances and open-source communities",
      "Academic and research institutions",
      "Industry associations and standards bodies",
    ],
  },
  {
    slug: "international-development-partners",
    title: "International Development Partners",
    src: "/assets/partners/id.png",
    summary: "Collaborating with development finance institutions and multilateral bodies to deliver impactful, sustainable digital programmes.",
    points: [
      "Programme design and technology advisory",
      "Monitoring, evaluation, and learning platforms",
      "Capacity building and knowledge transfer initiatives",
    ],
  },
];

export function getPartnerCategoryBySlug(slug: string) {
  return partnerCategories.find((p) => p.slug === slug);
}
