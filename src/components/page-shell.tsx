"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type PageShellProps = {
  children: ReactNode;
  /** Variant labels forwarded to motion.main so pages can stagger children. */
  initial?: string;
  animate?: string;
  /** Appended to the base shell classes (e.g. education's `w-full`). */
  className?: string;
};

const shellClasses = `
  relative flex min-h-screen flex-col items-center overflow-hidden rounded-[44px]
  border border-white/[0.04]
  bg-[radial-gradient(circle_at_top_left,_rgba(166,115,231,0.16)_0%,_rgba(166,115,231,0.06)_35%,_rgba(18,18,20,0.98)_70%),linear-gradient(180deg,_var(--color-shell)_0%,_var(--color-shell)_100%)]
  px-6 pt-6 pb-12 mt-8 sm:mt-10 lg:mt-12 text-white sm:px-8 lg:px-14
`;

export default function PageShell({ children, initial, animate, className }: PageShellProps) {
  return (
    <motion.main
      initial={initial}
      animate={animate}
      className={className ? `${shellClasses} ${className}` : shellClasses}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />
      {children}
    </motion.main>
  );
}