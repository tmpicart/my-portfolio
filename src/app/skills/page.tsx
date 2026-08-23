import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import SkillsCategories from "@/components/skills-categories";
import { skillCategories } from "@/lib/skills";

export default function SkillsPage() {
  return (
    <PageShell initial="hidden" animate="visible">
      <PageHeader eyebrow="Core Toolkit" title="Skills" />

      <SkillsCategories categories={skillCategories} />
    </PageShell>
  );
}