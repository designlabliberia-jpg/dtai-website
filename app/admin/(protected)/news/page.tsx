import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { NewsPublishToggle } from "./NewsPublishToggle";

export default async function NewsPage() {
  const articles = await db.article.findMany({
    where: { deletedAt: null },
    orderBy: { publishDate: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="News & Insights"
        description="Articles synced from Sanity. Toggle visibility here — edit content in Sanity Studio."
        action={
          <Link
            href="/studio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 font-technical text-[11px] uppercase tracking-[0.08em] transition-colors"
            style={{ border: "1px solid var(--admin-border-strong)", color: "var(--admin-text-secondary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--admin-brand)";
              e.currentTarget.style.color = "var(--admin-brand)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--admin-border-strong)";
              e.currentTarget.style.color = "var(--admin-text-secondary)";
            }}
          >
            <ExternalLink size={12} />
            Manage in Sanity Studio
          </Link>
        }
      />

      <Panel accent padding="none">
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
                  className="transition-colors"
                  style={{ color: "var(--admin-text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-muted)")}
                >
                  <ExternalLink size={13} />
                </Link>
              ),
            },
          ]}
        />
      </Panel>
    </div>
  );
}
