import EducationPanel from "@/components/education-panel";
import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import { education } from "@/lib/education";

export default function EducationPage() {
  return (
    <PageShell className="w-full">
      <PageHeader eyebrow="Academic Foundation" title="Education" />

      <EducationPanel education={education} />
    </PageShell>
  );
}