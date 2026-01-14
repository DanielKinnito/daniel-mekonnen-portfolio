import DesignedAndDevelopedBy from "./design-and-developed-by";
import GiveAStar from "./give-a-star";

export default function Footer() {
  return (
    <footer className="border-t border-neon-green/20 bg-dark-bg/50 py-4">
      <div className="flex justify-around uppercase">
        <DesignedAndDevelopedBy />

        <GiveAStar />
      </div>
    </footer>
  );
}
