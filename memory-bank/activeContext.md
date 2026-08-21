# Active Context

**Snapshot: 2026-08-21 (post-R5)** — updated every task per the Memory Bank Protocol.

## Current State

- **R5 complete**, on branch `refactor/cleanup` (stacked on R1–R4):
  - Five shared components in `src/components/`: `PageShell` (shell gradient
    wrapper, motion-label passthrough, optional `className`),
    `PageHeader` (canonical eyebrow + title), `GlassCard` (6 variants:
    panel/timeline/spotlight/hero/section/tile + optional `accentLine`;
    props extend `HTMLMotionProps<"div">` so variants/hover flow through;
    `children` re-pinned to `ReactNode` — HTMLMotionProps widens it to
    MotionValue which motion.div rejects), `TagPill` (tag/accent/muted/badge),
    `CarouselArrows` (small/medium/large size presets + aria labels).
  - All 5 shell pages rebuilt on PageShell/PageHeader; home + experience +
    education + skills use GlassCard/TagPill; `[slug]` swapped its inline
    arrow buttons for CarouselArrows (both carousels) — its page-level layout
    stays untouched for R9.
  - Debt kills: #4 (copy-pasted shell), #5 (pageMeta x4), #11
    (`cardStyle`-family constants). All per-page style-string constants and
    `PageMeta` types are gone.
  - **Approved visual deltas (Thayer, R5):** header canonicalized — one style
    (eyebrow `#D7BFFF`, no tracking-tight, `mb-10`, 0.5s fade-up) replacing
    five drifting variants; skills category cards gained `relative`, fixing
    accent bars that previously anchored to the page shell top instead of the
    card; home/skills `<section>` → `<div>` (no accessible name, no outline
    change). Noted for Thayer's PR review.
  - Windows/editor note: VS Code dirty-buffer reverts corrupted several
    write_to_file calls this task (page files reverted; ghost `page.ts`/
    extension-less artifacts appeared). Fixed by writing via PowerShell
    `[System.IO.File]::WriteAllText` and deleting artifacts; verify with
    `git status` before committing in future tasks.
- All pages remain `"use client"` (framer-motion) — server/client split is
  R8's job. Lint + build both green after R5.

## What's Next

**Roadmap R6 — design tokens via Tailwind v4 `@theme`** — palette defined
once in `globals.css`; scattered hex literals → semantic classes; delete dead
`scrollbar-*` classes. R5 added more hex literals into component variant
maps; R6 will absorb them.

Starting pattern for every task: read this file + `progress.md` first, work
the single roadmap item, run the quality gates, update both files, commit by
explicit path.

## Known Deferred Items

- Home page content (hero copy, `infoCards`) still hardcoded — deliberately
  folded into **R8**, which restructures home anyway; `infoCards` also still
  sits inside the component body (convention violation) — same fix, same task.
- Footer contact links still hardcoded (F1 will touch the footer).

## Working Agreements in Force

- `.clinerules` is law; when it and memory bank notes ever disagree, the
  rules file wins and the bank gets corrected.
- Refactors are visually neutral — structure changes, appearance doesn't.
  Exceptions require Thayer's explicit sign-off (R3 thumbnails, R5 header
  canonicalization + skills accent-line fix).
- One roadmap item = one task = one commit. No drive-by fixes; flag
  out-of-scope findings instead.
- Ask before any dependency change; never push without asking.