export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-50 text-neutral-900 antialiased min-h-screen">
      {children}
    </div>
  );
}
