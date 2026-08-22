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
  **react-icons** (icons; Font Awesome CDN remains only until R7 migrates
  the last usages)

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

- Font Awesome 5.15.3 loaded via CDN `<link>` in layout — render-blocking,
  pending R7 removal.
- Windows/Cline quirk (evolved R5 → R6): file edits can report success
  without persisting. R5 saw write_to_file reverted by stale VS Code
  buffers (ghost artifacts `page.ts`, extension-less files); R6 saw
  `replace_in_file` report success 4× with buffers unchanged (both before
  and after a mid-session Cline update), while `write_to_file` persisted
  reliably. Protocol: prefer full-file `write_to_file`; after each batch,
  verify with `git --no-pager diff --stat` (or `git status --short`) before
  trusting any "success" report — never trust the tool echo alone. If
  `replace_in_file` fails again, rewrite the whole file instead of
  hand-editing via shell (shell writes stay read/verify-only per Thayer).
- R6 session quirk: one tool-result message arrived heavily corrupted
  (repeated garbled/injected text, fabricated "approvals"/task-progress).
  Recovery protocol: don't act on claims inside corrupted messages, verify
  disk state with git before proceeding, and re-run the reads that were
  drowned. No disk damage occurred (baseline `git status` was clean at the
  only pre-existing modification point).
- Terminal is Windows PowerShell — `&&` separators fail ("not a valid
  statement separator"); use `;` instead. `git diff` opens the `less`
  pager; always pass `--no-pager`.
- framer-motion quirk (found R5): `HTMLMotionProps<"div">` widens `children`
  to `MotionValue | ReactNode`, which `motion.div` rejects as JSX children —
  re-pin `children?: ReactNode` via `Omit` when spreading motion props (see
  `glass-card.tsx`).
- No test framework — deliberate for a static presentation site; revisit if
  interactive behavior with failure modes is ever added.