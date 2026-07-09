export interface PartnerCategory {
  slug: string;
  title: string;
  summary: string;
  points: string[];
}

export const partnerCategories: PartnerCategory[] = [
  {
    slug: "technology-partners",
    title: "Technology Partners",
    summary: "Technology providers DTAI integrates with to deliver secure, scalable infrastructure.",
    points: [
      "Cloud and infrastructure providers supporting sovereign deployment options",
      "Security tooling vendors integrated into our development pipeline",
      "Data and GIS platform providers supporting spatial technology delivery",
    ],
  },
  {
    slug: "institutional-collaborations",
    title: "Institutional Collaborations",
    summary: "Relationships with institutions and bodies that shape how DTAI's systems are designed and reviewed.",
    points: [
      "Engagement with regulatory and standards bodies relevant to each sector",
      "Collaboration with academic and research institutions on emerging methods",
      "Working relationships with government technical units",
    ],
  },
  {
    slug: "ecosystem",
    title: "Ecosystem",
    summary: "The broader network DTAI operates within to deliver and support long-term digital infrastructure.",
    points: [
      "Local implementation and support partners across regions",
      "Training and capacity-building collaborators",
      "Vendors supporting hardware and field deployment where required",
    ],
  },
];

export function getPartnerCategoryBySlug(slug: string) {
  return partnerCategories.find((p) => p.slug === slug);
}
