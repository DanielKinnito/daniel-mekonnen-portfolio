import AsciiHeadshot from "../ui/ascii-headshot";
import IntroPanel from "./intro-panel";

export default function HomeSection() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center pb-10 pt-20 sm:py-20 lg:flex-row lg:px-10 lg:py-40 xl:gap-20">
        <IntroPanel />
        <div className="-z-10 -mt-10 hidden lg:flex items-center justify-center">
          <AsciiHeadshot 
            width={60} 
            height={60} 
            className="opacity-80"
          />
        </div>
      </div>
    </section>
  );
}
