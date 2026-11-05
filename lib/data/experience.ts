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
    skills: ["AI Evaluation", "LLM Reasoning", "Architecture", "Python"],
    bullets: [
      "Developed technical evaluation rubrics for NDA-restricted AI models to score complex reasoning and architecture tasks.",
      "Debugged and validated LLM-generated code to enforce algorithmic correctness across multi-turn technical prompts.",
    ],
  },
  {
    company: "Revelo",
    role: "Technical Code Evaluator",
    period: "Jan 2026 — Mar 2026",
    location: "Remote",
    type: "Contract",
    skills: ["Python", "Go", "Code Auditing", "Prompt Engineering"],
    bullets: [
      "Audited and refactored AI-generated Python and Go code to resolve logic flaws and improve output accuracy.",
      "Analyzed multi-turn technical dialogues to strengthen model context retention and logical consistency.",
    ],
  },
  {
    company: "A2SV | Africa to Silicon Valley",
    role: "Remote Head of Education",
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
    skills: ["Flutter", "Dart", "Clean Architecture", "REST API", "TDD"],
    bullets: [
      "Led a 4-engineer team to build a mobile product catalog, optimizing REST API data retrieval with local caching.",
      "Accelerated feature delivery to 3 weeks by implementing strict Clean Architecture to eliminate technical debt.",
      "Enforced Test-Driven Development (TDD), writing robust unit and integration tests prior to deployment.",
    ],
  },
];

