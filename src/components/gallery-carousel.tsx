"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { motion, useReducedMotion } from "framer-motion";

import CarouselArrows from "@/components/carousel-arrows";
import CarouselDots from "@/components/carousel-dots";
import { autoplayDelayMs, fadeUp } from "@/lib/motion";
import type { ProjectScreenshot } from "@/lib/projects";

type GalleryCarouselProps = {
  projectTitle: string;
  screenshots: ProjectScreenshot[];
  activeSlide: number;
  isModalOpen: boolean;
  onSlideChange: (index: number) => void;
  onOpenModal: (index: number) => void;
};

const galleryEntrance = fadeUp();

export default function GalleryCarousel({
  projectTitle,
  screenshots,
  activeSlide,
  isModalOpen,
  onSlideChange,
  onOpenModal,
}: GalleryCarouselProps) {
  // useMemo instead of embla's documented useRef pattern — the React
  // Compiler lint rules forbid reading refs during render.
  const autoplay = useMemo(
    () => Autoplay({ delay: autoplayDelayMs, stopOnInteraction: false }),
    []
  );
  const [mainCarouselRef, mainCarouselApi] = useEmblaCarousel(
    { loop: true },
    [autoplay]
  );
  const [isAutoplaySuspended, setIsAutoplaySuspended] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wasModalOpenRef = useRef(false);

  // null (pre-mount) counts as motion allowed.
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!mainCarouselApi) return;
    const onSelect = () => onSlideChange(mainCarouselApi.selectedScrollSnap());
    mainCarouselApi.on("select", onSelect);
    return () => {
      mainCarouselApi.off("select", onSelect);
    };
  }, [mainCarouselApi, onSlideChange]);

  // Wrapper-level suspend covers the overlay arrows; play() takes no arg —
  // its boolean form is a jump override that makes every tick snap.
  const isAutoplayRunning =
    !isAutoplaySuspended && !isModalOpen && !prefersReducedMotion;
  // Plugin methods throw until embla init — guard on the api.
  useEffect(() => {
    if (!mainCarouselApi) return;
    if (isAutoplayRunning) autoplay.play();
    else autoplay.stop();
  }, [isAutoplayRunning, autoplay, mainCarouselApi]);

  // On modal close, sync to the last-viewed slide and restore focus there.
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
      variants={galleryEntrance}
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

              <div className="absolute inset-0 rounded-md bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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