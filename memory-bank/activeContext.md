# Active Context

**Snapshot: 2026-08-19** — updated every task per the Memory Bank Protocol.

## Current State

- **R1 complete** (plus an approved deps-hygiene commit that preceded it), on
  branch `refactor/cleanup`:
  - Deps: all in-range bumps landed (`next` 16.3.1, `react` 19.2.8, etc.);
    all 11 npm audit findings cleared. react-icons 5.7 removed `SiAmazon`/
    `SiSlack` and renamed `SiCss3` → skills page repaired (`FaAws`, `FaSlack`
    from `react-icons/fa` — the React package, not the FA CDN; CDN removal is
    still R7).
  - Lint: `eslint.config.mjs` is native flat config (no FlatCompat), `lint`
    script is `eslint .`, `@eslint/eslintrc` removed from direct deps.
    `npm run lint` and `npm run build` both green.
- Three lint suppressions carry roadmap refs: `[slug]` ×2 → R9, Navbar ×1 →
  R13 (new item). Everything else was fixed in place.
- The site remains visually unchanged; no feature work has landed.

## What's Next

**Roadmap R2 — restructure to standard layout** (`src/` adoption, route-only
`app/`, `components/` + `lib/` siblings, `@/*` alias retarget, kebab-case
filenames, footer extraction). Verify via lint + build — both now work, so
R2 finally has both quality gates available. See `progress.md` for full order.

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