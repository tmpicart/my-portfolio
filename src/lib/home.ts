export type HomeIconId =
  | "laptop-code"
  | "briefcase"
  | "tools"
  | "graduation-cap";

export type InfoCard = {
  title: string;
  href: string;
  iconId: HomeIconId;
  description: string;
  button: string;
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    badge: string;
    intro: string;
    focusAreas: string[];
  };
  projects: {
    iconId: HomeIconId;
    title: string;
    description: string;
    button: string;
  };
  infoCards: InfoCard[];
};

export const home: HomeContent = {
  hero: {
    eyebrow: "About Me",
    title: "Hello, I’m Thayer!",
    badge: "Software Engineer",
    intro:
      "I like building things that are useful and fun to use. My background is mostly web development, but I've branched into mobile and game projects too, and I'm always up for learning whatever platform a problem calls for. I'm happiest when I'm figuring out how pieces fit together and refining something messy into something that feels clean and reliable. Outside of work I'm into game dev and D&D, which is part of why I care so much about how something feels to use, not just how it works.",
    focusAreas: ["Web", "Mobile", "Game Dev"],
  },
  projects: {
    iconId: "laptop-code",
    title: "See My Projects!",
    description:
      "Here are some of the things I've worked on, each highlighting different skills developed along the way. Explore the technologies behind them, browse images showing their design, or visit my GitHub and dive into the code.",
    button: "See My Projects",
  },
  infoCards: [
    {
      title: "Experience",
      href: "/experience",
      iconId: "briefcase",
      description:
        "See where I've put my development skills into practice and work as part of a team to tackle real-world problems.",
      button: "View My Experience",
    },
    {
      title: "Skills",
      href: "/skills",
      iconId: "tools",
      description:
        "View the programming languages, frameworks, and tools that help me develop my projects.",
      button: "Check Out My Toolkit",
    },
    {
      title: "Education",
      href: "/education",
      iconId: "graduation-cap",
      description:
        "Explore the courses and classes that built my foundation in software design and development.",
      button: "Explore My Studies",
    },
  ],
};