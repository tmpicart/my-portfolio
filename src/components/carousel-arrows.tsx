"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// Class strings stay literal per variant — Tailwind's JIT scanner can't see
// dynamically constructed class names.
const arrowBase =
  "hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 items-center justify-center rounded-full bg-[#40434E] text-white shadow-lg transition-colors hover:bg-[#A673E7]";

const arrowSizes = {
  // Home carousel (~40px, inset-2).
  small: { previous: "left-2 h-10 w-10", next: "right-2 h-10 w-10", icon: "h-6 w-6" },
  // [slug] modal carousel (~48px, inset-3).
  medium: { previous: "left-3 p-3", next: "right-3 p-3", icon: "h-6 w-6" },
  // [slug] main carousel (~60px, inset-4).
  large: { previous: "left-4 p-4", next: "right-4 p-4", icon: "h-7 w-7" },
} as const satisfies Record<string, { previous: string; next: string; icon: string }>;

type CarouselArrowSize = keyof typeof arrowSizes;

type CarouselArrowsProps = {
  onPrevious: () => void;
  onNext: () => void;
  size: CarouselArrowSize;
  previousLabel: string;
  nextLabel: string;
};

export default function CarouselArrows({ onPrevious, onNext, size, previousLabel, nextLabel }: CarouselArrowsProps) {
  const { previous, next, icon } = arrowSizes[size];
  return (
    <>
      <button onClick={onPrevious} className={`${arrowBase} ${previous}`} aria-label={previousLabel}>
        <HiChevronLeft className={icon} />
      </button>
      <button onClick={onNext} className={`${arrowBase} ${next}`} aria-label={nextLabel}>
        <HiChevronRight className={icon} />
      </button>
    </>
  );
}