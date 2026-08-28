import { db } from "@/lib/db";

export interface InsightSection {
  heading?: string;
  body: string;
}

export interface Insight {
  slug: string;
  title: string;
  category: string;
  publishDate: string;
  author: string;
  summary: string;
  sections: InsightSection[];
  serviceId: string | null;
  coverImageUrl: string;
  likes: number;
}

export async function getInsights(): Promise<Insight[]> {
  const rows = await db.article.findMany({
    where: { published: true, deletedAt: null },
    orderBy: { publishDate: "desc" },
    select: {
      slug: true,
      title: true,
      category: true,
      publishDate: true,
      author: true,
      summary: true,
      sections: true,
      serviceId: true,
      coverImageUrl: true,
      likes: true,
    },
  });

  return rows.map((r) => ({
    ...r,
    sections: r.sections as unknown as InsightSection[],
  }));
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  const row = await db.article.findUnique({
    where: { slug, published: true, deletedAt: null },
    select: {
      slug: true,
      title: true,
      category: true,
      publishDate: true,
      author: true,
      summary: true,
      sections: true,
      serviceId: true,
      coverImageUrl: true,
      likes: true,
    },
  });

  if (!row) return null;
  return { ...row, sections: row.sections as unknown as InsightSection[] };
}

export function getReadTimeMinutes(insight: Insight): number {
  const wordCount = insight.sections
    .map((s) => `${s.heading ?? ""} ${s.body}`)
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}
