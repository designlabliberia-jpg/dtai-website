"use client";

import { PublishToggle } from "@/components/admin/PublishToggle";
import { toggleArticlePublished } from "@/lib/actions/articles";

export function NewsPublishToggle({
  id,
  published,
  title,
  approvalStatus,
  onPendingApproval,
}: {
  id: string;
  published: boolean;
  title: string;
  approvalStatus: "pending" | "rejected" | null;
  onPendingApproval: (name: string) => void;
}) {
  return (
    <PublishToggle
      id={id}
      published={published}
      onToggle={(_, v) => toggleArticlePublished(id, v)}
      labelOn="Live"
      labelOff="Hidden"
      approvalStatus={approvalStatus}
      onPendingApproval={() => onPendingApproval(title)}
      itemName={title}
    />
  );
}
