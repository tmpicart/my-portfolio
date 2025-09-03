import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Showcasing my work, experience, and skills",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-[#070707] text-white antialiased caret-transparent">
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 z-50 w-full bg-[#40434E] p-4 shadow-lg">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link href="/" className="text-2xl font-bold hover:text-[#A673E7]">
              Home
            </Link>
            <div className="space-x-6">
              <Link href="/projects" className="hover:text-[#A673E7]">Projects</Link>
              <Link href="/experience" className="hover:text-[#A673E7]">Experience</Link>
              <Link href="/skills" className="hover:text-[#A673E7]">Skills</Link>
              <Link href="/education" className="hover:text-[#A673E7]">Education</Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 mx-auto w-full max-w-6xl px-4 pt-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="flex flex-col items-center bg-gradient-to-t from-[#101010] to-[#070707] py-6 text-center">
          <h2 className="mb-2 text-2xl font-semibold">Let’s Connect</h2>
          <p className="mb-3 text-base text-gray-300">
            Reach me on LinkedIn, GitHub, or view my resume.
          </p>
          <div className="flex space-x-6 text-3xl">
            <a
              href="https://www.linkedin.com/in/tmpicart"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#A673E7]"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/tmpicart"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#A673E7]"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="/files/Resume-Thayer-Picart.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#A673E7]"
            >
              <i className="fas fa-file-pdf"></i>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
