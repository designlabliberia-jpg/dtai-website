import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { RouteProgressBar } from "@/components/layout/RouteProgressBar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ScrollToHash } from "@/components/layout/ScrollToHash";
import { AmbientField } from "@/components/layout/AmbientField";
import { ChatLauncher } from "@/components/layout/ChatLauncher";
import { getSiteConfig } from "@/lib/seo";
import { getPublishedServices } from "@/lib/actions/services";
import { getSiteSettings } from "@/lib/site-settings";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [services, settings, sc] = await Promise.all([
    getPublishedServices(),
    getSiteSettings(),
    getSiteConfig(),
  ]);
  const serviceLinks = services.map((s) => ({ title: s.profileEyebrow, href: `/services/${s.slug}` }));
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: sc.fullName,
    alternateName: sc.name,
    url: sc.url,
    logo: `${sc.url}${sc.logo}`,
    description: sc.description,
  };
  return (
    <>
      <AmbientField />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <RouteProgressBar />
      <Header serviceLinks={serviceLinks} settings={settings} />
      <main className="overflow-x-clip">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer settings={settings} />
      <ScrollToTop />
      <ScrollToHash />
      <ChatLauncher />
    </>
  );
}
