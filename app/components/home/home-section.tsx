"use client";

import { useState, useEffect } from "react";
import HexPicAvatar from "./hexpic-avatar";
import IntroPanel from "./intro-panel";
import TerminalDrawer from "../terminal/terminal-drawer";

export default function HomeSection() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global shortcut: ⌘K or Ctrl+K or ` to toggle terminal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      } else if (
        e.key === "`" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <section id="home" className="py-6 sm:py-10">
        {/* PostHog Tactile Desktop Window Container */}
        <div className="rounded-2xl border-2 border-border bg-card/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] backdrop-blur-xs overflow-hidden">
          {/* Tactile Window Header / Titlebar */}
          <div className="flex items-center justify-between border-b border-border bg-surface/70 px-4 py-2.5 select-none">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              <span className="ml-2 font-mono text-xs font-semibold text-secondary hidden sm:inline-block">
                workspace: ~/daniel-mekonnen • zsh
              </span>
            </div>

            {/* Tactile Terminal Launcher Button */}
            <button
              onClick={() => setTerminalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-card px-2.5 py-1 text-xs font-mono font-medium text-secondary hover:text-primary hover:border-accent shadow-[0_2px_0_0_#D0CDC2] dark:shadow-[0_2px_0_0_#0F1012] hover:-translate-y-0.5 hover:shadow-[0_3px_0_0_#D0CDC2] dark:hover:shadow-[0_3px_0_0_#0F1012] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              title="Open developer terminal (⌘K)"
            >
              <span className="text-accent font-bold">&gt;_</span>
              <span>Terminal</span>
              <kbd className="hidden sm:inline-block rounded bg-surface px-1.5 py-0.2 text-[10px] text-muted border border-border">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Window Body: Hero Content */}
          <div className="p-6 sm:p-10 lg:p-12">
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
          </div>
        </div>
      </section>

      {/* Terminal Drawer Overlay */}
      <TerminalDrawer isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
