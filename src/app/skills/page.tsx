"use client";

import { motion, Variants } from "framer-motion";

import { SkillIcon } from "@/components/skill-icon";
import { skillCategories } from "@/lib/skills";

type PageMeta = {
  eyebrow: string;
  title: string;
};

const pageMeta: PageMeta = {
  eyebrow: "Core Toolkit",
  title: "Skills",
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, when: "beforeChildren" },
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

const skillCardClasses =
  "flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl transition-all duration-300";

export default function SkillsPage() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      className="relative flex min-h-screen flex-col items-center overflow-hidden rounded-[44px] border border-white/[0.04] bg-[radial-gradient(circle_at_top_left,_rgba(166,115,231,0.16)_0%,_rgba(166,115,231,0.06)_35%,_rgba(18,18,20,0.98)_70%),linear-gradient(180deg,_#0b0b0d_0%,_#0b0b0d_100%)] px-6 pt-6 pb-12 mt-8 sm:mt-10 lg:mt-12 text-white sm:px-8 lg:px-14"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mb-12 text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#D7BFFF]">
          {pageMeta.eyebrow}
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">{pageMeta.title}</h1>
        </motion.div>

      <div className="relative flex w-full max-w-6xl flex-col gap-8">
        {skillCategories.map((category) => (
          <motion.section
            key={category.title}
            variants={rowVariants}
            className="rounded-[32px] border border-white/15 bg-white/10 p-8 backdrop-blur-xl"
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#A673E7]/70 to-transparent" />
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: -15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.25 },
                },
              }}
              className="mb-5 text-center text-3xl font-semibold text-[#A673E7]"
            >
              {category.title}
            </motion.h2>

            <motion.div className="flex flex-wrap justify-center gap-6" variants={rowVariants}>
              {category.skills.map((skill) => (
                <motion.div key={skill.name} variants={cardVariants} className={skillCardClasses}>
                  <div className="mb-2 text-5xl">
                    <SkillIcon iconId={skill.iconId} />
                  </div>
                  <p className="mt-1 text-center text-sm font-medium">{skill.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        ))}
      </div>
    </motion.main>
  );
}
