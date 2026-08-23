# Active Context

**Snapshot: 2026-08-22 (post-R8)** — updated every task per the Memory Bank Protocol.

## Current State

- **R8 complete**, on branch `refactor/cleanup` (stacked on R1–R7):
  - Home, projects hub, skills, education, experience are now **Server
    Components**; `[slug]` stays a whole-page client component until R9.
    Driver: function-based framer-motion variants + gestures can't cross the
    server→client boundary, so each page's animated body became a client
    island: `project-grid`, `skills-categories`, `experience-timeline`,
    `education-panel`, plus home's `project-carousel` and
    `accent-link-button` (replaced 4 duplicate CTA blocks).
  - Home content fully in the data layer: `lib/home.ts` (`HomeContent`:
    hero copy, projects section, infoCards) with `HomeIconId` strings →
    `components/home-icon.tsx` icon map (SkillIcon pattern). Debt #12 dead.
  - Home carousel now runs on `embla-carousel-autoplay` 8.6.0 (new dep,
    Thayer-approved): 4500ms (unchanged cadence), `stopOnInteraction: false`,
    pause on hover/focus + resume on leave/blur — the first behavior change
    of the refactor, Thayer-approved. Pause handlers sit on the wrapper div,
    not the plugin's `stopOnMouseEnter` (viewport-only — misses the arrows),
    and the plugin instance is `useMemo`'d because the React Compiler lint
    rules reject embla's documented `useRef` pattern (ref-read during render).
  - Gates: lint clean, build green, all 5 static routes prerender (○).
- Debt #3 (client pages) and #12 (home content) killed.

## What's Next

**Roadmap R9 — `[slug]` page + modal quality pass**: server shell + client
carousel/modal islands; fix hooks order; back button → `<Link>`; modal gets
`AnimatePresence`, Escape, scroll-lock, `role="dialog"`, optimized images
(drop `unoptimized`); remove inline styles. **Thayer note (R8 session): the
non-magnified `[slug]` main carousel should also cycle via the Autoplay
plugin** — same pause-on-hover/focus treatment as home. After the redesign,
evaluate whether a shared `Carousel` scaffold is worth extracting (R5/R8
analysis says only the viewport scaffold + arrows overlap; slide markup and
sync behavior differ).

Then R10 (motion consolidation — variants already live at module scope in
every island, so `lib/motion.ts` is mostly a move + dedupe).

Starting pattern for every task: read this file + `progress.md` first, work
the single roadmap item, run the quality gates, update both files, commit by
explicit path.

## Known Deferred Items

- Footer contact links still hardcoded (F1 will touch the footer); footer
  icon-only links lack `aria-label` — flagged for F1.
- Experience avatar gradient + `[slug]` inline `#2a2a3a` left as one-off
  literals by design (R6 scope decision); inline-style removal is R9's.
- `[slug]` suppressions ×2 (hooks order, exhaustive-deps) → R9.

## Working Agreements in Force

- `.clinerules` is law; when it and memory bank notes ever disagree, the
  rules file wins and the bank gets corrected.
- Refactors are visually neutral — structure changes, appearance doesn't.
  Exceptions require Thayer's explicit sign-off (R3 thumbnails, R5 header
  canonicalization + skills accent-line fix, R7 footer `SiGithub`, R8
  carousel pause-on-hover/focus behavior).
- One roadmap item = one task = one commit. No drive-by fixes; flag
  out-of-scope findings instead.
- Ask before any dependency change; never push without asking.