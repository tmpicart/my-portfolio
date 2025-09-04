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
    image: "/images/icons/Avatar.png",
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

const cardStyle = `
  flex h-full flex-col
  rounded-xl bg-[#40434E] p-6 shadow-lg
  cursor-pointer
`;

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1], delay: i * 0.1 },
  }),
};

const featuredProjectVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  hover: { scale: 1.05, y: -5, boxShadow: "0 8px 25px rgba(166,115,231,0.7)", transition: { type: "spring", stiffness: 300, damping: 20 } },
};

const gridProjectVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, rotate: -1.5 },
  visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 0.45 } },
  hover: { scale: 1.05, y: -5, boxShadow: "0 8px 25px rgba(166,115,231,0.7)", transition: { type: "spring", stiffness: 300, damping: 20 } },
};

type ProjectCardProps = Project & { index?: number };

function ProjectCard({ title, description, image, slug }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      <motion.div
        className={cardStyle}
        variants={gridProjectVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="relative h-48 w-full">
          <Image src={image} alt={title} fill className="rounded-md object-contain" />
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
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        custom={0}
        className="mb-8 text-center text-5xl font-bold"
      >
        My Projects
      </motion.h1>

      {featuredProject && (
        <div className="hidden md:block w-full max-w-5xl mb-8">
          <Link href={`/projects/${featuredProject.slug}`} className="block">
            <motion.div className={`${cardStyle} p-8`} variants={featuredProjectVariants} initial="hidden" animate="visible" whileHover="hover">
              <div className="relative flex h-[28rem] w-full items-center justify-center">
                <Image src={featuredProject.image} alt={featuredProject.title} fill className="rounded-md object-contain" />
              </div>
              <h2 className="mt-4 text-4xl font-bold">{featuredProject.title}</h2>
              <p className="mt-2 text-lg text-gray-200">{featuredProject.description}</p>
            </motion.div>
          </Link>
        </div>
      )}

      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredProject && (
          <div className="block md:hidden">
            <ProjectCard {...featuredProject} />
          </div>
        )}

        {otherProjects.map((project, i) => (
          <motion.div key={project.slug} variants={titleVariants} custom={i + 1} initial="hidden" animate="visible">
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}
