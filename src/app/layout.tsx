import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Thayer's Portfolio",
  description: "Explore my projects, skills, education, and professional experience!",
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