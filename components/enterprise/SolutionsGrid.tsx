import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Solution {
  label: string;
  icon: string;
}

export function SolutionsGrid({ solutions }: { solutions: Solution[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {solutions.map((s) => {
        const Icon = (Icons as unknown as Record<string, LucideIcon>)[s.icon] ?? Icons.CheckCircle2;
        return (
          <div
            key={s.label}
            className="group flex items-start gap-3 rounded-lg border border-neutral-300/60 p-4 transition-all duration-standard hover:-translate-y-0.5 hover:border-tech-blue hover:shadow-sm"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-infra-midnight transition-colors duration-standard group-hover:bg-brand">
              <Icon size={16} className="text-tech-blue transition-colors duration-standard group-hover:text-white" strokeWidth={1.75} />
            </div>
            <p className="pt-1.5 text-sm leading-relaxed text-neutral-700">{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}
