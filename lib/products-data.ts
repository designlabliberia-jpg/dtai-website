export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "In Development";
  iconKey: "libgo" | "hospital" | "election-results" | "party-agent";
  image: string;
  dark: boolean;
  features: string[];
  relatedCapabilities: string[];
  builtFor: string[];
}

export const products: Product[] = [
  {
    slug: "libgo",
    name: "LIBGO Super App",
    tagline: "An all in one digital platform for everyday services",
    description:
      "LIBGO connects people with the services they use every day, all in one place: marketplace shopping, transportation, food delivery, pharmacies, hotels, and courier services.",
    status: "In Development",
    iconKey: "libgo",
    image: "/assets/MobileScreen.png",
    dark: false,
    features: [
      "One Stop App",
      "Integrated Payments",
      "Multiple Services",
      "Enterprise Scalability",
    ],
    relatedCapabilities: [
      "mobile-application-development",
      "web-application-development",
      "cloud-solutions",
    ],
    builtFor: ["Everyday consumers", "Local businesses and vendors", "Service providers"],
  },
  {
    slug: "hospital-clinical-management-system",
    name: "Hospital & Clinical Management System",
    tagline: "A comprehensive platform for healthcare institutions",
    description:
      "A complete healthcare management platform covering the full range of hospital operations, from patient care to administration. A comprehensive platform for healthcare institutions.",
    status: "In Development",
    iconKey: "hospital",
    image: "/assets/HmsImg.png",
    dark: false,
    features: [
      "Clinical Workflow",
      "Secure EHR",
      "Patient Management",
      "Hospital Administration",
    ],
    relatedCapabilities: [
      "enterprise-systems-development",
      "data-platforms",
      "cybersecurity",
    ],
    builtFor: ["Hospitals and clinics", "Healthcare administrators", "Medical staff"],
  },
  {
    slug: "election-results-management-system",
    name: "Election Results Management System",
    tagline: "A secure platform for election result integrity",
    description:
      "Engineered for absolute transparency and auditability. This system facilitates secure vote tabulation, real-time transmission, and public dissemination of results with multi-layered verification protocols to ensure democratic integrity.",
    status: "In Development",
    iconKey: "election-results",
    image: "/assets/EmsImg.png",
    dark: false,
    features: [
      "Result Collection",
      "Verification",
      "Tabulation",
      "Public Result Dissemination",
    ],
    relatedCapabilities: [
      "cybersecurity",
      "data-platforms",
      "digital-infrastructure",
    ],
    builtFor: ["Electoral management bodies", "Government institutions", "Independent observers"],
  },
  {
    slug: "political-party-agent-registration-system",
    name: "Political Party Agent Registration System",
    tagline: "Digital accreditation for election-day agents",
    description:
      "A digital accreditation and management solution for political party agents operating during elections.",
    status: "In Development",
    iconKey: "party-agent",
    image: "/assets/MobileScreen.png",
    dark: false,
    features: ["Digital Accreditation", "Agent Management"],
    relatedCapabilities: [
      "web-application-development",
      "cybersecurity",
    ],
    builtFor: ["Political parties", "Electoral management bodies"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
