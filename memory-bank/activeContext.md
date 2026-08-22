# Active Context

**Snapshot: 2026-08-21 (post-R6)** — updated every task per the Memory Bank Protocol.

## Current State

- **R6 complete**, on branch `refactor/cleanup` (stacked on R1–R5):
  - `globals.css` now owns the palette via Tailwind v4 `@theme` — 15 semantic
    tokens (accent family ×5, backgrounds ×3, surfaces ×4, mobile-menu ×3).
    Utilities auto-generate (`bg-accent/15`, `text-accent-tint`,
    `from-accent-vivid to-accent`, …), so opacity modifiers and gradients
    compose without arbitrary values.
  - 49 scattered hex literals across 13 files → semantic classes. Post-task
    grep: only the `globals.css` token definitions + two deliberate one-offs
    remain (experience avatar gradient; `[slug]` inline `#2a2a3a` → R9).
    `PageShell`'s linear-gradient stops now use `var(--color-shell)`.
  - Dead `scrollbar-*` classes deleted from education (debt #6 killed).
  - Naming decisions (Thayer-approved): semantic names over numeric scales;
    `#101010` tokenized as `canvas-raised`; menu grays tokenized
    (`menu`/`menu-hover`/`menu-tray`); `skill-icon.tsx` brand colors stay
    stock palette classes. Visually neutral by construction — every token
    maps the identical hex.
- Lint + build both green after R6.

## What's Next

**Roadmap R7 — unify icons on react-icons**: migrate remaining Font Awesome
usages (navbar toggle, footer contacts, home hero/`infoCards` icons), drop
the FA CDN `<link>` from layout.

Starting pattern for every task: read this file + `progress.md` first, work
the single roadmap item, run the quality gates, update both files, commit by
explicit path.

## Known Deferred Items

- Home page content (hero copy, `infoCards`) still hardcoded — deliberately
  folded into **R8**, which restructures home anyway; `infoCards` also still
  sits inside the component body (convention violation) — same fix, same task.
- Footer contact links still hardcoded (F1 will touch the footer).
- Experience avatar gradient + `[slug]` inline `#2a2a3a` left as one-off
  literals by design (R6 scope decision); inline-style removal is R9's.

## Working Agreements in Force

- `.clinerules` is law; when it and memory bank notes ever disagree, the
  rules file wins and the bank gets corrected.
- Refactors are visually neutral — structure changes, appearance doesn't.
  Exceptions require Thayer's explicit sign-off (R3 thumbnails, R5 header
  canonicalization + skills accent-line fix).
- One roadmap item = one task = one commit. No drive-by fixes; flag
  out-of-scope findings instead.
- Ask before any dependency change; never push without asking.