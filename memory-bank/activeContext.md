# Active Context

**Snapshot: 2026-08-26 (post-R12.1)** — updated every task per the Memory
Bank Protocol.

## Current State

- **R12 complete on `refactor/cleanup`** (checkpoint approved): naming
  audit landed — abbreviations gone (`project`, `index`, `summaryClass`,
  `carouselApi`), camelCase constants, BOM/layout-marker hygiene, inline
  z-index → `z-0`; `motion.main` → `motion.div` in PageShell + ProjectDetail
  (layout owns the single `<main>`).
- Shell-aligned column (Thayer-approved exception): navbar row + tray and
  `[slug]` share the 1120px edge = max-w-6xl − main's 16px px-4 inset.
- README refreshed in its original voice: real stack, Getting Started,
  working commands, markdown live link.
- **R12.1 landed same-day** (checkpoint approved): `sizeStyles` hoisted to
  module-scope `cardSizeStyles` + derived `CardSize`; debt #15 closed —
  no body-constant violations remain (sweep had exactly one hit, now zero).
- Lint + build green (12/12 SSG).
- **Next: R13** — navbar menu-close render-time reset (removes the
  `set-state-in-effect` suppression); then F1–F3.

## Known Deferred Items

- Footer contact links hardcoded + icon-only links lack `aria-label` → F1.
- Experience avatar gradient stays a deliberate non-token → no action.
- Navbar menu-close suppression → R13.
- Reduced-motion support deliberately skipped in R10 → F3.
- `home.png` doubles as Open Graph image candidate → F2.
- R12 accepted names (documented judgment calls, not violations):
  `featured`, `accentLine`, `InfoCard.button`.

## Working Agreements in Force

- `.clinerules` is law; on disagreement it wins and the bank gets corrected.
- Refactors are visually neutral; exceptions need Thayer's sign-off (R3
  thumbnails, R5 header/skills, R7 `SiGithub`, R8 pause behavior, R9 dots,
  R10 entrance retiming + hover sharpening, R11 stock-photo removal, R12
  shell-aligned 1120px column).
- One roadmap item = one task = one commit; flag out-of-scope findings.
- Ask before dependency changes; never push without asking.
