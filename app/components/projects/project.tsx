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
        "group flex w-full flex-col rounded-lg border border-border bg-secondary-background shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-main/20 hover:-translate-y-1 lg:w-[48%]",
      )}
    >
      <ProjectTitleButtons />

      {/* display  */}
      <div className="aspect-video w-full overflow-hidden rounded-md p-2 lg:p-3">
        <Image
          src={imageUrl}
          width={1920}
          height={1080}
          alt="project-main"
          className="h-full w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* info */}
      <div className="px-2 pb-2 lg:px-3">
        {/* top bar  */}
        <div className="flex items-center justify-between border-b border-border pb-2">
          <p className="text-2xl font-semibold text-primary-foreground transition-colors lg:text-3xl">
            {name}
          </p>
          <div className="flex items-center gap-2">
            {urls.liveDemo && (
              <a
                href={urls.liveDemo}
                target="_blank"
                className="cursor-pointer rounded-full border border-transparent bg-transparent px-3 py-1 text-typewriter/80 transition-all duration-200 hover:border-typewriter hover:bg-typewriter/10 hover:text-typewriter lg:text-xl"
              >
                Live Demo
              </a>
            )}
            <a
              href={urls.repo}
              target="_blank"
              className="rounded-full p-1 transition-all duration-200 hover:bg-main/10"
            >
              <Image
                src={"/skills/github.svg"}
                width={40}
                height={40}
                alt="project-main"
                className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110 lg:w-7"
              />
            </a>
          </div>
        </div>

        {/* description  */}
        <div className="mt-3 flex flex-col gap-2 self-start rounded-md">
          <span className="text-justify font-secondary text-base leading-6 text-secondary-foreground">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}
