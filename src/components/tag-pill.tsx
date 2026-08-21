import type { ReactNode } from "react";

const tagPillVariants = {
  // Experience tech tags (small, uppercase, wide tracking).
  tag: "rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#D7BFFF]",
  // Experience duration chip.
  accent: "rounded-full border border-white/10 bg-[#A673E7]/10 px-3 py-1 text-sm font-medium text-[#D7BFFF]",
  // Home focus-area pills (Web / Mobile / Game Dev).
  muted: "rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-gray-200",
  // Home hero role badge.
  badge:
    "inline-flex items-center rounded-full border border-[#A673E7]/40 bg-[#A673E7]/12 px-3 py-1 text-sm font-medium tracking-[0.2em] text-[#E7D4FF] uppercase",
} as const satisfies Record<string, string>;

type TagPillVariant = keyof typeof tagPillVariants;

type TagPillProps = {
  variant: TagPillVariant;
  children: ReactNode;
};

export default function TagPill({ variant, children }: TagPillProps) {
  return <span className={tagPillVariants[variant]}>{children}</span>;
}