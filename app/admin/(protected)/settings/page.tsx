import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { GeneralForm } from "./GeneralForm";
import { SeoForm } from "./SeoForm";
import { AboutForm } from "./AboutForm";
import Link from "next/link";

const TABS = [
  { key: "general", label: "General" },
  { key: "seo", label: "SEO" },
  { key: "about", label: "About" },
] as const;

type Tab = (typeof TABS)[number]["key"];

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

export default async function SettingsPage({ searchParams }: Props) {
  const { tab } = await searchParams;
  const activeTab: Tab = (tab as Tab) ?? "general";

  const [settings, pageSeoRows, about] = await Promise.all([
    db.siteSettings.findUnique({ where: { id: "global" } }),
    db.pageSeo.findMany({ orderBy: { pageSlug: "asc" } }),
    db.aboutSettings.findUnique({ where: { id: "global" } }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Settings" description="Site configuration, SEO overrides, and about content." />

      {/* Tab strip */}
      <div
        className="flex gap-1 rounded-[var(--radius-sm)] p-1"
        style={{ background: "var(--admin-surface-2)", border: "1px solid var(--admin-border)", width: "fit-content" }}
      >
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin/settings?tab=${t.key}`}
            className="rounded-[var(--radius-sm)] px-4 py-1.5 font-technical text-[10px] uppercase tracking-[0.1em] transition-colors"
            style={{
              background: activeTab === t.key ? "var(--admin-surface)" : "transparent",
              color: activeTab === t.key ? "var(--admin-brand)" : "var(--admin-text-muted)",
              boxShadow: activeTab === t.key ? "var(--admin-shadow-panel)" : "none",
              borderBottom: activeTab === t.key ? "2px solid var(--admin-brand)" : "2px solid transparent",
            }}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {activeTab === "general" && <GeneralForm settings={settings} />}
      {activeTab === "seo" && <SeoForm rows={pageSeoRows} />}
      {activeTab === "about" && <AboutForm about={about} />}
    </div>
  );
}
