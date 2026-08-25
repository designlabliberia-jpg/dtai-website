import { Mail, Briefcase, Users, FileText } from "lucide-react";

export type ActivityType = "contact" | "application" | "pipeline" | "article";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  description: string;
  createdAt: Date;
}

const TYPE_META: Record<ActivityType, { icon: typeof Mail; color: string }> = {
  contact:     { icon: Mail,      color: "var(--admin-brand)" },
  application: { icon: Briefcase, color: "var(--chart-4)" },
  pipeline:    { icon: Users,     color: "var(--admin-success)" },
  article:     { icon: FileText,  color: "var(--admin-accent)" },
};

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <p
        className="py-6 text-center font-technical text-[10px] uppercase tracking-widest"
        style={{ color: "var(--admin-text-muted)" }}
      >
        No recent activity
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const meta = TYPE_META[item.type];
        const Icon = meta.icon;
        const isLast = i === items.length - 1;

        return (
          <div key={item.id} className="flex gap-3">
            {/* Timeline line + icon */}
            <div className="flex flex-col items-center">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ background: "var(--admin-surface-2)", border: "1px solid var(--admin-border)" }}
              >
                <Icon size={12} style={{ color: meta.color }} />
              </div>
              {!isLast && (
                <div
                  className="w-px flex-1 my-1"
                  style={{ background: "var(--admin-border)" }}
                />
              )}
            </div>

            {/* Content */}
            <div className={`flex flex-1 flex-col gap-0.5 ${isLast ? "pb-0" : "pb-3"}`}>
              <p
                className="text-sm leading-snug"
                style={{ color: "var(--admin-text-primary)" }}
              >
                {item.description}
              </p>
              <span
                className="font-technical text-[10px]"
                style={{ color: "var(--admin-text-muted)" }}
              >
                {relativeTime(item.createdAt)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
