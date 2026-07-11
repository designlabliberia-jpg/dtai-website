export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    slug: "libgo",
    name: "LIBGO Super App",
    tagline: "An all-in-one digital platform for everyday services",
    description:
      "LIBGO connects people with the services they use every day, all in one place — marketplace shopping, transportation, food delivery, pharmacies, hotels, and courier services.",
    features: [
      "Marketplace",
      "Transportation",
      "Food Delivery",
      "Pharmacies",
      "Hotels",
      "Courier Services",
    ],
  },
  {
    slug: "hospital-clinical-management-system",
    name: "Hospital & Clinical Management System",
    tagline: "A comprehensive platform for healthcare institutions",
    description:
      "A complete healthcare management platform covering the full range of hospital operations — from patient care to administration.",
    features: [
      "Patient Management",
      "Electronic Medical Records",
      "Pharmacy",
      "Laboratory",
      "Billing",
      "Hospital Administration",
    ],
  },
  {
    slug: "election-results-management-system",
    name: "Election Results Management System",
    tagline: "A secure platform for election result integrity",
    description:
      "A secure, end-to-end platform supporting the full election results lifecycle — from initial collection through public dissemination.",
    features: [
      "Result Collection",
      "Verification",
      "Tabulation",
      "Reporting",
      "Public Result Dissemination",
    ],
  },
  {
    slug: "political-party-agent-registration-system",
    name: "Political Party Agent Registration System",
    tagline: "Digital accreditation for election-day agents",
    description:
      "A digital accreditation and management solution for political party agents operating during elections.",
    features: ["Digital Accreditation", "Agent Management"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
