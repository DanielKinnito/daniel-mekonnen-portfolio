export default function SectionHeading({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="text-[10px] uppercase tracking-[0.45em] text-slate-400">Section</span>
      <h2 className="font-heading text-4xl font-semibold uppercase text-white sm:text-5xl md:text-6xl">
        {text}
      </h2>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-main/70 to-transparent" />
    </div>
  );
}
