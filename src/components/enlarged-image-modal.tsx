"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HiX } from "react-icons/hi";
import { motion, type Variants } from "framer-motion";

import CarouselArrows from "@/components/carousel-arrows";
import CarouselDots from "@/components/carousel-dots";
import type { ProjectScreenshot } from "@/lib/projects";

type EnlargedImageModalProps = {
  projectTitle: string;
  screenshots: ProjectScreenshot[];
  /** Slide the modal mounted on — captured at open so embla never re-inits. */
  initialSlide: number;
  activeSlide: number;
  onSlideChange: (index: number) => void;
  onClose: () => void;
};

// Focus-trap candidates inside the modal dialog.
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Overlay fade in/out — labels keep AnimatePresence's exit in the same system.
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// The [slug] enlarged-view dialog (R9): a second embla carousel plus focus
// trap, Escape handling, and scroll lock. Mounts fresh on every open, so the
// initial slide arrives via embla's startIndex, not a scroll-on-open effect.
export default function EnlargedImageModal({
  projectTitle,
  screenshots,
  initialSlide,
  activeSlide,
  onSlideChange,
  onClose,
}: EnlargedImageModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
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
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants}
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
          className="absolute right-3 top-3 z-10 rounded-full bg-surface-1 p-2 text-white shadow-md transition-colors duration-200 hover:bg-accent"
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