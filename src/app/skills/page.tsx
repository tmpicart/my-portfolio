import type { Metadata } from "next";

import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import SkillsCategories from "@/components/skills-categories";
import { skillCategories } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "My programming languages, frameworks, and tools — the toolkit behind my web, mobile, and game development projects.",
};

export default function SkillsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Core Toolkit" title="Skills" />

      <SkillsCategories categories={skillCategories} />
    </PageShell>
  );
}