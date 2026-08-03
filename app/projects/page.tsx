"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

type Project = {
  title: string;
  description: string;
  image: string;
  slug: string;
};

type PageMeta = {
  eyebrow: string;
  title: string;
};

const pageMeta: PageMeta = {
  eyebrow: "Project Hub",
  title: "Projects",
};

const projects: Project[] = [
  {
    title: "Medical Codex Translation Tool",
    description:
      "A web-based tool designed to translate medical terminology from language to language for better accessibility.",
    image: "/images/codex/codex_1.png",
    slug: "medical-codex",
  },
  {
    title: "John Dungeon",
    description:
      "A top-down dungeon crawler inspired by classic Zelda and old school fantasy games.",
    image: "/images/john/John_5.png",
    slug: "john-dungeon",
  },
  {
    title: "TicketMaster Search Mobile",
    description: "A mobile app built to search for events and tickets via the TicketMaster API.",
    image: "/images/ticketmaster/TicketMaster_1.png",
    slug: "ticketmaster-search",
  },
  {
    title: "Portfolio Website",
    description: "Learn more about the portfolio site you are currently visiting!",
    image: "/images/icons/code_img.jpg",
    slug: "portfolio-website",
  },
];

const cardStyle = `
  group relative flex flex-col overflow-hidden rounded-[36px] border border-white/[0.12]
  bg-white/[0.08] p-6 backdrop-blur-2xl
  ring-1 ring-white/[0.05] transition-all duration-300 ease-out
`;

const projectVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1.01,
    transition: { type: "spring", stiffness: 160, damping: 22, delay: 0.06 + i * 0.06 },
  }),
};

const imageClasses = "object-cover transition duration-500 ease-out";

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

function ProjectCard({ title, description, image, slug, size = "medium" }: ProjectCardProps) {
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
      <motion.div
        style={{ zIndex: 0 }}
        className={`${cardStyle} ${sizeStyles.cardPadding} ${sizeStyles.cardHeight}`}
        variants={projectVariants}
        initial="hidden"
        animate="visible"
        whileHover={hoverAnimation}
      >
        <div className={`relative w-full overflow-hidden rounded-md ${sizeStyles.imageHeight}`}>
          <div className="flex items-center justify-center w-full h-full">
            <Image src={image} alt={title} width={1600} height={900} className="max-h-full max-w-full object-contain" />
          </div>
        </div>
        <h3 className={`${sizeStyles.titleClass} mt-3 font-bold text-white`}>
          {title}
        </h3>
        <div className={`my-3 h-0.5 rounded bg-gradient-to-r from-[#7C4DFF] to-[#A673E7] ${sizeStyles.dividerClass}`} />
        <p className={`${sizeStyles.descClass} text-gray-200`}>{description}</p>
      </motion.div>
    </Link>
  );
}

export default function ProjectsPage() {
  const featuredProject = projects.find((p) => p.slug === "medical-codex");
  const otherProjects = projects.filter((p) => p.slug !== "medical-codex");

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden rounded-[44px] border border-white/[0.04] bg-[radial-gradient(circle_at_top_left,_rgba(166,115,231,0.16)_0%,_rgba(166,115,231,0.06)_35%,_rgba(18,18,20,0.98)_70%),linear-gradient(180deg,_#0b0b0d_0%,_#0b0b0d_100%)] px-6 pt-6 pb-12 mt-8 sm:mt-10 lg:mt-12 text-white sm:px-8 lg:px-14">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8 text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#B8A6FF]">
          {pageMeta.eyebrow}
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl text-white tracking-tight">
          {pageMeta.title}
        </h1>
      </motion.div>

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
    </main>
  );
}
