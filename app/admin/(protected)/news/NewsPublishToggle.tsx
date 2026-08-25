"use client";

import { PublishToggle } from "@/components/admin/PublishToggle";
import { toggleArticlePublished } from "@/lib/actions/articles";

export function NewsPublishToggle({ id, published }: { id: string; published: boolean }) {
  return (
    <PublishToggle
      id={id}
      published={published}
      onToggle={(_, v) => toggleArticlePublished(id, v)}
      labelOn="Live"
      labelOff="Hidden"
    />
  );
}
