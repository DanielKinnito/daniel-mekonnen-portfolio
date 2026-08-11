export default function TypeWriterText() {
  return (
    <div className="inline-flex max-w-2xl items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-secondary text-sm text-slate-200 shadow-[0_12px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:text-base xl:text-lg">
      <span className="h-2.5 w-2.5 rounded-full bg-main shadow-[0_0_16px_rgba(95,164,145,0.75)]" />
      <span className="typewriter-text">
        I design and ship interfaces that feel fast, clear, and composed.
      </span>
    </div>
  );
}
