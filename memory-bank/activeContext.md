# Active Context

**Snapshot: 2026-08-19** — updated every task per the Memory Bank Protocol.

## Current State

- **R2 complete**, on branch `refactor/cleanup` (stacked on R1):
  - Standard layout adopted: `src/app/` (routes only), `src/components/`,
    `src/lib/` as siblings; `@/*` alias → `./src/*`; component files
    kebab-case (`navbar.tsx`, `footer.tsx`).
  - Footer extracted from layout to `src/components/footer.tsx` — Server
    Component, markup verbatim, FA icons intact (CDN removal stays R7).
  - Import convention set in R2: alias (`@/…`) across `src/` top-level
    boundaries, relative (`./…`) for files that move together (e.g. layout's
    `./globals.css`).
  - R2 lesson: a stale `.next/` (old dev-server type validators referencing
    pre-move paths) fails `next build` type-checking after a restructure —
    delete `.next/` and rebuild.
- Three lint suppressions carry roadmap refs: `[slug]` ×2 → R9, Navbar ×1 →
  R13. Everything else was fixed in place.
- The site remains visually unchanged; no feature work has landed.

## What's Next

**Roadmap R3 — consolidate project data** (`Project` gains `summary`,
`thumbnail`, `featured: boolean` — exactly one true; hub page imports lib and
drops its local copy; `imageInfos` → typed caption object with title + lines).

Starting pattern for every task: read this file + `progress.md` first, work
the single roadmap item, run the quality gates, update both files, commit by
explicit path.

## Working Agreements in Force

- `.clinerules` is law; when it and memory bank notes ever disagree, the
  rules file wins and the bank gets corrected.
- Refactors are visually neutral — structure changes, appearance doesn't.
- One roadmap item = one task = one commit. No drive-by fixes; flag
  out-of-scope findings instead.
- Ask before any dependency change; never push without asking.