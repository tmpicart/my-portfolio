# Active Context

**Snapshot: 2026-08-31 (post-features-merge)** — updated every task per
the Memory Bank Protocol.

## Current State

- **Roadmap complete + merged** — refactor (R1–R13, merge `31eda54`) and
  features (F1–F3 + z-fix/z-ladder follow-ups) both folded into `main`;
  Vercel deploy on push, Thayer's call.
- `feat/portfolio-features` retires (local + origin) after push approval —
  precedent: `refactor/cleanup` deletion post-merge.
- F1–F3 substance: footer resume/contact (`lib/contact.ts`), SEO layer
  (sitemap, robots, OG image, per-page metadata), reduced-motion site-wide.
- Reduced-motion quirk (framer 12.43 mount-time-only) lives in techContext
  — one fact, one home.

## Known Deferred Items

- Experience avatar gradient stays a deliberate non-token → no action.
- R12 accepted names (judgment calls, not violations): `featured`,
  `accentLine`, `InfoCard.button`.
- Footer full-bleed strip stays (floating card rejected in review);
  resume-link navbar/hero variant parked — revisit if footer feels weak.

## Working Agreements in Force

- `.clinerules` is law; on disagreement it wins and the bank gets corrected.
- Refactors visually neutral; exceptions need Thayer's sign-off.
- One roadmap item = one task = one commit; flag out-of-scope findings.
- Ask before dependency changes; never push without asking.
