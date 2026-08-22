# Progress

**Updated: 2026-08-21 (post-R7)** — what works, what's changing, and the roadmap that
drives it. Each roadmap item = one future task = one commit.

## What Works (stable, deployed)

- All 6 routes functional and responsive: `/`, `/projects`,
  `/projects/[slug]` (carousel + enlarged-image modal), `/skills`,
  `/education`, `/experience`
- Deployed on Vercel from `main`; `refactor/cleanup` is the working branch
- Content data layer complete (`lib/`: projects, experience, education,
  skills) — all content pages render from it (R3/R4)
- Shared UI component layer complete (`components/`: PageShell, PageHeader,
  GlassCard, TagPill, CarouselArrows + existing navbar/footer/skill-icon) —
  all pages compose from it (R5)
- Design token layer complete — `@theme` palette in `globals.css`, semantic
  color utilities across every component/page (R6)
- Single icon system — react-icons everywhere, FA CDN gone (R7)

## Task Log

- **2026-08-21 — R7 unify icons:** all 9 remaining Font Awesome `<i>` usages
  became react-icons components — navbar toggle (`FaTimes`/`FaBars`), footer
  contacts (`FaLinkedin`/`SiGithub`/`FaEnvelope`; GitHub deliberately uses
  `SiGithub` so both GitHub icons in the site are the same glyph, Thayer's
  call), home hero `FaLaptopCode`, and `infoCards` (`fa-*` string classes →
  `FaBriefcase`/`FaTools`/`FaGraduationCap` component refs, rendered as
  `<card.icon className>`). FA 5.15.3 CDN `<link>` + now-empty `<head>`
  removed from layout — render-blocking CSS + webfont requests gone; icons
  are build-time SVG components. Equivalence verified up front against the
  installed react-icons (all 20 skill icons + all 9 targets resolve; `fa`
  pack ships the same FA5 artwork the CDN served). Skills map untouched
  (`Record<SkillIconId,…>` already guarantees coverage). Zero FA remnants:
  `fa-`/`fontawesome`/`cdnjs` sweep of `src/` clean. Debt #2 killed. R8
  note: `infoCards` now holds component refs — ID-ify when home content
  moves to lib (SkillIcon pattern). Tooling: three more `replace_in_file`
  false-successes this session (navbar ×1, systemPatterns ×2) — all
  recovered via full-file `write_to_file` + `git --no-pager diff` ground
  truth, per the standing safeguard. Lint + build both green.
- **2026-08-21 — R6 design tokens:** `globals.css` gained a Tailwind v4
  `@theme` block — 15 semantic tokens (accent/deep/vivid/tint/soft,
  canvas/canvas-raised/shell, surface-1/2/3/modal,
  menu/menu-hover/menu-tray; semantic naming chosen over numeric scales,
  Thayer-approved). 49 hex literals across 13 files became token utilities
  (incl. opacity modifiers like `bg-accent/12` and gradients
  `from-accent-vivid to-accent`); PageShell's gradient stops →
  `var(--color-shell)`; dead `scrollbar-*` classes deleted from education
  (debt #6 killed). Deliberate non-tokens: experience avatar gradient,
  `[slug]` inline `#2a2a3a` (R9 owns inline-style removal); accent rgba()
  stops inside gradients stay literal (color-mix() conversion risks render
  drift). Visually neutral — identical hexes behind names. Tooling: session
  hit `replace_in_file` false-successes (recovered via full-file
  `write_to_file` + `git --no-pager diff` ground-truth checks) and one
  heavily corrupted tool-result message (disk verified clean via git before
  proceeding). Lint + build both green.
- **2026-08-21 — R5 extract shared components:** five components created —
  `PageShell` (shell gradient + sheen overlay; motion-label passthrough for
  stagger propagation; optional `className`), `PageHeader` (canonical
  eyebrow/title), `GlassCard` (variant map: panel/timeline/spotlight/hero/
  section/tile, optional `accentLine`, `HTMLMotionProps<"div">` passthrough
  with `children` re-pinned to ReactNode for framer-motion typing),
  `TagPill` (tag/accent/muted/badge), `CarouselArrows` (small/medium/large
  presets). All five shell pages rebuilt on the pair; home/experience/
  education/skills adopted GlassCard+TagPill; `[slug]` swapped both arrow
  pairs to CarouselArrows (page layout untouched — R9 owns it). Killed debt
  #4, #5 (pageMeta), #11 (cardStyle family). Thayer-approved visual deltas:
  header canonicalized (one style replacing five drifting ones), skills
  category cards gained `relative` (accent bars had anchored to the page
  shell, not the card — bug fix), `<section>` → `<div>` where sections had
  no accessible name. Tooling note: VS Code dirty-buffer reverts corrupted
  several write_to_file calls (ghost artifacts `page.ts`, extension-less
  files); recovered via PowerShell WriteAllText + artifact cleanup.
  Lint + build both green.
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
  `src/lib` siblings, `Navbar.tsx` → `navbar.tsx`; `@/*` alias → `./src/*`;
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
- **R5. ~~Extract shared components~~** ✅ done 2026-08-21 — see Task Log.
- **R6. ~~Design tokens via Tailwind v4 `@theme`~~** ✅ done 2026-08-21 —
  see Task Log.
- **R7. ~~Unify icons on react-icons~~** ✅ done 2026-08-21 — see Task Log.
- **R8. Server/client boundary** — convert the four zero-hook pages to
  Server Components with motion client islands; split home's carousel into a
  client component. Prerequisite for F2 metadata. *(R4 note: also extract
  home's remaining hardcoded content — hero copy, `infoCards` — to the data
  layer here, and hoist `infoCards` to module scope; deliberately skipped in
  R4 since home gets restructured in this task. R7 note: `infoCards` icons
  are now component refs — switch to icon IDs, `SkillIcon` pattern, when
  the data moves.)*
- **R9. `[slug]` page + modal quality pass** — server shell + client
  carousel/modal islands; fix hooks order; back button → `<Link>`; modal:
  `AnimatePresence`, Escape, scroll-lock, `role="dialog"`, optimized images
  (drop `unoptimized`); remove inline styles. *(R5 note: the three
  carousels — home, `[slug]` main, `[slug]` modal — were deliberately NOT
  unified in R5: they differ in autoplay, slide shape, dots, and
  cross-carousel sync, and the effect-sync between main/modal is exactly
  what this task replaces. After the redesign, evaluate whether what remains
  is similar enough to extract into one shared `Carousel` component,
  composing with R5's `CarouselArrows`.)*
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

Next task: **R8**. See `activeContext.md` for the current working snapshot.