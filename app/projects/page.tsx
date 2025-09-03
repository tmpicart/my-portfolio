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

const projects: Project[] = [
  {
    title: "Medical Codex Translation Tool",
    description:
      "A web-based tool designed to translate medical terminology from language to language for better accessibility.",
    image: "/images/codex/codex_1.png",
    slug: "medical-codex",
  },
  {
    title: "TicketMaster Search Mobile",
    description: "A mobile app built to search for events and tickets via the TicketMaster API.",
    image: "/images/ticketmaster/TicketMaster_1.png",
    slug: "ticketmaster-search",
  },
  {
    title: "Portfolio Website",
    description:
      "Learn more about the portfolio site you are currently visiting!",
    image: "/portfolio.png",
    slug: "portfolio-website",
  },
  {
    title: "John Dungeon",
    description:
      "A top-down dungeon crawler inspired by classic Zelda and old school fantasy games.",
    image: "/images/john/John_5.png",
    slug: "john-dungeon",
  },
];

// Shared styling
const cardStyle = `
  flex h-full flex-col
  rounded-xl bg-[#40434E] p-6 shadow-lg
  cursor-pointer
`;

// Title animation
const titleInitial = { opacity: 0, y: -20, scale: 0.95 };
const titleAnimate = { opacity: 1, y: 0, scale: 1 };

// Featured project animation
const featuredProjectVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
  },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0 10px 35px rgba(166,115,231,0.8)",
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
};

// Grid project animation
const gridProjectVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, rotate: -1.5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.45,
      delay: 0.1 + i * 0.08, // stagger
      ease: [0.25, 0.8, 0.25, 1],
    },
  }),
  hover: {
    scale: 1.05,
    y: -5,
    boxShadow: "0 8px 25px rgba(166,115,231,0.7)",
    transition: { type: "spring", stiffness: 250, damping: 15 },
  },
};

type ProjectCardProps = Project & { index: number };

function ProjectCard({ title, description, image, slug, index }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      <motion.div
        className={cardStyle}
        variants={gridProjectVariants}
        custom={index}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-md object-contain"
          />
        </div>
        <h3 className="mt-4 text-2xl font-bold">{title}</h3>
        <p className="mt-2 flex-grow text-gray-200">{description}</p>
      </motion.div>
    </Link>
  );
}

export default function ProjectsPage() {
  const featuredProject = projects.find((p) => p.slug === "john-dungeon");
  const otherProjects = projects.filter((p) => p.slug !== "john-dungeon");

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#070707] px-4 pt-8 text-white">
      {/* Page Title */}
      <motion.h1
        initial={titleInitial}
        animate={titleAnimate}
        transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
        className="mb-8 text-center text-5xl font-bold"
      >
        My Projects
      </motion.h1>

      {/* Featured Project */}
      {featuredProject && (
        <Link
          href={`/projects/${featuredProject.slug}`}
          className="mb-12 w-full max-w-5xl"
        >
          <motion.div
            className={`${cardStyle} p-8`}
            variants={featuredProjectVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="relative flex h-[28rem] w-full items-center justify-center">
              <Image
                src={featuredProject.image}
                alt={featuredProject.title}
                fill
                className="rounded-md object-contain"
              />
            </div>
            <h2 className="mt-4 text-4xl font-bold">{featuredProject.title}</h2>
            <p className="mt-2 text-lg text-gray-200">
              {featuredProject.description}
            </p>
          </motion.div>
        </Link>
      )}

      {/* Other Projects */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {otherProjects.map((project, index) => (
          <ProjectCard key={project.slug} index={index} {...project} />
        ))}
      </div>
    </main>
  );
}
