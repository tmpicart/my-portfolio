"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import {
  FaBriefcase,
  FaGraduationCap,
  FaLaptopCode,
  FaTools,
} from "react-icons/fa";

import CarouselArrows from "@/components/carousel-arrows";
import GlassCard from "@/components/glass-card";
import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import TagPill from "@/components/tag-pill";
import { projects } from "@/lib/projects";

const buttonHover = {
  hover: { scale: 1.04, transition: { duration: 0.2 } },
};

export default function HomePage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const infoCards = [
    {
      title: "Experience",
      href: "/experience",
      icon: FaBriefcase,
      description:
        "See where I've put my development skills into practice and work as part of a team to tackle real-world problems.",
      button: "View My Experience",
    },
    {
      title: "Skills",
      href: "/skills",
      icon: FaTools,
      description:
        "View the programming languages, frameworks, and tools that help me develop my projects.",
      button: "Check Out My Toolkit",
    },
    {
      title: "Education",
      href: "/education",
      icon: FaGraduationCap,
      description:
        "Explore the courses and classes that built my foundation in software design and development.",
      button: "Explore My Studies",
    },
  ];

  return (
    <PageShell>
      <PageHeader eyebrow="About Me" title="Hello, I’m Thayer!" />

      <GlassCard
        variant="hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(166,115,231,0.14),_transparent_45%)]" />

        <div className="relative flex-1 text-center lg:text-left">
          <div className="mb-4">
            <TagPill variant="badge">Software Engineer</TagPill>
          </div>
          <p className="text-lg leading-relaxed text-gray-200 sm:text-xl">
            I like building things that are useful and fun to use. My background is mostly web development, but I&#39;ve branched into mobile and game projects too, and I&#39;m always up for learning whatever platform a problem calls for. I&#39;m happiest when I&#39;m figuring out how pieces fit together and refining something messy into something that feels clean and reliable. Outside of work I&#39;m into game dev and D&D, which is part of why I care so much about how something feels to use, not just how it works.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <TagPill variant="muted">Web</TagPill>
            <TagPill variant="muted">Mobile</TagPill>
            <TagPill variant="muted">Game Dev</TagPill>
          </div>
        </div>

        <div className="relative flex-shrink-0">
          <div className="relative rounded-full border border-white/20 bg-[radial-gradient(circle_at_bottom_right,_rgba(166,115,231,0.28),_rgba(255,255,255,0.04)_55%,_transparent_70%)] p-2">
            <Image
              src="/images/icons/pfp.jpg"
              alt="Thayer profile pic"
              width={132}
              height={132}
              className="rounded-full border border-white/15 object-cover"
            />
          </div>
        </div>
      </GlassCard>

      <div className="relative flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
        <GlassCard
          variant="section"
          className="flex-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <div className="mb-4 flex items-center">
            <div className="mr-3 rounded-full bg-accent/15 p-3">
              <FaLaptopCode className="text-3xl text-accent" />
            </div>
            <h2 className="text-3xl font-semibold sm:text-4xl text-white">See My Projects!</h2>
          </div>
          <p className="mb-6 text-lg leading-relaxed text-gray-200">
            Here are some of the things I&#39;ve worked on, each highlighting different skills developed along the way. Explore the technologies behind them, browse images showing their design, or visit my GitHub and dive into the code.
          </p>

          <div className="relative mb-6">
            <CarouselArrows
              size="small"
              onPrevious={() => emblaApi?.scrollPrev()}
              onNext={() => emblaApi?.scrollNext()}
              previousLabel="Previous project"
              nextLabel="Next project"
            />

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="relative flex-[0_0_100%] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
                  >
                    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-md bg-surface-2 sm:h-56">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        width={1600}
                        height={900}
                        className="max-h-full max-w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    </div>
                    <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white sm:text-base">
                      {project.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/projects">
            <motion.button
              variants={buttonHover}
              whileHover="hover"
              className="w-max rounded-lg bg-accent px-4 py-2 transition duration-300 hover:bg-accent-deep"
            >
              See My Projects
            </motion.button>
          </Link>
        </GlassCard>

        <div className="flex flex-1 flex-col gap-5">
          {infoCards.map((card, index) => (
            <GlassCard
              key={card.title}
              variant="section"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.5 + index * 0.15,
              }}
            >
              <div className="mb-2 flex items-center">
                <div className="mr-3 rounded-full bg-accent/20 p-2">
                  <card.icon className="text-2xl text-accent" />
                </div>
                <h2 className="text-2xl font-semibold sm:text-3xl">{card.title}</h2>
              </div>
              <p className="text-lg leading-relaxed text-gray-200">{card.description}</p>
              <Link href={card.href}>
                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  className="mt-3 w-max rounded-lg bg-accent px-4 py-2 transition duration-300 hover:bg-accent-deep"
                >
                  {card.button}
                </motion.button>
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageShell>
  );
}