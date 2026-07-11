import { client } from "./client";
import { urlFor } from "./image";

export interface InsightSection {
  heading?: string;
  body: string;
}

export interface SanityImageRef {
  asset: { _ref: string; _type: string };
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface Insight {
  slug: string;
  title: string;
  category: string;
  publishDate: string;
  author: string;
  summary: string;
  sections: InsightSection[];
  relatedCapabilities: string[];
  likes?: number;
  coverImage: SanityImageRef;
}

const insightFields = `
  "slug": slug.current,
  title,
  category,
  publishDate,
  author,
  summary,
  sections,
  relatedCapabilities,
  coverImage,
  likes
`;

export async function getInsights(): Promise<Insight[]> {
  return client.fetch(
    `*[_type == "article" && published == true] | order(publishDate desc) {
      ${insightFields}
    }`
  );
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  return client.fetch(
    `*[_type == "article" && published == true && slug.current == $slug][0] {
      ${insightFields}
    }`,
    { slug }
  );
}

export function getReadTimeMinutes(insight: Insight): number {
  const wordCount = insight.sections
    .map((s) => `${s.heading ?? ""} ${s.body}`)
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}

export function coverImageUrl(insight: Insight, width = 800) {
  return urlFor(insight.coverImage).width(width).auto("format").url();
}
