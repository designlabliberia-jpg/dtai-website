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
  minQualifications?: string[];
  preferredQualifications?: string[];
  aboutJob?: string;
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
    applyUrl: "/careers/apply?role=software-engineer",
    minQualifications: [
      "Bachelor's degree in Computer Science or equivalent practical experience.",
      "3+ years of experience building production web or backend systems.",
      "Proficiency in TypeScript, Python, or Go.",
    ],
    preferredQualifications: [
      "Experience with cloud-native architectures on AWS or GCP.",
      "Familiarity with government or public-sector software delivery.",
    ],
    aboutJob: "At DTAI, engineers own their work end-to-end — from architecture decisions to production deployments. You'll collaborate with product, design, and data teams to deliver systems that serve millions of citizens across West Africa.",
  },
  {
    id: "engineering-manager",
    title: "Engineering Manager",
    description: "We're looking for an experienced engineering manager to lead and grow our engineering teams.",
    location: "100% remote",
    type: "Full-time",
    category: "Management",
    applyUrl: "/careers/apply?role=engineering-manager",
    minQualifications: [
      "5+ years of software engineering experience with 2+ years in a management role.",
      "Track record of hiring, mentoring, and retaining engineering talent.",
      "Strong written and verbal communication skills.",
    ],
    preferredQualifications: [
      "Experience managing distributed or remote-first teams.",
      "Background in public-sector or civic technology delivery.",
    ],
    aboutJob: "You'll lead a cross-functional engineering team, set technical direction, and partner with product and operations to ship high-impact digital infrastructure for government clients.",
  },
  {
    id: "gis-specialist",
    title: "GIS & Geospatial Specialist",
    description: "We're looking for a GIS specialist to design and deliver geospatial data solutions for government and enterprise clients.",
    location: "100% remote",
    type: "Full-time",
    category: "Data & AI",
    applyUrl: "/careers/apply?role=gis-specialist",
    minQualifications: [
      "Bachelor's degree in Geography, GIS, or a related field.",
      "3+ years of hands-on experience with ArcGIS, QGIS, or equivalent platforms.",
      "Proficiency in spatial SQL and geospatial data formats (GeoJSON, Shapefile, GeoTIFF).",
    ],
    preferredQualifications: [
      "Experience integrating GIS data into web applications via APIs.",
      "Familiarity with remote sensing or satellite imagery analysis.",
    ],
    aboutJob: "You'll design and maintain geospatial data pipelines that power land administration, infrastructure planning, and public-health mapping for government agencies across Liberia and the broader region.",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    description: "We're looking for a mid-level product designer to craft intuitive interfaces for complex public-sector systems.",
    location: "100% remote",
    type: "Full-time",
    category: "Design",
    applyUrl: "/careers/apply?role=product-designer",
    minQualifications: [
      "Bachelor's degree in Design, HCI, or equivalent practical experience.",
      "3+ years of product or UX design experience with a strong portfolio.",
      "Proficiency in Figma and design-system thinking.",
    ],
    preferredQualifications: [
      "Experience designing for low-bandwidth or emerging-market contexts.",
      "Familiarity with accessibility standards (WCAG 2.1 AA).",
    ],
    aboutJob: "You'll own the end-to-end design process — from discovery and wireframes to polished, developer-ready specs — for digital services used by government staff and citizens alike.",
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    description: "We're looking for a cybersecurity analyst to protect critical infrastructure and government digital systems.",
    location: "100% remote",
    type: "Full-time",
    category: "Engineering",
    applyUrl: "/careers/apply?role=cybersecurity-analyst",
    minQualifications: [
      "Bachelor's degree in Cybersecurity, IT, or equivalent experience.",
      "2+ years of experience in security operations, threat analysis, or penetration testing.",
      "Familiarity with SIEM tools and incident-response workflows.",
    ],
    preferredQualifications: [
      "Relevant certifications (CompTIA Security+, CEH, or CISSP).",
      "Experience securing cloud environments on AWS or Azure.",
    ],
    aboutJob: "You'll monitor, detect, and respond to security threats across DTAI's client environments, conduct vulnerability assessments, and help shape our security posture for critical government infrastructure.",
  },
  {
    id: "ai-ml-engineer",
    title: "AI / ML Engineer",
    description: "We're looking for an AI/ML engineer to build intelligent data pipelines and predictive models for public-sector clients.",
    location: "100% remote",
    type: "Full-time",
    category: "Data & AI",
    applyUrl: "/careers/apply?role=ai-ml-engineer",
    minQualifications: [
      "Bachelor's or Master's degree in Computer Science, Statistics, or a related field.",
      "3+ years of experience building and deploying ML models in production.",
      "Strong Python skills and experience with frameworks such as PyTorch or scikit-learn.",
    ],
    preferredQualifications: [
      "Experience with LLMs, RAG pipelines, or generative AI applications.",
      "Familiarity with MLOps tooling (MLflow, SageMaker, or similar).",
    ],
    aboutJob: "You'll design and deploy machine-learning solutions that extract insight from government data — from predictive analytics for public health to NLP tools that make civic services more accessible.",
  },
  {
    id: "project-manager",
    title: "Project Manager",
    description: "We're looking for a project manager to coordinate delivery across multi-stakeholder digital transformation programmes.",
    location: "100% remote",
    type: "Full-time",
    category: "Operations",
    applyUrl: "/careers/apply?role=project-manager",
    minQualifications: [
      "Bachelor's degree in Business, IT, or a related field.",
      "3+ years of project management experience in technology or consulting.",
      "Proficiency with project-management tools (Jira, Asana, or equivalent).",
    ],
    preferredQualifications: [
      "PMP, PRINCE2, or equivalent certification.",
      "Experience managing government or donor-funded technology projects.",
    ],
    aboutJob: "You'll own delivery across complex, multi-stakeholder programmes — coordinating engineering, design, and client teams to hit milestones, manage risk, and ensure outcomes that matter for citizens.",
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
