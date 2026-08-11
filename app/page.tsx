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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 pb-24 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
      {/* Hero Overlay with ASCII */}
      <section className="section-shell relative overflow-hidden lg:mt-2 xl:mt-4">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(95,164,145,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(122,106,143,0.1),transparent_28%)]" />
         <div className="absolute right-0 top-0 hidden translate-x-1/4 -translate-y-1/4 opacity-[0.06] lg:block">
           <AsciiArt art={HERO_ASCII} className="scale-125" />
         </div>
         <div className="relative space-y-5 xl:space-y-6 2xl:space-y-7">
           <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.38em] text-slate-400 sm:hidden">
             <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">Selected Work</span>
             <span>Polished interfaces, reliable systems, and calm motion.</span>
           </div>

           <HomeSection />
         </div>

         <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-400">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span>Scroll to explore</span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
         </div>
      </section>

      <div className="space-y-10">
        <div className="relative">
            <div className="absolute -left-2 top-4 hidden text-white/5 font-mono text-6xl -z-10 select-none lg:block">01</div>
            <div className="section-shell">
              <AboutSection />
            </div>
        </div>
        
        <SectionSeperatorBorder />

        <div className="relative">
             <div className="absolute -right-2 top-4 hidden text-white/5 font-mono text-6xl -z-10 select-none lg:block">02</div>
             <div className="section-shell">
               <SkillsSection />
             </div>
        </div>

        <SectionSeperatorBorder />

        <div className="relative">
             <div className="absolute -left-2 top-4 hidden text-white/5 font-mono text-6xl -z-10 select-none lg:block">03</div>
             <div className="section-shell">
               <ProjectsSection />
             </div>
        </div>
        
        <SectionSeperatorBorder />
        
        <div className="relative">
             <div className="absolute -right-2 top-4 hidden text-white/5 font-mono text-6xl -z-10 select-none lg:block">04</div>
             <div className="section-shell">
               <ContactSection />
             </div>
        </div>
      </div>
    </div>
  );
}
