"use client";

// Literal class strings (JIT scanner); `transition-all` because the medium
// dot animates size, not just color.
const dotBase = "rounded-full transition-all duration-200";

const dotVariants = {
  small: { gap: "gap-2", active: "h-2.5 w-2.5 bg-white", inactive: "h-2.5 w-2.5 bg-accent/40 hover:bg-accent/80" },
  medium: { gap: "gap-2", active: "h-3 w-3 bg-white", inactive: "h-2.5 w-2.5 bg-accent/40 hover:bg-accent/80" },
  large: { gap: "gap-3", active: "h-4 w-4 bg-white", inactive: "h-4 w-4 bg-accent/40 hover:bg-accent/80" },
} as const satisfies Record<string, { gap: string; active: string; inactive: string }>;

type CarouselDotVariant = keyof typeof dotVariants;

type CarouselDotsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  variant: CarouselDotVariant;
  /** Noun used in the aria labels, e.g. "slide" → "Go to slide 2". */
  itemLabel: string;
  className?: string;
};

export default function CarouselDots({ count, activeIndex, onSelect, variant, itemLabel, className }: CarouselDotsProps) {
  const { gap, active, inactive } = dotVariants[variant];
  return (
    <div className={`flex justify-center ${gap}${className ? ` ${className}` : ""}`}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          aria-label={`Go to ${itemLabel} ${index + 1}`}
          className={`${dotBase} ${index === activeIndex ? active : inactive}`}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}