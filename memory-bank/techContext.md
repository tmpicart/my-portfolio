# Tech Context

Stack, tooling, and workflow facts. "How to build, check, and ship."

## Stack

- **Next.js 16** (App Router, `src/` standard layout — landed R2:
  `src/app` routes with `src/components` + `src/lib` siblings)
- **React 19**, **TypeScript 5** (strict, `@/*` alias → `./src/*`)
- **Tailwind CSS 4** via `@tailwindcss/postcss` (v4 CSS-first config —
  design tokens live in `globals.css` `@theme` since R6; no
  `tailwind.config.*` file exists)
- **framer-motion** (animation), **embla-carousel-react** +
  **embla-carousel-autoplay** (carousels + official autoplay plugin, R8),
  **react-icons** (sole icon library since R7 — `fa`/`si`/`hi`
  collections; no CDN, no webfonts)

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (this is the real quality gate today)
- `npm run start` — serve the production build locally
- `npm run lint` — **repaired 2026-08-19 (R1)**: native ESLint 9 flat config
  (`eslint-config-next/core-web-vitals` + `/typescript`, no FlatCompat) with
  `eslint .` script. Three known suppressions carry roadmap refs: `[slug]`
  hooks ×2 → R9, Navbar menu-close → R13.

## Deployment & Branches

- **Vercel** auto-deploys from `main`: https://tmpicart-portfolio.vercel.app
- Refactor/feature work happens on branches (current: `refactor/cleanup`);
  `main` stays the stable, deployed line.

## AI Tooling (Cline workflow)

- **`.clinerules`** — always-loaded project law: conventions, guardrails,
  git policy, memory bank protocol. Kept short on purpose (token cost is
  per-message).
- **`memory-bank/`** — tiered ledger (protocol in `.clinerules`): Tier 0
  reads are `activeContext.md` + `progress.md` every task; this file and
  `systemPatterns.md` are Tier 1 (on demand); brief/product are Tier 2.
  `completedTasks.md` is a sealed write-only archive — append via the
  sentinel, never read until Thayer confirms all roadmap tasks are done.
  Compression caps keep every file bounded; the bank is primary context
  over re-reading source files.
- **`.clineignore`** — blocks Cline tools from reading `node_modules/`,
  `.next/`, and `package-lock.json` (no token value; npm commands answer
  dependency questions — treat npm as the driver, the lockfile as the
  database it queries).

## Known Quirks (remaining)

- Windows/Cline write quirk: a tool's "success" report can outlive an edit
  that never reached disk. Safeguard (law in `.clinerules`): harness writes
  only (`write_to_file` preferred for full-file rewrites; no shell/PowerShell
  writes), and verify each batch with `git --no-pager diff --stat` before
  moving on.
- Terminal is Windows PowerShell — `&&` separators fail ("not a valid
  statement separator"); use `;` instead. `git diff` opens the `less`
  pager; always pass `--no-pager`.
- framer-motion quirk (found R5): `HTMLMotionProps<"div">` widens `children`
  to `MotionValue | ReactNode`, which `motion.div` rejects as JSX children —
  re-pin `children?: ReactNode` via `Omit` when spreading motion props (see
  `glass-card.tsx`).
- embla/React-Compiler quirks (found R8): (1) embla's documented autoplay
  pattern (`useRef(Autoplay(...))` + `[ref.current]` in options) trips the
  `react-hooks` "Cannot access refs during render" rules — build the plugin
  in `useMemo` instead (stable identity, same behavior). (2) v8.6.0's
  typings accept `stopOnMouseEnter: boolean` only (no `"retry"`), and the
  plugin's own hover handling watches just the embla viewport — wrapper-div
  pause/resume handlers cover overlay arrows too (see
  `project-carousel.tsx`). (3) `Autoplay.play(jumpOverride)` takes a JUMP
  override, not a restart flag — `play(true)` makes every subsequent tick
  `scrollNext(true)` (snap, no animation). Resume with bare `play()`.
- No test framework — deliberate for a static presentation site; revisit if
  interactive behavior with failure modes is ever added.