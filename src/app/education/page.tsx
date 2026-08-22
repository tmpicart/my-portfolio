"use client";

import { motion, Variants } from "framer-motion";
import type { IconType } from "react-icons";
import { FaCalculator, FaLaptopCode } from "react-icons/fa";

import GlassCard from "@/components/glass-card";
import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import { education, type CourseGroupIconId } from "@/lib/education";

const courseGroupIcons: Record<CourseGroupIconId, IconType> = {
  "laptop-code": FaLaptopCode,
  calculator: FaCalculator,
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.8, 0.25, 1] } },
};

const courseItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.12, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] },
  }),
};

function CourseList({ courses }: { courses: string[] }) {
  return (
    <motion.div
      className="flex max-h-96 flex-col space-y-3 overflow-y-auto pr-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {courses.map((course, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={courseItemVariants}
          className="rounded-lg border border-white/10 bg-white/10 p-3"
        >
          <p className="text-sm font-medium text-gray-300">{course}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function EducationPage() {
  return (
    <PageShell className="w-full">
      <PageHeader eyebrow="Academic Foundation" title="Education" />

      <GlassCard
        variant="panel"
        accentLine
        className="w-full max-w-6xl"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-6">
          <motion.h2 variants={cardVariants} className="mb-1 text-lg font-medium text-gray-400 md:text-xl">
            {education.school}
          </motion.h2>
          <motion.p variants={cardVariants} className="mb-1 text-2xl font-bold leading-snug text-white md:text-3xl">
            {education.degree}
          </motion.p>
          <motion.p variants={cardVariants} className="mb-6 text-sm text-gray-400 md:text-base">
            GPA: {education.gpa}
          </motion.p>
        </motion.div>

        {education.courseGroups.map((group) => {
          const GroupIcon = courseGroupIcons[group.iconId];
          return (
            <motion.div key={group.title} variants={cardVariants} className="mb-6 last:mb-0">
              <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-accent">
                <GroupIcon className="h-5 w-5 text-accent" /> {group.title}
              </h3>
              <CourseList courses={group.courses} />
            </motion.div>
          );
        })}
      </GlassCard>
    </PageShell>
  );
}