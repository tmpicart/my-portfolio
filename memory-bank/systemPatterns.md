# System Patterns

How this codebase is built: as-built architecture, target patterns, and the
debt register the refactor roadmap (see `progress.md`) burns down. Conventions
are enforced by `.clinerules` — this file records the reasoning and the map.

## As-Built Route Map (pre-refactor)

```
app/                        # NOTE: components/ and lib/ live inside the route
├── layout.tsx              # Server ✓ — Navbar + inline footer, FA CDN <link>,
│                           #   only metadata in the site (root-level)
├── page.tsx                # "use client" — embla carousel + motion
├── components/Navbar.tsx   # "use client" — legit (menu state, usePathname)
├── lib/projects.ts         # single source of truth for project detail data
├── projects/page.tsx       # "use client", 0 hooks — DUPLICATE project data
├── projects/[slug]/page.tsx# "use client" — 2 synced carousels + modal, imports lib
├── skills/page.tsx         # "use client", 0 hooks — data embeds JSX icons
├── experience/page.tsx     # "use client", 0 hooks — local type + data
└── education/page.tsx      # "use client", 0 hooks — hardcoded course lists
```

## Target Patterns

- **Data layer** — all content lives in `lib/*.ts` as serializable typed TS.
  `Project` carries full detail **plus** `summary` (hub teaser), `thumbnail`
  (hub card image), and `featured: boolean` (exactly one true). Skills store
  icon-ID strings; a component maps IDs → react-icons components. No content
  in page/component bodies.
- **Client/server boundary** — pages are Server Components; client islands
  cover interactivity only (Navbar, carousels, motion wrappers, modal).
  Enables per-page `metadata` exports (F2).
- **Component patterns** — shared `PageShell` + `PageHeader` replace the 5×
  copy-pasted gradient wrapper; `GlassCard`, `TagPill`, `CarouselArrows`
  absorb per-page style strings; footer extracts from layout.
- **Modal pattern** — `AnimatePresence` (real exit animation), Escape key +
  scroll-lock, `role="dialog"`, optimized `next/image` (no `unoptimized` —
  phones shouldn't download 1.5MB originals).
- **Motion** — one shared variants module (`lib/motion.ts`); variants defined
  at module scope, never inside components.

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

## Debt Register (as-built → killed by)

1. Duplicate project data, hub vs `lib/projects.ts` → R3
2. Dual icon systems (FA CDN + react-icons) → R7
3. All 5 pages `"use client"`; 4 with zero hooks → R8
4. Copy-pasted page shell + style strings, 5 pages → R5
5. Type drift (`Project` ×2, `PageMeta` ×4, `Experience` local) → R3/R4/F2
6. Dead `scrollbar-*` classes (plugin never installed) → R6
7. `[slug]` modal gaps (dead `exit`, no Escape/scroll-lock/role, inline
   styles, `router.push` back button, `unoptimized` images) → R9
8. Hooks-order fragility (`notFound()` before hooks in `[slug]`) → R9
9. Assets: orphaned `Avatar.png`, unused template SVGs, oversized images → R11
10. SEO absent (single root metadata only) → F2
11. Naming stragglers (`pfp.jpg`, `cardStyle`-family constants,
    `imageInfos`) → R3/R11/R12