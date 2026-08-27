# Active Context

**Snapshot: 2026-08-26 (post-R13)** — updated every task per the Memory
Bank Protocol.

## Current State

- **R13 complete on `refactor/cleanup`** (checkpoint approved): tray closes
  on any navigation via guarded render-time pathname reset (React docs
  "adjust state when a prop changes"); the suppressed effect is gone —
  zero lint suppressions repo-wide; gates green (12/12 SSG), visually neutral.
- Same-route logo tap now closes the tray too (onClick close on the Home
  link — client-side `/`→`/` navigation is invisible to pathname diffing).
- Detour recorded: derived `openPathname` variant passed its isolated checks
  but retained stale state — back-navigation to the route named in state
  resurrected the open tray. Lesson: destroy stale state, don't mask it.
- R12/R12.1 stable beneath: naming audit, shell-aligned 1120px column,
  `cardSizeStyles` hoist (debt #15 closed).
- **Next: F1** resume button (PDF in `public/`, footer icon link), then
  F2 SEO, F3 reduced-motion.

## Known Deferred Items

- Footer contact links hardcoded + icon-only links lack `aria-label` → F1.
- Experience avatar gradient stays a deliberate non-token → no action.
- Navbar toggle button lacks `aria-expanded` disclosure state → F3 a11y
  follow-up (flagged during R13 review, out of scope there).
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
