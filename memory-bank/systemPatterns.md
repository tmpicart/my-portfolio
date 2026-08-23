# System Patterns

How this codebase is built: current architecture, target patterns, and
the debt register the refactor roadmap (see `progress.md`) burns down. Conventions
are enforced by `.clinerules` — this file records the reasoning and the map.

## Route Map (current — post-R8)

```
src/
├── app/
│   ├── layout.tsx               # Server ✓ — Navbar + Footer components; root
│   │                            #   metadata; body bg-canvas
│   ├── globals.css              # Design tokens: @theme palette — 15 semantic
│   │                            #   colors, single source of truth (R6)
│   ├── page.tsx                 # Server ✓ (R8) — composes PageShell/
│   │                            #   PageHeader/GlassCard/TagPill + client
│   │                            #   islands (ProjectCarousel, AccentLinkButton,
│   │                            #   HomeIcon); content from lib/home (R8)
│   ├── projects/page.tsx        # Server ✓ (R8) — featured/other split stays
│   │                            #   server-side; ProjectGrid island renders it
│   ├── projects/[slug]/page.tsx # "use client" — synced carousels + modal;
│   │                            #   CarouselArrows (R5); all layout debt → R9
│   ├── skills/page.tsx          # Server ✓ (R8) — SkillsCategories island
│   ├── experience/page.tsx      # Server ✓ (R8) — ExperienceTimeline island
│   └── education/page.tsx       # Server ✓ (R8) — EducationPanel island
├── components/
│   ├── navbar.tsx               # "use client" — legit (menu state,
│   │                            #   usePathname); FaTimes/FaBars toggle (R7)
│   ├── footer.tsx               # Server ✓ — extracted R2; react-icons (R7)
│   ├── skill-icon.tsx           # SkillIconId → react-icons + brand colors (R4)
│   ├── home-icon.tsx            # HomeIconId → react-icons (R8, SkillIcon
│   │                            #   pattern for home's section/info-card icons)
│   ├── page-shell.tsx           # "use client" — radial-gradient shell wrapper;
│   │                            #   motion-label passthrough (R5); var(--color-
│   │                            #   shell) stops (R6)
│   ├── page-header.tsx          # "use client" — canonical eyebrow + title (R5)
│   ├── glass-card.tsx           # "use client" — 6 variant map + accentLine;
│   │                            #   HTMLMotionProps passthrough (R5)
│   ├── tag-pill.tsx             # Server-compatible — 4 pill variants (R5)
│   ├── carousel-arrows.tsx      # "use client" — 3 size presets, aria labels (R5)
│   ├── project-carousel.tsx     # "use client" island (R8) — home's featured-
│   │                            #   projects carousel; embla + Autoplay plugin
│   │                            #   (pause on hover/focus, resume on leave)
│   ├── accent-link-button.tsx   # "use client" island (R8) — Link + motion.button
│   │                            #   CTA, replaced 4 home duplicates
│   ├── project-grid.tsx         # "use client" island (R8) — hub spotlight card
│   │                            #   + grid (ProjectCard internal)
│   ├── skills-categories.tsx    # "use client" island (R8) — skills panels
│   ├── experience-timeline.tsx  # "use client" island (R8) — timeline cards
│   └── education-panel.tsx      # "use client" island (R8) — education panel +
│   │                            #   CourseList (internal)
└── lib/
    ├── projects.ts              # single source of truth: detail + summary +
    │                            #   thumbnail + featured + captions (R3)
    ├── home.ts                  # HomeContent: hero copy, projects section,
     │                           #   infoCards w/ HomeIconId strings (R8)
    ├── experience.ts            # Experience type + data (R4)
    ├── education.ts             # Education/CourseGroup + CourseGroupIconId (R4)
    └── skills.ts                # Skill + SkillIconId union, 20 IDs (R4)
```

Import convention (set in R2): `@/*` alias (resolves `./src/*`) across `src/`
top-level boundaries; relative imports for colocated files.

## Target Patterns

- **Data layer** — ✅ fully landed R3/R4/R8: every page renders from typed,
  serializable TS in `lib/*.ts`. Icons are ID strings mapped to react-icons in
  dedicated components (`skill-icon.tsx`, `home-icon.tsx`, education's
  in-island `courseGroupIcons`). No page holds content or icon refs.
- **Component layer** — ✅ landed R5 + R8 islands: `PageShell` +
  `PageHeader` own the page chrome; `GlassCard`/`TagPill`/`CarouselArrows`
  own the recurring presentation patterns via variant maps. Pages compose.
- **Client/server boundary** — ✅ landed R8: all five static-route pages are
  Server Components; interactivity/motion lives in client islands
  (ProjectCarousel, AccentLinkButton, ProjectGrid, SkillsCategories,
  ExperienceTimeline, EducationPanel + the R5 shared shell/header/card
  components). Driver: function-based framer-motion variants and gestures
  can't cross the boundary, so each page's animated body became one island —
  payload-neutral (pages were already 100% client) but data selection,
  layout, and the future `metadata` exports (F2) now run server-side.
  `[slug]` remains a whole-page client component by design until R9.
- **Icons** — ✅ landed R7/R8: react-icons only; ID → component maps
  (`skill-icon.tsx`, `home-icon.tsx`) keep `lib/` serializable.
- **Design tokens** — ✅ landed R6: palette lives once in `globals.css`
  `@theme`; components reference semantic utilities, never raw hexes.
  Remaining literal colors are deliberate one-offs (avatar gradient,
  `[slug]` inline style → R9) or stock-palette brand colors in
  `skill-icon.tsx`.
- **Carousel pattern** — three embla instances remain. Home's is an island
  (R8) using `embla-carousel-autoplay` (4500ms, `stopOnInteraction: false`,
  wrapper-level pause on hover/focus — the plugin's `stopOnMouseEnter` only
  watches the viewport, missing the overlay arrows). The `[slug]` pair is
  still glued by the effect-sync R9 replaces; whether a shared `Carousel`
  scaffold is worth extracting gets evaluated after R9's redesign. The R5
  decision stands: slide markup and behavior differ too much to unify today.
- **Modal pattern** — target R9: `AnimatePresence`, Escape + scroll-lock,
  `role="dialog"`, optimized `next/image` (no `unoptimized`).
- **Motion** — target R10: one shared variants module (`lib/motion.ts`);
  variants at module scope (already true inside every R8 island), unified
  stagger logic.

## Design Tokens (landed R6)

Palette defined once in `globals.css` via Tailwind v4 `@theme`; Tailwind
auto-generates utilities from each `--color-*` variable (including opacity
modifiers and gradient stops). Semantic names were chosen over numeric
scales (Thayer-approved, R6). Token map:

| Token | Hex | Role |
|---|---|---|
| `accent` | `#a673e7` | buttons, hovers, headings, active states |
| `accent-deep` | `#8a57cc` | button hover |
| `accent-vivid` | `#7c4dff` | divider gradient start |
| `accent-tint` | `#d7bfff` | eyebrows, tag text |
| `accent-soft` | `#e7d4ff` | badge text |
| `canvas` | `#070707` | body background |
| `canvas-raised` | `#101010` | footer gradient start |
| `shell` | `#0b0b0d` | page shell gradient base |
| `surface-1` | `#40434e` | navbar, buttons, carousel arrows |
| `surface-2` | `#1f1e2e` | panels |
| `surface-3` | `#272636` | inner panels, modal info rail |
| `surface-modal` | `#1c1b29` | modal background |
| `menu` | `#4b4e58` | mobile menu buttons |
| `menu-hover` | `#5b5f69` | mobile menu hover |
| `menu-tray` | `#2f3138` | mobile menu dropdown container |

Deliberate non-tokens: experience avatar gradient (`#2c2f36/#1f2128/#3a3e47`,
single-use decorative), `[slug]` inline `#2a2a3a` (inline-style removal is
R9's), accent `rgba()` stops inside arbitrary gradients (color-mix()
conversion risks render drift — value-identical literals are safer).

## Debt Register (current → killed by)

1. ~~Duplicate project data, hub vs `lib/projects.ts`~~ ✅ R3 (2026-08-20)
2. ~~Dual icon systems (FA CDN + react-icons)~~ ✅ R7 (2026-08-21)
3. ~~All 6 pages `"use client"`; 4 zero-hook pages (hub, skills, education,
   experience)~~ ✅ R8 (2026-08-22) — servers + islands; `[slug]` → R9
4. ~~Copy-pasted page shell + style strings, 5 pages~~ ✅ R5 (2026-08-21)
5. Type drift: `Project` ×2 ✅ R3, local `Experience` ✅ R4; `pageMeta` ×4
   ✅ R5 (PageHeader props)
6. ~~Dead `scrollbar-*` classes (plugin never installed)~~ ✅ R6 (2026-08-21)
7. `[slug]` modal gaps (dead `exit`, no Escape/scroll-lock/role, inline
   styles, `router.push` back button, `unoptimized` images) → R9
8. Hooks-order fragility (`notFound()` before hooks in `[slug]`) → R9
9. Assets: orphaned `Avatar.png`, unused template SVGs, oversized images → R11
10. SEO absent (single root metadata only) → F2 (unblocked by R8)
11. Naming stragglers: `imageInfos` ✅ R3 (→ `captions`); `cardStyle`-family
    constants ✅ R5; `pfp.jpg` → R11/R12
12. ~~Home content hardcoded (hero copy, `infoCards`), `infoCards` inside the
    component body, icons as component refs~~ ✅ R8 (2026-08-22) — `lib/home.ts`
    + `HomeIcon` ID map
13. Footer contact links hardcoded → F1
14. Skills accent-bar anchoring (sections lacked `relative`, bars pinned to
    page shell) ✅ fixed R5 with Thayer approval (`panel` variant carries
    `relative`)