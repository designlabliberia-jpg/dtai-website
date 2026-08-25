interface NavSectionProps {
  label: string;
  collapsed?: boolean;
  children: React.ReactNode;
}

export function NavSection({ label, collapsed, children }: NavSectionProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {!collapsed ? (
        <p
          className="mb-0.5 px-2.5 font-technical text-[9px] uppercase tracking-[0.15em]"
          style={{ color: "var(--admin-sidebar-section-label)" }}
        >
          {label}
        </p>
      ) : (
        <div
          className="mx-auto my-1 h-px w-6"
          style={{ background: "var(--admin-sidebar-border)" }}
        />
      )}
      {children}
    </div>
  );
}
