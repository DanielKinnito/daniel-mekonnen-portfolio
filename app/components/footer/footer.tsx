import { GITHUB_LINK } from "@/lib/constants";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-xs font-mono text-muted sm:flex-row sm:px-6 lg:px-8">
        <div>
          <span>© 2026 Daniel Mekonnen. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`${GITHUB_LINK}/daniel-mekonnen-portfolio`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Image
              src="/skills/github.svg"
              width={14}
              height={14}
              alt=""
              className="opacity-70"
            />
            <span>Star on GitHub</span>
          </a>

          <span>•</span>

          <a
            href="#home"
            className="hover:text-primary transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
