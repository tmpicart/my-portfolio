# Product Context

Why this product exists and the experience it must deliver. Rooted in
`projectbrief.md`; read that first if goals are unclear.

## Problem Statement

Recruiters evaluating an early-career candidate make a pass/fail judgment in
under a minute. This site is engineered for that window: qualifications and
best work must be comprehensible on first scan, on any device — and reward
deeper inspection (project detail pages, the GitHub repo) for anyone who
looks twice.

## Personas

- **Recruiter (primary)** — non-technical or semi-technical; arrives from a
  resume or LinkedIn; spends 30–60 seconds; often on mobile. Needs:
  instant load, obvious navigation, scannable evidence of competence
  (projects, skills, education, experience).
- **Engineer-reviewer (secondary)** — technical; clicks through to project
  detail pages and the GitHub repository. Needs: real project substance
  (screenshots, features, tech stack, links to source) and a codebase that
  reads as professional.

## UX Principles

- **Scan-ability first** — hierarchy, short copy, one obvious call-to-action
  per section. Motion and gradients are polish, never barriers.
- **Settled visual identity** — dark theme, purple accent `#A673E7`,
  glassmorphism cards. This is deliberately stable: refactors change
  structure, never appearance.
- **Motion as feedback and delight** — framer-motion entrance animations and
  hover effects communicate quality; they must stay subtle and never delay
  content visibility.
- **Featured-project spotlight** — the projects hub deliberately renders one
  project as a large "featured" card. This is intentional design, not
  inconsistency: exactly one project carries `featured: true` in the data
  layer, and Thayer moves that flag when a new flagship project deserves the
  spotlight.
- **Mobile is a first-class path** — recruiters frequently open links on
  phones; carousels, the image modal, and the navbar menu must work
  touch-first.