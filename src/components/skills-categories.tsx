"use client";

import { motion } from "framer-motion";

import GlassCard from "@/components/glass-card";
import { SkillIcon } from "@/components/skill-icon";
import { durationFast, fadeDown, fadeUp, staggerContainer } from "@/lib/motion";
import type { SkillCategory } from "@/lib/skills";

// Panels fade up as units under the page stagger; their contents run their own
// stagger — title first, then tiles (clean container/child split).
const panelEntrance = fadeUp();
const contentStagger = staggerContainer();
const titleEntrance = fadeDown(15, durationFast);
const tileEntrance = fadeUp();

type SkillsCategoriesProps = {
  categories: SkillCategory[];
};

// Client island (R8): nested stagger through variant propagation needs the
// client runtime; the page keeps layout and data selection on the server.
export default function SkillsCategories({ categories }: SkillsCategoriesProps) {
  return (
    <div className="relative flex w-full max-w-6xl flex-col gap-8">
      {categories.map((category) => (
        <GlassCard key={category.title} variant="panel" accentLine variants={panelEntrance}>
          <motion.div variants={contentStagger}>
            <motion.h2
              variants={titleEntrance}
              className="mb-5 text-center text-3xl font-semibold text-accent"
            >
              {category.title}
            </motion.h2>

            <motion.div className="flex flex-wrap justify-center gap-6" variants={contentStagger}>
              {category.skills.map((skill) => (
                <GlassCard key={skill.name} variant="tile" variants={tileEntrance}>
                  <div className="mb-2 text-5xl">
                    <SkillIcon iconId={skill.iconId} />
                  </div>
                  <p className="mt-1 text-center text-sm font-medium">{skill.name}</p>
                </GlassCard>
              ))}
            </motion.div>
          </motion.div>
        </GlassCard>
      ))}
    </div>
  );
}