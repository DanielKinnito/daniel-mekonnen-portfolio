import ContactAndResumeBtns from "@/components/home/contact-and-resume-btns";
import TypeWriterText from "./type-writer-text";

export default function IntroPanel() {
  return (
    <div className="relative w-full select-none space-y-6 xl:w-1/2 2xl:w-6/12 2xl:space-y-8">
      <h2 className="text-5xl font-bold text-main sm:text-6xl md:text-7xl">
        Daniel Mekonnen
      </h2>
      <TypeWriterText />
      <p className="font-secondary text-base tracking-tight text-primary-foreground sm:text-xl md:text-2xl 2xl:mr-10">
        Software Engineering graduate from Addis Ababa Science and Technology University, Former Remote Head of Education and Lecture Squad Lead at <a href="https://a2sv.org" target="_blank" rel="noopener noreferrer">A2SV</a>, passionate about algorithms, 
        data structures, and competitive programming. Skilled in Python, JavaScript, Dart, C++, TypeScript and Java.
      </p>
      <ContactAndResumeBtns />

      {/* <LanguagesImageBg /> */}
    </div>
  );
}
