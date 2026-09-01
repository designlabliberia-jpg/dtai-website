import type { Metadata } from "next";
import { cache } from "react";
import { db } from "@/lib/db";

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL!,
  name: "DTAI",
  fullName: "Digital Technology Associates Inc",
  tagline: "Your Trusted Partner in Digital Innovation and Sustainable Solutions",
  description:"DTAI is a Liberian technology company where advanced software engineering meets environmental purpose, that empower governments, businesses, healthcare institutions, non-governmental organizations, and communities across Liberia and Africa.",
  logo: "/assets/dtai-logo.png",
} as const;

/** Fetch live identity from DB, falling back to static defaults. */
export const getSiteConfig = cache(async () => {
  const s = await db.siteSettings.findUnique({ where: { id: "global" } });
  return {
    url: s?.siteUrl ?? siteConfig.url,
    name: s?.name ?? siteConfig.name,
    fullName: s?.fullName ?? siteConfig.fullName,
    tagline: s?.tagline ?? siteConfig.tagline,
    description: s?.description ?? siteConfig.description,
    logo: s?.logoUrl ?? siteConfig.logo,
  };
});

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: siteConfig.logo, width: 488, height: 511, alt: siteConfig.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.logo],
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.logo}`,
  description: siteConfig.description,
};

/** Use this in any page file to generate consistent metadata. */
export function createPageMetadata(
  title: string,
  description: string,
  overrides?: Partial<Metadata>
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: siteConfig.logo, width: 488, height: 511, alt: siteConfig.fullName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.logo],
    },
    ...overrides,
  };
}
