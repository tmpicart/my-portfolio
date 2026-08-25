# Active Context

**Snapshot: 2026-08-25 (post-R11)** — updated every task per the Memory
Bank Protocol.

## Current State

- **R11 complete on `refactor/cleanup`** (checkpoint approved): orphans,
  5 template SVGs, and both stock photos deleted — portfolio deck is now
  2 real slides (Vercel + mobile) with the home splash as thumbnail
  (Thayer's call, mid-task).
- sharp (transitive dep — zero new deps) compressed the oversized set,
  geometry-preserving; `public/` 28→21 files, 8.94→3.29 MB; all image
  filenames kebab-case; greybox logo extension corrected (JPEG bytes).
- 26 path refs updated (`projects.ts`, `experience.ts`, `page.tsx`);
  lint + build green (12/12 SSG).

## What's Next

**R12 — Naming & consistency audit**: enforce Naming Conventions across
remaining identifiers; final build + lint + visual check; README refresh.
Then R13, F1–F3.

Task pattern: Tier-0 reads → single roadmap item → quality gates → bank
updates + archive append → Task Checkpoint → commit by explicit path.

## Known Deferred Items

- Footer contact links hardcoded + icon-only links lack `aria-label` → F1.
- Experience avatar gradient stays a deliberate non-token (single-use
  decorative) → no action.
- Navbar menu-close suppression → R13.
- Reduced-motion support deliberately skipped in R10 → F3.
- `home.png` doubles as Open Graph image candidate → F2.
- Navbar-content vs shell-border alignment (16px `px-4` inset) and
  `[slug]`'s 1040px column vs max-w-6xl → R12 consistency decisions.

## Working Agreements in Force

- `.clinerules` is law; on disagreement it wins and the bank gets corrected.
- Refactors are visually neutral; exceptions need Thayer's sign-off (R3
  thumbnails, R5 header/skills, R7 `SiGithub`, R8 pause behavior, R9 dots,
  R10 entrance retiming + hover sharpening, R11 stock-photo removal).
- One roadmap item = one task = one commit; flag out-of-scope findings.
- Ask before dependency changes; never push without asking.