import { Container } from "@/components/layout/Container";

interface MarketingPageShellProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  containerClassName?: string;
}

export function MarketingPageShell({
  eyebrow,
  title,
  subtitle,
  children,
  containerClassName,
}: MarketingPageShellProps) {
  return (
    <section className="bg-white py-24">
      <Container className={containerClassName}>
        <div className="mb-14 max-w-2xl">
          <span className="font-technical text-xs uppercase tracking-wide text-brand">
            {eyebrow}
          </span>
          <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base leading-relaxed text-neutral-600">{subtitle}</p>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
