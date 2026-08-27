import { notFound } from "next/navigation";

import ProjectDetail from "@/components/project-detail";
import { projects } from "@/lib/projects";

// All four project pages prerender at build time, same as the static routes.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
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