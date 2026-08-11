import DesignedAndDevelopedBy from "./design-and-developed-by";
import GiveAStar from "./give-a-star";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-black/20 py-5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-4 text-xs uppercase tracking-[0.35em] text-slate-400 sm:px-6 lg:px-8">
        <DesignedAndDevelopedBy />

        <GiveAStar />
      </div>
    </footer>
  );
}
