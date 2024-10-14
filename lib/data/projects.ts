import { GITHUB_LINK } from "../constants";
import { Projects } from "../types/project";

const PROJECTS: Projects = [
  {
    name: "Competitive Programming Solutions",
    description:
      "A collection of my solutions to various competitive programming problems from platforms like Codeforces, HackerRank, and LeetCode. Demonstrates my problem-solving skills and algorithmic thinking.",
    imageUrl: "/projects/competitive-programming.png",
    urls: {
      repo: GITHUB_LINK + "/A2SVProgress",
      liveDemo: "",
    },
  },
];

export default PROJECTS;
