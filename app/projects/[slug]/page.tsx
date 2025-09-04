"use client";

import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, use } from "react";
import { HiOutlineArrowsExpand, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion, Variants } from "framer-motion";
import { projects } from "@/app/lib/projects";

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSlide, setModalSlide] = useState(0);

  const openModal = (index: number) => {
    setModalSlide(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(modalSlide, true);
    setCurrentSlide(modalSlide);
  }, [modalSlide, emblaApi]);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#070707] text-white">
      <motion.main
        className="relative flex w-full flex-1 flex-col items-center px-0 pt-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-[1040px] px-6">
          {/* Back Button */}
          <motion.button
            onClick={() => router.push("/projects")}
            className="mb-6 rounded-md bg-[#40434E] px-5 py-2 font-semibold shadow-md transition-colors duration-300 hover:bg-[#A673E7]"
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

          {/* Carousel */}
          <motion.div
            className="relative mb-10 w-full rounded-2xl bg-[#1F1E2E] px-6 py-6 shadow-lg"
            variants={cardVariants}
          >
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#40434E] p-4 text-white shadow-lg transition-shadow duration-300 hover:bg-[#A673E7]"
              aria-label="Previous slide"
            >
              <HiChevronLeft className="h-7 w-7" />
            </button>

            <div className="overflow-hidden" ref={emblaRef} style={{ maxHeight: 480 }}>
              <div className="flex select-none">
                {project.images.map((src, index) => (
                  <motion.div
                    key={index}
                    className="relative group flex flex-[0_0_100%] items-center justify-center overflow-hidden rounded-lg cursor-zoom-in"
                    style={{ minHeight: 380 }}
                    variants={cardVariants}
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
                    <div className="absolute inset-0 rounded-md bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {project.imageInfos?.[index] && (
                      <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                        <div className="max-w-[60%] text-gray-200 space-y-1">
                          {project.imageInfos[index].map((line, i) =>
                            i === 0 ? (
                              <h3 key={i} className="font-bold text-lg">{line}</h3>
                            ) : (
                              <p key={i} className="ml-3">{line}</p>
                            )
                          )}
                        </div>
                        <div className="self-end flex items-center gap-2 rounded-md bg-[#40434E] px-4 py-2 text-base font-semibold text-white shadow-md pointer-events-auto">
                          <HiOutlineArrowsExpand className="h-6 w-6" /> Enlarge Image
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#40434E] p-4 text-white shadow-lg transition-shadow duration-300 hover:bg-[#A673E7]"
              aria-label="Next slide"
            >
              <HiChevronRight className="h-7 w-7" />
            </button>

            {/* Carousel Dots */}
            <motion.div className="mt-6 flex justify-center gap-3">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-4 w-4 rounded-full transition-colors duration-200 ${
                    index === currentSlide ? "bg-white" : "bg-[#A673E7]/40 hover:bg-[#A673E7]/80"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Project Overview Panel */}
          <motion.div
            className="w-full mb-12 rounded-xl bg-[#1F1E2E] p-6 shadow-lg space-y-6"
            variants={cardVariants}
          >
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed">{project.description}</p>

            <div className="flex flex-col md:flex-row md:gap-6 gap-4">
              {project.bullets.languages && (
                <div className="flex-1 bg-[#272636] p-4 rounded-lg shadow-inner">
                  <h4 className="font-semibold text-[#A673E7] mb-1">Languages</h4>
                  <p>{project.bullets.languages.join(", ")}</p>
                </div>
              )}
              {project.bullets.frameworks && (
                <div className="flex-1 bg-[#272636] p-4 rounded-lg shadow-inner">
                  <h4 className="font-semibold text-[#A673E7] mb-1">Frameworks / Libraries</h4>
                  <p>{project.bullets.frameworks.join(", ")}</p>
                </div>
              )}
            </div>

            {project.bullets.features && (
              <div>
                <h4 className="font-semibold text-[#A673E7] mb-1">Features</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {project.bullets.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {project.github && project.github.trim() !== "" && (
            <motion.div
              className="mb-12 flex justify-center"
              variants={cardVariants}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#40434E] px-6 py-3 font-semibold shadow-md transition-colors duration-300 hover:bg-[#A673E7] hover:shadow-lg"
              >
                View on GitHub
              </a>
            </motion.div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Mobile arrows below the card */}
            <div className="absolute bottom-4 flex w-full justify-center gap-6 md:hidden z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalSlide((modalSlide - 1 + project.images.length) % project.images.length);
                }}
                className="rounded-full bg-[#40434E] p-3 text-white shadow-lg hover:bg-[#A673E7]"
              >
                <HiChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalSlide((modalSlide + 1) % project.images.length);
                }}
                className="rounded-full bg-[#40434E] p-3 text-white shadow-lg hover:bg-[#A673E7]"
              >
                <HiChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Desktop arrows on the sides */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalSlide((modalSlide - 1 + project.images.length) % project.images.length);
              }}
              className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-[#40434E] p-3 text-white shadow-lg hover:bg-[#A673E7] z-50"
            >
              <HiChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalSlide((modalSlide + 1) % project.images.length);
              }}
              className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[#40434E] p-3 text-white shadow-lg hover:bg-[#A673E7] z-50"
            >
              <HiChevronRight className="h-6 w-6" />
            </button>

            {/* Modal content */}
            <div
              className="relative flex flex-col md:flex-row max-w-[90vw] max-h-[90vh] rounded-xl overflow-hidden shadow-xl bg-[#1C1B29]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="flex-grow flex items-center justify-center p-2 md:p-6">
                <Image
                  src={project.images[modalSlide]}
                  alt="Enlarged image"
                  width={1600}
                  height={1200}
                  className="object-contain max-h-[60vh] md:max-h-[90vh] max-w-full"
                  unoptimized
                  priority
                  key={modalSlide}
                />
              </div>

              {/* Info panel */}
              {project.imageInfos?.[modalSlide] && (
                <div className="w-full md:w-1/4 overflow-y-auto p-4 bg-[#272636] text-gray-200 space-y-2 md:flex-shrink-0">
                  {project.imageInfos[modalSlide].map((line, i) =>
                    i === 0 ? (
                      <h3 key={i} className="text-xl font-bold">{line}</h3>
                    ) : (
                      <p key={i} className="ml-0 md:ml-2 text-sm">{line}</p>
                    )
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}
