"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

import GlassCard from "@/components/glass-card";
import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import { projects, type Project } from "@/lib/projects";

const projectVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1.01,
    transition: { type: "spring", stiffness: 160, damping: 22, delay: 0.06 + i * 0.06 },
  }),
};

const hoverAnimation = {
  scale: 1.04,
  rotate: 0.25,
  y: 0,
  zIndex: 50,
  backgroundColor: "rgba(166,115,231,0.22)",
  borderColor: "rgba(166,115,231,0.55)",
  transition: { type: "spring" as const, stiffness: 180, damping: 16 },
};

type ProjectCardProps = Project & { size?: "small" | "medium" | "large" };

function ProjectCard({ title, summary, thumbnail, slug, size = "medium" }: ProjectCardProps) {
  const sizeStyles = {
    large: {
      cardPadding: "p-8",
      cardHeight: "h-[36rem]",
      imageHeight: "h-[24rem]",
      titleClass: "text-4xl",
      descClass: "text-lg",
      dividerClass: "w-24 sm:w-28",
    },
    medium: {
      cardPadding: "p-6",
      cardHeight: "h-[28rem]",
      imageHeight: "h-48",
      titleClass: "text-2xl",
      descClass: "text-base",
      dividerClass: "w-20",
    },
    small: {
      cardPadding: "p-6",
      cardHeight: "h-[24rem]",
      imageHeight: "h-40",
      titleClass: "text-2xl",
      descClass: "text-sm",
      dividerClass: "w-20",
    },
  }[size];
  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      <GlassCard
        variant="spotlight"
        style={{ zIndex: 0 }}
        className={`${sizeStyles.cardPadding} ${sizeStyles.cardHeight}`}
        variants={projectVariants}
        initial="hidden"
        animate="visible"
        whileHover={hoverAnimation}
      >
        <div className={`relative w-full overflow-hidden rounded-md ${sizeStyles.imageHeight}`}>
          <div className="flex items-center justify-center w-full h-full">
            <Image src={thumbnail} alt={title} width={1600} height={900} className="max-h-full max-w-full object-contain" />
          </div>
        </div>
        <h3 className={`${sizeStyles.titleClass} mt-3 font-bold text-white`}>
          {title}
        </h3>
        <div className={`my-3 h-0.5 rounded bg-gradient-to-r from-[#7C4DFF] to-[#A673E7] ${sizeStyles.dividerClass}`} />
        <p className={`${sizeStyles.descClass} text-gray-200`}>{summary}</p>
      </GlassCard>
    </Link>
  );
}

export default function ProjectsPage() {
  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <PageShell>
      <PageHeader eyebrow="Project Hub" title="Projects" />

      <div className="w-full max-w-6xl">
        {featuredProject && (
          <motion.div
            key={featuredProject.slug}
            variants={projectVariants}
            custom={0}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <ProjectCard {...featuredProject} size="large" />
          </motion.div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {otherProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              variants={projectVariants}
              custom={i + 1}
              initial="hidden"
              animate="visible"
              className="h-full"
            >
              <ProjectCard {...project} size="medium" />
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
