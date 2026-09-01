import "./globals.css";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSiteConfig } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteConfig();
  return {
    metadataBase: new URL(s.url),
    title: { default: `${s.name} | ${s.tagline}`, template: `%s | ${s.name}` },
    description: s.description,
    openGraph: {
      title: `${s.name} | ${s.tagline}`,
      description: s.description,
      siteName: s.name,
      type: "website",
      images: [{ url: s.logo, width: 488, height: 511, alt: s.fullName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${s.name} | ${s.tagline}`,
      description: s.description,
      images: [s.logo],
    },
  };
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
