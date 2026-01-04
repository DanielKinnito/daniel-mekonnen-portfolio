import skills from "@/lib/data/skills";
import Image from "next/image";

export default function Skills() {
  const allSkills = [
    ...skills.frontend,
    ...skills.backend,
    ...skills.tools,
  ];

  return (
    <div className="skills px-4 md:px-10">
      {/* Compact grid of skill boxes */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
        {allSkills.map((skill, index) => (
          <div
            key={skill.name}
            className="group relative aspect-square bg-dark-bg border border-neon-green/20 hover:border-neon-green/60 transition-all duration-200 flex items-center justify-center p-2"
            title={skill.name}
          >
            <Image
              src={skill.imageUrl}
              alt={skill.name}
              width={28}
              height={28}
              className="opacity-60 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
            />
            {/* Tooltip on hover */}
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-neon-green opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
