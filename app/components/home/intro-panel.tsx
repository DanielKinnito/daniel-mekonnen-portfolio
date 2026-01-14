import ContactAndResumeBtns from "@/components/home/contact-and-resume-btns";
import TypeWriterText from "./type-writer-text";

export default function IntroPanel() {
  return (
    <div className="relative w-full select-none space-y-5 xl:w-1/2 2xl:w-6/12 2xl:space-y-7">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground">
        Daniel Mekonnen
      </h2>
      <TypeWriterText />
      <p className="font-secondary text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed max-w-lg">
        Software Engineering graduate from Addis Ababa Science and Technology University. Former Remote Head of Education at <a href="https://a2sv.org" target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline">A2SV</a>. 
        Passionate about algorithms, data structures, and competitive programming. Proficient in Python, JavaScript, Dart, C++, TypeScript and Java.
      </p>
      <ContactAndResumeBtns />
    </div>
  );
}
