interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 pb-5">
      <div>
        <h1
          className="text-[18px] font-semibold leading-tight tracking-tight"
          style={{ color: "var(--admin-text-primary)" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--admin-text-secondary)" }}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
