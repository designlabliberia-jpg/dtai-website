import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { RouteProgressBar } from "@/components/layout/RouteProgressBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://dtai.example.com"),
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
  },
  twitter: {
    card: "summary_large_image",
    title: "DTAI — Engineering Africa's Digital Infrastructure",
    description:
      "DTAI designs, builds, and operates secure digital systems for governments, institutions, and enterprises.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
