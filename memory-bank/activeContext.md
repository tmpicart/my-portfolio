# Active Context

**Snapshot: 2026-08-22 (post-R8)** — updated every task per the Memory Bank
Protocol.

## Current State

- **R8 complete** on `refactor/cleanup`: five static pages are Server
  Components with client islands; `[slug]` stays whole-page client until R9.
- Home content lives in `lib/home.ts` + `home-icon.tsx` ID map; home
  carousel runs `embla-carousel-autoplay` (wrapper-level pause on
  hover/focus; plugin `useMemo`'d — React Compiler bans ref-read-in-render).
- Gates green: lint clean, build green, all 5 static routes prerender.

## What's Next

**R9 — `[slug]` page + modal quality pass** (full scope + carousels note in
the `progress.md` roadmap): server shell + client islands, modal
accessibility, inline-style removal. Then R10 (motion consolidation).

Task pattern: Tier-0 reads → single roadmap item → quality gates → bank
updates + archive append → Task Checkpoint → commit by explicit path.

## Known Deferred Items

- Footer contact links hardcoded + icon-only links lack `aria-label` → F1.
- Experience avatar gradient + `[slug]` inline `#2a2a3a` → R9 (inline-style
  removal).
- `[slug]` suppressions ×2 (hooks order, exhaustive-deps) → R9; navbar
  menu-close suppression → R13.

## Working Agreements in Force

- `.clinerules` is law; on disagreement it wins and the bank gets corrected.
- Refactors are visually neutral; exceptions need Thayer's sign-off (R3
  thumbnails, R5 header/skills, R7 `SiGithub`, R8 pause behavior).
- One roadmap item = one task = one commit; flag out-of-scope findings.
- Ask before dependency changes; never push without asking.