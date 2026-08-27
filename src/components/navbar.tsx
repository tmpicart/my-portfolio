"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/education", label: "Education" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // Render-time reset (R13): any navigation closes the tray. Resetting during
  // render (not in an effect) keeps the invalid frame from ever committing and
  // destroys the state, so returning to a route can't resurrect a tray opened
  // there earlier. The guard makes it terminate after one discarded replay.
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-surface-1 px-4 py-3 shadow-lg">
      {/* One column with every page shell: max-w-6xl minus main's 16px px-4
          inset puts nav content on the shells' border edge. */}
      <div className="mx-auto flex max-w-[1120px] items-center justify-between">
        {/* Same-route click (/ -> /) is a no-op navigation no pathname-based
            close can see, so dismissal must happen here at event level. */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-bold text-white transition-colors duration-200 hover:text-accent"
        >
          Home
        </Link>

        <button
          aria-label="Toggle navigation menu"
          className="rounded-lg border border-white/10 bg-menu p-2 text-2xl text-white transition-colors duration-200 hover:border-accent/40 hover:text-accent md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="hidden items-center space-x-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors duration-200 hover:text-accent">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-3 flex max-w-[1120px] flex-col gap-2 rounded-xl border border-white/10 bg-menu-tray p-2 shadow-inner md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg border border-white/10 bg-menu px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-accent/40 hover:bg-menu-hover hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}