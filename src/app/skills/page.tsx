"use client";

import { motion, Variants } from "framer-motion";

import GlassCard from "@/components/glass-card";
import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import { SkillIcon } from "@/components/skill-icon";
import { skillCategories } from "@/lib/skills";

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, when: "beforeChildren" },
  },
};

const categoryTitleVariants: Variants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function SkillsPage() {
  return (
    <PageShell initial="hidden" animate="visible">
      <PageHeader eyebrow="Core Toolkit" title="Skills" />

      <div className="relative flex w-full max-w-6xl flex-col gap-8">
        {skillCategories.map((category) => (
          <GlassCard key={category.title} variant="panel" accentLine variants={rowVariants}>
            <motion.h2
              variants={categoryTitleVariants}
              className="mb-5 text-center text-3xl font-semibold text-accent"
            >
              {category.title}
            </motion.h2>

            <motion.div className="flex flex-wrap justify-center gap-6" variants={rowVariants}>
              {category.skills.map((skill) => (
                <GlassCard key={skill.name} variant="tile" variants={cardVariants}>
                  <div className="mb-2 text-5xl">
                    <SkillIcon iconId={skill.iconId} />
                  </div>
                  <p className="mt-1 text-center text-sm font-medium">{skill.name}</p>
                </GlassCard>
              ))}
            </motion.div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}