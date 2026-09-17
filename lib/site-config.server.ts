import "server-only";
import { cache } from "react";
import { siteConfig } from "./seo";

export const getSiteConfig = cache(async () => {
  const { db } = await import("@/lib/db");
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
