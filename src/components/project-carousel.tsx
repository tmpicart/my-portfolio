"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import CarouselArrows from "@/components/carousel-arrows";
import CarouselDots from "@/components/carousel-dots";

type ProjectCarouselSlide = {
  slug: string;
  title: string;
  thumbnail: string;
};

type ProjectCarouselProps = {
  slides: ProjectCarouselSlide[];
};

// Matches the pre-R8 hand-rolled interval so the carousel's rhythm is unchanged.
const AUTOPLAY_DELAY_MS = 4500;

// Home's featured-projects carousel, extracted in R8 so the home page can be a
// Server Component. Deliberately home-specific: the [slug] carousels differ in
// autoplay, dots, and slide markup (settled in R9 — three purpose-built
// carousels, shared CarouselDots/CarouselArrows primitives).
export default function ProjectCarousel({ slides }: ProjectCarouselProps) {
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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay]
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dots mirror the active slide; swipes, arrows, and autoplay all fire "select".
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Pause/resume on the wrapper (not the plugin's stopOnMouseEnter, which only
  // watches the embla viewport) so the arrow buttons overlaying the carousel
  // are covered too. play() takes NO argument here — its boolean form is a
  // jump override, and play(true) would make every tick snap instead of slide.
  const pauseAutoplay = useCallback(() => autoplay.stop(), [autoplay]);
  const resumeAutoplay = useCallback(() => autoplay.play(), [autoplay]);

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
        onPrevious={() => emblaApi?.scrollPrev()}
        onNext={() => emblaApi?.scrollNext()}
        previousLabel="Previous project"
        nextLabel="Next project"
      />

      <div className="overflow-hidden" ref={emblaRef}>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
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
        onSelect={(index) => emblaApi?.scrollTo(index)}
        variant="small"
        itemLabel="project"
        className="mt-4"
      />
    </div>
  );
}