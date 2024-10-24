import { GITHUB_LINK } from "../constants";
import { Projects } from "../types/project";

const PROJECTS: Projects = [
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
    name: "Sppedy Chow",
    description:
      "An ecommerce app for Android built using Flutter and Dart utilizing Clean Architecture principles. The app allows users to browse products, add them to cart, and place orders.",
    imageUrl: "/projects/project2/speedy-chow.png",
    urls: {
      repo: GITHUB_LINK + "/2024-mobile-daniel-assessment",
      liveDemo: "",
    },
  },
];

export default PROJECTS;
