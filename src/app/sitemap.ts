import type { MetadataRoute } from "next";

import { projects } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

// Every indexable route, generated at build from the lib data layer so a new
// project is automatically included.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/skills", "/experience", "/education"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
