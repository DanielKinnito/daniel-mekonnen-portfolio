import HexPicAvatar from "./hexpic-avatar";
import IntroPanel from "./intro-panel";

export default function HomeSection() {
  return (
    <section id="home" className="py-8 sm:py-14 lg:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Bio, Credentials & Actions */}
        <div className="lg:col-span-7">
          <IntroPanel />
        </div>

        {/* Right Column: Interactive HexPic ASCII Avatar */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md">
            <HexPicAvatar />
          </div>
        </div>
      </div>
    </section>
  );
}
