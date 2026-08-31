import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectDetail from "@/components/project-detail";
import { projects } from "@/lib/projects";
import { siteName } from "@/lib/site";

// All four project pages prerender at build time, same as the static routes.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Metadata derives from the lib data layer, so each project page gets a
// bespoke title, description, and screenshot-based preview card with zero
// duplication. openGraph fields are set explicitly because a page-level
// openGraph object replaces the layout's (shallow merge).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      type: "website",
      siteName,
      locale: "en_US",
      title: project.title,
      description: project.summary,
      images: [{ url: project.thumbnail, alt: project.title }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Resolves before any client code mounts, so no hook can run after an early
  // return — the pre-R9 hooks-order fragility is gone by construction.
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) notFound();

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas text-white">
      <ProjectDetail project={project} />
    </div>
  );
}