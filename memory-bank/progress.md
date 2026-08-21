# Progress

**Updated: 2026-08-21** — what works, what's changing, and the roadmap that
drives it. Each roadmap item = one future task = one commit.

## What Works (stable, deployed)

- All 6 routes functional and responsive: `/`, `/projects`,
  `/projects/[slug]` (carousel + enlarged-image modal), `/skills`,
  `/education`, `/experience`
- Deployed on Vercel from `main`; `refactor/cleanup` is the working branch
- Content data layer complete (`lib/`: projects, experience, education,
  skills) — all content pages render from it (R3/R4)

## Task Log

- **2026-08-21 — Memory bank audit + protocol hardening:** verified all six
  bank files against ground truth (git history/branch, file tree,
  `package.json`, tsconfig alias, source searches for suppressions/FA
  CDN/dead classes). Findings: `activeContext`/`progress`/`projectbrief`/
  `productContext` accurate; stable files had drifted — `systemPatterns.md`
  route map still showed the pre-R2 layout and the debt register lacked
  R3/R4 kills (rewritten to current state, entries #12/#13 added);
  `techContext.md` still said "no `src/` yet" (fixed); `.clinerules` still
  called lint broken post-R1 (fixed) and its Memory Bank Protocol was
  expanded per Thayer: bank is primary context over re-reading source
  files, code is ground truth on disagreement, and `systemPatterns.md` +
  `techContext.md` update whenever structure changes or a roadmap item
  lands. No source changes; lint + build green.
- **2026-08-20 — R4 extract remaining content:** `lib/experience.ts`,
  `lib/education.ts`, `lib/skills.ts` created; skills/education/experience
  pages now render from lib. `Experience` moved verbatim minus the unused
  optional `link` field (approved drop). Education became fully data-driven —
  `Education { school, degree, gpa, courseGroups }`, `CourseGroupIconId`
  union, degree/GPA out of JSX, `mathCourses.length > 0` special case replaced
  by one `.map()` over `courseGroups` (`mb-6 last:mb-0` preserves spacing).
  Skills data is serializable: `SkillIconId` union (20 IDs, typo = build
  failure) with the icon-ID → react-icons/brand-color map in new
  `src/components/skill-icon.tsx` (`SkillIcon` component; colors verbatim, so
  rendered SVGs identical). Skills page shed 20 icon imports + `JSX` import.
  `pageMeta` stays per-page (R3 hub precedent). Scope decision: home content
  intentionally NOT extracted — folded into R8. Lint + build both green.
- **2026-08-20 — R3 consolidate project data:** `lib/projects.ts` now the
  single source of truth — `Project` gained `summary`, `thumbnail`,
  `featured` (module-load assertion pins exactly one true; spotlight is now a
  flag flip); `imageInfos: string[][]` → required `captions: ImageCaption[]`
  (`{ title, lines }`, `- ` prefixes kept verbatim, rendering unchanged);
  hub page dropped its local project array and selects spotlight/cards from
  lib via the flag (portfolio card title now lib's canonical
  "My Portfolio Website"); home carousel switched from `images[0]` to
  `thumbnail` — Thayer-approved exception to visual neutrality, so John
  Dungeon/Portfolio home slides now match hub cards. `images`/`captions`
  stay parallel arrays; merge deferred to R9. Lint + build both green.
- **2026-08-19 — R2 standard-layout restructure:** `git mv` tree into `src/`
  (11 files, history preserved) — `src/app/` routes only, `src/components/` +
  `src/lib/` siblings, `Navbar.tsx` → `navbar.tsx`; `@/*` alias → `./src/*`;
  footer extracted to `src/components/footer.tsx` (Server Component, markup
  verbatim, FA icons intact for R7); import convention set: alias across
  `src/` top-level boundaries, relative for colocated files. Windows note:
  directory-level `git mv` hit a handle lock; per-file `git mv` worked.
  Build initially failed on stale `.next/dev` type validators referencing
  pre-move paths — cleared `.next/`, rebuilt green. Lint + build both green.
- **2026-08-19 — Deps hygiene (pre-R1, approved):** in-range bumps for all
  packages (`next` 16.1.6 → 16.3.1, `react` 19.2.8, `tailwind` 4.3.3,
  `framer-motion` 12.43, `typescript` 5.9.3, `eslint` 9.39.5); all 11 audit
  findings cleared; skills-page icons repaired after react-icons 5.7 renamed/
  removed three `si` icons. No majors.
- **2026-08-19 — R1 lint repair:** native flat config, `eslint .` script,
  `@eslint/eslintrc` dropped; 11 surfaced findings resolved (8 fixed in
  place, 3 suppressed with roadmap refs). Lint + build both green.
- **2026-08-17 — Kickoff:** established `.clinerules`, `.clineignore`, and
  this memory bank after a full project scan. No source changes. Roadmap
  below is the plan of record.

## Roadmap — Refactor (dependency-ordered)

- **R1. ~~Repair lint tooling~~** ✅ done 2026-08-19 — see Task Log.
- **R2. ~~Restructure to standard layout~~** ✅ done 2026-08-19 — see Task Log.
- **R3. ~~Consolidate project data~~** ✅ done 2026-08-20 — see Task Log.
- **R4. ~~Extract remaining content to the data layer~~** ✅ done 2026-08-20
  — see Task Log.
- **R5. Extract shared components** — `PageShell`, `PageHeader`, `GlassCard`,
  `TagPill`, `CarouselArrows`; per-page style-string constants die.
- **R6. Design tokens via Tailwind v4 `@theme`** — palette defined once in
  `globals.css`; scattered hex literals → semantic classes; delete dead
  `scrollbar-*` classes.
- **R7. Unify icons on react-icons** — migrate all remaining Font Awesome
  usages (all have react-icons equivalents), remove FA CDN `<link>`.
- **R8. Server/client boundary** — convert the four zero-hook pages to
  Server Components with motion client islands; split home's carousel into a
  client component. Prerequisite for F2 metadata. *(R4 note: also extract
  home's remaining hardcoded content — hero copy, `infoCards` — to the data
  layer here, and hoist `infoCards` to module scope; deliberately skipped in
  R4 since home gets restructured in this task and its FA icons wait on R7.)*
- **R9. `[slug]` page + modal quality pass** — server shell + client
  carousel/modal islands; fix hooks order; back button → `<Link>`; modal:
  `AnimatePresence`, Escape, scroll-lock, `role="dialog"`, optimized images
  (drop `unoptimized`); remove inline styles.
- **R10. Motion consolidation** — single `lib/motion.ts` variants module;
  variants at module scope; simplify stagger logic; unify hover-variant
  naming.
- **R11. Asset cleanup** — delete orphaned `Avatar.png` (recoverable from
  git history) and unused template SVGs after verifying references;
  compress/resize oversized images (`laptop_img.jpg`, `pfp.jpg`, `John_1.png`);
  normalize asset filenames.
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
- **F2. SEO implementation** *(after R8)* — per-page `metadata` exports,
  Open Graph/Twitter cards, `metadataBase`, `sitemap.ts`, `robots.ts`,
  per-project `generateMetadata` from lib data.

## Status

Next task: **R5**. See `activeContext.md` for the current working snapshot.
