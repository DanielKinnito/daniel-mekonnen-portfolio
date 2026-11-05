export interface Education {
  institution: string;
  degree: string;
  period: string;
  location?: string;
  url?: string;
  gpa?: string;
  badges: string[];
  bullets: string[];
}

export const EDUCATION_LIST: Education[] = [
  {
    institution: "Addis Ababa Science and Technology University",
    degree: "BSc in Software Engineering",
    period: "June 2021 — June 2025",
    location: "Addis Ababa, Ethiopia",
    gpa: "3.58 / 4.0",
    badges: ["Machine Learning", "Mobile Computing", "Software Project Management"],
    bullets: [
      "Graduated with a CGPA of 3.58/4.0 in Software Engineering.",
      "Core Coursework: Machine Learning, Mobile Computing, Distributed Systems, Software Project Management.",
    ],
  },
  {
    institution: "Africa to Silicon Valley (A2SV)",
    degree: "Coding Academy & Incubator",
    period: "Nov 2023 — Nov 2024",
    location: "Addis Ababa, Ethiopia",
    url: "https://a2sv.org",
    badges: ["Google-Backed", "800+ Solved DSA", "Algorithms", "Competitive Programming"],
    bullets: [
      "Completed a highly selective, Google-backed software engineering program focused on advanced data structures, algorithmic complexity, and scalable architecture.",
      "Solved 800+ Data Structures and Algorithms (DSA) challenges across LeetCode and Codeforces.",
    ],
  },
];
