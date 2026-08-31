import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  // Self-canonical for every route from one declaration: "./" resolves
  // against each page's own URL (the documented metadataBase pattern).
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-canvas text-white antialiased caret-transparent">
        <Navbar />
        <main className="flex-1 mx-auto w-full max-w-6xl px-4 pt-12 md:pt-16">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}