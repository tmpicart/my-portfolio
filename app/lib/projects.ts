export type Project = {
  slug: string;
  title: string;
  description: string;
  images: string[];
  imageInfos?: string[][];
  bullets: {
    languages?: string[];
    frameworks?: string[];
    features?: string[];
  };
  github: string;
};

export const projects: Project[] = [
  {
    slug: "john-dungeon",
    title: "John Dungeon: Remastered",
    description:
      "A top-down dungeon crawler inspired by classic Zelda games. Featuring custom-drawn sprites, enemy AI using state machines, and an intense two-phase boss fight.",
    images: [
      "/images/john/John_1.png",
      "/images/john/John_2.png",
      "/images/john/John_3.png",
      "/images/john/John_4.png",
      "/images/john/John_5.png",
      "/images/john/John_6.png",
    ],
    imageInfos: [
      ["Title Screen", "- Start or exit the game; includes death and restart mechanics"],
      ["NPC Interaction", "- Players can talk to NPCs with functional dialogue"],
      ["Shop System & Upgrades", "- Upgrade health and weapons with in-game currency"],
      ["Varied Enemies", "- Slimes, necromancers, skeletons, archers, and more; AI controlled with state machines"],
      ["Multi-Phase Boss", "- Sorceress at the dungeon end with varied attacks and a second phase"],
      ["Phase 2", "- Boss attacks intensify with new patterns"],
    ],
    bullets: {
      languages: ["GDScript"],
      frameworks: ["Godot Engine"],
      features: [
        "State-machine architecture for player and enemy AI",
        "Modular and reusable code for future content",
        "Refined combat animations and dash mechanics",
        "Expanded dungeon levels and improved enemy behaviors",
        "Gameplay improvements and bug fixes",
      ],
    },
    github: "https://github.com/tmpicart/John-Dungeon",
  },
  {
    slug: "medical-codex",
    title: "Medical Codex Translation Tool",
    description:
      "A tool to bridge language barriers in medical aid by translating medical terms across multiple languages. Uses a database-driven backend and AI fallback for missing entries.",
    images: [
      "/images/codex/codex_1.png",
      "/images/codex/codex_2.png",
      "/images/codex/codex_3.png",
      "/images/codex/codex_4.png",
      "/images/codex/codex_5.png",
    ],
    imageInfos: [
      ["Home Page", "- Select language and enter a term; fuzzy matching ensures accuracy"],
      ["Translation", "- 'Tylenol' translated to Ukrainian using the backend database"],
      ["AI Translation", "- Fallback AI translation available if no database entry exists"],
      ["Mobile Viewing", "- Responsive and mobile-friendly design"],
      ["Security", "- Inputs are protected from SQL injection and other vulnerabilities"],
    ],
    bullets: {
      languages: ["JavaScript", "TypeScript"],
      frameworks: ["Next.js", "Tailwind CSS"],
      features: [
        "Responsive and mobile-friendly interface",
        "Gemini API integration",
        "Translates medical terminologies across multiple languages",
        "Improved maintainability and scalability with code refactor",
      ],
    },
    github: "",
  },
  {
    slug: "ticketmaster-search",
    title: "TicketMaster Search Mobile",
    description:
      "Mobile app to search, view, and save events using TicketMaster, with Firebase authentication and data storage.",
    images: [
      "/images/ticketmaster/TicketMaster_1.png",
      "/images/ticketmaster/TicketMaster_2.png",
      "/images/ticketmaster/TicketMaster_3.png",
      "/images/ticketmaster/TicketMaster_4.png",
    ],
    imageInfos: [
      ["User Authentication", "- Users sign up or log in via Google accounts"],
      ["Main Page", "- Search by city and event type; concise event data display"],
      ["Favoriting Events", "- Save important events for tracking"],
      ["Favorite List", "- Favorites stored securely; direct ticket purchase links retained"],
    ],
    bullets: {
      languages: ["Kotlin"],
      frameworks: ["Android SDK", "Retrofit", "Glide", "RecyclerView"],
      features: [
        "Firebase Authentication & Firestore integration",
        "Real-time event browsing and updates",
        "Smooth image loading and rendering",
        "Mobile-first UX design",
      ],
    },
    github: "https://github.com/tmpicart/TicketMasterMobile",
  },
  {
    slug: "portfolio-website",
    title: "My Portfolio Website",
    description: "A personal portfolio showcasing projects, skills, and experience.",
    images: [
      "/images/portfolio/Portfolio_1.png",
      "/images/portfolio/Portfolio_2.png",
      "/images/icons/Avatar.png",
    ],
    imageInfos: [
      ["Vercel Deployment", "- Website is deployed and fully functional via vercel"],
      ["Mobile Responsive", "- Mobile Support and adaptive/scalable design"],
      ["Thanks for Visiting!", "- Thank you for taking the time to view my page!"],
    ],
    bullets: {
      languages: ["JavaScript", "TypeScript"],
      frameworks: ["Next.js", "Tailwind CSS", "Framer Motion"],
      features: [
        "Fully responsive design", 
        "Interactive animations",
        "Showcases projects, skills, and modern web development practices",
      ],
    },
    github: "https://github.com/tmpicart/my-portfolio",
  },
];
