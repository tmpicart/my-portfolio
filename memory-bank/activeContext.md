# Active Context

**Snapshot: 2026-08-23 (post-R9.1)** — updated every task per the Memory
Bank Protocol.

## Current State

- **R9.1 complete on `refactor/cleanup`** (checkpoint approved): fixed
  the `[slug]` mount crash — Autoplay `play()` ran before embla init;
  now guarded on the embla api (pattern shared with the select effect).
- R9.1 also split the R9 monolith per one-component-per-file:
  `project-detail.tsx` (composition root) + `gallery-carousel.tsx` +
  `enlarged-image-modal.tsx`; behavior-neutral, gates green, 4 SSG routes.
- R9 stands as built: server shell + island, modal a11y,
  `screenshots[]`, shared `CarouselDots`, home dots (approved).

## What's Next

**R10 — Motion consolidation**: one `lib/motion.ts` variants module,
variants at module scope (already true in R8/R9 islands), simplified
stagger logic, unified hover-variant naming — folds in the duplicated
`sectionVariants` copy left by the R9.1 split. Then R11 (assets), F2.

Task pattern: Tier-0 reads → single roadmap item → quality gates → bank
updates + archive append → Task Checkpoint → commit by explicit path.

## Known Deferred Items

- Footer contact links hardcoded + icon-only links lack `aria-label` → F1.
- Experience avatar gradient stays a deliberate non-token (single-use
  decorative) → no action.
- Navbar menu-close suppression → R13.

## Working Agreements in Force

- `.clinerules` is law; on disagreement it wins and the bank gets corrected.
- Refactors are visually neutral; exceptions need Thayer's sign-off (R3
  thumbnails, R5 header/skills, R7 `SiGithub`, R8 pause behavior, R9 dots).
- One roadmap item = one task = one commit; flag out-of-scope findings.
- Ask before dependency changes; never push without asking.