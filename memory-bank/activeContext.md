# Active Context

**Snapshot: 2026-08-31 (post-F2)** — updated every task per the Memory
Bank Protocol.

## Current State

- **F2 landed** on `feat/portfolio-features`: full metadata
  layer (root foundation + 4 static pages + `[slug]` generateMetadata
  from lib data), `metadataBase` (env-backed URL — future domain = one
  env var), `sitemap.ts`, `robots.ts`, `next/og` 1200×630 OG card
  derived from `lib/home.ts` hero copy. No photo — discrimination
  concern (standing rule).
- F1 resume button landed (footer, `lib/contact.ts`).
- R1–R13 + F1 deployed on `main`; F2 rides the next feat-branch push
  (push/merge = Thayer's call, never automatic).
- **Next: F3** reduced-motion (`MotionConfig reducedMotion="user"` in
  layout + `useReducedMotion()` autoplay gate in both carousel islands).
- Navbar toggle lacks `aria-expanded` disclosure state → F3 a11y
  follow-up (flagged R13).
- Resume-link navbar/hero variant parked — revisit if footer feels weak.

## Known Deferred Items

- Experience avatar gradient stays a deliberate non-token → no action.
- `home.png` is portfolio-project content only now (OG default is the
  generated card).
- R12 accepted names (judgment calls, not violations): `featured`,
  `accentLine`, `InfoCard.button`.

## Working Agreements in Force

- `.clinerules` is law; on disagreement it wins and the bank gets corrected.
- Refactors visually neutral; exceptions need Thayer's sign-off.
- One roadmap item = one task = one commit; flag out-of-scope findings.
- Ask before dependency changes; never push without asking.
