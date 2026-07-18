import { Users } from "lucide-react";

export function WhoThisIsFor({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-center gap-3 rounded-lg border border-neutral-300/60 p-4"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-infra-midnight">
            <Users size={16} className="text-tech-blue" strokeWidth={1.75} />
          </div>
          <span className="text-sm font-medium text-neutral-800">{item}</span>
        </div>
      ))}
    </div>
  );
}
