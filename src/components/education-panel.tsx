"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaCalculator, FaLaptopCode } from "react-icons/fa";

import GlassCard from "@/components/glass-card";
import type { CourseGroupIconId, Education } from "@/lib/education";
import { durationSlow, fadeUp, staggerContainer } from "@/lib/motion";

const courseGroupIcons: Record<CourseGroupIconId, IconType> = {
  "laptop-code": FaLaptopCode,
  calculator: FaCalculator,
};

// The panel rises slowly; its contents stagger at the site interval — header
// lines, course groups, and each group's course list (lib/motion.ts).
const panelEntrance = fadeUp(20, durationSlow);
const contentStagger = staggerContainer();
const itemEntrance = fadeUp();

function CourseList({ courses }: { courses: string[] }) {
  return (
    <motion.div
      className="flex max-h-96 flex-col space-y-3 overflow-y-auto pr-2"
      variants={contentStagger}
    >
      {courses.map((course, index) => (
        <motion.div
          key={index}
          variants={itemEntrance}
          className="rounded-lg border border-white/10 bg-white/10 p-3"
        >
          <p className="text-sm font-medium text-gray-300">{course}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

type EducationPanelProps = {
  education: Education;
};

// Client island (R8): nested stagger through variant propagation needs the
// client runtime; the page keeps layout and data selection on the server.
export default function EducationPanel({ education }: EducationPanelProps) {
  return (
    <GlassCard
      variant="panel"
      accentLine
      className="w-full max-w-6xl"
      variants={panelEntrance}
    >
      <motion.div variants={contentStagger}>
        <motion.div variants={contentStagger} className="mb-6">
          <motion.h2 variants={itemEntrance} className="mb-1 text-lg font-medium text-gray-400 md:text-xl">
            {education.school}
          </motion.h2>
          <motion.p variants={itemEntrance} className="mb-1 text-2xl font-bold leading-snug text-white md:text-3xl">
            {education.degree}
          </motion.p>
          <motion.p variants={itemEntrance} className="mb-6 text-sm text-gray-400 md:text-base">
            GPA: {education.gpa}
          </motion.p>
        </motion.div>

        {education.courseGroups.map((group) => {
          const GroupIcon = courseGroupIcons[group.iconId];
          return (
            <motion.div key={group.title} variants={itemEntrance} className="mb-6 last:mb-0">
              <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-accent">
                <GroupIcon className="h-5 w-5 text-accent" /> {group.title}
              </h3>
              <CourseList courses={group.courses} />
            </motion.div>
          );
        })}
      </motion.div>
    </GlassCard>
  );
}