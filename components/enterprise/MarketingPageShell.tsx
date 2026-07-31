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
    <section className="mb-8 lg:mb-12">
      <Container className={containerClassName}>
        <div className="grid items-center gap-12 lg:grid-cols-2 py-12">
          <div>
           <h1 className="flex items-center gap-3 font-technical text-lg uppercase tracking-widest text-brand">
              <span className="w-1 h-6 bg-brand rounded-full" />{eyebrow}
              <span className="hidden sm:block w-64 h-px bg-brand" />
            </h1>
            <h2 className="mt-3 font-primary text-2xl font-bold leading-tight text-neutral-900 sm:text-xl">
               {title}
           </h2>  
          </div>

          {subtitle && (
          <div className="flex flex-col sm:items-end gap-3">
            <p className="hidden max-w-xs sm:text-right text-sm leading-relaxed text-neutral-500 sm:block">
              {subtitle}
          </p>
          </div>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
