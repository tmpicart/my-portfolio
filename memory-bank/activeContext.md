# Active Context

**Snapshot: 2026-08-21 (post-R7)** — updated every task per the Memory Bank Protocol.

## Current State

- **R7 complete**, on branch `refactor/cleanup` (stacked on R1–R6):
  - All 9 remaining Font Awesome `<i>` usages are now react-icons components:
    navbar toggle (`FaTimes`/`FaBars`), footer contacts (`FaLinkedin`/
    `SiGithub`/`FaEnvelope` — GitHub uses `Si` so both site GitHub icons
    are the identical glyph, Thayer's call), home hero `FaLaptopCode`, and
    `infoCards` (`FaBriefcase`/`FaTools`/`FaGraduationCap` as direct
    component refs).
  - FA 5.15.3 CDN `<link>` + empty `<head>` removed from layout — one less
    render-blocking third-party request; icons are build-time SVGs.
  - Verified BEFORE migrating: all 20 `SkillIconId`s and all 9 FA targets
    resolve in the installed react-icons (skills coverage is also
    compile-time guaranteed by the `Record<SkillIconId, …>` map).
  - Skills icon system untouched (R4's design already conforms).
  - Debt #2 (dual icon systems) killed. Zero `fa-`/`fontawesome`/`cdnjs`
    remnants in `src/`.
- Lint + build both green after R7.

## What's Next

**Roadmap R8 — server/client boundary**: convert the four zero-hook pages
(hub, skills, education, experience) to Server Components with motion
client islands; split home's carousel into a client component. Also folds
in home content extraction (hero copy, `infoCards` → data layer, hoisted to
module scope; icons become IDs via the `SkillIcon` pattern). Prerequisite
for F2 metadata.

Starting pattern for every task: read this file + `progress.md` first, work
the single roadmap item, run the quality gates, update both files, commit by
explicit path.

## Known Deferred Items

- Home page content (hero copy, `infoCards`) still hardcoded — deliberately
  folded into **R8**, which restructures home anyway; `infoCards` also still
  sits inside the component body (convention violation) and its icons are
  component refs, not IDs — same fix, same task.
- Footer contact links still hardcoded (F1 will touch the footer); footer
  icon-only links lack `aria-label` — flagged for F1.
- Experience avatar gradient + `[slug]` inline `#2a2a3a` left as one-off
  literals by design (R6 scope decision); inline-style removal is R9's.

## Working Agreements in Force

- `.clinerules` is law; when it and memory bank notes ever disagree, the
  rules file wins and the bank gets corrected.
- Refactors are visually neutral — structure changes, appearance doesn't.
  Exceptions require Thayer's explicit sign-off (R3 thumbnails, R5 header
  canonicalization + skills accent-line fix, R7 footer `SiGithub`).
- One roadmap item = one task = one commit. No drive-by fixes; flag
  out-of-scope findings instead.
- Ask before any dependency change; never push without asking.