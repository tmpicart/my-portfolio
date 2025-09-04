"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const cardStyle = `
  bg-gradient-to-tr from-white/10 via-white/5 to-white/10
  backdrop-blur-xl
  border border-white/25
  rounded-xl
  shadow-inner shadow-black/25
  p-8
`;

const buttonHover = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

export default function HomePage() {
  const infoCards = [
    {
      title: "Experience",
      href: "/experience",
      icon: "fa-briefcase",
      description:
        "See where I’ve put computer science into practice with team collaboration and tackling real-world problems.",
      button: "View My Journey",
    },
    {
      title: "Education",
      href: "/education",
      icon: "fa-graduation-cap",
      description:
        "Explore the courses and studies that built my foundation in computer science, software design, and development.",
      button: "Explore My Studies",
    },
    {
      title: "Skills",
      href: "/skills",
      icon: "fa-tools",
      description:
        "The programming languages, frameworks, and tools I rely on to design, build, and deliver quality software.",
      button: "Check Out My Toolkit",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#070707] px-4 pt-8 text-white">
      
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-6 text-center text-4xl sm:text-5xl font-bold"
      >
        Hello, I’m Thayer.
      </motion.h1>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className={`mb-12 flex w-full max-w-6xl flex-col items-center text-white gap-6 lg:flex-row lg:gap-8 ${cardStyle}`}
      >
        <p className="flex-1 text-center text-lg lg:text-left">
          I’m a recent Computer Science graduate with a passion for building
          clean, user-friendly software. Trained in agile principles and modern
          development practices, I enjoy tackling complex problems and finding
          creative solutions. In my free time, I explore game development,
          experimenting with state machine AI and object-oriented design.
        </p>
        <div className="flex-shrink-0">
          <Image
            src="/images/icons/Avatar.png"
            alt="Thayer profile avatar"
            width={128}
            height={128}
            className="rounded-full object-cover"
          />
        </div>
      </motion.section>

      <div className="flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
        
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className={`relative flex flex-1 flex-col ${cardStyle}`}
        >
          <div className="mb-4 flex items-center">
            <div className="mr-3 rounded-full bg-[#A673E7]/20 p-3">
              <i className="fas fa-laptop-code text-3xl text-[#A673E7]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold">See My Projects!</h2>
          </div>
          <p className="mb-6 text-lg">
            My projects range from small utilities to full web and mobile applications, 
            each highlighting different skills I’ve developed along the way. 
            Explore the technologies behind them, browse image galleries that showcase their design, 
            or visit my GitHub to dive into the code itself.
          </p>
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

        <div className="flex flex-1 flex-col gap-8">
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
              className={`${cardStyle} flex flex-col`}
            >
              <div className="mb-2 flex items-center">
                <div className="mr-3 rounded-full bg-[#A673E7]/20 p-2">
                  <i className={`fas ${card.icon} text-2xl text-[#A673E7]`} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold">{card.title}</h2>
              </div>
              <p className="text-lg">{card.description}</p>
              <Link href={card.href}>
                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  className="mt-2 w-max rounded-lg bg-[#A673E7] px-4 py-2 transition duration-300 hover:bg-[#8a57cc]"
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
