import ContactAndResumeBtns from "@/components/home/contact-and-resume-btns";
import TypeWriterText from "./type-writer-text";

export default function IntroPanel() {
  return (
    <div className="relative w-full select-none space-y-4 xl:max-w-3xl 2xl:space-y-5">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-slate-300 backdrop-blur-xl sm:hidden">
        <span className="h-2 w-2 rounded-full bg-main shadow-[0_0_16px_rgba(95,164,145,0.7)]" />
        Portfolio / Product Engineer
      </div>

      <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[3.8rem] xl:text-[4.1rem] 2xl:text-[4.6rem]">
        Daniel Mekonnen
      </h1>
      <TypeWriterText />
      <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg md:text-xl xl:max-w-[42rem]">
        Software Engineering graduate from Addis Ababa Science and Technology University. Former Remote Head of Education at <a href="https://a2sv.org" target="_blank" rel="noopener noreferrer" className="text-main transition-colors hover:text-white">A2SV</a>. I build polished web products, competitive-programming grade algorithms, and interfaces that feel calm under pressure.
      </p>
      <ContactAndResumeBtns />

      <div className="grid gap-2 pt-1 sm:grid-cols-3 xl:hidden">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Built for</p>
          <p className="mt-2 text-sm text-slate-100">Hiring managers who value craft and clarity.</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Strengths</p>
          <p className="mt-2 text-sm text-slate-100">Next.js, TypeScript, Python, and system thinking.</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Signal</p>
          <p className="mt-2 text-sm text-slate-100">Fast to ship, careful with details, easy to work with.</p>
        </div>
      </div>

      <div className="hidden items-center gap-3 pt-1 xl:flex xl:flex-wrap">
        <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">Hiring-ready</span>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">Next.js / TypeScript / Python</span>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">Fast iteration, careful craft</span>
      </div>
    </div>
  );
}
