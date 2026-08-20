"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

import { experiences } from "@/lib/experience";

type PageMeta = {
  eyebrow: string;
  title: string;
};

const pageMeta: PageMeta = {
  eyebrow: "Career Timeline",
  title: "Work Experience",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -32, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.12 },
  }),
};

const cardBaseClasses = `
  group relative flex flex-col items-center gap-10
  rounded-[32px] border border-white/15 bg-white/10
  p-10 backdrop-blur-xl
  transition-all duration-300 ease-out
  md:flex-row md:p-10
`;

export default function ExperiencePage() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      className="relative flex min-h-screen flex-col items-center overflow-hidden rounded-[44px] border border-white/[0.04] bg-[radial-gradient(circle_at_top_left,_rgba(166,115,231,0.16)_0%,_rgba(166,115,231,0.06)_35%,_rgba(18,18,20,0.98)_70%),linear-gradient(180deg,_#0b0b0d_0%,_#0b0b0d_100%)] px-6 pt-6 pb-12 mt-8 sm:mt-10 lg:mt-12 text-white sm:px-8 lg:px-14"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-12 text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#D7BFFF]">
          {pageMeta.eyebrow}
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">{pageMeta.title}</h1>
      </motion.div>

      {/* Experience List */}
      <div className="relative flex w-full max-w-4xl flex-col gap-10">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.company}
            custom={index}
            variants={cardVariants}
            className={cardBaseClasses}
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#A673E7]/70 to-transparent" />

            {/* Logo */}
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
                <span className="rounded-full border border-white/10 bg-[#A673E7]/10 px-3 py-1 text-sm font-medium text-[#D7BFFF]">
                  {experience.duration}
                </span>
              </div>

              {/* Company */}
              <h2 className="mb-1 text-2xl font-bold md:text-3xl">{experience.company}</h2>

              {/* Role */}
              <p className="mb-3 text-lg text-gray-100">
                <span className="font-semibold text-[#A673E7]">{experience.role}</span>
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#D7BFFF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <ul className="mt-2 space-y-3 text-base leading-relaxed text-gray-300">
                {experience.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#A673E7]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
