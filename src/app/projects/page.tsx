import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import ProjectGrid from "@/components/project-grid";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  const featuredProject = projects.find((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <PageShell>
      <PageHeader eyebrow="Project Hub" title="Projects" />

      {featuredProject && (
        <ProjectGrid featuredProject={featuredProject} otherProjects={otherProjects} />
      )}
    </PageShell>
  );
}