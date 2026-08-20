export type ImageCaption = {
  title: string;
  lines: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  thumbnail: string;
  featured: boolean;
  images: string[];
  captions: ImageCaption[];
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
    title: "John Dungeon",
    summary: "A top-down dungeon crawler inspired by classic Zelda and old school fantasy games.",
    description:
      "A top-down dungeon crawler inspired by classic Zelda games, featuring custom-drawn sprites, varied enemies, and an intense two-phase boss fight. Originally developed over a tight three-week deadline by a team of five, the project earned the highest rating among competing games, with 4.59 stars. I have since taken over development as a solo project to fix bugs, refactor code, enhance gameplay, and expand content.",
    thumbnail: "/images/john/John_5.png",
    featured: false,
    images: [
      "/images/john/John_1.png",
      "/images/john/John_2.png",
      "/images/john/John_3.png",
      "/images/john/John_4.png",
      "/images/john/John_5.png",
      "/images/john/John_6.png",
    ],
    captions: [
      {
        title: "Title Screen",
        lines: ["- Start or exit the game; includes death and restart mechanics"],
      },
      {
        title: "NPC Interaction",
        lines: ["- Players can talk to NPCs with functional dialogue"],
      },
      {
        title: "Shop System & Upgrades",
        lines: ["- Upgrade health and weapons with in-game currency"],
      },
      {
        title: "Varied Enemies",
        lines: [
          "- Slimes, necromancers, skeletons, archers, and more; AI controlled with state machines",
        ],
      },
      {
        title: "Multi-Phase Boss",
        lines: ["- Sorceress at the dungeon end with varied attacks and a second phase"],
      },
      {
        title: "Phase 2",
        lines: ["- Boss attacks intensify with new patterns"],
      },
    ],
    bullets: {
      languages: ["GDScript"],
      frameworks: ["Godot Engine"],
      features: [
        "State-machine architecture for player and enemy AI",
        "Modular and reusable code for future content and easy expansion",
        "A dungeon ending in an intense boss fight",
        "Varied enemies and behaviors",
        "Player progression systems",
        "Fast-paced and dynamic combat",
      ],
    },
    github: "https://github.com/tmpicart/John-Dungeon",
  },
  {
    slug: "medical-codex",
    title: "Medical Codex Translation Tool",
    summary:
      "A web-based tool designed to translate medical terminology from language to language for better accessibility.",
    description:
      "A tool designed to bridge language barriers by translating medical terms across multiple languages. Developed by a team of three, it won the senior project showcase for that semester. The tool leverages an extensive term database and provides AI-powered fallback translations for any missing entries.",
    thumbnail: "/images/codex/codex_1.png",
    featured: true,
    images: [
      "/images/codex/codex_1.png",
      "/images/codex/codex_2.png",
      "/images/codex/codex_3.png",
      "/images/codex/codex_4.png",
      "/images/codex/codex_5.png",
    ],
    captions: [
      {
        title: "Home Page",
        lines: ["- Select language and enter a term; fuzzy matching ensures accuracy"],
      },
      {
        title: "Translation",
        lines: ["- 'Tylenol' translated to Ukrainian using the backend database"],
      },
      {
        title: "AI Translation",
        lines: ["- Fallback AI translation available if no database entry exists"],
      },
      {
        title: "Mobile Viewing",
        lines: ["- Responsive and mobile-friendly design"],
      },
      {
        title: "Security",
        lines: ["- Inputs are protected from SQL injection and other vulnerabilities"],
      },
    ],
    bullets: {
      languages: ["JavaScript", "TypeScript", "SQL"],
      frameworks: ["Next.js", "Tailwind CSS", "FastAPI"],
      features: [
        "Responsive and mobile-friendly interface",
        "Gemini API integration",
        "Translates medical terminologies across multiple languages",
        "SQL database contains extensive translations",
        "Improved maintainability and scalability with refactoring to Next.js and Tailwind CSS",
        "Custom backend hooks for frontend integration, enabling seamless communication with the database and APIs",
      ],
    },
    github: "",
  },
  {
    slug: "ticketmaster-search",
    title: "TicketMaster Search Mobile",
    summary: "A mobile app built to search for events and tickets via the TicketMaster API.",
    description:
      "Mobile app to search, view, and save events from TicketMaster via the TicketMaster API, with Firebase authentication and data storage allowing users to log in and save their favorite events.",
    thumbnail: "/images/ticketmaster/TicketMaster_1.png",
    featured: false,
    images: [
      "/images/ticketmaster/TicketMaster_1.png",
      "/images/ticketmaster/TicketMaster_2.png",
      "/images/ticketmaster/TicketMaster_3.png",
      "/images/ticketmaster/TicketMaster_4.png",
    ],
    captions: [
      {
        title: "User Authentication",
        lines: ["- Users sign up or log in via Google accounts"],
      },
      {
        title: "Main Page",
        lines: ["- Search by city and event type; concise event data display"],
      },
      {
        title: "Favoriting Events",
        lines: ["- Save important events for tracking"],
      },
      {
        title: "Favorite List",
        lines: ["- Favorites stored securely; direct ticket purchase links retained"],
      },
    ],
    bullets: {
      languages: ["Kotlin"],
      frameworks: ["Android SDK", "Retrofit", "Glide", "RecyclerView"],
      features: [
        "Firebase Authentication & Firestore integration",
        "User-based data storage and event saving",
        "Real-time event browsing and updates",
        "Filter through TicketMaster events via location and keyword",
        "Smooth image loading and rendering",
        "Mobile-first UX design",
      ],
    },
    github: "https://github.com/tmpicart/TicketMasterMobile",
  },
  {
    slug: "portfolio-website",
    title: "My Portfolio Website",
    summary: "Learn more about the portfolio site you are currently visiting!",
    description:
      "This is my portfolio website built to showcase my projects, skills, education, and experience. Feel free to explore! Check out my GitHub, LinkedIn, or shoot me an email with the links at the bottom of every page.",
    thumbnail: "/images/icons/code_img.jpg",
    featured: false,
    images: [
      "/images/portfolio/Portfolio_1.png",
      "/images/portfolio/Portfolio_2.png",
      "/images/icons/laptop_img.jpg",
    ],
    captions: [
      {
        title: "Vercel Deployment",
        lines: ["- Website is deployed and fully functional via Vercel"],
      },
      {
        title: "Mobile Responsive",
        lines: ["- Mobile support and adaptive/scalable design"],
      },
      {
        title: "Thanks for Visiting!",
        lines: ["- Thank you for taking the time to view my page!"],
      },
    ],
    bullets: {
      languages: ["JavaScript", "TypeScript"],
      frameworks: ["Next.js", "Tailwind CSS", "Framer Motion"],
      features: [
        "Fully responsive and mobile-friendly design",
        "Interactive effects and load animations",
        "Showcases modern web development practices, including Next.js and Tailwind",
        "Vercel deployment via GitHub, automatically updated with every push",
      ],
    },
    github: "https://github.com/tmpicart/my-portfolio",
  },
];

// The hub's spotlight card is driven by this flag — enforce the one-true invariant
// at module load so a bad edit fails the build, not the page.
if (projects.filter((project) => project.featured).length !== 1) {
  throw new Error(
    "lib/projects.ts: exactly one project must be marked featured: true"
  );
}