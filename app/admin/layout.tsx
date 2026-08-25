import "@/design-system/tokens/admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="antialiased min-h-screen"
      style={{
        background: "var(--admin-bg)",
        color: "var(--admin-text-primary)",
        fontFamily: "var(--font-primary)",
      }}
    >
      {children}
    </div>
  );
}
