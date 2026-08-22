import type { ReactNode } from "react";

const tagPillVariants = {
  // Experience tech tags (small, uppercase, wide tracking).
  tag: "rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent-tint",
  // Experience duration chip.
  accent: "rounded-full border border-white/10 bg-accent/10 px-3 py-1 text-sm font-medium text-accent-tint",
  // Home focus-area pills (Web / Mobile / Game Dev).
  muted: "rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-gray-200",
  // Home hero role badge.
  badge:
    "inline-flex items-center rounded-full border border-accent/40 bg-accent/12 px-3 py-1 text-sm font-medium tracking-[0.2em] text-accent-soft uppercase",
} as const satisfies Record<string, string>;

type TagPillVariant = keyof typeof tagPillVariants;

type TagPillProps = {
  variant: TagPillVariant;
  children: ReactNode;
};

export default function TagPill({ variant, children }: TagPillProps) {
  return <span className={tagPillVariants[variant]}>{children}</span>;
}