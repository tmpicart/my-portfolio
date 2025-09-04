"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#40434E] p-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold hover:text-[#A673E7]">
          Home
        </Link>

        {/* Hamburger button - mobile only */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex md:space-x-6 md:items-center">
          <Link href="/projects" className="hover:text-[#A673E7]">Projects</Link>
          <Link href="/experience" className="hover:text-[#A673E7]">Experience</Link>
          <Link href="/skills" className="hover:text-[#A673E7]">Skills</Link>
          <Link href="/education" className="hover:text-[#A673E7]">Education</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col md:hidden bg-[#40434E] mt-2 space-y-2 px-4 pb-4">
          <Link href="/projects" className="hover:text-[#A673E7]">Projects</Link>
          <Link href="/experience" className="hover:text-[#A673E7]">Experience</Link>
          <Link href="/skills" className="hover:text-[#A673E7]">Skills</Link>
          <Link href="/education" className="hover:text-[#A673E7]">Education</Link>
        </div>
      )}
    </nav>
  );
}
