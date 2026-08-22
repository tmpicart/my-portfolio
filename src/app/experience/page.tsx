"use client";

import Image from "next/image";
import type { Variants } from "framer-motion";

import GlassCard from "@/components/glass-card";
import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import TagPill from "@/components/tag-pill";
import { experiences } from "@/lib/experience";

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -32, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.12 },
  }),
};

export default function ExperiencePage() {
  return (
    <PageShell initial="hidden" animate="visible">
      <PageHeader eyebrow="Career Timeline" title="Work Experience" />

      <div className="relative flex w-full max-w-4xl flex-col gap-10">
        {experiences.map((experience, index) => (
          <GlassCard key={experience.company} variant="timeline" accentLine custom={index} variants={cardVariants}>
            <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-gradient-to-br from-[#2c2f36] via-[#1f2128] to-[#3a3e47]">
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <TagPill variant="accent">{experience.duration}</TagPill>
              </div>

              <h2 className="mb-1 text-2xl font-bold md:text-3xl">{experience.company}</h2>

              <p className="mb-3 text-lg text-gray-100">
                <span className="font-semibold text-accent">{experience.role}</span>
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <TagPill key={tag} variant="tag">
                    {tag}
                  </TagPill>
                ))}
              </div>

              <ul className="mt-2 space-y-3 text-base leading-relaxed text-gray-300">
                {experience.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}