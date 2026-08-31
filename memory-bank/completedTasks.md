# Completed Tasks (sealed archive)

Full record of completed roadmap tasks. Appends go above the sentinel at the
bottom — newest ends up last. This file is write-only until Thayer explicitly
confirms all roadmap tasks are complete; do not read it before then.

- **2026-08-17 — Kickoff:** established `.clinerules`, `.clineignore`, and
  the memory bank after a full project scan. Roadmap R1–R13 + F1/F2 set as
  the plan of record.
- **2026-08-19 — Deps hygiene (pre-R1, Thayer-approved):** in-range bumps for
  all packages (`next` 16.1.6→16.3.1, `react` 19.2.8, `tailwind` 4.3.3,
  `framer-motion` 12.43, `typescript` 5.9.3, `eslint` 9.19.5); all 11 audit
  findings cleared; skills-page icons repaired after react-icons 5.7 renamed/
  removed three `si` icons. No majors.
- **2026-08-19 — R1 lint repair:** native ESLint 9 flat config
  (`eslint-config-next/core-web-vitals` + `/typescript`, no FlatCompat),
  `eslint .` script, `@eslint/eslintrc` dropped. 11 surfaced findings: 8
  fixed in place, 3 suppressed with roadmap refs ([slug]×2 → R9,
  navbar → R13).
- **2026-08-19 — R2 standard-layout restructure:** `git mv` tree into `src/`
  (11 files, history preserved); `Navbar.tsx` → `navbar.tsx`; `@/*` alias →
  `./src/*`; footer extracted to `src/components/footer.tsx` (Server
  Component, markup verbatim). Import convention set: alias across `src/`
  top-level boundaries, relative for colocated. Windows: directory-level
  `git mv` hit a handle lock (per-file worked); stale `.next/` validators
  cleared by deleting `.next/`.
- **2026-08-20 — R3 consolidate project data:** `lib/projects.ts` single
  source of truth — `Project` gained `summary`, `thumbnail`, `featured`
  (module-load assertion pins exactly one true); `imageInfos` → required
  `captions: ImageCaption[]`; hub page selects spotlight/cards from lib;
  home carousel switched to `thumbnail` and portfolio card title
  canonicalized (both Thayer-approved visual exceptions). `images`/`captions`
  parallel-array merge deferred to R9.
- **2026-08-20 — R4 extract remaining content:** `lib/experience.ts`,
  `lib/education.ts`, `lib/skills.ts` created; skills/education/experience
  render from lib. `Experience` moved minus unused optional `link` (approved
  drop). Education fully data-driven (`Education`, `CourseGroupIconId`,
  courseGroups map). Skills serializable: `SkillIconId` union (20 IDs) +
  `skill-icon.tsx` ID→icon/brand-color map. Home content deliberately
  deferred to R8.
- **2026-08-21 — R5 extract shared components:** `PageShell`, `PageHeader`,
  `GlassCard` (6-variant map + `accentLine` + motion-props passthrough),
  `TagPill`, `CarouselArrows` (3 size presets) created; all five shell pages
  rebuilt on them; `[slug]` adopted CarouselArrows. Killed debts #4, #5,
  #11. Thayer-approved visual deltas: header canonicalized across pages,
  skills accent bars re-anchored to cards (`relative` — bug fix), `<section>`
  → `<div>` where sections had no accessible name.
- **2026-08-21 — R6 design tokens:** Tailwind v4 `@theme` block in
  `globals.css` — 15 semantic tokens; 49 hex literals across 13 files became
  utilities (incl. opacity modifiers + gradient stops). Deliberate
  non-tokens: experience avatar gradient, `[slug]` inline `#2a2a3a` (→ R9),
  accent rgba() gradient stops (color-mix() render-drift risk). Debt #6 dead.
- **2026-08-21 — R7 unify icons:** all 9 Font Awesome `<i>` usages →
  react-icons (navbar FaTimes/FaBars, footer FaLinkedin/SiGithub/FaEnvelope,
  home FaLaptopCode + infoCards Fa trio). GitHub deliberately `SiGithub` so
  both site GitHub icons match (Thayer's call). FA CDN `<link>` removed —
  render-blocking CSS + webfonts gone. Equivalence verified against
  installed packs; zero `fa-`/`fontawesome` remnants. Debt #2 dead.
- **2026-08-21 — Memory bank audit + protocol hardening:** verified all six
  bank files against ground truth; fixed `systemPatterns` stale route map +
  debt register, `techContext` "no src/" note, `.clinerules` stale lint
  note. Protocol expanded: bank primary over re-reading source, code is
  ground truth, stable files update on structural change.
- **2026-08-22 — R8 server/client boundary:** home + four zero-hook pages
  became Server Components; animated bodies became client islands —
  `project-grid`, `skills-categories`, `experience-timeline`,
  `education-panel`, home's `project-carousel` + `accent-link-button`
  (replaced 4 duplicate CTAs). Home content → `lib/home.ts` (`HomeContent`)
  + `HomeIconId` → `home-icon.tsx` map. New dep `embla-carousel-autoplay`
  8.6.0 (approved): 4500ms, `stopOnInteraction:false`, wrapper-level pause
  on hover/focus (approved behavior change; plugin's `stopOnMouseEnter`
  misses overlay arrows). Plugin built in `useMemo` (React Compiler bans
  ref-read-in-render). `[slug]` stays whole-page client until R9. Debts #3,
  #12 dead.
- **2026-08-22 — Memory bank & workflow audit (this task):** audited all
  six bank files + `.clinerules` + `.clineignore` for token bloat.
  Diagnosis: append-only Task Log essays, triple-recording across files,
  no read tiers, no commit gate, no failure breaker. Fixes: tiered bank
  reads (Tier 0 = activeContext + progress), this sealed archive created
  (backfilled R1–R8 from the old Task Log), Task Checkpoint single gate
  before commit, 5-failure circuit breaker, compression caps on every
  bank file. Bank slimmed 35KB → ~19KB, Tier-0 reads now ~7KB and capped.
  `.clineignore` unchanged (working correctly). No source changes; lint +
  build green.
- **2026-08-23 — R9 [slug] quality pass:** `[slug]` → server shell
  (`generateStaticParams`, 4 SSG routes) + `ProjectDetail` island with
  internal GalleryCarousel + EnlargedImageModal sharing one slide-state
  domain; effect-sync design and both hooks suppressions dead. Modal a11y:
  `AnimatePresence`, focus trap (Tab wrap) + focus return, Escape,
  scroll-lock, `role="dialog"`, close button, optimized images. Gallery
  autoplay (pause hover/focus + while modal open); back button → `Link`.
  `images`/`captions` merged → `screenshots[]`; shared `CarouselDots`
  (home + [slug] ×2); home carousel gained dots (approved). New token
  `--color-backdrop` (#2a2a3a). Settled: three purpose-built carousels,
  no shared Carousel abstraction. Debts #7, #8 dead. Lint + build green.

### R9.1 — 2026-08-23 — [slug] autoplay crash fix + island split
- Bug: `TypeError ... internalEngine` on every `/projects/[slug]` — Autoplay
  `play()` called from a mount effect before embla init attached the plugin.
- Fix: guard the effect on `mainCarouselApi` (embla's readiness signal, same
  pattern as the select-listener effect); add it to the deps array.
- Split per one-component-per-file: `project-detail.tsx` (457→~160-line
  composition root, shared slide/modal state) + `gallery-carousel.tsx` +
  `enlarged-image-modal.tsx`; behavior-neutral; local `sectionVariants` copy
  flagged for R10. Gates green; checkpoint approved; single commit (fix +
  split, one roadmap item).
## R10 — Motion consolidation (2026-08-23)

- Created `lib/motion.ts`: timing tokens, `staggerContainer`/`fadeUp`/
  `fadeDown` factories, named variants (`slideInFromLeft`,
  `spotlightEntrance`/`spotlightHover`, `liftOnHover`).
- PageShell = stagger root on every page; PageHeader first child; all
  islands rewired (education/skills/hub retimed to one 0.12 step —
  Option C approved; `custom=` delays eliminated).
- Hover policy: CSS color/opacity hovers at explicit `duration-200`;
  framer label variants own transform/spring hovers; vestigial
  glass-card transitions removed; modal overlay fade to module scope.
- 18 files (+1 new), net −102 lines; lint + build green; 12/12 SSG.
- Deferred by choice: reduced-motion support → F3 (added to roadmap).

- **2026-08-25 — R11 asset cleanup:** deleted orphaned `Avatar.png`, 5
  template SVGs, and both stock photos (filler "Thanks for Visiting!" slide
  dropped; portfolio deck now Vercel + new mobile shot; real home splash as
  thumbnail). sharp pass (transitive dep): `profile.jpg` 449→37KB (400×600),
  john/ticketmaster PNGs losslessly re-encoded, `home.png` 2526→1920px
  (752→211KB); all image paths kebab-case; greybox logo extension corrected
  to `.jpg` (was JPEG bytes). 26 path refs updated in lib + `page.tsx`.
  public/: 28→21 files, 8.94→3.29MB. Lint + build green (12/12 SSG).
## 2026-08-26 — R12: Naming & Consistency Audit

- Renames: `(p)`→`(project)`, `(i)`→`(index)` (+paired key),
  `descClass`→`summaryClass`, `emblaApi`→`carouselApi`,
  `AUTOPLAY_DELAY_MS`→`autoplayDelayMs`, `FOCUSABLE_SELECTOR`→
  `focusableSelector`.
- Hygiene: BOM off projects page; layout section marker gone; inline
  zIndex → Tailwind `z-0`.
- Landmarks: motion.main→motion.div in PageShell + ProjectDetail.
- Geometry (Thayer-approved): navbar row/tray + `[slug]` column unified
  on the shared 1120px shell-border edge.
- README refreshed in original voice (stack, commands, live link).
- Deferred: ProjectCard `sizeStyles` hoist → R12.1. Lint + build green.

## 2026-08-26 — R12.1: ProjectCard Size-Table Hoist

- `sizeStyles` moved from ProjectCard's body to module-scope
  `cardSizeStyles` (`as const satisfies`, derived `CardSize` type); body
  keeps the lookup only — constants-at-module-scope invariant restored.
- Debt #15 closed. Visually neutral; lint + build green (12/12 SSG).

- **2026-08-26 — R13** navbar menu-close pattern (`src/components/navbar.tsx`)
  Render-time pathname reset (guarded prevPathname compare-and-set) replaces
  the suppressed close-effect — the repo's last lint suppression removed.
  Review caught two issues: the first-shipped derived openPathname variant
  hid stale state (back-nav to the opening route resurrected the tray), and
  same-route logo clicks bypass pathname diffing entirely (now an onClick
  close). Final shape: render reset + event closes (logo + tray links).
  Lint + build green (12/12 SSG), visually neutral. Flag carried: toggle
  aria-expanded → F3.

### 2026-08-27 — Git upkeep: purge, phase merge, feat branch open
- filter-repo purged leaked full-resume blobs (`public/files/Resume-Thayer
  Picart.pdf`) from all history; branches force-pushed; messages/dates/trees
  verified byte-identical vs mirror backup (backup deleted after sign-off).
- 19 local `refs/cline/checkpoints/*` shadow refs deleted; orphaned-commit
  GitHub gc left to natural cleanup (ticket declined, risk accepted).
- R1–R13 merged to `main` via `--no-ff` merge `31eda54` — refactored site
  deployed to Vercel for the first time; gates green (12/12 SSG).
- Opened `feat/portfolio-features`; `21a9880` adds redacted
  `public/resume.pdf` (F1 asset only, no button). `refactor/cleanup`
  deleted local+origin. Next: F1 button, then F2 SEO, F3 reduced-motion.
### 2026-08-31 — F1 footer resume button
- New `lib/contact.ts` (`ContactLink`: href/iconId/ariaLabel/opensInNewTab);
  footer renders four data-driven links — resume `FaFilePdf` opens
  `/Thayer-Picart-Resume.pdf` in a new tab (inline viewer has native
  download/print). aria-labels on all icon-only footer links; tagline
  updated. `public/resume.pdf` renamed `Thayer-Picart-Resume.pdf` (approved
  R11 kebab-case exception: recruiter-facing filename). Divider variant
  built, then rejected in review — flat uniform 4 chosen. Debt #13 dead.
  Gates green (lint + build, 12/12 SSG).
<!-- append above -->
