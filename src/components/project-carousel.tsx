"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "framer-motion";

import CarouselArrows from "@/components/carousel-arrows";
import CarouselDots from "@/components/carousel-dots";
import { autoplayDelayMs } from "@/lib/motion";

type ProjectCarouselSlide = {
  slug: string;
  title: string;
  thumbnail: string;
};

type ProjectCarouselProps = {
  slides: ProjectCarouselSlide[];
};

export default function ProjectCarousel({ slides }: ProjectCarouselProps) {
  // useMemo instead of embla's documented useRef pattern — the React
  // Compiler lint rules forbid reading refs during render.
  const autoplay = useMemo(
    () => Autoplay({ delay: autoplayDelayMs, stopOnInteraction: false }),
    []
  );
  const [carouselRef, carouselApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay]
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  // null (pre-mount) counts as motion allowed — hence === true below.
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setCurrentSlide(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  // Plugin methods throw before embla init, so guard calls on the api; the
  // resume path must re-check the preference or a hover-exit restarts
  // autoplay against the user's setting.
  useEffect(() => {
    if (!carouselApi) return;
    if (prefersReducedMotion === true) autoplay.stop();
  }, [carouselApi, prefersReducedMotion, autoplay]);

  // Wrapper-level pause covers the overlay arrows (stopOnMouseEnter watches
  // only the viewport); play() takes no arg — its boolean form is a jump
  // override that makes every tick snap.
  const pauseAutoplay = useCallback(() => autoplay.stop(), [autoplay]);
  const resumeAutoplay = useCallback(() => {
    if (!prefersReducedMotion) autoplay.play();
  }, [autoplay, prefersReducedMotion]);

  return (
    <div
      className="relative mb-6"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onFocus={pauseAutoplay}
      onBlur={resumeAutoplay}
    >
      <CarouselArrows
        size="small"
        onPrevious={() => carouselApi?.scrollPrev()}
        onNext={() => carouselApi?.scrollNext()}
        previousLabel="Previous project"
        nextLabel="Next project"
      />

      <div className="overflow-hidden" ref={carouselRef}>
        <div className="flex">
          {slides.map((slide) => (
            <Link
              key={slide.slug}
              href={`/projects/${slide.slug}`}
              className="relative flex-[0_0_100%] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
            >
              <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-md bg-surface-2 sm:h-56">
                <Image
                  src={slide.thumbnail}
                  alt={slide.title}
                  width={1600}
                  height={900}
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
              </div>
              <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white sm:text-base">
                {slide.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <CarouselDots
        count={slides.length}
        activeIndex={currentSlide}
        onSelect={(index) => carouselApi?.scrollTo(index)}
        variant="small"
        itemLabel="project"
        className="mt-4"
      />
    </div>
  );
}