# System Patterns

How this codebase is built: current architecture, target patterns, and the
debt register the refactor roadmap (see `progress.md`) burns down. Conventions
are enforced by `.clinerules` — this file records the reasoning and the map.

## Route Map (current — post-R4)

```
src/
├── app/
│   ├── layout.tsx               # Server ✓ — Navbar + Footer components; FA
│   │                            #   CDN <link> (→ R7); only metadata in site
│   ├── page.tsx                 # "use client" — embla + motion; home content
│   │                            #   still hardcoded (deliberately, → R8)
│   ├── projects/page.tsx        # "use client", 0 hooks — renders from lib;
│   │                            #   spotlight = featured flag (R3)
│   ├── projects/[slug]/page.tsx # "use client" — synced carousels + modal;
│   │                            #   debt → R9
│   ├── skills/page.tsx          # "use client", 0 hooks — renders from lib (R4)
│   ├── experience/page.tsx      # "use client", 0 hooks — renders from lib (R4)
│   └── education/page.tsx       # "use client", 0 hooks — renders from lib (R4)
├── components/
│   ├── navbar.tsx               # "use client" — legit (menu state, usePathname)
│   ├── footer.tsx               # Server ✓ — extracted R2; FA icons intact (→ R7)
│   └── skill-icon.tsx           # SkillIconId → react-icons + brand colors (R4)
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
- **Client/server boundary** — target R8: pages become Server Components;
  client islands cover interactivity only (Navbar, carousels, motion
  wrappers, modal). Enables per-page `metadata` exports (F2).
- **Component patterns** — target R5: shared `PageShell` + `PageHeader`
  replace the copy-pasted gradient wrapper; `GlassCard`, `TagPill`,
  `CarouselArrows` absorb per-page style strings. (Footer extraction landed
  in R2.)
- **Modal pattern** — target R9: `AnimatePresence` (real exit animation),
  Escape key + scroll-lock, `role="dialog"`, optimized `next/image` (no
  `unoptimized` — phones shouldn't download 1.5MB originals).
- **Motion** — target R10: one shared variants module (`lib/motion.ts`);
  variants at module scope, never inside components.

## Design Tokens (reference)

Canonical definitions land in `globals.css` via Tailwind v4 `@theme` (roadmap
R6). Until then this table is the map of hexes currently scattered as
arbitrary values:

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

## Debt Register (current → killed by)

1. ~~Duplicate project data, hub vs `lib/projects.ts`~~ ✅ R3 (2026-08-20)
2. Dual icon systems (FA CDN + react-icons) → R7
3. All 6 pages `"use client"`; 4 zero-hook pages (hub, skills, education,
   experience) → R8
4. Copy-pasted page shell + style strings, 5 pages → R5
5. Type drift: `Project` ×2 ✅ R3, local `Experience` ✅ R4; `pageMeta` ×4
   (kept per-page by R3 precedent) consolidates with R5 `PageHeader`
6. Dead `scrollbar-*` classes (plugin never installed) → R6
7. `[slug]` modal gaps (dead `exit`, no Escape/scroll-lock/role, inline
   styles, `router.push` back button, `unoptimized` images) → R9
8. Hooks-order fragility (`notFound()` before hooks in `[slug]`) → R9
9. Assets: orphaned `Avatar.png`, unused template SVGs, oversized images → R11
10. SEO absent (single root metadata only) → F2
11. Naming stragglers: `imageInfos` ✅ R3 (→ `captions`); `cardStyle`-family
    constants → R5; `pfp.jpg` → R11/R12
12. Home content hardcoded (hero copy, `infoCards`), and `infoCards` sits
    inside the component body → R8
13. Footer contact links hardcoded → F1