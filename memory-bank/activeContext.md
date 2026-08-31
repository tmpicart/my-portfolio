# Active Context

**Snapshot: 2026-08-31 (post-F1)** — updated every task per the Memory
Bank Protocol.

## Current State

- **F1 landed** on `feat/portfolio-features`: footer resume
  button (`FaFilePdf`, opens `Thayer-Picart-Resume.pdf` new-tab), aria-labels
  on all icon-only footer links, contact links extracted to new
  `lib/contact.ts`. Divider variant built then rejected in review (flat
  uniform 4 chosen). Gates green.
- Refactor phase R1–R13 deployed on `main` (merge `31eda54`); git-upkeep
  purge done 2026-08-27 (orphaned full-resume commits may 200 on GitHub raw
  URLs until gc — accepted risk).
- **Next: F2** SEO (per-page metadata, OG/Twitter cards, `metadataBase`,
  sitemap, robots), then F3 reduced-motion — on `feat/portfolio-features`.

## Known Deferred Items

- Resume-link discoverability (navbar/hero variant) floated in F1 review —
  parked; revisit if the footer placement feels weak after living with it.
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
  shell-aligned 1120px column, F1 Title-Case resume filename).
- One roadmap item = one task = one commit; flag out-of-scope findings.
- Ask before dependency changes; never push without asking.
