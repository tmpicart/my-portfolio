# Progress

**Updated: 2026-08-23** — what works, recent work, and the roadmap that
drives it. One roadmap item = one task = one commit. Full completed-task
record: `completedTasks.md` (sealed — see Memory Bank Protocol in
`.clinerules`).

## What Works (stable, deployed)

- All 6 routes functional and responsive; deployed on Vercel from `main`
- Content data layer complete (`lib/`) — every page renders from it
- Shared component layer complete (PageShell, PageHeader, GlassCard,
  TagPill, CarouselArrows, CarouselDots + client islands)
- Server/client boundary complete (R8+R9): every page is a Server
  Component; all 4 `[slug]` routes prerender SSG via `generateStaticParams`
- Design token layer (`@theme` palette in `globals.css`) across every
  component
- Single icon system (react-icons; FA CDN gone); icon-ID maps for skills
  and home
- All three carousels: embla + Autoplay (pause on hover/focus); dots
  everywhere (home dots added R9, approved)

## Recent Work

- **2026-08-23 — R9 [slug] quality pass:** server shell + `ProjectDetail`
  island (gallery + modal: autoplay, focus trap, `AnimatePresence`,
  `role="dialog"`, scroll-lock, optimized images); `images`/`captions`
  merged → `screenshots`; shared `CarouselDots` + home dots (approved);
  `--color-backdrop` token. Debts #7, #8 dead. Lint + build green.
- **2026-08-22 — R8 server/client boundary:** five static pages → Server
  Components with client motion/carousel islands; home content →
  `lib/home.ts` + `HomeIcon` map; autoplay plugin added (approved).
  Debts #3, #12 dead. Lint + build green.
- **2026-08-22 — Bank & workflow audit:** tiered bank reads + sealed
  archive + Task Checkpoint gate + circuit breaker + compression caps;
  bank slimmed, growth capped. Lint + build green.

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
- **R10. Motion consolidation** — single `lib/motion.ts` variants module;
  variants at module scope (already true inside all R8/R9 islands);
  simplify stagger logic; unify hover-variant naming.
- **R11. Asset cleanup** — delete orphaned `Avatar.png` (recoverable from
  git history) and unused template SVGs after verifying references;
  compress/resize oversized images (`laptop_img.jpg`, `pfp.jpg`,
  `John_1.png`); normalize asset filenames.
- **R12. Naming & consistency audit** — enforce Naming Conventions from
  `.clinerules` across remaining identifiers; final build + lint + visual
  check; README refresh (real stack, working commands, live link).
- **R13. Navbar menu-close pattern** *(added during R1)* — replace the
  effect-based `setMenuOpen(false)` on pathname change with the React
  render-time state-reset pattern; remove the `set-state-in-effect`
  suppression in `src/components/navbar.tsx`.

## Roadmap — Features

- **F1. Resume button** — PDF in `public/`, icon link in footer beside the
  existing contact icons.
- **F2. SEO implementation** *(unblocked by R8)* — per-page `metadata`
  exports, Open Graph/Twitter cards, `metadataBase`, `sitemap.ts`,
  `robots.ts`, per-project `generateMetadata` from lib data.

## Status

Next task: **R10**. See `activeContext.md` for the current working snapshot.