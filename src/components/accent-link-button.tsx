"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

const buttonHover = {
  hover: { scale: 1.04, transition: { duration: 0.2 } },
};

const buttonClasses =
  "w-max rounded-lg bg-accent px-4 py-2 transition duration-300 hover:bg-accent-deep";

type AccentLinkButtonProps = {
  href: string;
  /** Appended to the base classes (e.g. info cards add `mt-3`). */
  className?: string;
  children: ReactNode;
};

// Home's recurring CTA — a Link wrapping a motion.button. Extracted in R8 as a
// client island so the server page can compose the four duplicate instances.
export default function AccentLinkButton({ href, className, children }: AccentLinkButtonProps) {
  return (
    <Link href={href}>
      <motion.button
        variants={buttonHover}
        whileHover="hover"
        className={className ? `${buttonClasses} ${className}` : buttonClasses}
      >
        {children}
      </motion.button>
    </Link>
  );
}