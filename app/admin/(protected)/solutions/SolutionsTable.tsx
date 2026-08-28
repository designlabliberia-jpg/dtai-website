"use client";

import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ContentActions } from "@/components/admin/ContentActions";
import { toggleSolutionPublished, deleteSolution } from "@/lib/actions/solutions";

interface Solution {
  id: string;
  title: string;
  summary: string;
  published: boolean;
}

const columns = [
  {
    key: "title",
    header: "Title",
    render: (r: Solution) => (
      <Link
        href={`/admin/solutions/${r.id}`}
        className="font-medium transition-colors"
        style={{ color: "var(--admin-text-primary)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--admin-brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--admin-text-primary)")}
      >
        {r.title}
      </Link>
    ),
  },
  {
    key: "summary",
    header: "Summary",
    render: (r: Solution) => (
      <span className="line-clamp-1 text-sm" style={{ color: "var(--admin-text-secondary)" }}>
        {r.summary}
      </span>
    ),
  },
  {
    key: "published",
    header: "Published",
    width: "100px",
    render: (r: Solution) => <StatusBadge status={r.published ? "Live" : "inactive"} />,
  },
  {
    key: "actions",
    header: "",
    width: "100px",
    render: (r: Solution) => (
      <ContentActions
        id={r.id}
        editHref={`/admin/solutions/${r.id}`}
        published={r.published}
        onToggle={toggleSolutionPublished}
        onDelete={deleteSolution}
      />
    ),
  },
];

export function SolutionsTable({ solutions }: { solutions: Solution[] }) {
  return (
    <AdminTable
      rows={solutions}
      getRowKey={(r) => r.id}
      emptyMessage="No solutions yet."
      columns={columns}
    />
  );
}
