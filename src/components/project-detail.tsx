"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { HiOutlineArrowsExpand, HiX } from "react-icons/hi";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import CarouselArrows from "@/components/carousel-arrows";
import CarouselDots from "@/components/carousel-dots";
import type { Project, ProjectScreenshot } from "@/lib/projects";

type ProjectDetailProps = {
  project: Project;
};

type GalleryCarouselProps = {
  projectTitle: string;
  screenshots: ProjectScreenshot[];
  activeSlide: number;
  isModalOpen: boolean;
  onSlideChange: (index: number) => void;
  onOpenModal: (index: number) => void;
};

type EnlargedImageModalProps = {
  projectTitle: string;
  screenshots: ProjectScreenshot[];
  /** Slide the modal mounted on — captured at open so embla never re-inits. */
  initialSlide: number;
  activeSlide: number;
  onSlideChange: (index: number) => void;
  onClose: () => void;
};

// Matches home's carousel rhythm (R8) so autoplay feels consistent site-wide.
const AUTOPLAY_DELAY_MS = 4500;

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

// Focus-trap candidates inside the modal dialog.
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function GalleryCarousel({
  projectTitle,
  screenshots,
  activeSlide,
  isModalOpen,
  onSlideChange,
  onOpenModal,
}: GalleryCarouselProps) {
  // useMemo (not embla's documented useRef pattern) because the React Compiler
  // lint rules forbid reading refs during render when passing the plugin to
  // useEmblaCarousel. A stable instance also avoids carousel re-inits.
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: AUTOPLAY_DELAY_MS,
        // A user swipe shouldn't permanently kill autoplay.
        stopOnInteraction: false,
      }),
    []
  );
  const [mainCarouselRef, mainCarouselApi] = useEmblaCarousel(
    { loop: true },
    [autoplay]
  );
  const [isAutoplaySuspended, setIsAutoplaySuspended] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wasModalOpenRef = useRef(false);

  useEffect(() => {
    if (!mainCarouselApi) return;
    const onSelect = () => onSlideChange(mainCarouselApi.selectedScrollSnap());
    mainCarouselApi.on("select", onSelect);
    return () => {
      mainCarouselApi.off("select", onSelect);
    };
  }, [mainCarouselApi, onSlideChange]);

  // One gate for autoplay: suspended while the user hovers/focuses the
  // carousel (wrapper-level so the overlay arrows count too — see R8) or while
  // the modal covers it. play() takes NO argument — its boolean form is a jump
  // override that would make every tick snap instead of slide.
  const isAutoplayRunning = !isAutoplaySuspended && !isModalOpen;
  useEffect(() => {
    if (isAutoplayRunning) autoplay.play();
    else autoplay.stop();
  }, [isAutoplayRunning, autoplay]);

  // When the modal closes, land on the slide the user last viewed and return
  // focus there. While the modal is open the main carousel stays put behind
  // the overlay — syncing live was the effect-driven design R9 replaced.
  useEffect(() => {
    if (wasModalOpenRef.current && !isModalOpen) {
      mainCarouselApi?.scrollTo(activeSlide, true);
      slideRefs.current[activeSlide]?.focus();
    }
    wasModalOpenRef.current = isModalOpen;
  }, [isModalOpen, activeSlide, mainCarouselApi]);

  const suspendAutoplay = useCallback(() => setIsAutoplaySuspended(true), []);
  const resumeAutoplay = useCallback(() => setIsAutoplaySuspended(false), []);

  return (
    <motion.div
      variants={sectionVariants}
      className="relative mb-10 w-full rounded-2xl bg-surface-2 px-6 py-6 shadow-lg"
      onMouseEnter={suspendAutoplay}
      onMouseLeave={resumeAutoplay}
      onFocus={suspendAutoplay}
      onBlur={resumeAutoplay}
    >
      <CarouselArrows
        size="large"
        onPrevious={() => mainCarouselApi?.scrollPrev()}
        onNext={() => mainCarouselApi?.scrollNext()}
        previousLabel="Previous slide"
        nextLabel="Next slide"
      />

      <div className="max-h-[480px] overflow-hidden" ref={mainCarouselRef}>
        <div className="flex select-none">
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`Enlarge ${projectTitle} screenshot ${index + 1}: ${screenshot.title}`}
              ref={(element) => {
                slideRefs.current[index] = element;
              }}
              className="group relative flex min-h-[380px] flex-[0_0_100%] cursor-zoom-in items-center justify-center overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => onOpenModal(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOpenModal(index);
                }
              }}
            >
              <Image
                src={screenshot.src}
                alt={`${projectTitle} screenshot ${index + 1}`}
                width={900}
                height={480}
                priority={index === 0}
                className="max-h-[480px] max-w-full rounded-md bg-backdrop object-contain"
              />

              {/* Hover tint */}
              <div className="absolute inset-0 rounded-md bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Hover info */}
              <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="max-w-[60%] space-y-1 text-gray-200">
                  <h3 className="text-2xl font-bold">{screenshot.title}</h3>
                  {screenshot.lines.map((line) => (
                    <p key={line} className="ml-3 text-xl">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="pointer-events-auto flex items-center gap-2 self-end rounded-md bg-surface-1 px-4 py-2 text-base font-semibold text-white shadow-md">
                  <HiOutlineArrowsExpand className="h-6 w-6" /> Enlarge Image
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CarouselDots
        count={screenshots.length}
        activeIndex={activeSlide}
        onSelect={(index) => mainCarouselApi?.scrollTo(index)}
        variant="large"
        itemLabel="slide"
        className="mt-6"
      />
    </motion.div>
  );
}

function EnlargedImageModal({
  projectTitle,
  screenshots,
  initialSlide,
  activeSlide,
  onSlideChange,
  onClose,
}: EnlargedImageModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  // Mounts fresh on every open, so startIndex (not a scroll-on-open effect)
  // puts the modal on the slide the user clicked.
  const [modalCarouselRef, modalCarouselApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialSlide,
  });

  useEffect(() => {
    if (!modalCarouselApi) return;
    const onSelect = () => onSlideChange(modalCarouselApi.selectedScrollSnap());
    modalCarouselApi.on("select", onSelect);
    return () => {
      modalCarouselApi.off("select", onSelect);
    };
  }, [modalCarouselApi, onSlideChange]);

  // Move focus into the dialog and lock background scroll while it's open.
  useEffect(() => {
    dialogRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Escape closes; Tab wraps inside the dialog so keyboard focus can't reach
  // the inert page behind the overlay (the promise aria-modal="true" makes).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${projectTitle} screenshots`}
        tabIndex={-1}
        className="relative flex max-h-[90vh] w-full max-w-[90vw] flex-col overflow-hidden rounded-xl bg-surface-modal shadow-xl focus:outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          aria-label="Close enlarged image view"
          className="absolute right-3 top-3 z-10 rounded-full bg-surface-1 p-2 text-white shadow-md transition-colors hover:bg-accent"
          onClick={onClose}
        >
          <HiX className="h-5 w-5" />
        </button>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
          <div className="relative flex min-w-0 flex-grow flex-col">
            <CarouselArrows
              size="medium"
              onPrevious={() => modalCarouselApi?.scrollPrev()}
              onNext={() => modalCarouselApi?.scrollNext()}
              previousLabel="Previous image"
              nextLabel="Next image"
            />

            <div className="flex-1 overflow-hidden" ref={modalCarouselRef}>
              <div className="flex h-full">
                {screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className="flex flex-[0_0_100%] items-center justify-center p-3 md:p-6"
                  >
                    <Image
                      src={screenshot.src}
                      alt={`${projectTitle} screenshot ${index + 1}`}
                      width={1600}
                      height={1200}
                      priority={index === initialSlide}
                      className="max-h-[55vh] max-w-full object-contain md:max-h-[75vh]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <CarouselDots
              count={screenshots.length}
              activeIndex={activeSlide}
              onSelect={(index) => modalCarouselApi?.scrollTo(index)}
              variant="medium"
              itemLabel="image"
              className="py-3"
            />
          </div>

          <div className="w-full space-y-2 overflow-y-auto bg-surface-3 p-4 text-gray-200 md:w-1/4 md:flex-shrink-0">
            <h3 className="text-2xl font-bold">{screenshots[activeSlide].title}</h3>
            {screenshots[activeSlide].lines.map((line) => (
              <p key={line} className="text-xl md:ml-2">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// The [slug] client island (R9): the server shell hands over a typed Project
// and this component owns the whole interactive surface — gallery, enlarged
// view, and the slide state they share.
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