# Active Context

**Snapshot: 2026-08-31 (post-F3)** — updated every task per the Memory
Bank Protocol.

## Current State

- **Roadmap complete** — R1–R13 + F1–F3 all landed. F3 rides
  `feat/portfolio-features` (push/merge = Thayer's call, never automatic).
- F3: `MotionConfig reducedMotion="user"` in layout + `useReducedMotion()`
  autoplay gates in both carousel islands + navbar `aria-expanded` a11y.
- `useReducedMotion()` is mount-time-only in framer 12.43 — mid-session OS
  toggles need a reload (quirk noted in techContext).
- **Queued (approved):** hovered project cards overlay the navbar
  (`spotlightHover.zIndex` 50→10), then floating glass footer card.
- Flagged, unfixed: navbar (z-50) ↔ modal overlay (z-50) tie survives on
  DOM order; deliberate scale would be cards 10 < chrome 50 < modal 60.
- Resume-link navbar/hero variant parked — revisit if footer feels weak.

## Known Deferred Items

- Experience avatar gradient stays a deliberate non-token → no action.
- R12 accepted names (judgment calls, not violations): `featured`,
  `accentLine`, `InfoCard.button`.

## Working Agreements in Force

- `.clinerules` is law; on disagreement it wins and the bank gets corrected.
- Refactors visually neutral; exceptions need Thayer's sign-off.
- One roadmap item = one task = one commit; flag out-of-scope findings.
- Ask before dependency changes; never push without asking.
