import AsciiHeadshot from "../ui/ascii-headshot";
import IntroPanel from "./intro-panel";

export default function HomeSection() {
  return (
    <section className="relative">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)] lg:gap-10 xl:gap-14 2xl:grid-cols-[minmax(0,1.25fr)_minmax(420px,0.75fr)]">
        <IntroPanel />

        <div className="relative mx-auto flex w-full max-w-[30rem] items-center justify-center lg:mt-2 xl:mt-4">
          <div className="absolute inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(95,164,145,0.28),transparent_60%)] blur-2xl" />
          <div className="glass-ring relative w-full rounded-[2rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs uppercase tracking-[0.32em] text-slate-400">
              <span>Visual Profile</span>
              <span>Live</span>
            </div>
            <div className="flex items-center justify-center py-5 sm:py-7">
              <AsciiHeadshot 
                width={60} 
                height={60} 
                className="opacity-95"
              />
            </div>
            <div className="grid gap-2 border-t border-white/10 pt-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-black/15 p-2.5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Focus</p>
                <p className="mt-2 text-sm text-slate-100">Clean products</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-black/15 p-2.5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Stack</p>
                <p className="mt-2 text-sm text-slate-100">Next.js + TypeScript</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-black/15 p-2.5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Mode</p>
                <p className="mt-2 text-sm text-slate-100">Open to work</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
