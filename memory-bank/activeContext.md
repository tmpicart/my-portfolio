# Active Context

**Snapshot: 2026-08-17** — updated every task per the Memory Bank Protocol.

## Current State

- Kickoff task complete: `.clinerules`, `.clineignore`, and this memory bank
  are committed on branch `refactor/cleanup` (forked at `cf87375`, level with
  `main` — no refactor work has landed yet).
- The site itself is untouched: fully functional, deployed, and stable.
- Full project scan performed at kickoff; findings live in
  `systemPatterns.md` → Debt Register, and the plan of record is the roadmap
  in `progress.md`.

## What's Next

**Roadmap R1 — repair lint tooling** (`eslint.config.mjs` → native flat
config, `lint` script → `eslint .`, fix surfaced violations). Then R2
(restructure to `src/`) in dependency order — see `progress.md`.

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