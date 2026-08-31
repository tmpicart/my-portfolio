// Site identity for metadata, sitemap, and robots. NEXT_PUBLIC_SITE_URL makes
// a custom domain an env-var swap; the fallback keeps dev and CI green.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tmpicart-portfolio.vercel.app";

export const siteName = "Thayer's Portfolio";
export const siteDescription =
  "Explore my projects, skills, education, and professional experience!";
