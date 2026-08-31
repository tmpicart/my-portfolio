import type { Metadata } from "next";

import EducationPanel from "@/components/education-panel";
import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import { education } from "@/lib/education";

export const metadata: Metadata = {
  title: "Education",
  description:
    "My academic foundation in software design and development — the coursework that built it.",
};

export default function EducationPage() {
  return (
    <PageShell className="w-full">
      <PageHeader eyebrow="Academic Foundation" title="Education" />

      <EducationPanel education={education} />
    </PageShell>
  );
}