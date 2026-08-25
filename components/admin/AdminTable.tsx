interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  width?: string;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyMessage?: string;
}

export function AdminTable<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = "No records found.",
}: AdminTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div
        className="flex h-40 items-center justify-center rounded-[var(--radius-md)]"
        style={{
          background: "var(--admin-surface)",
          border: "1px solid var(--admin-border)",
          boxShadow: "var(--admin-shadow-panel)",
        }}
      >
        <p
          className="font-technical text-[10px] uppercase tracking-widest"
          style={{ color: "var(--admin-text-muted)" }}
        >
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className="overflow-x-auto rounded-[var(--radius-md)]"
      style={{
        background: "var(--admin-surface)",
        border: "1px solid var(--admin-border)",
        boxShadow: "var(--admin-shadow-panel)",
      }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--admin-border)" }}>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  ...(col.width ? { width: col.width } : {}),
                  color: "var(--admin-text-muted)",
                  background: "var(--admin-surface-2)",
                }}
                className="px-4 py-3 text-left font-technical text-[9px] uppercase tracking-[0.12em]"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={getRowKey(row)}
              style={{
                borderBottom:
                  i < rows.length - 1 ? "1px solid var(--admin-border)" : "none",
              }}
              className="transition-colors duration-100"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--admin-surface-2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3"
                  style={{ color: "var(--admin-text-secondary)" }}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
