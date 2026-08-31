# System Patterns

How this codebase is built: current architecture, target patterns, and
the debt register the refactor roadmap (see `progress.md`) burns down.
Conventions are enforced by `.clinerules` — this file records the
reasoning and the map.

## Route Map (current — post-R9)

```
src/
├── app/
│   ├── layout.tsx               # Server ✓ — Navbar + Footer components; root
│   │                            #   metadata foundation (F2: metadataBase,
│   │                            #   title template, canonicals, OG/Twitter);
│   │                            #   MotionConfig reducedMotion="user" (F3)
│   ├── sitemap.ts               # F2 — 9 URLs from lib data + siteUrl
│   ├── robots.ts                # F2 — allow-all + sitemap pointer
│   ├── opengraph-image.tsx      # F2 — next/og 1200×630 card (lib/home copy)
│   ├── globals.css              # Design tokens: @theme palette — 16 semantic
│   │                            #   colors, single source of truth (R6, +R9
│   │                            #   backdrop)
│   ├── page.tsx                 # Server ✓ (R8) — composes PageShell/
│   │                            #   PageHeader/GlassCard/TagPill + client
│   │                            #   islands (ProjectCarousel, AccentLinkButton,
│   │                            #   HomeIcon); content from lib/home (R8)
│   ├── projects/page.tsx        # Server ✓ (R8) — featured/other split stays
│   │                            #   server-side; ProjectGrid island renders it
│   ├── projects/[slug]/page.tsx # Server ✓ (R9) — await params → notFound()
│   │                            #   → generateStaticParams (4 SSG routes);
│   │                            #   renders ProjectDetail island
│   ├── skills/page.tsx          # Server ✓ (R8) — SkillsCategories island
│   ├── experience/page.tsx      # Server ✓ (R8) — ExperienceTimeline island
│   └── education/page.tsx       # Server ✓ (R8) — EducationPanel island
├── components/
│   ├── navbar.tsx               # "use client" — legit (menu state,
│   │                            #   usePathname); FaTimes/FaBars toggle (R7);
│   │                            #   tray-close = render-time pathname reset
│   │                            #   + onClick closes, never an effect (R13);
│   │                            #   aria-expanded disclosure (F3)
│   ├── footer.tsx               # Server ✓ — renders lib/contactLinks; aria-labels + resume (F1)
│   ├── skill-icon.tsx           # SkillIconId → react-icons + brand colors (R4)
│   ├── home-icon.tsx            # HomeIconId → react-icons (R8, SkillIcon
│   │                            #   pattern for home's section/info-card icons)
│   ├── page-shell.tsx           # "use client" — radial-gradient shell wrapper;
│   │                            #   stagger root on every page (R10);
│   │                            #   var(--color-shell) stops (R6)
│   ├── page-header.tsx          # "use client" — canonical eyebrow + title
│   │                            #   (R5); first stagger child, every page (R10)
│   ├── glass-card.tsx           # "use client" — 6 variant map + accentLine;
│   │                            #   HTMLMotionProps passthrough (R5)
│   ├── tag-pill.tsx             # Server-compatible — 4 pill variants (R5)
│   ├── carousel-arrows.tsx      # "use client" — 3 size presets, aria labels (R5)
│   ├── carousel-dots.tsx        # "use client" — 3 size variants, aria labels
│   │                            #   (R9); consumers: home + [slug] ×2
│   ├── project-carousel.tsx     # "use client" island (R8) — home's featured-
│   │                            #   projects carousel; embla + Autoplay plugin
│   │                            #   (pause on hover/focus) + dots (R9, approved)
│   ├── project-detail.tsx       # "use client" island (R9, split R9.1) —
│   │                            #   [slug] composition root: owns the shared
│   │                            #   activeSlide/modal state for the two below
│   ├── gallery-carousel.tsx     # "use client" (split R9.1) — [slug] gallery:
│   │                            #   embla + Autoplay + hover overlay; plugin
│   │                            #   play()/stop() guarded on embla api
│   ├── enlarged-image-modal.tsx # "use client" (split R9.1) — [slug] modal:
│   │                            #   2nd embla, focus trap, Escape, scroll-lock
│   ├── accent-link-button.tsx   # "use client" (R8) — Link + motion.button CTA
│   ├── project-grid.tsx         # "use client" island (R8) — hub spotlight card
│   │                            #   + grid (ProjectCard internal)
│   ├── skills-categories.tsx    # "use client" island (R8) — skills panels
│   ├── experience-timeline.tsx  # "use client" island (R8) — timeline cards
│   └── education-panel.tsx      # "use client" island (R8) — education panel +
│                                #   CourseList (internal)
└── lib/
    ├── projects.ts              # single source of truth: detail + summary +
    │                            #   thumbnail + featured + screenshots
    │                            #   (src+title+lines merged in R9)
    ├── home.ts                  # HomeContent: hero copy, projects section,
     │                           #   infoCards w/ HomeIconId strings (R8)
    ├── experience.ts            # Experience type + data (R4)
    ├── education.ts             # Education/CourseGroup + CourseGroupIconId (R4)
    ├── skills.ts                # Skill + SkillIconId union, 20 IDs (R4)
    └── motion.ts                # motion tokens/factories/named variants (R10)
```

Import convention (set in R2): `@/*` alias (resolves `./src/*`) across `src/`
top-level boundaries; relative imports for colocated files.

## Target Patterns

- **Data layer** — ✅ fully landed R3/R4/R8/R9: every page renders from
  typed, serializable TS in `lib/*.ts`; icons are ID strings mapped to
  react-icons in dedicated components. No page holds content or icon refs.
- **Component layer** — ✅ landed R5 + R8 + R9: `PageShell`/`PageHeader`
  own page chrome; `GlassCard`/`TagPill`/`CarouselArrows`/`CarouselDots`
  own recurring patterns; pages compose.
- **Client/server boundary** — ✅ fully landed R8/R9: every page is a
  Server Component; motion/interactivity lives in client islands.
  `[slug]`'s shell resolves params + `notFound()` server-side, then hands
  the typed `Project` to the `ProjectDetail` island.
- **Icons** — ✅ landed R7/R8: react-icons only; ID → component maps
  (`skill-icon.tsx`, `home-icon.tsx`) keep `lib/` serializable.
- **Design tokens** — ✅ landed R6 (+R9 `backdrop`): palette lives once
  in `globals.css` `@theme`; components reference semantic utilities,
  never raw hexes. Remaining literals are deliberate one-offs (see
  "Design Tokens" below).
- **Carousel pattern** — ✅ settled R9: three purpose-built carousels
  (home / `[slug]` gallery / `[slug]` modal), NOT one shared `Carousel` —
  rule of three not met and slide markup genuinely differs. Shared
  primitives: `CarouselArrows` + `CarouselDots`. Autoplay rhythm is one
  constant in `lib/motion.ts` (4500ms, `stopOnInteraction: false`);
  hover/focus pause sits on the wrapper so overlay arrows are covered.
  Gallery/modal sync: modal mounts at the clicked slide (`startIndex`);
  both share one `activeSlide` and sync on close only — no live
  cross-carousel sync. Plugin/API quirks live in `techContext.md`.
- **Modal pattern** — ✅ landed R9: `AnimatePresence`-wrapped,
  `role="dialog"` + `aria-modal`, focus-on-open + focus return + full Tab
  wrap trap, Escape close, body scroll-lock, close button, optimized
  `next/image` (no `unoptimized`).
- **Motion** — ✅ landed R10: `lib/motion.ts` holds timing tokens,
  `staggerContainer`/`fadeUp`/`fadeDown` factories, and named variants
  (`slideInFromLeft`, spotlight entrance/hover, `liftOnHover`);
  PageShell is the stagger root on every page, variants live at module
  scope, and no `custom=` function variants remain. Hover policy:
  color/opacity via CSS `duration-200`; transform/spring via framer
  label variants (`whileHover="hover"`). F3: layout wraps main in
  `MotionConfig reducedMotion="user"`; `useReducedMotion()` gates
  autoplay in both islands (home's resume callback checks it too).
- **Assets** — ✅ landed R11: `public/images/**` all kebab-case; raster
  sources ≤1920px and compressed via sharp (transitive dep — binary image
  ops through shell-invoked sharp are the sanctioned exception to
  write-through-harness); no orphan/template/stock assets remain.
- **Layout invariants** — ✅ settled R12: exactly one `<main>` per page
  (root layout owns it; PageShell/ProjectDetail render `motion.div`);
  one site column — navbar row/tray and `[slug]` content share the
  1120px edge (max-w-6xl − main's 16px `px-4` inset; approved
  exception). Z ladder (z-0/10/20/40/50; 30 reserved) is documented
  once in `globals.css` — that comment is its single home.
- **Menu-close** — ✅ landed R13: tray closes on any navigation via a
  guarded render-time pathname reset + onClick on every nav affordance
  (logo included — same-route clicks bypass pathname diffing); no effect.

## Design Tokens (landed R6, extended R9)

Palette defined once in `globals.css` via Tailwind v4 `@theme`; Tailwind
auto-generates utilities from each `--color-*` variable (including opacity
modifiers and gradient stops). Semantic names were chosen over numeric
scales (approved, R6). Token map:

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
| `backdrop` | `#2a2a3a` | screenshot letterbox behind `object-contain` |
| `menu` | `#4b4e58` | mobile menu buttons |
| `menu-hover` | `#5b5f69` | mobile menu hover |
| `menu-tray` | `#2f3138` | mobile menu dropdown container |

Deliberate non-tokens: experience avatar gradient (`#2c2f36/#1f2128/#3a3e47`,
single-use decorative), accent `rgba()` stops inside arbitrary gradients
(color-mix() conversion risks render drift — value-identical literals are
safer).

## Debt Register

Zero open. Killed (details in git history): duplicate project data (R3) ·
dual icon systems (R7) · all pages client (R8/R9) · copy-pasted shells
(R5) · type drift (R3/R4/R5) · dead scrollbar classes (R6) · `[slug]`
modal gaps (R9) · hooks-order fragility (R9) · asset waste (R11) · SEO
absent (F2) · naming stragglers (R3/R5/R11) · hardcoded home (R8) ·
hardcoded footer links (F1) · accent-bar anchoring (R5) · in-body
sizeStyles (R12.1).