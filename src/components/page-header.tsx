"use client";

import { motion } from "framer-motion";

import { fadeDown } from "@/lib/motion";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
};

// First child of the page stagger — every page opens with the header easing
// down, then content follows (variant labels propagate from PageShell).
const headerVariants = fadeDown();

// Canonical header (R5): eyebrow tint (text-accent-tint), mb-10 spacing.
export default function PageHeader({ eyebrow, title }: PageHeaderProps) {
  return (
    <motion.div variants={headerVariants} className="relative mb-10 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-accent-tint">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
    </motion.div>
  );
}