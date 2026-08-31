import type { Metadata } from "next";

import ExperienceTimeline from "@/components/experience-timeline";
import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import { experiences } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "My professional software development experience — the roles and teams where I've built real-world projects.",
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Career Timeline" title="Work Experience" />

      <ExperienceTimeline experiences={experiences} />
    </PageShell>
  );
}