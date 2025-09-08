import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Thayer's Portfolio",
  description: "Explore my projects, skills, education, and professional experience!",
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
        
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 mx-auto w-full max-w-6xl px-4 pt-20 md:pt-24">
          {children}
        </main>

        {/* Footer */}
        <footer className="flex flex-col items-center bg-gradient-to-t from-[#101010] to-[#070707] py-6 text-center">
      
          <h2 className="mb-2 text-2xl md:text-3xl font-semibold">Let’s Connect</h2>
          
          <p className="mb-3 text-base md:text-lg text-gray-300">
            Reach me on LinkedIn, GitHub, or send me an email.
          </p>
          
          <div className="flex space-x-6 text-3xl md:text-4xl">
            
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/tmpicart"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#A673E7]"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            
            {/* GitHub */}
            <a
              href="https://github.com/tmpicart"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#A673E7]"
            >
              <i className="fab fa-github"></i>
            </a>
            
            {/* Email */}
            <a
              href="mailto:tmpicart@gmail.com"
              className="transition-colors hover:text-[#A673E7]"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
