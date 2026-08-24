import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
