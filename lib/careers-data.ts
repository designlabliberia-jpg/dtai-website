export type JobCategory =
  | "Engineering"
  | "Design"
  | "Data & AI"
  | "Operations"
  | "Management";

export interface JobListing {
  id: string;
  title: string;
  description: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  category: JobCategory;
  applyUrl: string;
}

export interface ProfileSection {
  eyebrow: string;
  heading: string;
  headingAccent?: string;
  paragraphs: string[];
  collage: {
    primary: { src: string; alt: string };
    secondary?: { src: string; alt: string };
  };
  badgeLabel?: string;
}

export const jobListings: JobListing[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "We're looking for a mid-level software engineer to build and maintain scalable systems across our product suite.",
    location: "100% remote",
    type: "Full-time",
    category: "Engineering",
    applyUrl: "/company/careers/apply?role=software-engineer",
  },
  {
    id: "engineering-manager",
    title: "Engineering Manager",
    description: "We're looking for an experienced engineering manager to lead and grow our engineering teams.",
    location: "100% remote",
    type: "Full-time",
    category: "Management",
    applyUrl: "/company/careers/apply?role=engineering-manager",
  },
  {
    id: "gis-specialist",
    title: "GIS & Geospatial Specialist",
    description: "We're looking for a GIS specialist to design and deliver geospatial data solutions for government and enterprise clients.",
    location: "100% remote",
    type: "Full-time",
    category: "Data & AI",
    applyUrl: "/company/careers/apply?role=gis-specialist",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    description: "We're looking for a mid-level product designer to craft intuitive interfaces for complex public-sector systems.",
    location: "100% remote",
    type: "Full-time",
    category: "Design",
    applyUrl: "/company/careers/apply?role=product-designer",
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    description: "We're looking for a cybersecurity analyst to protect critical infrastructure and government digital systems.",
    location: "100% remote",
    type: "Full-time",
    category: "Engineering",
    applyUrl: "/company/careers/apply?role=cybersecurity-analyst",
  },
  {
    id: "ai-ml-engineer",
    title: "AI / ML Engineer",
    description: "We're looking for an AI/ML engineer to build intelligent data pipelines and predictive models for public-sector clients.",
    location: "100% remote",
    type: "Full-time",
    category: "Data & AI",
    applyUrl: "/company/careers/apply?role=ai-ml-engineer",
  },
  {
    id: "project-manager",
    title: "Project Manager",
    description: "We're looking for a project manager to coordinate delivery across multi-stakeholder digital transformation programmes.",
    location: "100% remote",
    type: "Full-time",
    category: "Operations",
    applyUrl: "/company/careers/apply?role=project-manager",
  },
];

export const jobCategories: JobCategory[] = [
  "Engineering",
  "Design",
  "Data & AI",
  "Operations",
  "Management",
];

export const careerProfile: ProfileSection = {
  eyebrow: "We are Hiring",
  heading: "Be Part of",
  headingAccent: "Our Mission",
  paragraphs: [
    "We're looking for passionate people to join us on our mission. We value flat hierarchies, clear communication, and full ownership and responsibility for your work. If that sounds like you, we'd love to hear from you.",
  ],
  collage: {
    primary: { src: "/assets/contact.jpg", alt: "DTAI team at work" },
  },
}
