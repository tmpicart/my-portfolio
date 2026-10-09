# Progress

**Updated: 2026-10-09** — what works, recent work, and the roadmap that
drives it. One roadmap item = one task = one commit. Cycle 1's completed-
task record was cleared at the 2026-08-31 master audit — the narrative
lives in git history (through tip `7d028f9`).

## What Works (stable, deployed)

- All 6 routes + 4 SSG project pages functional, responsive, live on Vercel
- Typed data layer (`lib/`) drives every page; no hardcoded content
- Shared component layer (PageShell/PageHeader/GlassCard/TagPill + carousel
  primitives) with client islands; every page is a Server Component
- Motion system (`lib/motion.ts`): tokens, factories, named variants,
  PageShell stagger root, two-tool hover policy, reduced-motion site-wide
- Design tokens (`@theme` in `globals.css`) + z ladder documented in one place
- react-icons only; three purpose-built carousels with one shared autoplay
  rhythm, hover/focus pause, and dots everywhere

## Recent Work

- **2026-10-09 — Resume refresh 2 (ad-hoc):** re-swapped site PDF for updated
  Resume A (Gemini bullet rewrite; new AI Tools line; Cline project bullet).
  Lint+build green; merged `--no-ff`, pushed, live. lib/ pages now drift from
  resume copy — flagged, sync pending.
- **2026-10-05 — Resume swap (ad-hoc):** site PDF replaced with Resume A
  (2026-09-28 refresh) under the same filename; footer link untouched.
  Lint+build green; merged `--no-ff` to `main`, pushed, live.

## Roadmap — Cycle 1 (complete)

- Refactor: ✅ R1 lint (08-19) · ✅ R2 `src/` layout (08-19) · ✅ R3 project
  data (08-20) · ✅ R4 content extraction (08-20) · ✅ R5 shared components
  (08-21) · ✅ R6 `@theme` tokens (08-21) · ✅ R7 react-icons (08-21) ·
  ✅ R8 server/client boundary (08-22) · ✅ R9/R9.1 `[slug]` quality +
  crash guard (08-23) · ✅ R10 motion consolidation (08-23) · ✅ R11 asset
  cleanup (08-25) · ✅ R12/R12.1 naming audit + hoist (08-26) · ✅ R13
  menu-close reset (08-26) · ✅ deployed to `main` (08-27)
- Features: ✅ F1 footer resume/contact (08-31) · ✅ F2 SEO layer (08-31) ·
  ✅ F3 reduced-motion (08-31) · ✅ merged + deployed (08-31)

## Status

Roadmap complete (R1–R13 + F1–F3); deployed. Nothing queued — new work
needs a new roadmap. Push/merge only with explicit approval.