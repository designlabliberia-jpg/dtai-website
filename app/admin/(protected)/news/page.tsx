import { db } from "@/lib/db";
import { Panel } from "@/components/admin/Panel";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { NewsTable } from "./NewsTable";
import { SanityStudioLink } from "./SanityStudioLink";
import { SyncArticlesButton } from "./SyncArticlesButton";
import { getApprovalMap } from "@/lib/actions/approvals";

export default async function NewsPage() {
  const articles = await db.article.findMany({
    where: { deletedAt: null },
    orderBy: { publishDate: "desc" },
    select: { id: true, sanityId: true, title: true, category: true, author: true, publishDate: true, likes: true, published: true },
  });

  const approvalMap = await getApprovalMap("article", articles.map((a) => a.id));
  const rows = articles.map((a) => ({ ...a, approvalStatus: approvalMap[a.id] ?? null }));

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="News & Insights"
        description="Articles synced from Sanity. Toggle visibility here — edit content in Sanity Studio."
        action={
          <div className="flex items-center gap-2">
            <SyncArticlesButton />
            <SanityStudioLink />
          </div>
        }
      />
      <Panel accent padding="none">
        <NewsTable articles={rows} />
      </Panel>
    </div>
  );
}
