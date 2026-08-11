import { cn } from "@/lib/utils";
import Image from "next/image";
import ProjectTitleButtons from "../ui/project-title-btns";
import { Project as ProjectInterface } from "@/lib/types/project";

export default function Project({
  name,
  description,
  imageUrl,
  urls,
}: ProjectInterface) {
  return (
    <div
      className={cn(
        "group flex w-full flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-main/25 hover:shadow-[0_24px_80px_rgba(0,0,0,0.4)] lg:w-[32%]",
      )}
    >
      <ProjectTitleButtons />

      {/* display  */}
      <div className="aspect-video w-full overflow-hidden rounded-t-[1.75rem] p-2 lg:p-3">
        <Image
          src={imageUrl}
          width={1920}
          height={1080}
          alt={`Screenshot of ${name}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full rounded-[1.25rem] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* info */}
      <div className="px-4 pb-4">
        {/* top bar  */}
        <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
          <p className="text-xl font-semibold text-white transition-colors lg:text-2xl">
            {name}
          </p>
          <div className="flex items-center gap-2">
            {urls.liveDemo && (
              <a
                href={urls.liveDemo}
                target="_blank"
                aria-label={`Live demo of ${name}`}
                className="cursor-pointer rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-200 transition-all duration-300 hover:border-main/35 hover:bg-main/10 hover:text-white lg:text-sm"
              >
                Live Demo
              </a>
            )}
            <a
              href={urls.repo}
              target="_blank"
              aria-label={`Source code for ${name} on GitHub`}
              className="rounded-full p-1.5 transition-all duration-300 hover:bg-main/10"
            >
              <Image
                src={"/skills/github.svg"}
                width={40}
                height={40}
                alt="GitHub"
                className="w-5 cursor-pointer transition-transform duration-300 hover:scale-110 lg:w-6"
              />
            </a>
          </div>
        </div>

        {/* description  */}
        <div className="flex flex-col gap-2 self-start rounded-md">
          <span className="line-clamp-4 text-justify font-secondary text-sm leading-6 text-slate-300">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}
