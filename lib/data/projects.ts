import { Projects } from "../types/project";

export const FEATURED_PROJECTS: Projects = [
  {
    name: "HexPic",
    tagline: "Universal Raster-to-Vector & ASCII Engine",
    description:
      "A high-performance visual transformation engine that converts raster images into TrueColor character grids and scalable vector SVGs in the browser, Node.js, CLI, and AI agent workflows.",
    period: "Nov 2025 — Nov 2026",
    imageUrl: "/projects/attune/icon.png",
    tags: ["TypeScript", "Node.js", "HTML5 Canvas", "MCP Server", "Sobel Filters"],
    bullets: [
      "Built an isomorphic image engine converting rasters to SVGs via Canvas and pure Node.js.",
      "Implemented error-diffusion dithering (Atkinson, Floyd-Steinberg) and 3x3 Sobel edge detection.",
      "Engineered a Model Context Protocol (MCP) server for zero-latency AI visual processing.",
    ],
    urls: {
      repo: "https://github.com/DanielKinnito/hexpic",
      liveDemo: "https://danielkinnito.github.io/hexpic/",
    },
    featured: true,
  },
  {
    name: "Telegram Sales WebApp & CRM",
    tagline: "Full-Stack E-Commerce & Merchant Automation",
    description:
      "An integrated Telegram Mini App and Express API delivering seamless product catalogs, checkout flows, and automated back-office CRM operations.",
    period: "Oct 2026 — Nov 2026",
    tags: ["TypeScript", "React", "Express", "GrammY", "Supabase", "Notion API"],
    bullets: [
      "Built a responsive Telegram Mini App and Express API for product browsing and order management.",
      "Integrated the Notion API as a merchant CRM database and Supabase Storage for payment receipts.",
      "Automated merchant workflows and order notifications using webhook triggers and background jobs.",
    ],
    urls: {
      repo: "https://github.com/DanielKinnito/Telegram-Sales-Webapp",
    },
    featured: true,
  },
  {
    name: "Career-Fit-Jobs Bot",
    tagline: "Intelligent Job Aggregation & Dispatch Engine",
    description:
      "An automated Telegram scraper bot and notification service that continuously monitors channel feeds, classifies listings, and routes targeted opportunities to job seekers.",
    period: "Sept 2024 — Nov 2024",
    tags: ["Python", "Telethon", "Supabase", "Heroku", "Automated Pipelines"],
    bullets: [
      "Scraped and compiled job postings using Telethon, storing structured pipeline results in Supabase.",
      "Delivered preference-based job matches using automated Python scripts and Telegraph at scheduled intervals.",
      "Configured automated deployment pipelines on Heroku using YML workflows for continuous delivery.",
    ],
    urls: {
      repo: "https://github.com/DanielKinnito/Career-Fit-Jobs-Bot",
    },
    featured: true,
  },
  {
    name: "Smart Legal Assistance Platform",
    tagline: "AI Legal Intelligence & Ethiopian Jurisprudence RAG",
    description:
      "A specialized legal platform delivering domain-accurate legal question answering, statute analysis, and case search over verified Ethiopian legal corpuses.",
    period: "Feb 2025 — May 2025",
    imageUrl: "/projects/project5/legal-platform.png",
    tags: ["Python", "Django", "Docker", "Gemini API", "RAG Pipeline"],
    bullets: [
      "Built an AI legal chatbot and service platform tailored for Ethiopian law within a 5-engineer team.",
      "Engineered a RAG pipeline over 16 legal documents using Gemini for context-aware responses.",
      "Containerized the Django backend using Docker microservices to streamline deployment.",
    ],
    urls: {
      repo: "https://github.com/DanielKinnito/legal-platform",
    },
    featured: true,
  },
];

export const ADDITIONAL_PROJECTS: Projects = [
  {
    name: "Attune",
    tagline: "VS Code Execution Environment Switcher",
    description:
      "Seamlessly switch between execution environments (Node.js, Python) inside Visual Studio Code with a single command palette shortcut.",
    imageUrl: "/projects/attune/icon.png",
    tags: ["VS Code Extension", "TypeScript", "Developer Tool"],
    bullets: [
      "Published extension on the official Visual Studio Marketplace with active installations.",
      "Automated environment path resolution and interpreter binding.",
    ],
    urls: {
      repo: "https://github.com/DanielKinnito/attune",
      liveDemo: "https://marketplace.visualstudio.com/items?itemName=kinnito.attune",
    },
    featured: false,
  },
  {
    name: "Scoundrel Solo Dungeon Crawl",
    tagline: "Atmospheric Roguelike Web Game",
    description:
      "A dark, atmospheric solo dungeon crawler card game featuring real-time state tracking, leaderboards, and persistent authentication.",
    imageUrl: "/projects/scoundrel/card.png",
    tags: ["Next.js", "Tailwind CSS", "Supabase", "Game Design"],
    bullets: [
      "Implemented roguelike turn mechanics with deck state management.",
      "Real-time leaderboards and user persistence via Supabase.",
    ],
    urls: {
      repo: "https://github.com/DanielKinnito/scoundrel-dungeon-crawl",
      liveDemo: "https://scoundrel-solo.vercel.app/",
    },
    featured: false,
  },
];

export default FEATURED_PROJECTS;
