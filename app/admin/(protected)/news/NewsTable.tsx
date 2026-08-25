"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";
import { NewsPublishToggle } from "./NewsPublishToggle";

type ArticleRow = {
  id: string;
  sanityId: string;
  title: string;
  category: string;
  author: string;
  publishDate: string;
  likes: number;
  published: boolean;
};

export function NewsTable({ articles }: { articles: ArticleRow[] }) {
  return (
    <AdminTable
      rows={articles}
      getRowKey={(r) => r.id}
      emptyMessage="No articles synced yet."
      columns={[
        {
          key: "title",
          header: "Title",
          render: (r) => (
            <span className="font-medium line-clamp-1" style={{ color: "var(--admin-text-primary)" }}>
              {r.title}
            </span>
          ),
        },
        {
          key: "category",
          header: "Category",
          width: "130px",
          render: (r) => (
            <span className="font-technical text-[10px] uppercase tracking-[0.08em]" style={{ color: "var(--admin-text-muted)" }}>
              {r.category}
            </span>
          ),
        },
        {
          key: "author",
          header: "Author",
          width: "140px",
          render: (r) => <span style={{ color: "var(--admin-text-secondary)" }}>{r.author}</span>,
        },
        {
          key: "date",
          header: "Published",
          width: "110px",
          render: (r) => (
            <span className="font-technical text-[10px] tabular-nums" style={{ color: "var(--admin-text-muted)" }}>
              {r.publishDate}
            </span>
          ),
        },
        {
          key: "likes",
          header: "Likes",
          width: "70px",
          render: (r) => (
            <span className="font-technical text-[11px] tabular-nums" style={{ color: "var(--admin-text-muted)" }}>
              {r.likes}
            </span>
          ),
        },
        {
          key: "published",
          header: "Visible",
          width: "90px",
          render: (r) => <NewsPublishToggle id={r.id} published={r.published} />,
        },
        {
          key: "sanity",
          header: "",
          width: "50px",
          render: (r) => (
            <Link
              href={`/studio/desk/article;${r.sanityId}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in Sanity"
              className="transition-colors hover:text-[var(--admin-accent)]"
              style={{ color: "var(--admin-text-muted)" }}
            >
              <ExternalLink size={13} />
            </Link>
          ),
        },
      ]}
    />
  );
}
