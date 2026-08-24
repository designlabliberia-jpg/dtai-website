import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  href?: string;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand/10">
        <Icon size={18} className="text-brand" />
      </div>
      <div>
        <p className="font-technical text-[10px] uppercase tracking-widest text-neutral-400">{label}</p>
        <p className="mt-0.5 text-2xl font-semibold text-neutral-900">{value}</p>
      </div>
    </div>
  );
}
