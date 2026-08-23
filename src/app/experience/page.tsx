import ExperienceTimeline from "@/components/experience-timeline";
import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import { experiences } from "@/lib/experience";

export default function ExperiencePage() {
  return (
    <PageShell initial="hidden" animate="visible">
      <PageHeader eyebrow="Career Timeline" title="Work Experience" />

      <ExperienceTimeline experiences={experiences} />
    </PageShell>
  );
}