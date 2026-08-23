# Progress

**Updated: 2026-08-22** — what works, recent work, and the roadmap that
drives it. One roadmap item = one task = one commit. Full completed-task
record: `completedTasks.md` (sealed — see Memory Bank Protocol in
`.clinerules`).

## What Works (stable, deployed)

- All 6 routes functional and responsive; deployed on Vercel from `main`
- Content data layer complete (`lib/`) — every page renders from it
- Shared component layer complete (PageShell, PageHeader, GlassCard,
  TagPill, CarouselArrows + R8 client islands)
- Server/client boundary landed (R8): five static pages are Server
  Components; only `[slug]` remains whole-page client (→ R9)
- Design token layer (`@theme` palette in `globals.css`) across every
  component
- Single icon system (react-icons; FA CDN gone); icon-ID maps for skills
  and home
- Home carousel autoplays via `embla-carousel-autoplay` with
  pause-on-hover/focus (approved behavior change)

## Recent Work

- **2026-08-22 — Bank & workflow audit:** tiered bank reads + sealed
  `completedTasks.md` archive + Task Checkpoint gate + 5-failure circuit
  breaker + compression caps added to `.clinerules`; bank slimmed, growth
  now capped. Lint + build green.
- **2026-08-22 — R8 server/client boundary:** five static pages → Server
  Components with client motion/carousel islands; home content →
  `lib/home.ts` + `HomeIcon` map; autoplay plugin added (approved).
  Debts #3, #12 dead. Lint + build green.
- **2026-08-21 — R7 unify icons:** all FA `<i>` → react-icons; CDN `<link>`
  removed. Debt #2 dead. Lint + build green.

## Roadmap — Refactor (dependency-ordered)

- ✅ 2026-08-19 — **R1** lint tooling repaired (flat config)
- ✅ 2026-08-19 — **R2** restructured to standard `src/` layout
- ✅ 2026-08-20 — **R3** project data consolidated in `lib/projects.ts`
- ✅ 2026-08-20 — **R4** remaining content extracted to the data layer
- ✅ 2026-08-21 — **R5** shared components extracted (5, all pages rebuilt)
- ✅ 2026-08-21 — **R6** design tokens via Tailwind v4 `@theme`
- ✅ 2026-08-21 — **R7** icons unified on react-icons
- ✅ 2026-08-22 — **R8** server/client boundary (pages → RSC + islands)
- **R9. `[slug]` page + modal quality pass** — server shell + client
  carousel/modal islands; fix hooks order; back button → `<Link>`; modal:
  `AnimatePresence`, Escape, scroll-lock, `role="dialog"`, optimized images
  (drop `unoptimized`); remove inline styles; merge `images`/`captions`
  parallel arrays. *(R8 note: the non-magnified main carousel should also
  cycle via the Autoplay plugin — same pause-on-hover/focus treatment as
  home, per Thayer. The three carousels were deliberately NOT unified: they
  differ in autoplay, slide shape, dots, and cross-carousel sync, and the
  effect-sync between main/modal is exactly what this task replaces. After
  the redesign, evaluate whether what remains is similar enough to extract
  into one shared `Carousel` component, composing with R5's
  `CarouselArrows`.)*
- **R10. Motion consolidation** — single `lib/motion.ts` variants module;
  variants at module scope (already true inside all R8 islands); simplify
  stagger logic; unify hover-variant naming.
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

Next task: **R9**. See `activeContext.md` for the current working snapshot.