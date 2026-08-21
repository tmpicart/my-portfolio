"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

const glassCardVariants = {
  // Content panel (education card, skills category sections). `relative`
  // anchors the optional accent line to the card — the skills sections were
  // missing it, so their accent bars pinned to the page shell instead
  // (fixed in R5 with Thayer's approval).
  panel: "relative rounded-[32px] border border-white/15 bg-white/10 p-8 backdrop-blur-xl",
  // Experience timeline cards (logo left, content right on md+).
  timeline:
    "group relative flex flex-col items-center gap-10 rounded-[32px] border border-white/15 bg-white/10 p-10 backdrop-blur-xl transition-all duration-300 ease-out md:flex-row md:p-10",
  // Projects hub cards. Padding is intentionally excluded — the hub's size
  // styles supply p-6/p-8, and a baked-in p-6 would silently lose to a
  // caller's p-8 depending on stylesheet order.
  spotlight:
    "group relative flex flex-col overflow-hidden rounded-[36px] border border-white/[0.12] bg-white/[0.08] backdrop-blur-2xl ring-1 ring-white/[0.05] transition-all duration-300 ease-out",
  // Home hero panel (intro copy + profile image).
  hero: "relative mb-7 flex w-full max-w-6xl flex-col items-center gap-8 overflow-hidden rounded-[44px] border border-white/[0.12] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] p-8 text-white backdrop-blur-xl sm:p-10 lg:flex-row lg:gap-12 lg:p-12",
  // Home content panels. `flex-1` is deliberately not baked in — only the
  // projects panel grows; the info cards size to content.
  section: "relative flex flex-col rounded-[40px] border border-white/[0.08] bg-white/[0.04] p-12 backdrop-blur-xl",
  // Skills grid tiles.
  tile: "flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl transition-all duration-300",
} as const satisfies Record<string, string>;

type GlassCardVariant = keyof typeof glassCardVariants;

// `children` is re-pinned to ReactNode — HTMLMotionProps widens it to
// MotionValue | ReactNode, which motion.div won't accept as JSX children.
type GlassCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  variant: GlassCardVariant;
  /** Renders the 2px accent gradient along the card's top edge. */
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
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#A673E7]/70 to-transparent" />
      )}
      {children}
    </motion.div>
  );
}