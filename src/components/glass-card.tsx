"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

const glassCardVariants = {
  // `relative` anchors the accent line to the card, not the page shell.
  panel: "relative rounded-[32px] border border-white/15 bg-white/10 p-8 backdrop-blur-xl",
  timeline:
    "group relative flex flex-col items-center gap-10 rounded-[32px] border border-white/15 bg-white/10 p-10 backdrop-blur-xl md:flex-row md:p-10",
  // Hub cards — no padding or CSS transition baked in: size styles supply
  // padding, and a transition would fight the framer hover spring.
  spotlight:
    "group relative flex flex-col overflow-hidden rounded-[36px] border border-white/[0.12] bg-white/[0.08] backdrop-blur-2xl ring-1 ring-white/[0.05]",
  hero: "relative mb-7 flex w-full max-w-6xl flex-col items-center gap-8 overflow-hidden rounded-[44px] border border-white/[0.12] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] p-8 text-white backdrop-blur-xl sm:p-10 lg:flex-row lg:gap-12 lg:p-12",
  // `flex-1` deliberately not baked in — only the projects panel grows.
  section: "relative flex flex-col rounded-[40px] border border-white/[0.08] bg-white/[0.04] p-12 backdrop-blur-xl",
  tile: "flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl",
} as const satisfies Record<string, string>;

type GlassCardVariant = keyof typeof glassCardVariants;

// `children` is re-pinned to ReactNode — HTMLMotionProps widens it to
// MotionValue | ReactNode, which motion.div won't accept as JSX children.
type GlassCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  variant: GlassCardVariant;
  accentLine?: boolean;
  children?: ReactNode;
};

export default function GlassCard({ variant, accentLine = false, className, children, ...motionProps }: GlassCardProps) {
  const variantClasses = glassCardVariants[variant];
  return (
    <motion.div
      className={className ? `${variantClasses} ${className}` : variantClasses}
      {...motionProps}
    >
      {accentLine && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-transparent via-accent/70 to-transparent" />
      )}
      {children}
    </motion.div>
  );
}