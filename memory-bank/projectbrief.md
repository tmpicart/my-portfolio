# Project Brief

A deployed portfolio website presenting Thayer's software engineering work —
projects, skills, education, and experience — in a fast, professional, easily
scannable format.

Live site: https://tmpicart-portfolio.vercel.app (Vercel, auto-deployed from
`main`). Repository: https://github.com/tmpicart/my-portfolio

## Purpose & Audience

- **Primary:** recruiters and hiring managers evaluating an early-career
  software engineer. The site must communicate competence within seconds:
  qualifications and best work visible on first scan.
- **Secondary:** engineers and technical reviewers who click through to
  project pages and the GitHub repository. For this audience, the codebase
  itself is part of the showcase.

## Primary Goals

1. **Recruiter-ready presentation** — clean hierarchy, fast loads, clear
   navigation; qualifications and standout projects surfaced immediately.
2. **Professional codebase** — the repository doubles as evidence of modern
   engineering practice: typed, lint-clean, conventional Next.js patterns,
   maintained to industry standards.
3. **Sustainable workflow** — future changes land as small, well-scoped
   tasks (one feature per task), supported by the Cline `.clinerules` +
   memory bank system.

## Non-Goals

- No CMS, backend, auth, or blog — content is static and lives in the
  codebase.
- Low-maintenance by design: polish and periodic updates, not continuous
  feature development.
- Visual identity is settled (dark theme, purple accent `#A673E7`,
  glassmorphism); refactors must be visually neutral.

## Success Criteria

- A link that can be attached to any application with confidence.
- A recruiter can scan qualifications and top projects in under a minute.
- An engineer reviewing the repo finds clean, conventional, well-typed code.
- Shared links (LinkedIn, email, search) render correct titles, descriptions,
  and previews. *(→ delivered by the SEO roadmap item, F2.)*