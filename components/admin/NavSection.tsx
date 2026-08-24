interface NavSectionProps {
  label: string;
  collapsed?: boolean;
  children: React.ReactNode;
}

export function NavSection({ label, collapsed, children }: NavSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      {!collapsed && (
        <p className="px-3 font-technical text-[10px] uppercase tracking-widest text-neutral-400 h-4 flex items-center">
          {label}
        </p>
      )}
      {collapsed && <div className="h-4" />}
      {children}
    </div>
  );
}
