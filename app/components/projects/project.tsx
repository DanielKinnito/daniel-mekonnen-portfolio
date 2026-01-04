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
        "group flex w-full flex-col rounded-lg border border-border bg-secondary-background shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-main/20 hover:-translate-y-1 lg:w-[32%]",
      )}
    >
      <ProjectTitleButtons />

      {/* display  */}
      <div className="aspect-video w-full overflow-hidden rounded-md p-2 lg:p-3">
        <Image
          src={imageUrl}
          width={1920}
          height={1080}
          alt={`Screenshot of ${name}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* info */}
      <div className="px-3 pb-3">
        {/* top bar  */}
        <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
          <p className="text-xl font-semibold text-primary-foreground transition-colors lg:text-2xl">
            {name}
          </p>
          <div className="flex items-center gap-2">
            {urls.liveDemo && (
              <a
                href={urls.liveDemo}
                target="_blank"
                aria-label={`Live demo of ${name}`}
                className="cursor-pointer rounded-full border border-transparent bg-transparent px-2 py-0.5 text-xs text-typewriter/80 transition-all duration-200 hover:border-typewriter hover:bg-typewriter/10 hover:text-typewriter lg:text-sm"
              >
                Live Demo
              </a>
            )}
            <a
              href={urls.repo}
              target="_blank"
              aria-label={`Source code for ${name} on GitHub`}
              className="rounded-full p-1 transition-all duration-200 hover:bg-main/10"
            >
              <Image
                src={"/skills/github.svg"}
                width={40}
                height={40}
                alt="GitHub"
                className="w-5 cursor-pointer transition-transform duration-200 hover:scale-110 lg:w-6"
              />
            </a>
          </div>
        </div>

        {/* description  */}
        <div className="flex flex-col gap-2 self-start rounded-md">
          <span className="text-justify font-secondary text-sm leading-5 text-secondary-foreground line-clamp-4">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}
