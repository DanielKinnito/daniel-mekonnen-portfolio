export interface SkillItem {
  name: string;
  category: string;
  icon?: string;
}

export const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: "/skills/python.svg" },
      { name: "TypeScript", icon: "/skills/typescript.svg" },
      { name: "JavaScript", icon: "/skills/javascript.svg" },
      { name: "Go" },
      { name: "Dart", icon: "/skills/flutter.svg" },
      { name: "SQL" },
      { name: "C++", icon: "/skills/cplusplus.svg" },
      { name: "Java", icon: "/skills/java.svg" },
      { name: "PHP" },
    ],
  },
  {
    title: "Frameworks & Backend",
    skills: [
      { name: "Django", icon: "/skills/django.svg" },
      { name: "FastAPI" },
      { name: "Node.js", icon: "/skills/nodejs.svg" },
      { name: "Express.js", icon: "/skills/expressjs.svg" },
      { name: "Next.js", icon: "/skills/nextjs.svg" },
      { name: "React", icon: "/skills/react.svg" },
      { name: "Flutter", icon: "/skills/flutter.svg" },
      { name: "Tailwind CSS", icon: "/skills/tailwindcss.svg" },
    ],
  },
  {
    title: "Database & Cloud",
    skills: [
      { name: "PostgreSQL" },
      { name: "Supabase" },
      { name: "MongoDB", icon: "/skills/mongodb.svg" },
      { name: "Docker", icon: "/skills/docker.svg" },
      { name: "Linux" },
      { name: "Firebase", icon: "/skills/firebase.svg" },
      { name: "MySQL" },
    ],
  },
  {
    title: "Architecture & Core Practices",
    skills: [
      { name: "MCP (Model Context Protocol)" },
      { name: "RAG & AI Pipelines" },
      { name: "Data Structures & Algorithms" },
      { name: "Test-Driven Development (TDD)" },
      { name: "Clean Architecture" },
      { name: "REST APIs" },
      { name: "Git & CI/CD", icon: "/skills/git.svg" },
    ],
  },
];

export default SKILL_CATEGORIES;
