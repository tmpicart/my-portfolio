"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import GlassCard from "@/components/glass-card";
import { spotlightEntrance, spotlightHover } from "@/lib/motion";
import type { Project } from "@/lib/projects";

type ProjectCardProps = Project & { size?: "small" | "medium" | "large" };

function ProjectCard({ title, summary, thumbnail, slug, size = "medium" }: ProjectCardProps) {
  const sizeStyles = {
    large: {
      cardPadding: "p-8",
      cardHeight: "h-[36rem]",
      imageHeight: "h-[24rem]",
      titleClass: "text-4xl",
      summaryClass: "text-lg",
      dividerClass: "w-24 sm:w-28",
    },
    medium: {
      cardPadding: "p-6",
      cardHeight: "h-[28rem]",
      imageHeight: "h-48",
      titleClass: "text-2xl",
      summaryClass: "text-base",
      dividerClass: "w-20",
    },
    small: {
      cardPadding: "p-6",
      cardHeight: "h-[24rem]",
      imageHeight: "h-40",
      titleClass: "text-2xl",
      summaryClass: "text-sm",
      dividerClass: "w-20",
    },
  }[size];
  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      <GlassCard
        variant="spotlight"
        className={`z-0 ${sizeStyles.cardPadding} ${sizeStyles.cardHeight}`}
        whileHover="hover"
        variants={spotlightHover}
      >
        <div className={`relative w-full overflow-hidden rounded-md ${sizeStyles.imageHeight}`}>
          <div className="flex items-center justify-center w-full h-full">
            <Image src={thumbnail} alt={title} width={1600} height={900} className="max-h-full max-w-full object-contain" />
          </div>
        </div>
        <h3 className={`${sizeStyles.titleClass} mt-3 font-bold text-white`}>
          {title}
        </h3>
        <div className={`my-3 h-0.5 rounded bg-gradient-to-r from-accent-vivid to-accent ${sizeStyles.dividerClass}`} />
        <p className={`${sizeStyles.summaryClass} text-gray-200`}>{summary}</p>
      </GlassCard>
    </Link>
  );
}

type ProjectGridProps = {
  featuredProject: Project;
  otherProjects: Project[];
};

// Client island (R8): cards inherit the page stagger's variant labels through
// the island boundary; the hover gesture needs the client runtime.
export default function ProjectGrid({ featuredProject, otherProjects }: ProjectGridProps) {
  return (
    <div className="w-full max-w-6xl">
      <motion.div key={featuredProject.slug} variants={spotlightEntrance} className="w-full">
        <ProjectCard {...featuredProject} size="large" />
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {otherProjects.map((project) => (
          <motion.div key={project.slug} variants={spotlightEntrance} className="h-full">
            <ProjectCard {...project} size="medium" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}