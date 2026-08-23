# Active Context

**Snapshot: 2026-08-23 (post-R9)** — updated every task per the Memory Bank
Protocol.

## Current State

- **R9 complete** on `refactor/cleanup`: `[slug]` is a server shell +
  `ProjectDetail` island; modal has full a11y (focus trap, Escape,
  scroll-lock, `role="dialog"`); gallery autoplays like home.
- `lib/projects.ts` now carries `screenshots[]` (src + title + lines);
  parallel `images`/`captions` arrays are gone.
- `CarouselDots` shared component (3 consumers); home carousel has dots
  (approved visual change).
- Gates green: lint clean, build green, all 4 `[slug]` routes prerender
  SSG via `generateStaticParams`.

## What's Next

**R10 — Motion consolidation**: one `lib/motion.ts` variants module,
variants at module scope (already true in R8/R9 islands), simplified
stagger logic, unified hover-variant naming. Then R11 (assets), F2 (SEO).

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
  thumbnails, R5 header/skills, R7 `SiGithub`, R8 pause behavior, R9 home
  dots).
- One roadmap item = one task = one commit; flag out-of-scope findings.
- Ask before dependency changes; never push without asking.