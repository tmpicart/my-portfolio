"use client";

import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, use, useCallback } from "react";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { motion, Variants } from "framer-motion";
import CarouselArrows from "@/components/carousel-arrows";
import { projects } from "@/lib/projects";

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSlide, setModalSlide] = useState(0);
  const [modalEmblaRef, modalEmblaApi] = useEmblaCarousel({ loop: true });

  const openModal = useCallback((index: number) => {
    setModalSlide(index);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Track active slide
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // Keep main carousel in sync with modal.
  // R9 (modal/carousel restructure) replaces this effect-sync design entirely.
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(modalSlide, true);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- R9
    setCurrentSlide(modalSlide);
  }, [modalSlide, emblaApi]);

  // Propagate modal swipes to state
  useEffect(() => {
    if (!modalEmblaApi) return;
    const onSelect = () => setModalSlide(modalEmblaApi.selectedScrollSnap());
    modalEmblaApi.on("select", onSelect);
    return () => { modalEmblaApi.off("select", onSelect); };
  }, [modalEmblaApi]);

  // Jump to correct slide when modal opens
  useEffect(() => {
    if (!modalEmblaApi || !isModalOpen) return;
    modalEmblaApi.scrollTo(modalSlide, true);
    // R9: intentional until the carousel/modal effects are redesigned
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, modalEmblaApi]);

  const scrollModalTo = useCallback(
    (index: number) => modalEmblaApi?.scrollTo(index),
    [modalEmblaApi]
  );

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas text-white">
      <motion.main
        className="relative flex w-full flex-1 flex-col items-center px-0 pt-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-[1040px] px-6">

          {/* Back button */}
          <motion.button
            onClick={() => router.push("/projects")}
            className="mb-6 rounded-md bg-surface-1 px-5 py-2 font-semibold shadow-md transition-colors duration-300 hover:bg-accent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.36 } }}
          >
            ← Back to Projects
          </motion.button>

          {/* Title */}
          <motion.h1
            className="mb-10 text-center text-4xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45 } }}
          >
            {project.title}
          </motion.h1>

          {/* Main carousel */}
          <motion.div
            className="relative mb-10 w-full rounded-2xl bg-surface-2 px-6 py-6 shadow-lg"
            variants={cardVariants}
          >
            <CarouselArrows
              size="large"
              onPrevious={() => emblaApi?.scrollPrev()}
              onNext={() => emblaApi?.scrollNext()}
              previousLabel="Previous slide"
              nextLabel="Next slide"
            />

            <div className="overflow-hidden" ref={emblaRef} style={{ maxHeight: 480 }}>
              <div className="flex select-none">
                {project.images.map((src, index) => (
                  <div
                    key={index}
                    className="relative group flex flex-[0_0_100%] items-center justify-center overflow-hidden rounded-lg cursor-zoom-in"
                    style={{ minHeight: 380 }}
                    onClick={() => openModal(index)}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={900}
                      height={480}
                      className="max-h-[480px] max-w-full rounded-md object-contain"
                      priority={index === 0}
                      style={{ backgroundColor: "#2a2a3a" }}
                    />

                    {/* Hover tint */}
                    <div className="absolute inset-0 rounded-md bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover info */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                      {project.captions[index] && (
                        <div className="max-w-[60%] text-gray-200 space-y-1">
                          <h3 className="font-bold text-2xl">{project.captions[index].title}</h3>
                          {project.captions[index].lines.map((line) => (
                            <p key={line} className="ml-3 text-xl">{line}</p>
                          ))}
                        </div>
                      )}
                      <div className="self-end flex items-center gap-2 rounded-md bg-surface-1 px-4 py-2 text-base font-semibold text-white shadow-md pointer-events-auto">
                        <HiOutlineArrowsExpand className="h-6 w-6" /> Enlarge Image
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-3">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-4 w-4 rounded-full transition-colors duration-200 ${
                    index === currentSlide ? "bg-white" : "bg-accent/40 hover:bg-accent/80"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
          </motion.div>

          {/* Project overview */}
          <motion.div
            className="w-full mb-12 rounded-xl bg-surface-2 p-6 shadow-lg space-y-6"
            variants={cardVariants}
          >
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed">{project.description}</p>

            <div className="flex flex-col md:flex-row md:gap-6 gap-4">
              {project.bullets.languages && (
                <div className="flex-1 bg-surface-3 p-4 rounded-lg shadow-inner">
                  <h4 className="font-semibold text-accent mb-1">Languages</h4>
                  <p>{project.bullets.languages.join(", ")}</p>
                </div>
              )}
              {project.bullets.frameworks && (
                <div className="flex-1 bg-surface-3 p-4 rounded-lg shadow-inner">
                  <h4 className="font-semibold text-accent mb-1">Frameworks / Libraries</h4>
                  <p>{project.bullets.frameworks.join(", ")}</p>
                </div>
              )}
            </div>

            {project.bullets.features && (
              <div>
                <h4 className="font-semibold text-accent mb-1">Features</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {project.bullets.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* GitHub link */}
          {project.github && project.github.trim() !== "" && (
            <motion.div className="mb-12 flex justify-center" variants={cardVariants}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-surface-1 px-6 py-3 font-semibold shadow-md transition-colors duration-300 hover:bg-accent hover:shadow-lg"
              >
                View on GitHub
              </a>
            </motion.div>
          )}
        </div>

        {/* Enlarged image modal */}
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <div
              className="relative flex flex-col w-full max-w-[90vw] max-h-[90vh] rounded-xl overflow-hidden shadow-xl bg-surface-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">

                {/* Modal carousel */}
                <div className="relative flex-grow flex flex-col min-w-0">

                  <CarouselArrows
                    size="medium"
                    onPrevious={() => modalEmblaApi?.scrollPrev()}
                    onNext={() => modalEmblaApi?.scrollNext()}
                    previousLabel="Previous image"
                    nextLabel="Next image"
                  />

                  <div className="overflow-hidden flex-1" ref={modalEmblaRef}>
                    <div className="flex h-full">
                      {project.images.map((src, index) => (
                        <div
                          key={index}
                          className="flex-[0_0_100%] flex items-center justify-center p-3 md:p-6"
                        >
                          <Image
                            src={src}
                            alt={`${project.title} screenshot ${index + 1}`}
                            width={1600}
                            height={1200}
                            className="object-contain max-h-[55vh] md:max-h-[75vh] max-w-full"
                            unoptimized
                            priority={index === modalSlide}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dots */}
                  <div className="flex justify-center gap-2 py-3">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        aria-label={`Go to image ${index + 1}`}
                        onClick={() => scrollModalTo(index)}
                        className={`rounded-full transition-all duration-200 ${
                          index === modalSlide ? "h-3 w-3 bg-white" : "h-2.5 w-2.5 bg-accent/40 hover:bg-accent/80"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Info panel */}
                {project.captions[modalSlide] && (
                  <div className="w-full md:w-1/4 md:flex-shrink-0 overflow-y-auto p-4 bg-surface-3 text-gray-200 space-y-2">
                    <h3 className="text-2xl font-bold">{project.captions[modalSlide].title}</h3>
                    {project.captions[modalSlide].lines.map((line) => (
                      <p key={line} className="md:ml-2 text-xl">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}