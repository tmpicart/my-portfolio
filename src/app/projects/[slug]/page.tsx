import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectDetail from "@/components/project-detail";
import { projects } from "@/lib/projects";
import { siteName } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// openGraph is restated in full because a page-level openGraph object
// replaces (not merges with) the layout's.
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
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) notFound();

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas text-white">
      <ProjectDetail project={project} />
    </div>
  );
}