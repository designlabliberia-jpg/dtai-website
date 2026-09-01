import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { industries } from "@/lib/industries-data";
import { caseStudies } from "@/lib/case-studies-data";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/company/overview",
    "/company/leadership",
    "/company",
    "/careers",
    "/products",
    "/services",
    "/partners",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = [
    ...services.map((c) => `/services/${c.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...caseStudies.map((c) => `/case-studies/${c.slug}`),
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
