"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { liftOnHover } from "@/lib/motion";

const buttonClasses =
  "w-max rounded-lg bg-accent px-4 py-2 transition-colors duration-200 hover:bg-accent-deep";

type AccentLinkButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function AccentLinkButton({ href, className, children }: AccentLinkButtonProps) {
  return (
    <Link href={href}>
      <motion.button
        variants={liftOnHover}
        whileHover="hover"
        className={className ? `${buttonClasses} ${className}` : buttonClasses}
      >
        {children}
      </motion.button>
    </Link>
  );
}