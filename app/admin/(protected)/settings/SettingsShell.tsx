"use client";

import { useState } from "react";
import { Settings, Search, Info } from "lucide-react";
import { SettingsTile } from "./SettingsTile";
import { SettingsDrawer } from "./SettingsDrawer";
import { GeneralForm } from "./GeneralForm";
import { SeoForm } from "./SeoForm";
import { AboutForm } from "./AboutForm";
import type { SiteSettings, AboutSettings, PageSeo } from "@prisma/client";

type DrawerKey = "general" | "seo" | "about" | null;

const TILES = [
  { key: "general" as const, icon: Settings, title: "General", description: "Identity, contact & social links" },
  { key: "seo"     as const, icon: Search,   title: "SEO",     description: "Page titles, meta & OG images" },
  { key: "about"   as const, icon: Info,     title: "About",   description: "Profile, mission, vision & values" },
];

interface Props {
  settings: SiteSettings | null;
  pageSeoRows: PageSeo[];
  about: AboutSettings | null;
}

export function SettingsShell({ settings, pageSeoRows, about }: Props) {
  const [open, setOpen] = useState<DrawerKey>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 justify-items-center">
        {TILES.map(({ key, icon, title, description }) => (
          <SettingsTile
            key={key}
            icon={icon}
            title={title}
            description={description}
            onClick={() => setOpen(key)}
          />
        ))}
      </div>

      <SettingsDrawer title="General Settings" open={open === "general"} onClose={() => setOpen(null)}>
        <GeneralForm settings={settings} />
      </SettingsDrawer>

      <SettingsDrawer title="SEO Settings" open={open === "seo"} onClose={() => setOpen(null)}>
        <SeoForm rows={pageSeoRows} />
      </SettingsDrawer>

      <SettingsDrawer title="About Settings" open={open === "about"} onClose={() => setOpen(null)}>
        <AboutForm about={about} />
      </SettingsDrawer>
    </>
  );
}
