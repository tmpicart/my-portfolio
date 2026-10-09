# Active Context

**Snapshot: 2026-10-09 (content sync)** — updated every task per
the Memory Bank Protocol.

## Current State

- **Roadmap complete + deployed** — R1–R13 and F1–F3 merged to `main`,
  pushed, live on Vercel. `main` is the only branch; feature branches are
  cut per task and retired post-merge.
- **Site copy synced to Resume A** — Gemini bullet corrected, AI Tools group
  added (Gemini API, Cline), Kotlin + Cline additions landed; lib/ now
  matches the 10/9 resume.
- **Master quality audit applied** — code comments cut to constraint-only,
  Tailwind v4 utilities aligned, dead code pruned, README refreshed, bank
  condensed to caps, `completedTasks.md` renewed for Cycle 2.
- Nothing queued — new work needs a new roadmap.

## Known Deferred Items

- Content rulings (2026-10-09): FastAPI banned from the site; TypeScript
  deliberately off `/skills` (project pages keep it as project fact);
  Kotlin on `/skills` is evidence-based (TicketMaster) though not on the
  resume.

- Experience avatar gradient stays a deliberate non-token → no action.
- Accepted names (judgment calls, not violations): `featured`,
  `accentLine`, `InfoCard.button`.
- Footer full-bleed strip stays (floating card rejected in review);
  resume-link navbar/hero variant parked — revisit if the footer needs
  strengthening.

## Working Agreements in Force

- `.clinerules` is law; on disagreement it wins and the bank gets corrected.
- Refactors visually neutral; exceptions need approval.
- One roadmap item = one task = one commit; flag out-of-scope findings.
- Ask before dependency changes; never push without asking.
