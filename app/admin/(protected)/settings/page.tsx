import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SettingsShell } from "./SettingsShell";

export default async function SettingsPage() {
  const [settings, pageSeoRows, about, pageProfiles] = await Promise.all([
    db.siteSettings.findUnique({ where: { id: "global" } }),
    db.pageSeo.findMany({ orderBy: { pageSlug: "asc" } }),
    db.aboutSettings.findUnique({ where: { id: "global" } }),
    db.pageProfileSettings.findUnique({ where: { id: "global" } }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Settings" description="Site configuration, SEO overrides, and about content." />
      <SettingsShell settings={settings} pageSeoRows={pageSeoRows} about={about} pageProfiles={pageProfiles} />
    </div>
  );
}
