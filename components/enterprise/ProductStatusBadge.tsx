export function ProductStatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-tech-blue/30 bg-tech-blue/10 px-3 py-1 font-technical text-[10px] uppercase tracking-wide text-tech-blue">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tech-blue" />
      {status}
    </span>
  );
}
