"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import EnlargedImageModal from "@/components/enlarged-image-modal";
import GalleryCarousel from "@/components/gallery-carousel";
import type { Project } from "@/lib/projects";

type ProjectDetailProps = {
  project: Project;
};

const pageVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
};

// Back link and title animate immediately rather than joining the stagger,
// matching the pre-R9 entrance exactly.
const backLinkInitial = { opacity: 0, x: -20 };
const backLinkAnimate = { opacity: 1, x: 0, transition: { duration: 0.36 } };
const titleInitial = { opacity: 0, y: -16 };
const titleAnimate = { opacity: 1, y: 0, transition: { duration: 0.45 } };

// The [slug] client island (R9): the server shell hands over a typed Project
// and this composition root owns the gallery/modal pair and the slide state
// they share (lifted here so either can drive the active slide).
export default function ProjectDetail({ project }: ProjectDetailProps) {
  const { title, description, screenshots, bullets, github } = project;
  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStartIndex, setModalStartIndex] = useState(0);

  const handleSlideChange = useCallback((index: number) => setActiveSlide(index), []);

  const openModal = useCallback((index: number) => {
    setModalStartIndex(index);
    setActiveSlide(index);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <motion.main
      className="relative flex w-full flex-1 flex-col items-center px-0 pt-16"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="w-full max-w-[1040px] px-6">
        <Link href="/projects">
          <motion.button
            initial={backLinkInitial}
            animate={backLinkAnimate}
            className="mb-6 rounded-md bg-surface-1 px-5 py-2 font-semibold shadow-md transition-colors duration-300 hover:bg-accent"
          >
            ← Back to Projects
          </motion.button>
        </Link>

        <motion.h1
          initial={titleInitial}
          animate={titleAnimate}
          className="mb-10 text-center text-4xl font-bold md:text-5xl"
        >
          {title}
        </motion.h1>

        <GalleryCarousel
          projectTitle={title}
          screenshots={screenshots}
          activeSlide={activeSlide}
          isModalOpen={isModalOpen}
          onSlideChange={handleSlideChange}
          onOpenModal={openModal}
        />

        <motion.div
          className="w-full mb-12 rounded-xl bg-surface-2 p-6 shadow-lg space-y-6"
          variants={sectionVariants}
        >
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed">{description}</p>

          <div className="flex flex-col md:flex-row md:gap-6 gap-4">
            {bullets.languages && (
              <div className="flex-1 bg-surface-3 p-4 rounded-lg shadow-inner">
                <h4 className="font-semibold text-accent mb-1">Languages</h4>
                <p>{bullets.languages.join(", ")}</p>
              </div>
            )}
            {bullets.frameworks && (
              <div className="flex-1 bg-surface-3 p-4 rounded-lg shadow-inner">
                <h4 className="font-semibold text-accent mb-1">Frameworks / Libraries</h4>
                <p>{bullets.frameworks.join(", ")}</p>
              </div>
            )}
          </div>

          {bullets.features && (
            <div>
              <h4 className="font-semibold text-accent mb-1">Features</h4>
              <ul className="list-disc ml-5 space-y-1">
                {bullets.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {github && github.trim() !== "" && (
          <motion.div className="mb-12 flex justify-center" variants={sectionVariants}>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-surface-1 px-6 py-3 font-semibold shadow-md transition-colors duration-300 hover:bg-accent hover:shadow-lg"
            >
              View on GitHub
            </a>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <EnlargedImageModal
            projectTitle={title}
            screenshots={screenshots}
            initialSlide={modalStartIndex}
            activeSlide={activeSlide}
            onSlideChange={handleSlideChange}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}