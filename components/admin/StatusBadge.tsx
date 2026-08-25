type StatusVariant =
  | "new" | "read" | "responded"
  | "reviewing" | "interviewed" | "hired" | "rejected"
  | "lead" | "proposal_sent" | "negotiating" | "won" | "lost"
  | "active" | "inactive"
  | "In Development" | "Live";

const VARIANT_STYLES: Record<StatusVariant, { bg: string; color: string; border: string }> = {
  new:            { bg: "var(--admin-info-bg)",    color: "var(--admin-brand)",          border: "var(--admin-border-accent)" },
  read:           { bg: "var(--admin-surface-2)",  color: "var(--admin-text-secondary)", border: "var(--admin-border-strong)" },
  responded:      { bg: "var(--admin-success-bg)", color: "var(--admin-success)",        border: "var(--admin-success)" },
  reviewing:      { bg: "var(--admin-warning-bg)", color: "var(--admin-warning)",        border: "var(--admin-warning)" },
  interviewed:    { bg: "var(--admin-info-bg)",    color: "var(--admin-accent)",         border: "var(--admin-border-accent)" },
  hired:          { bg: "var(--admin-success-bg)", color: "var(--admin-success)",        border: "var(--admin-success)" },
  rejected:       { bg: "var(--admin-danger-bg)",  color: "var(--admin-danger)",         border: "var(--admin-danger)" },
  lead:           { bg: "var(--admin-info-bg)",    color: "var(--admin-brand)",          border: "var(--admin-border-accent)" },
  proposal_sent:  { bg: "var(--admin-warning-bg)", color: "var(--admin-warning)",        border: "var(--admin-warning)" },
  negotiating:    { bg: "var(--admin-warning-bg)", color: "var(--admin-warning)",        border: "var(--admin-warning)" },
  won:            { bg: "var(--admin-success-bg)", color: "var(--admin-success)",        border: "var(--admin-success)" },
  lost:           { bg: "var(--admin-surface-2)",  color: "var(--admin-text-muted)",     border: "var(--admin-border-strong)" },
  active:         { bg: "var(--admin-success-bg)", color: "var(--admin-success)",        border: "var(--admin-success)" },
  inactive:       { bg: "var(--admin-surface-2)",  color: "var(--admin-text-muted)",     border: "var(--admin-border-strong)" },
  "In Development": { bg: "var(--admin-warning-bg)", color: "var(--admin-warning)",      border: "var(--admin-warning)" },
  Live:           { bg: "var(--admin-success-bg)", color: "var(--admin-success)",        border: "var(--admin-success)" },
};

const LABELS: Record<StatusVariant, string> = {
  new: "New", read: "Read", responded: "Responded",
  reviewing: "Reviewing", interviewed: "Interviewed", hired: "Hired", rejected: "Rejected",
  lead: "Lead", proposal_sent: "Proposal Sent", negotiating: "Negotiating", won: "Won", lost: "Lost",
  active: "Active", inactive: "Inactive",
  "In Development": "In Development", Live: "Live",
};

interface StatusBadgeProps {
  status: StatusVariant;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const s = VARIANT_STYLES[status] ?? VARIANT_STYLES.read;
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 font-technical text-[9px] uppercase tracking-[0.1em]"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
