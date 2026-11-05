export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type?: string;
  url?: string;
  skills: string[];
  bullets: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: "AfterQuery",
    role: "Software Engineer",
    period: "May 2026 — Present",
    location: "Remote",
    type: "Contract",
    url: "https://afterquery.com",
    skills: ["Backend Architecture", "Algorithmic Validation", "Python", "Code Review"],
    bullets: [
      "Developed technical evaluation rubrics to score complex distributed architectures and backend systems reasoning.",
      "Debugged and validated backend code to enforce algorithmic correctness and optimal performance.",
    ],
  },
  {
    company: "Revelo",
    role: "Software Engineer",
    period: "Jan 2026 — Mar 2026",
    location: "Remote",
    type: "Contract",
    url: "https://www.revelo.com",
    skills: ["Python", "Go", "Code Auditing", "Backend Systems"],
    bullets: [
      "Audited and refactored Python and Go microservices to resolve logic flaws and improve runtime efficiency.",
      "Analyzed system architectures and algorithmic bottlenecks to strengthen code quality and maintainability.",
    ],
  },
  {
    company: "A2SV | Africa to Silicon Valley",
    role: "Head of Education",
    period: "Mar 2025 — Oct 2025",
    location: "Addis Ababa, Ethiopia",
    url: "https://a2sv.org",
    skills: ["Data Structures", "Algorithms", "Competitive Programming", "Leadership"],
    bullets: [
      "Instructed 18 international students in advanced Data Structures and Algorithms (DSA) for technical interviews.",
      "Supervised the Lecture Squad, refining the technical curriculum and orchestrating targeted competitive coding contests.",
    ],
  },
  {
    company: "Eskalate LLC",
    role: "Software Engineer Intern",
    period: "Jun 2024 — Sept 2024",
    location: "Addis Ababa, Ethiopia",
    type: "Internship",
    url: "https://eskalate.io",
    skills: ["Flutter", "Dart", "Clean Architecture", "REST API", "TDD"],
    bullets: [
      "Led a 4-engineer team to build a mobile product catalog, optimizing REST API data retrieval with local caching.",
      "Accelerated feature delivery to 3 weeks by implementing strict Clean Architecture to eliminate technical debt.",
      "Enforced Test-Driven Development (TDD), writing robust unit and integration tests prior to deployment.",
    ],
  },
];
