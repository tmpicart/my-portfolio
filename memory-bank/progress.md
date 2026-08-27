# Progress

**Updated: 2026-08-26** — what works, recent work, and the roadmap that
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

## Recent Work

- **2026-08-26 — R13 navbar menu-close:** render-time pathname reset replaces
  the suppressed close-effect (zero suppressions repo-wide); derived
  openPathname variant rejected in review (tray resurrected on back-nav);
  Home-logo same-route close added.
- **2026-08-26 — R12.1 ProjectCard hoist:** module-scope `cardSizeStyles`
  (+ derived `CardSize` type); debt #15 closed. Visually neutral.
- **2026-08-26 — R12 naming & consistency audit:** renames (`summaryClass`,
  `carouselApi`, camelCase constants), BOM + layout-marker hygiene, `z-0`
  swap; motion.main→motion.div (single `<main>`); navbar + `[slug]` unified
  on the 1120px shell column (Thayer-approved); README refreshed. Gates green.
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

## Roadmap — Features

- **F1. Resume button** — PDF in `public/`, icon link in footer beside the
  existing contact icons.
- **F2. SEO implementation** *(unblocked by R8)* — per-page `metadata`
  exports, Open Graph/Twitter cards, `metadataBase`, `sitemap.ts`,
  `robots.ts`, per-project `generateMetadata` from lib data.
- **F3. Reduced-motion support** *(deferred by choice during R10)* —
  `MotionConfig reducedMotion="user"` provider in `layout.tsx` + autoplay
  gate via `useReducedMotion()` in both carousel islands.

## Status

Next task: **F1**, then F2–F3. See `activeContext.md` for the current
working snapshot.