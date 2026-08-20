# Active Context

**Snapshot: 2026-08-20** — updated every task per the Memory Bank Protocol.

## Current State

- **R3 complete**, on branch `refactor/cleanup` (stacked on R1/R2):
  - `lib/projects.ts` is the single source of truth for project data.
    `Project` gained `summary`, `thumbnail`, and `featured: boolean` — a
    module-load assertion enforces exactly one true, so moving the spotlight
    is a flag flip that fails the build if done wrong.
  - `imageInfos: string[][]` → required `captions: ImageCaption[]`
    (`{ title, lines }`); the literal `- ` prefixes stay verbatim in the data
    (rendering unchanged). Detail page reads `.title`/`.lines` directly.
  - Hub page dropped its local project array; spotlight and cards come from
    lib via the `featured` flag. Portfolio card title is now lib's canonical
    "My Portfolio Website" (was "Portfolio Website" locally).
  - Home carousel rotates `project.thumbnail` — Thayer-approved exception to
    visual neutrality; John Dungeon and Portfolio slides changed from
    `images[0]` to `John_5.png` / `code_img.jpg`.
  - `images`/`captions` remain parallel arrays (index-aligned by convention);
    merging them is deferred to R9's carousel rework.
- Three lint suppressions carry roadmap refs: `[slug]` ×2 → R9, Navbar ×1 →
  R13. Everything else was fixed in place.
- Lint + build both green after R3.

## What's Next

**Roadmap R4 — extract remaining content to the data layer** (`lib/experience.ts`,
`lib/education.ts`; `lib/skills.ts` with icon-ID strings mapped to react-icons
in a component — data stays serializable).

Starting pattern for every task: read this file + `progress.md` first, work
the single roadmap item, run the quality gates, update both files, commit by
explicit path.

## Working Agreements in Force

- `.clinerules` is law; when it and memory bank notes ever disagree, the
  rules file wins and the bank gets corrected.
- Refactors are visually neutral — structure changes, appearance doesn't.
- One roadmap item = one task = one commit. No drive-by fixes; flag
  out-of-scope findings instead.
- Ask before any dependency change; never push without asking.