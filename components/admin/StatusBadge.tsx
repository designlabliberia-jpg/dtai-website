type StatusVariant =
  | "new"
  | "read"
  | "responded"
  | "reviewing"
  | "interviewed"
  | "hired"
  | "rejected"
  | "lead"
  | "proposal_sent"
  | "negotiating"
  | "won"
  | "lost"
  | "active"
  | "inactive";

const VARIANT_STYLES: Record<StatusVariant, string> = {
  new:           "bg-blue-50 text-blue-700 border-blue-200",
  read:          "bg-neutral-100 text-neutral-600 border-neutral-200",
  responded:     "bg-green-50 text-green-700 border-green-200",
  reviewing:     "bg-yellow-50 text-yellow-700 border-yellow-200",
  interviewed:   "bg-purple-50 text-purple-700 border-purple-200",
  hired:         "bg-green-50 text-green-700 border-green-200",
  rejected:      "bg-red-50 text-red-600 border-red-200",
  lead:          "bg-blue-50 text-blue-700 border-blue-200",
  proposal_sent: "bg-yellow-50 text-yellow-700 border-yellow-200",
  negotiating:   "bg-orange-50 text-orange-700 border-orange-200",
  won:           "bg-green-50 text-green-700 border-green-200",
  lost:          "bg-neutral-100 text-neutral-500 border-neutral-200",
  active:        "bg-green-50 text-green-700 border-green-200",
  inactive:      "bg-neutral-100 text-neutral-500 border-neutral-200",
};

const LABELS: Record<StatusVariant, string> = {
  new:           "New",
  read:          "Read",
  responded:     "Responded",
  reviewing:     "Reviewing",
  interviewed:   "Interviewed",
  hired:         "Hired",
  rejected:      "Rejected",
  lead:          "Lead",
  proposal_sent: "Proposal Sent",
  negotiating:   "Negotiating",
  won:           "Won",
  lost:          "Lost",
  active:        "Active",
  inactive:      "Inactive",
};

interface StatusBadgeProps {
  status: StatusVariant;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2 py-0.5 font-technical text-[10px] uppercase tracking-widest",
        VARIANT_STYLES[status] ?? "bg-neutral-100 text-neutral-500 border-neutral-200",
      ].join(" ")}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
