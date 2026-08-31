import type { Transition, Variants } from "framer-motion";

// Data-only by design — function variants don't serialize across the
// server/client boundary, so Server Components can compose entrances too.

// framer's `Easing` type wants a mutable 4-tuple, so `as const` won't type.
const easeOut: [number, number, number, number] = [0.25, 0.8, 0.25, 1];

/** Small elements and hover feedback. */
export const durationFast = 0.3;
/** Standard entrances. */
export const durationBase = 0.5;
/** Large panels (home hero/sections, education panel). */
export const durationSlow = 0.8;
/** The one stagger step every list uses, site-wide. */
export const staggerInterval = 0.12;
/** Site-wide carousel autoplay rhythm (home + [slug] gallery). */
export const autoplayDelayMs = 4500;

/** Hub-card entrance spring. */
export const springEntrance: Transition = { type: "spring", stiffness: 160, damping: 22 };
/** Hover spring shared by transform hovers. */
export const springHover: Transition = { type: "spring", stiffness: 180, damping: 16 };

/** Orchestrator variant: staggers its variant children by `interval`. */
export function staggerContainer(interval: number = staggerInterval): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: interval } },
  };
}

/** Entrance: fade in while rising `distance`px. */
export function fadeUp(distance: number = 20, duration: number = durationBase): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition: { duration, ease: easeOut } },
  };
}

/** Entrance: fade in while dropping `distance`px — page/section headers. */
export function fadeDown(distance: number = 20, duration: number = durationBase): Variants {
  return {
    hidden: { opacity: 0, y: -distance },
    visible: { opacity: 1, y: 0, transition: { duration, ease: easeOut } },
  };
}

/** Timeline cards slide in from the left — the one directional entrance. */
export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: durationBase, ease: easeOut } },
};

/** Hub cards rise on the entrance spring. */
export const spotlightEntrance: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springEntrance },
};

/**
 * Hub-card hover. zIndex must stay in the raised layer of the z ladder
 * (globals.css) — cards share the root stacking context with the fixed
 * navbar, so anything higher paints over the bar.
 */
export const spotlightHover: Variants = {
  hover: {
    scale: 1.04,
    rotate: 0.25,
    y: 0,
    zIndex: 10,
    backgroundColor: "rgba(166,115,231,0.22)",
    borderColor: "rgba(166,115,231,0.55)",
    transition: springHover,
  },
};

/** CTA hover. */
export const liftOnHover: Variants = {
  hover: { scale: 1.04, transition: { duration: durationFast } },
};
