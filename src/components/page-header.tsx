"use client";

import { motion } from "framer-motion";

import { fadeDown } from "@/lib/motion";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
};

const headerVariants = fadeDown();

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