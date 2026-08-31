# Portfolio - Tmpicart

This is my personal developer portfolio. It highlights my skills, projects, and experience using modern web technologies.

## Built With

- Next.js – React framework for server-side rendering and static site generation
- TypeScript – Strongly-typed JavaScript for safer and more maintainable code
- Tailwind CSS – Utility-first CSS framework for responsive, modern styling
- Framer Motion – Animation library for page entrances and hover effects
- Embla Carousel – Lightweight carousel for the project showcases
- React Icons – Icon library used for skills and contact links

## Getting Started

To run the site locally:

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser. For a production build use `npm run build`, and `npm run lint` to run ESLint.

## Features

- Fully responsive design
- Organized sections for projects, skills, education, experience and contact information
- Project pages with screenshots, tech breakdowns, and image galleries
- Animated page entrances and autoplaying project carousels
- Per-page SEO metadata, a sitemap, and social preview cards

## Project Structure

Page content lives in `src/lib` as typed data files, so updating a project or skill is just a data edit. Shared UI (cards, carousels, the page shell) lives in `src/components`, and routes live in `src/app`.

## Deployment

This project is deployed on Vercel. Any updates pushed to the GitHub repository will automatically trigger a new deployment.
You can view the live site here: [https://tmpicart-portfolio.vercel.app](https://tmpicart-portfolio.vercel.app)

