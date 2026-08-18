# Tech Context

Stack, tooling, and workflow facts. "How to build, check, and ship."

## Stack

- **Next.js 16** (App Router, no `src/` yet — restructure is roadmap R2)
- **React 19**, **TypeScript 5** (strict, `@/*` root alias)
- **Tailwind CSS 4** via `@tailwindcss/postcss` (v4 style: CSS-first config,
  `@theme` tokens arrive in R6)
- **framer-motion** (animation), **embla-carousel-react** (carousels),
  **react-icons** (icons; Font Awesome CDN remains only until R7 migrates
  the last usages)

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (this is the real quality gate today)
- `npm run start` — serve the production build locally
- `npm run lint` — **currently broken**: `next lint` was removed in Next 16
  and the FlatCompat-based `eslint.config.mjs` crashes under ESLint 9
  ("circular structure"). Repair is roadmap R1 (native flat config +
  `eslint .` script). Until then, `npm run build` is the only gate.

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

## Known Quirks (pre-refactor)

- Font Awesome 5.15.3 loaded via CDN `<link>` in layout — render-blocking,
  pending R7 removal.
- `scrollbar-thin`/`scrollbar-thumb-*` classes on education page require a
  plugin that was never installed — silently dead CSS (removed in R6).
- No test framework — deliberate for a static presentation site; revisit if
  interactive behavior with failure modes is ever added.