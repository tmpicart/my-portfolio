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
  // Close the tray on navigation by resetting during render — an effect
  // would commit one stale open frame, and a render-time reset destroys the
  // state so a revisited route can't resurrect its old tray.
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <nav className="fixed left-0 top-0 z-40 w-full border-b border-white/10 bg-surface-1 px-4 py-3 shadow-lg">
      {/* max-w-6xl minus main's 16px inset — the column edge every page
          shell shares. */}
      <div className="mx-auto flex max-w-[1120px] items-center justify-between">
        {/* Same-route clicks never change the pathname, so close here. */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-bold text-white transition-colors duration-200 hover:text-accent"
        >
          Home
        </Link>

        <button
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
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
        <div
          id="mobile-navigation"
          className="mx-auto mt-3 flex max-w-[1120px] flex-col gap-2 rounded-xl border border-white/10 bg-menu-tray p-2 shadow-inner md:hidden"
        >
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