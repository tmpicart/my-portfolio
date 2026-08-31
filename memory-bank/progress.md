# Progress

**Updated: 2026-08-31** — what works, recent work, and the roadmap that
drives it. One roadmap item = one task = one commit. Full completed-task
record: `completedTasks.md` (sealed — see Memory Bank Protocol in
`.clinerules`).

## What Works (stable, deployed)

- All 6 routes functional and responsive; deployed on Vercel from `main`
- Content data layer complete (`lib/`) — every page renders from it
- Shared component layer complete (PageShell, PageHeader, GlassCard,
  TagPill, CarouselArrows, CarouselDots + client islands)
- Motion system (`lib/motion.ts`, R10): tokens + factories + named
  variants; PageShell stagger root on every page; two-tool hover policy
- Server/client boundary complete (R8+R9): every page is a Server
  Component; all 4 `[slug]` routes prerender SSG via `generateStaticParams`
- Design token layer (`@theme` palette in `globals.css`) across every
  component
- Single icon system (react-icons; FA CDN gone); icon-ID maps for skills
  and home
- All three carousels: embla + Autoplay (pause on hover/focus); dots
  everywhere (home dots added R9, approved)
- Reduced-motion site-wide (F3): MotionConfig "user" provider + autoplay
  gates on both carousel islands

## Recent Work

- **2026-08-31 — Z-layer convention:** documented ladder in globals.css —
  z-40 navbar / z-50 modal (tie resolved by construction); stock utilities
  only, @utility indirection rejected in review (single-consumer layers).
  Gates green; verified in build output.
- **2026-08-31 — Navbar-overlay fix:** `spotlightHover.zIndex` 50→10 —
  hovered cards tied navbar z-50 and won on DOM order, painting over the
  fixed bar. Why-comment documents the stacking rule. Gates green.
- **2026-08-31 — Features phase merge:** F1–F3 + navbar-overlay z-fix +
  z-ladder docs folded into `main` (`--no-ff`, mirrors the R-phase fold);
  gates green on tip and on merged `main`. Branch retires on push approval.

## Roadmap — Refactor (dependency-ordered)

- ✅ 2026-08-19 — **R1** lint tooling repaired (flat config)
- ✅ 2026-08-19 — **R2** restructured to standard `src/` layout
- ✅ 2026-08-20 — **R3** project data consolidated in `lib/projects.ts`
- ✅ 2026-08-20 — **R4** remaining content extracted to the data layer
- ✅ 2026-08-21 — **R5** shared components extracted (5, all pages rebuilt)
- ✅ 2026-08-21 — **R6** design tokens via Tailwind v4 `@theme`
- ✅ 2026-08-21 — **R7** icons unified on react-icons
- ✅ 2026-08-22 — **R8** server/client boundary (pages → RSC + islands)
- ✅ 2026-08-23 — **R9** `[slug]` quality pass (server shell, modal a11y,
  autoplay, data merge, home dots)
- ✅ 2026-08-23 — **R9.1** autoplay pre-init crash guard +
  one-component-per-file split of the `[slug]` island
- ✅ 2026-08-23 — **R10** motion consolidation (`lib/motion.ts` tokens +
  factories + named variants; PageShell stagger root; unified stagger +
  hover naming; hover policy pass)
- ✅ 2026-08-25 — **R11** asset cleanup (orphans/template SVGs/stock photos
  deleted; sharp compress pass; kebab-case filenames)
- ✅ 2026-08-26 — **R12** naming & consistency audit (identifier renames,
  landmark fix, README refresh, Thayer-approved 1120px shell-aligned
  column); ProjectCard hoist split out to R12.1 below
- ✅ 2026-08-26 — **R12.1** ProjectCard size table hoisted to module scope
  (`cardSizeStyles` + derived `CardSize`; debt #15 closed)
- ✅ 2026-08-26 — **R13** navbar menu-close render-time reset (`prevPathname`
  guard replaces suppressed effect; zero suppressions remain; logo same-route
  close added; derived openPathname variant rejected in review)
- ✅ 2026-08-27 — **Refactor phase deployed** — R1–R13 merged to `main`
  (merge `31eda54`) and live on Vercel; `refactor/cleanup` branch deleted

## Roadmap — Features

- ✅ 2026-08-31 — **F1** footer resume button (aria-labels, contact links → `lib/contact.ts`, PDF renamed `Thayer-Picart-Resume.pdf`)
- ✅ 2026-08-31 — **F2** SEO implementation (root + per-page metadata,
  OG/Twitter cards, `metadataBase`, `sitemap.ts`, `robots.ts`, per-project
  `generateMetadata`, generated OG card)
- ✅ 2026-08-31 — **F3** reduced-motion (`MotionConfig reducedMotion="user"`
  + `useReducedMotion()` autoplay gates; navbar `aria-expanded` follow-up)
- ✅ 2026-08-31 — **Features phase merged** — F1–F3 + follow-ups folded
  into `main` via `--no-ff` fold; Vercel deploy on push

## Status

Roadmap complete (R1–R13 + F1–F3); both phases merged to `main`. Nothing
queued — new work needs a new roadmap. Push/merge = Thayer's call.