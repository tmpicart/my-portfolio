# Active Context

**Snapshot: 2026-08-21** — updated every task per the Memory Bank Protocol.

## Current State

- **R4 complete**, on branch `refactor/cleanup` (stacked on R1–R3):
  - Content data layer is now the pattern, not the exception:
    `lib/projects.ts`, `lib/experience.ts`, `lib/education.ts`, `lib/skills.ts`.
  - `lib/experience.ts`: `Experience` type moved from the page; unused optional
    `link` field dropped (Thayer-approved — no entry used it, page never
    rendered it). `experiences` array verbatim.
  - `lib/education.ts`: `Education { school, degree, gpa, courseGroups }`;
    `CourseGroup { title, iconId, courses }` with `CourseGroupIconId` union
    (`"laptop-code" | "calculator"`). Degree/GPA no longer hardcoded in JSX
    (`GPA:` label stays in markup, data holds `"3.59"`); the page's
    `mathCourses.length > 0` special case is gone — groups render from one
    `.map()` with `mb-6 last:mb-0` preserving original spacing. In-page
    `courseGroupIcons: Record<CourseGroupIconId, IconType>` map.
  - `lib/skills.ts`: `Skill { name, iconId }`, `SkillIconId` union (20 IDs) —
    a typo'd icon ID now fails the build. Data fully serializable (strings
    only). `src/components/skill-icon.tsx` holds the
    `Record<SkillIconId, { icon: IconType; className: string }>` map +
    `SkillIcon` component; brand colors/classes moved verbatim, so rendered
    SVGs are identical. Skills page dropped its 20 react-icons imports and
    the `JSX` type import.
  - `pageMeta` (eyebrow/title) intentionally stays per-page — matches the R3
    projects-hub precedent (page chrome, not content).
- All three pages remain `"use client"` (framer-motion) — server/client split
  is R8's job.
- Lint + build both green after R4.

## What's Next

**Roadmap R5 — extract shared components** — `PageShell`, `PageHeader`,
`GlassCard`, `TagPill`, `CarouselArrows`; per-page style-string constants die.

**2026-08-21 audit note:** verified all six bank files against the repo
(git history, tree, manifest, source searches). All claims held except
drift in the stable files — `systemPatterns.md` (route map pre-R2, debt
register missing R3/R4 kills) and `techContext.md` ("no `src/` yet") —
both rewritten to current state. `.clinerules` itself had drifted (lint
"currently broken" though R1 fixed it) and its Memory Bank Protocol was
expanded per Thayer's request: the bank is the primary context source over
re-reading files, and `systemPatterns.md`/`techContext.md` must be updated
whenever structure changes or a roadmap item lands. New debt-register
entries #12 (home content → R8) and #13 (footer links → F1) recorded.

Starting pattern for every task: read this file + `progress.md` first, work
the single roadmap item, run the quality gates, update both files, commit by
explicit path.

## Known Deferred Items

- Home page content (hero copy, `infoCards`) still hardcoded — deliberately
  folded into **R8**, which restructures home anyway; note added to R8 in
  `progress.md`. Also `infoCards` sits inside the component body (convention
  violation) — same fix, same task.
- Footer contact links still hardcoded (F1 will touch the footer).

## Working Agreements in Force

- `.clinerules` is law; when it and memory bank notes ever disagree, the
  rules file wins and the bank gets corrected.
- Refactors are visually neutral — structure changes, appearance doesn't.
- One roadmap item = one task = one commit. No drive-by fixes; flag
  out-of-scope findings instead.
- Ask before any dependency change; never push without asking.