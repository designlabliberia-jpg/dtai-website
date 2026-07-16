import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { solutions } from "@/lib/solutions-data";
import { industries } from "@/lib/industries-data";
import { caseStudies } from "@/lib/case-studies-data";
import { insights } from "@/lib/insights-data";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/company/overview",
    "/company/leadership",
    "/company/engineering-philosophy",
    "/company/approach",
    "/company/careers",
    "/services",
    "/solutions",
    "/industries",
    "/case-studies",
    "/security-and-governance/philosophy",
    "/security-and-governance/development-standards",
    "/security-and-governance/data-protection",
    "/security-and-governance/reliability-practices",
    "/security-and-governance/governance-model",
    "/partners/technology-partners",
    "/partners/institutional-collaborations",
    "/partners/ecosystem",
    "/insights",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = [
    ...services.map((c) => `/services/${c.slug}`),
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...caseStudies.map((c) => `/case-studies/${c.slug}`),
    ...insights.map((i) => `/insights/${i.slug}`),
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
