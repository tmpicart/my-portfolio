"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { projects } from "@/app/lib/projects";

const pageMeta = {
  eyebrow: "About Me",
};

const buttonHover = {
  hover: { scale: 1.04, transition: { duration: 0.2 } },
};

const arrowClass =
  "hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 items-center justify-center rounded-full bg-[#40434E] text-white shadow-lg transition-colors hover:bg-[#A673E7]";

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
      icon: "fa-briefcase",
      description:
        "See where I've put my development skills into practice and work as part of a team to tackle real-world problems.",
      button: "View My Experience",
    },
    {
      title: "Skills",
      href: "/skills",
      icon: "fa-tools",
      description:
        "View the programming languages, frameworks, and tools that help me develop my projects.",
      button: "Check Out My Toolkit",
    },
    {
      title: "Education",
      href: "/education",
      icon: "fa-graduation-cap",
      description:
        "Explore the courses and classes that built my foundation in software design and development.",
      button: "Explore My Studies",
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden rounded-[44px] border border-white/[0.04] bg-[radial-gradient(circle_at_top_left,_rgba(166,115,231,0.16)_0%,_rgba(166,115,231,0.06)_35%,_rgba(18,18,20,0.98)_70%),linear-gradient(180deg,_#0b0b0d_0%,_#0b0b0d_100%)] px-6 pt-6 pb-12 mt-8 sm:mt-10 lg:mt-12 text-white sm:px-8 lg:px-14">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-8 text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#D7BFFF]">
          {pageMeta.eyebrow}
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">Hello, I’m Thayer!</h1>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative mb-7 flex w-full max-w-6xl flex-col items-center gap-8 overflow-hidden rounded-[44px] border border-white/[0.12] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] p-8 text-white backdrop-blur-xl sm:p-10 lg:flex-row lg:gap-12 lg:p-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(166,115,231,0.14),_transparent_45%)]" />

        <div className="relative flex-1 text-center lg:text-left">
          <div className="mb-4 inline-flex items-center rounded-full border border-[#A673E7]/40 bg-[#A673E7]/12 px-3 py-1 text-sm font-medium tracking-[0.2em] text-[#E7D4FF] uppercase">
            Software Engineer
          </div>
          <p className="text-lg leading-relaxed text-gray-200 sm:text-xl">
            I like building things that are useful and fun to use. My background is mostly web development, but I&#39;ve branched into mobile and game projects too, and I&#39;m always up for learning whatever platform a problem calls for. I&#39;m happiest when I&#39;m figuring out how pieces fit together and refining something messy into something that feels clean and reliable. Outside of work I&#39;m into game dev and D&D, which is part of why I care so much about how something feels to use, not just how it works.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-gray-200">
              Web
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-gray-200">
              Mobile
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-gray-200">
              Game Dev
            </span>
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
      </motion.section>

      <div className="relative flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="relative flex flex-1 flex-col rounded-[40px] border border-white/[0.08] bg-white/[0.04] p-12 backdrop-blur-xl"
        >
          <div className="mb-4 flex items-center">
            <div className="mr-3 rounded-full bg-[#A673E7]/15 p-3">
              <i className="fas fa-laptop-code text-3xl text-[#A673E7]" />
            </div>
            <h2 className="text-3xl font-semibold sm:text-4xl text-white">See My Projects!</h2>
          </div>
          <p className="mb-6 text-lg leading-relaxed text-gray-200">
            Here are some of the things I&#39;ve worked on, each highlighting different skills developed along the way. Explore the technologies behind them, browse images showing their design, or visit my GitHub and dive into the code.
          </p>

          <div className="relative mb-6">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className={`${arrowClass} left-2 h-10 w-10`}
              aria-label="Previous project"
            >
              <HiChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className={`${arrowClass} right-2 h-10 w-10`}
              aria-label="Next project"
            >
              <HiChevronRight className="h-6 w-6" />
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="relative flex-[0_0_100%] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
                  >
                    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-md bg-[#1F1E2E] sm:h-56">
                      <Image
                        src={project.images[0]}
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
              className="w-max rounded-lg bg-[#A673E7] px-4 py-2 transition duration-300 hover:bg-[#8a57cc]"
            >
              See My Projects
            </motion.button>
          </Link>
        </motion.section>

        <div className="flex flex-1 flex-col gap-5">
          {infoCards.map((card, index) => (
            <motion.section
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.5 + index * 0.15,
              }}
              className="flex flex-col rounded-[40px] border border-white/[0.08] bg-white/[0.04] p-12 backdrop-blur-xl"
            >
              <div className="mb-2 flex items-center">
                <div className="mr-3 rounded-full bg-[#A673E7]/20 p-2">
                  <i className={`fas ${card.icon} text-2xl text-[#A673E7]`} />
                </div>
                <h2 className="text-2xl font-semibold sm:text-3xl">{card.title}</h2>
              </div>
              <p className="text-lg leading-relaxed text-gray-200">{card.description}</p>
              <Link href={card.href}>
                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  className="mt-3 w-max rounded-lg bg-[#A673E7] px-4 py-2 transition duration-300 hover:bg-[#8a57cc]"
                >
                  {card.button}
                </motion.button>
              </Link>
            </motion.section>
          ))}
        </div>
      </div>
    </main>
  );
}