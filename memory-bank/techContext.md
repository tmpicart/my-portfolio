# Tech Context

Stack, tooling, and workflow facts. "How to build, check, and ship."

## Stack

- **Next.js 16** (App Router, `src/` standard layout — landed R2:
  `src/app` routes with `src/components` + `src/lib` siblings)
- **React 19**, **TypeScript 5** (strict, `@/*` alias → `./src/*`)
- **Tailwind CSS 4** via `@tailwindcss/postcss` (v4 CSS-first config —
  design tokens live in `globals.css` `@theme` since R6; no
  `tailwind.config.*` file exists)
- **framer-motion** (animation), **embla-carousel-react** (carousels),
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
- **`memory-bank/`** — on-demand project ledger (this file). Stable files
  change rarely; `activeContext.md` + `progress.md` are volatile and updated
  every task per the protocol.
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
- No test framework — deliberate for a static presentation site; revisit if
  interactive behavior with failure modes is ever added.