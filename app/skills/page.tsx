"use client";

import { FaJava } from "react-icons/fa";
import {
  SiPython,
  SiC,
  SiJavascript,
  SiGodotengine,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiFastapi,
  SiDjango,
  SiTailwindcss,
  SiBootstrap,
  SiMysql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiSlack,
  SiNotion,
  SiAmazon,
  SiJira,
} from "react-icons/si";
import { motion, Variants } from "framer-motion";
import { JSX } from "react";

type Skill = {
  name: string;
  icon: JSX.Element;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: <SiPython className="text-blue-500" /> },
      { name: "Java", icon: <FaJava className="text-red-600" /> },
      { name: "C", icon: <SiC className="text-gray-600" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
      { name: "GDScript", icon: <SiGodotengine className="text-blue-400" /> },
    ],
  },
  {
    title: "Styling & Markup",
    skills: [
      { name: "HTML", icon: <SiHtml5 className="text-orange-500" /> },
      { name: "CSS", icon: <SiCss3 className="text-blue-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
      { name: "Bootstrap", icon: <SiBootstrap className="text-purple-600" /> },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" /> },
      { name: "FastAPI", icon: <SiFastapi className="text-green-500" /> },
      { name: "Django", icon: <SiDjango className="text-green-700" /> },
    ],
  },
  {
    title: "Databases & Cloud",
    skills: [
      { name: "SQL", icon: <SiMysql className="text-blue-600" /> },
      { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
      { name: "AWS", icon: <SiAmazon className="text-orange-500" /> },
    ],
  },
  {
    title: "Tools & Collaboration",
    skills: [
      { name: "Agile", icon: <SiJira className="text-blue-500" /> },
      { name: "Git", icon: <SiGit className="text-red-500" /> },
      { name: "GitHub", icon: <SiGithub className="text-gray-800 dark:text-white" /> },
      { name: "Slack", icon: <SiSlack className="text-purple-500" /> },
      { name: "Notion", icon: <SiNotion className="text-black dark:text-white" /> },
    ],
  },
];

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
  "flex h-28 w-28 flex-col items-center justify-center rounded-2xl bg-[#40434E] p-4 shadow-lg transition-all duration-300";

export default function SkillsPage() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      className="flex min-h-screen flex-col items-center bg-[#070707] px-4 py-16 text-white"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-12 text-center text-5xl font-bold"
      >
        Skills
      </motion.h1>

      <div className="flex w-full flex-col gap-12">
        {skillCategories.map((category) => (
          <motion.section
            key={category.title}
            variants={rowVariants}
            className="flex flex-col items-center gap-4"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: -15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.25 },
                },
              }}
              className="text-center text-3xl font-semibold text-[#A673E7]"
            >
              {category.title}
            </motion.h2>

            <motion.div
              className="inline-flex flex-wrap justify-center gap-6 rounded-2xl bg-[#2F2F39] p-4"
              variants={rowVariants}
            >
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={cardVariants}
                  className={skillCardClasses}
                >
                  <div className="mb-2 text-5xl">{skill.icon}</div>
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
