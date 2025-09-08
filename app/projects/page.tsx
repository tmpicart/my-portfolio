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
    description: "Learn more about the portfolio site you are currently visiting!",
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
  overflow-hidden
`;

const projectVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.8, 0.25, 1] },
  }),
  hover: {
    scale: 1.05,
    y: -5,
    boxShadow: "0 8px 25px rgba(166,115,231,0.9)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

type ProjectCardProps = Project & { large?: boolean };

function ProjectCard({ title, description, image, slug, large }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      <motion.div
        className={`${cardStyle} ${large ? "p-8 h-[28rem]" : "p-6 h-48"}`}
        variants={projectVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className={`relative w-full ${large ? "h-[28rem]" : "h-48"} rounded-md overflow-hidden`}>
          <Image
            src={image}
            alt={title}
            fill
            className={large ? "object-contain" : "object-contain"}
          />
        </div>
        <h3 className={`${large ? "mt-4 text-4xl" : "mt-4 text-2xl"} font-bold text-white`}>
          {title}
        </h3>
        <p className={`${large ? "mt-2 text-lg" : "mt-2 text-gray-200"} text-gray-200 flex-grow`}>
          {description}
        </p>
      </motion.div>
    </Link>
  );
}

export default function ProjectsPage() {
  const featuredProject = projects.find((p) => p.slug === "john-dungeon");
  const otherProjects = projects.filter((p) => p.slug !== "john-dungeon");

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#070707] px-4 pt-8 text-white">
      
      {/* Title */}
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={projectVariants}
        custom={0}
        className="mb-8 text-center text-5xl font-bold"
      >
        My Projects
      </motion.h1>

      {/* Featured Project */}
      {featuredProject && (
        <div className="hidden md:block w-full max-w-5xl mb-8">
          <ProjectCard {...featuredProject} large />
        </div>
      )}

      {/* Other Projects */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Featured project as normal card on small screens */}
        {featuredProject && (
          <div className="block md:hidden">
            <ProjectCard {...featuredProject} />
          </div>
        )}

        {otherProjects.map((project, i) => (
          <motion.div
            key={project.slug}
            variants={projectVariants}
            custom={i + 1}
            initial="hidden"
            animate="visible"
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}
