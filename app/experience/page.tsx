"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string[];
  logo: string;
  link?: string;
};

const experiences: Experience[] = [
  {
    company: "Grey-box",
    role: "Software Engineer Intern",
    duration: "Aug 2024 – Dec 2024",
    description: [
      "Developed a responsive, mobile-friendly web app for translating medication names into multiple languages.",
      "Migrated the project to Next.js, TypeScript, and Tailwind CSS, improving maintainability and scalability.",
      "Integrated AI-driven translation with Gemini API and Levenshtein fuzzy matching for accuracy.",
      "Collaborated effectively in Agile using Slack and Notion, streamlining workflows and delivery.",
    ],
    logo: "/images/icons/greyboxproject_logo.png",
  },
  {
    company: "Berlin Lions Club",
    role: "Software Engineer Intern",
    duration: "Jan 2024 – May 2024",
    description: [
      "Revamped the user registration and event management system for the Berlin Fair, used by 80,000+ individuals.",
      "Modernized authentication by merging redundant SQL databases and implementing identity management.",
      "Strengthened security with SHA-256 hashing for credentials.",
      "Fixed critical bugs, improving overall system functionality and user experience.",
    ],
    logo: "/images/icons/berlin-logo.jpg",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -50, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
  }),
};

export default function ExperiencePage() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#070707] via-[#101010] to-[#1a1a1a] px-4 py-16 text-white"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-5xl font-bold"
      >
        Work Experience
      </motion.h1>

      {/* Experience List */}
      <div className="flex w-full max-w-4xl flex-col gap-12">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.company}
            custom={index}
            variants={cardVariants}
            className="flex flex-col items-center gap-8 rounded-2xl bg-[#40434E] p-8 shadow-lg shadow-black/25 transition-all duration-300 md:flex-row md:p-10"
          >
            {/* Logo */}
            <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2c2f36]">
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
             
              {/* Company */}
              <h2 className="mb-1 text-2xl font-bold md:text-3xl">{experience.company}</h2>

              {/* Role & Duration */}
              <p className="mb-2 text-lg">
                <span className="font-semibold text-[#A673E7]">{experience.role}</span>
                <span className="ml-2 text-gray-300">• {experience.duration}</span>
              </p>

              {/* Description */}
              <ul className="mt-2 list-inside list-disc space-y-2 text-base leading-relaxed text-gray-300">
                {experience.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
