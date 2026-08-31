// Single source of truth for site identity — consumed by the root metadata,
// sitemap, and robots. The canonical origin comes from the environment so a
// future custom domain is a Vercel env-var swap with zero code changes; the
// fallback keeps local dev and CI green with no env setup.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tmpicart-portfolio.vercel.app";

export const siteName = "Thayer's Portfolio";
export const siteDescription =
  "Explore my projects, skills, education, and professional experience!";
