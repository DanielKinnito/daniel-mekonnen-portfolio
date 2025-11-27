import { GITHUB_LINK } from "../constants";
import { Projects } from "../types/project";

const PROJECTS: Projects = [
  {
    name: "Attune",
    description:
      "Seamlessly switch between execution environments (Node.js, Python) in VS Code.",
    imageUrl: "/projects/attune/icon.png",
    urls: {
      repo: "https://github.com/DanielKinnito/attune",
      liveDemo: "https://marketplace.visualstudio.com/items?itemName=kinnito.attune",
    },
  },
  // {
  //   name: "Weraj Ale",
  //   description:
  //     "Weraj Ale is a community-driven platform for sharing and discovering public transport routes in Ethiopia. Users can find prices, vehicle types, and routes for taxis, buses, and more.",
  //   imageUrl: "/projects/weraj-ale/landing.png",
  //   urls: {
  //     repo: "https://github.com/DanielKinnito/weraj-ale",
  //     liveDemo: "https://weraj-ale.vercel.app/",
  //   },
  // },
  {
    name: "Competitive Programming Solutions",
    description:
      "A collection of my solutions to various competitive programming problems from platforms like Codeforces, LeetCode, and HackerRank. Demonstrates my problem-solving skills and algorithmic thinking.",
    imageUrl: "/projects/project1/competitive-programming.png",
    urls: {
      repo: GITHUB_LINK + "/A2SVProgress",
      liveDemo: "",
    },
  },
  {
    name: "Speedy Chow",
    description:
      "An ecommerce app for Android built using Flutter and Dart utilizing Clean Architecture principles. The app allows users to browse products, add them to cart, and place orders.",
    imageUrl: "/projects/project2/speedy-chow.png",
    urls: {
      repo: GITHUB_LINK + "/2024-mobile-daniel-assessment",
      liveDemo: "",
    },
  },
  {
    name: "Sefer Games",
    description:
      "An Ethiopian word guessing game built with Flutter. A mobile application that challenges players with word puzzles, featuring an intuitive interface and engaging gameplay experience.",
    imageUrl: "/projects/project3/sefer-games.png",
    urls: {
      repo: GITHUB_LINK + "/sefer_games_v1",
      liveDemo: "",
    },
  },
  {
    name: "Terminal Bench",
    description:
      "A command-line benchmarking tool for performance analysis. Provides comprehensive metrics and visualizations for testing and comparing system performance across different configurations.",
    imageUrl: "/projects/project4/terminal-bench.png",
    urls: {
      repo: GITHUB_LINK + "/terminal-bench",
      liveDemo: "",
    },
  },
  {
    name: "Smart Legal Assistance Platform",
    description:
      "A full-stack web application built with Next.js and Django that helps users find attorneys and access legal assistance. Features include attorney search, case management, and legal document processing.",
    imageUrl: "/projects/project5/legal-platform.png",
    urls: {
      repo: GITHUB_LINK + "/SmartLegalAssistanceAttorneyFindingPlatform",
      liveDemo: "",
    },
  },
  {
    name: "ONoC Ring Topology Optimization",
    description:
      "An algorithm for optimizing Optical Network-on-Chip (ONoC) ring topology networks using congestion-aware heuristic algorithms. Features visualization capabilities and comprehensive performance metrics.",
    imageUrl: "/projects/project6/onoc-topology.png",
    urls: {
      repo: GITHUB_LINK + "/ONoC-Ring-Topology-Optimization",
      liveDemo: "",
    },
  },
  {
    name: "Competitive Programming Templates",
    description:
      "A VS Code extension that helps competitive programmers manage and use code templates efficiently through snippets and commands. Supports Python and C++ with customizable templates.",
    imageUrl: "/projects/project7/competitive-templates.png",
    urls: {
      repo: GITHUB_LINK + "/competitive-templates",
      liveDemo: "",
    },
  },
  {
    name: "Digital ID Backend",
    description:
      "A Django REST API backend for a digital identification system. Features include user registration with biometric data, ID management, expiration tracking, and secure authentication.",
    imageUrl: "/projects/project8/digital-id-backend.png",
    urls: {
      repo: GITHUB_LINK + "/digital-id-backend",
      liveDemo: "",
    },
  },
  {
    name: "Custom News Bot",
    description:
      "An AI-powered news aggregation and analysis bot that delivers personalized, curated news content. Features intelligent filtering, categorization, and real-time updates on technology and industry trends.",
    imageUrl: "/projects/project9/news-bot.png",
    urls: {
      repo: GITHUB_LINK + "/custom_news_bot",
      liveDemo: "",
    },
  },
];

export default PROJECTS;
