"use client";

import { motion, Variants } from "framer-motion";
import { FaLaptopCode, FaCalculator } from "react-icons/fa";

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
  bg-gradient-to-tr from-white/10 via-white/5 to-white/10
  backdrop-blur-xl
  border border-white/25
  rounded-xl
  shadow-inner shadow-black/25
  p-6
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
      className="flex flex-col space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {courses.map((course, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={courseItemVariants}
          className="bg-[#2e2e38] border border-[#3a3a44] p-3 rounded-md shadow-sm"
        >
          <p className="text-gray-300 font-medium text-sm">{course}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function EducationPage() {
  return (
    <main className="flex flex-col items-center w-full pt-8 px-4 pb-8 bg-[#070707]">
      
       {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
        className="text-5xl font-bold mb-10 text-center"
      >
        Education
      </motion.h1>

      <motion.div
        className={`${glassCardClasses} w-full max-w-6xl`}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* University Info */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-6">
          <motion.h2 variants={cardVariants} className="text-lg md:text-xl font-medium text-gray-400 mb-1">
            Central Connecticut State University
          </motion.h2>
          <motion.p variants={cardVariants} className="text-2xl md:text-3xl font-bold text-white mb-1 leading-snug">
            B.S. Computer Science, Cum Laude — 2024
          </motion.p>
          <motion.p variants={cardVariants} className="text-gray-400 text-sm md:text-base mb-6">
            GPA: 3.59
          </motion.p>
        </motion.div>

        {/* CS Courses */}
        <motion.div variants={cardVariants} className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-[#A673E7] flex items-center gap-2">
            <FaLaptopCode className="text-[#A673E7] w-5 h-5" /> Computer Science & Development
          </h3>
          <CourseList courses={csCourses} />
        </motion.div>

        {/* Math Courses */}
        {mathCourses.length > 0 && (
          <motion.div variants={cardVariants}>
            <h3 className="text-xl font-semibold mb-2 text-[#A673E7] flex items-center gap-2">
              <FaCalculator className="text-[#A673E7] w-5 h-5" /> Mathematics
            </h3>
            <CourseList courses={mathCourses} />
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
