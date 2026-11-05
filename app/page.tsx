import ExperienceSection from "./components/experience/experience-section";
import ContactSection from "./components/contact/contact-section";
import HomeSection from "./components/home/home-section";
import ProjectsSection from "./components/projects/projects-section";
import SkillsSection from "./components/skills/skills-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <HomeSection />
        <div className="border-t border-border/70" />
        <ExperienceSection />
        <div className="border-t border-border/70" />
        <ProjectsSection />
        <div className="border-t border-border/70" />
        <SkillsSection />
        <div className="border-t border-border/70" />
        <ContactSection />
      </div>
    </div>
  );
}
