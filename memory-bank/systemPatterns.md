# System Patterns

How this codebase is built: current architecture, target patterns, and the
debt register the refactor roadmap (see `progress.md`) burns down. Conventions
are enforced by `.clinerules` — this file records the reasoning and the map.

## Route Map (current — post-R5)

```
src/
├── app/
│   ├── layout.tsx               # Server ✓ — Navbar + Footer components; FA
│   │                            #   CDN <link> (→ R7); only metadata in site
│   ├── page.tsx                 # "use client" — embla + motion; composes
│   │                            #   PageShell/PageHeader/GlassCard/TagPill/
│   │                            #   CarouselArrows; content still hardcoded
│   │                            #   (deliberately, → R8)
│   ├── projects/page.tsx        # "use client", 0 hooks — PageShell + cards
│   │                            #   via GlassCard variant="spotlight" (R5)
│   ├── projects/[slug]/page.tsx # "use client" — synced carousels + modal;
│   │                            #   CarouselArrows swapped in (R5); layout
│   │                            #   debt → R9
│   ├── skills/page.tsx          # "use client", 0 hooks — GlassCard panel +
│   │                            #   tile variants (R5)
│   ├── experience/page.tsx      # "use client", 0 hooks — GlassCard timeline
│   │                            #   + TagPill (R5)
│   └── education/page.tsx       # "use client", 0 hooks — GlassCard panel +
│   │                            #   accentLine (R5)
├── components/
│   ├── navbar.tsx               # "use client" — legit (menu state, usePathname)
│   ├── footer.tsx               # Server ✓ — extracted R2; FA icons intact (→ R7)
│   ├── skill-icon.tsx           # SkillIconId → react-icons + brand colors (R4)
│   ├── page-shell.tsx           # "use client" — radial-gradient shell wrapper;
│   │                            #   motion-label passthrough (R5)
│   ├── page-header.tsx          # "use client" — canonical eyebrow + title (R5)
│   ├── glass-card.tsx           # "use client" — 6 variant map + accentLine;
│   │                            #   HTMLMotionProps passthrough (R5)
│   ├── tag-pill.tsx             # Server-compatible — 4 pill variants (R5)
│   └── carousel-arrows.tsx      # "use client" — 3 size presets, aria labels (R5)
└── lib/
    ├── projects.ts              # single source of truth: detail + summary +
    │                            #   thumbnail + featured + captions (R3)
    ├── experience.ts            # Experience type + data (R4)
    ├── education.ts             # Education/CourseGroup + CourseGroupIconId (R4)
    └── skills.ts                # Skill + SkillIconId union, 20 IDs (R4)
```

Import convention (set in R2): `@/*` alias (resolves `./src/*`) across `src/`
top-level boundaries; relative imports for colocated files.

## Target Patterns

- **Data layer** — ✅ landed R3/R4 for projects, skills, education,
  experience: serializable typed TS in `lib/*.ts`; skills/education store
  icon-ID strings with components mapping IDs → react-icons. Home's hero
  copy and `infoCards` remain the exception, folded into R8.
- **Component layer** — ✅ landed R5: `PageShell` + `PageHeader` own the page
  chrome; `GlassCard`/`TagPill`/`CarouselArrows` own the recurring
  presentation patterns via variant maps (same record pattern as
  `skill-icon.tsx`). Pages compose; no page holds style-string constants.
- **Client/server boundary** — target R8: pages become Server Components;
  client islands cover interactivity only (Navbar, carousels, motion
  wrappers, modal). Enables per-page `metadata` exports (F2). `TagPill` is
  already server-compatible; shell/header/cards are client (motion) — they
  may split into server markup + motion islands in R8.
- **Carousel pattern** — three embla instances exist (home, `[slug]` main,
  `[slug]` modal) and were deliberately left un-unified in R5: they differ
  in autoplay, slide shape, and dots, and the main/modal pair is glued
  together by the effect-sync R9 replaces. R8 extracts home's carousel as
  a client component; R9 rebuilds the `[slug]` pair — whether a shared
  `Carousel` component is worth extracting gets evaluated after that
  redesign, composing with R5's `CarouselArrows`.
- **Modal pattern** — target R9: `AnimatePresence` (real exit animation),
  Escape key + scroll-lock, `role="dialog"`, optimized `next/image` (no
  `unoptimized` — phones shouldn't download 1.5MB originals).
- **Motion** — target R10: one shared variants module (`lib/motion.ts`);
  variants at module scope, never inside components.

## Design Tokens (reference)

Canonical definitions land in `globals.css` via Tailwind v4 `@theme` (roadmap
R6). Until then this table is the map of hexes currently scattered as
arbitrary values (R5 concentrated many of them into the component variant
maps — single place to swap when tokens land):

| Token | Hex | Role |
|---|---|---|
| accent | `#A673E7` | buttons, hovers, headings, active states |
| accent-deep | `#8a57cc`, `#7C4DFF` | button hover, divider gradient |
| accent-tint | `#D7BFFF`, `#B8A6FF`, `#E7D4FF` | eyebrows, tags, light text |
| bg-base | `#070707` | body background |
| bg-panel | `#0b0b0d` | page shell gradient base |
| surface-1 | `#40434E` | navbar, buttons, carousel arrows |
| surface-2 | `#1F1E2E` | panels |
| surface-3 | `#272636` | inner panels |
| surface-modal | `#1C1B29` | modal background |
| menu grays | `#4b4e58`, `#5b5f69`, `#2f3138` | mobile menu states |

R5 note: the canonical header eyebrow is `#D7BFFF`; projects previously used
`#B8A6FF` (drift removed with approval).

## Debt Register (current → killed by)

1. ~~Duplicate project data, hub vs `lib/projects.ts`~~ ✅ R3 (2026-08-20)
2. Dual icon systems (FA CDN + react-icons) → R7
3. All 6 pages `"use client"`; 4 zero-hook pages (hub, skills, education,
   experience) → R8
4. ~~Copy-pasted page shell + style strings, 5 pages~~ ✅ R5 (2026-08-21)
5. Type drift: `Project` ×2 ✅ R3, local `Experience` ✅ R4; `pageMeta` ×4
   ✅ R5 (PageHeader props)
6. Dead `scrollbar-*` classes (plugin never installed) → R6
7. `[slug]` modal gaps (dead `exit`, no Escape/scroll-lock/role, inline
   styles, `router.push` back button, `unoptimized` images) → R9
8. Hooks-order fragility (`notFound()` before hooks in `[slug]`) → R9
9. Assets: orphaned `Avatar.png`, unused template SVGs, oversized images → R11
10. SEO absent (single root metadata only) → F2
11. Naming stragglers: `imageInfos` ✅ R3 (→ `captions`); `cardStyle`-family
    constants ✅ R5; `pfp.jpg` → R11/R12
12. Home content hardcoded (hero copy, `infoCards`), and `infoCards` sits
    inside the component body → R8
13. Footer contact links hardcoded → F1
14. Skills accent-bar anchoring (sections lacked `relative`, bars pinned to
    page shell) ✅ fixed R5 with Thayer approval (`panel` variant carries
    `relative`)