export interface SolutionCategory {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
}

export const solutionCategories: SolutionCategory[] = [
  {
    id: "digital-technology",
    label: "Digital Technology Solutions",
    shortLabel: "Digital Technology",
    description: "Software, AI, cloud, cybersecurity, GIS, and institutional platforms.",
  },
  {
    id: "environmental-technology",
    label: "Eco Technology & Sustainability",
    shortLabel: "Eco Technology",
    description: "IoT monitoring, analytics, and platforms for environmental and sustainability operations.",
  },
  {
    id: "environmental-consulting",
    label: "Environmental Advisory",
    shortLabel: "Environmental Advisory",
    description: "Technical and regulatory advisory services for environmental compliance and strategy.",
  },
  {
    id: "smart-city-infrastructure",
    label: "Smart City & Green Infrastructure",
    shortLabel: "Smart City",
    description: "Connected infrastructure for utilities, traffic, lighting, and municipal operations.",
  },
  {
    id: "climate-disaster-management",
    label: "Climate & Disaster Management",
    shortLabel: "Climate & Disaster",
    description: "Early warning, prediction, and emergency response systems for climate-related hazards.",
  },
];

export function primaryCategory(relatedServices: string[]): string {
  return relatedServices[0] ?? "digital-technology";
}
