# Active Context

**Snapshot: 2026-08-27 (post git-upkeep)** — updated every task per the Memory
Bank Protocol.

## Current State

- **History purged** (filter-repo): leaked full-resume blobs removed from all
  reachable history; branches force-pushed; messages/dates/trees verified
  byte-identical vs mirror backup (backup now deleted). Orphaned commits on
  GitHub left for natural gc — raw URLs may 200 until then (accepted risk).
- **Refactor phase deployed**: `--no-ff` merge `31eda54` brought R1–R13 to
  `main`; Vercel serves the refactored site for the first time. Gates green.
- **`feat/portfolio-features` opened** from merged main (unpushed — Thayer
  publishes it); first commit `21a9880` adds redacted `public/resume.pdf`.
  `refactor/cleanup` deleted (local + origin) — fully merged, zero loss.
- **Next: F1** footer resume button (+ aria-labels, contact links → lib),
  then F2 SEO, F3 reduced-motion — all on `feat/portfolio-features`.

## Known Deferred Items

- Footer contact links hardcoded + icon-only links lack `aria-label` → F1.
- Experience avatar gradient stays a deliberate non-token → no action.
- Navbar toggle button lacks `aria-expanded` disclosure state → F3 a11y
  follow-up (flagged during R13 review, out of scope there).
- Reduced-motion support deliberately skipped in R10 → F3.
- `home.png` doubles as Open Graph image candidate → F2.
- R12 accepted names (documented judgment calls, not violations):
  `featured`, `accentLine`, `InfoCard.button`.

## Working Agreements in Force

- `.clinerules` is law; on disagreement it wins and the bank gets corrected.
- Refactors are visually neutral; exceptions need Thayer's sign-off (R3
  thumbnails, R5 header/skills, R7 `SiGithub`, R8 pause behavior, R9 dots,
  R10 entrance retiming + hover sharpening, R11 stock-photo removal, R12
  shell-aligned 1120px column).
- One roadmap item = one task = one commit; flag out-of-scope findings.
- Ask before dependency changes; never push without asking.
