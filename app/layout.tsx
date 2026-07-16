import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { RouteProgressBar } from "@/components/layout/RouteProgressBar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { AmbientField } from "@/components/layout/AmbientField";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { siteMetadata, organizationSchema } from "@/lib/seo";

export const metadata = siteMetadata;

export default function RootLayout({children, }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>
        <AmbientField />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <RouteProgressBar />
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ScrollToTop />
        <ChatWidget />
      </body>
    </html>
  );
}
