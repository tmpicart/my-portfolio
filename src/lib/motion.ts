import type { Transition, Variants } from "framer-motion";

// The site's motion vocabulary: timing tokens, factories for the patterns
// where only timing varies, and named variants for distinctive choreography.
// Everything is data-only so Server Components can compose entrances too —
// function-based variants don't serialize across the client boundary.

// Timing tokens

// framer's `Easing` type wants a mutable 4-tuple, so `as const` is not an
// option here.
const easeOut: [number, number, number, number] = [0.25, 0.8, 0.25, 1];

/** Small elements and hover feedback. */
export const durationFast = 0.3;
/** Standard entrances. */
export const durationBase = 0.5;
/** Large panels (home hero/sections, education panel). */
export const durationSlow = 0.8;
/** The one stagger step every list uses, site-wide. */
export const staggerInterval = 0.12;

/** Hub-card entrance spring. */
export const springEntrance: Transition = { type: "spring", stiffness: 160, damping: 22 };
/** Hover spring shared by transform hovers. */
export const springHover: Transition = { type: "spring", stiffness: 180, damping: 16 };

// Factories

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

// Named variants

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
 * Hub-card hover — accent tint identity kept; consumed via whileHover="hover".
 * zIndex must stay below the navbar's z-50: cards carry no isolating ancestor,
 * so the hover z participates in the root stacking context — at 50 it tied
 * the navbar and won on DOM order, painting cards over the fixed bar.
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

/** CTA hover — consumed via whileHover="hover". */
export const liftOnHover: Variants = {
  hover: { scale: 1.04, transition: { duration: durationFast } },
};
