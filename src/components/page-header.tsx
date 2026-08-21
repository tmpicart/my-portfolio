"use client";

import { motion } from "framer-motion";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
};

// Canonical header (R5): eyebrow/eyebrow-tint (#D7BFFF), mb-10 spacing, and a
// 0.5s fade-up. Per-page drift (projects' #B8A6FF tint + tracking-tight,
// education's 1s y:-25, varying margins) was consolidated with Thayer's
// approval — R6/R10 can tune the single source if needed.
export default function PageHeader({ eyebrow, title }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-10 text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#D7BFFF]">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
    </motion.div>
  );
}