import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type NavChild = { title: string; href: string; icon?: LucideIcon };

type DropdownPanelProps = Readonly<{
  items: NavChild[];
  isOpen: boolean;
  isActive: (href: string) => boolean;
  onClose: () => void;
  viewAllHref?: string;
  viewAllLabel?: string;
}>;

export function DropdownPanel({ items, isOpen, isActive, onClose, viewAllHref, viewAllLabel }: DropdownPanelProps) {
  const visible = items.slice(0, 4);

  return (
    <div
      className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-opacity duration-150 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="w-64 rounded-2xl border border-neutral-200 bg-white p-3 shadow-xl">
        <div className="flex flex-col gap-1">
          {visible.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                  active ? "bg-brand/8 text-brand" : "text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                {Icon && (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50">
                    <Icon className="h-4 w-4 text-neutral-600" strokeWidth={1.5} />
                  </span>
                )}
                <span className="text-sm font-medium leading-tight">{item.title}</span>
              </Link>
            );
          })}
        </div>
        {viewAllHref && (
          <div className="mt-2 border-t border-neutral-100 pt-2">
            <Link
              href={viewAllHref}
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/8"
            >
              {viewAllLabel ?? "View All"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
