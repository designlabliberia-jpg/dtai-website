import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { RouteProgressBar } from "@/components/layout/RouteProgressBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://dtai.designlab.technology"),
  title: {
    default: "DTAI — Engineering Africa's Digital Infrastructure",
    template: "%s | DTAI",
  },
  description:
    "DTAI designs, builds, and operates secure digital systems that enable governments, institutions, and enterprises to deliver critical services.",
  openGraph: {
    title: "DTAI — Engineering Africa's Digital Infrastructure",
    description:
      "DTAI designs, builds, and operates secure digital systems for governments, institutions, and enterprises.",
    siteName: "DTAI",
    type: "website",
    images: [
      {
        url: "/assets/dtai-logo.png",
        width: 488,
        height: 511,
        alt: "DTAI — Digital Technology Associates Inc.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DTAI — Engineering Africa's Digital Infrastructure",
    description:
      "DTAI designs, builds, and operates secure digital systems for governments, institutions, and enterprises.",
    images: ["/assets/dtai-logo.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digital Technology Associates Inc.",
  alternateName: "DTAI",
  url: "https://dtai.designlab.technology",
  logo: "https://dtai.designlab.technology/assets/dtai-logo.png",
  description:
    "DTAI designs, builds, and operates secure digital systems that enable governments, institutions, and enterprises to deliver critical services across Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
