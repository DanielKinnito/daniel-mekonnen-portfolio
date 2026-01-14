import AboutSection from "./components/about/about-section";
import ContactSection from "./components/contact/contact-section";
import HomeSection from "./components/home/home-section";
import ProjectsSection from "./components/projects/projects-section";
import SkillsSection from "./components/skills/skills-section";
import SectionSeperatorBorder from "./components/ui/section-seperator-border";
import AsciiArt from "./components/ui/ascii-art";

const HERO_ASCII = `
  ____  _      _                      
 |  _ \\| | __ | |  _ __    ___   ___  
 | |_) | |/__\\| | | '_ \\  / _ \\ / __| 
 |  _ <| ||   | | | | | ||  __/ \\__ \\ 
 |_| \\_\\_| \\_\\|_| |_| |_| \\___| |___/ 
`;

export default function Home() {
  return (
    <div className="px-4 md:px-8 space-y-20 pb-24">
      {/* Hero Overlay with ASCII */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none scale-150">
           <AsciiArt art={HERO_ASCII} />
         </div>
         <div className="z-10 bg-dark-bg/70 backdrop-blur-sm p-6 border border-neon-green/25 relative group">
           {/* Decorative corners - minimalist */}
           <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neon-green"></div>
           <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-neon-green"></div>
           <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-neon-green"></div>
           <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neon-green"></div>

           <HomeSection />
         </div>
         
         <div className="mt-12 animate-bounce opacity-40 text-xs">
            SCROLL TO EXPLORE
         </div>
      </section>

      <div className="space-y-16">
        {/* Wrapping sections in "Encrypted" style containers */}
        <div className="relative">
            <div className="absolute -left-4 top-0 text-neon-green/15 font-mono text-5xl -z-10 select-none">01</div>
            <AboutSection />
        </div>
        
        <SectionSeperatorBorder />

        <div className="relative">
             <div className="absolute -right-4 top-0 text-neon-green/15 font-mono text-5xl -z-10 select-none">02</div>
             <SkillsSection />
        </div>

        <SectionSeperatorBorder />

        <div className="relative">
             <div className="absolute -left-4 top-0 text-neon-green/15 font-mono text-5xl -z-10 select-none">03</div>
             <ProjectsSection />
        </div>
        
        <SectionSeperatorBorder />
        
        <div className="relative">
             <div className="absolute -right-4 top-0 text-neon-green/15 font-mono text-5xl -z-10 select-none">04</div>
             <ContactSection />
        </div>
      </div>
    </div>
  );
}
