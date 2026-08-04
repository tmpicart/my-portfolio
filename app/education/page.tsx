"use client";

import { motion, Variants } from "framer-motion";
import { FaLaptopCode, FaCalculator } from "react-icons/fa";

type PageMeta = {
  eyebrow: string;
  title: string;
};

const pageMeta: PageMeta = {
  eyebrow: "Academic Foundation",
  title: "Education",
};

const csCourses = [
  "Software Engineering",
  "Web Programming",
  "Mobile App Development",
  "Computer Game Development",
  "Systems Programming",
  "Data and File Structures",
  "Computer Science I & II",
  "Computer Architecture",
  "Digital Systems Design",
  "Computer Security",
  "Principles of Software Testing & QA",
  "Programming Languages",
  "Algorithms",
  "Intro to Computer Forensics",
  "Cloud Computing Technology & Services",
];

const mathCourses = [
  "Discrete Mathematics for Computer Science",
  "Linear Algebra & Probability for Engineers",
];

const glassCardClasses = `
  rounded-[32px] border border-white/15 bg-white/10
  p-8 backdrop-blur-xl
`;

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
      className="flex max-h-96 flex-col space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
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
  <main className="relative flex min-h-screen w-full flex-col items-center overflow-hidden rounded-[44px] border border-white/[0.04] bg-[radial-gradient(circle_at_top_left,_rgba(166,115,231,0.16)_0%,_rgba(166,115,231,0.06)_35%,_rgba(18,18,20,0.98)_70%),linear-gradient(180deg,_#0b0b0d_0%,_#0b0b0d_100%)] px-6 pt-6 pb-12 mt-8 sm:mt-10 lg:mt-12 text-white sm:px-8 lg:px-14">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
        className="relative mb-10 text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#D7BFFF]">
          {pageMeta.eyebrow}
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">{pageMeta.title}</h1>
        </motion.div>

      <motion.div className={`${glassCardClasses} relative w-full max-w-6xl`} variants={cardVariants} initial="hidden" animate="visible">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#A673E7]/70 to-transparent" />

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-6">
          <motion.h2 variants={cardVariants} className="mb-1 text-lg font-medium text-gray-400 md:text-xl">
            Central Connecticut State University
          </motion.h2>
          <motion.p variants={cardVariants} className="mb-1 text-2xl font-bold leading-snug text-white md:text-3xl">
            B.S. Computer Science, Cum Laude — Dec 2024
          </motion.p>
          <motion.p variants={cardVariants} className="mb-6 text-sm text-gray-400 md:text-base">
            GPA: 3.59
          </motion.p>
        </motion.div>

        <motion.div variants={cardVariants} className="mb-6">
          <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-[#A673E7]">
            <FaLaptopCode className="h-5 w-5 text-[#A673E7]" /> Computer Science & Development
          </h3>
          <CourseList courses={csCourses} />
        </motion.div>

        {mathCourses.length > 0 && (
          <motion.div variants={cardVariants}>
            <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-[#A673E7]">
              <FaCalculator className="h-5 w-5 text-[#A673E7]" /> Mathematics
            </h3>
            <CourseList courses={mathCourses} />
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
