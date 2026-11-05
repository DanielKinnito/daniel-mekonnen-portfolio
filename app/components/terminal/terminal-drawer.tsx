"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { GMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK, RESUME_LINK } from "@/lib/constants";
import { useTheme } from "../theme-provider";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export default function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [isDoomRunning, setIsDoomRunning] = useState(false);
  const [isDoomLoading, setIsDoomLoading] = useState(true);

  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "init",
      command: "welcome",
      output: (
        <div className="space-y-1.5 text-xs">
          <p className="text-accent font-bold">
            Daniel Mekonnen — Interactive Terminal v1.2
          </p>
          <p className="text-secondary">
            Type <span className="text-primary font-bold">help</span> to view available commands, or click any chip below.
          </p>
        </div>
      ),
    },
  ]);

  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-focus on open (when not running DOOM)
  useEffect(() => {
    if (isOpen && !isDoomRunning) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isDoomRunning]);

  // Scroll to bottom on new history
  useEffect(() => {
    if (isOpen && !isDoomRunning) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen, isDoomRunning]);

  // Handle DOOM exit
  const handleExitDoom = useCallback(() => {
    setIsDoomRunning(false);
    setIsDoomLoading(true);
    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: "exit doom",
        output: (
          <p className="text-xs text-stone-400">
            [DOOM protocol terminated. Returning to terminal.]
          </p>
        ),
      },
    ]);
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  // Handle global Escape key: exits DOOM first, or closes terminal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        if (isDoomRunning) {
          e.preventDefault();
          handleExitDoom();
        } else {
          onClose();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDoomRunning, onClose, handleExitDoom]);

  const runCommand = useCallback((rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setPastCommands((prev) => [...prev, cmd]);
    setCmdIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-accent font-semibold">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-[100px_1fr] gap-x-3 gap-y-1 pt-1 text-secondary">
              <span className="text-primary font-bold">about</span>
              <span>Overview &amp; backend engineering focus</span>
              <span className="text-primary font-bold">experience</span>
              <span>Work track (AfterQuery, Revelo, A2SV)</span>
              <span className="text-primary font-bold">projects</span>
              <span>Production &amp; open-source projects</span>
              <span className="text-primary font-bold">hexpic</span>
              <span>HexPic ASCII engine specs &amp; MCP</span>
              <span className="text-primary font-bold">skills</span>
              <span>Technical stack matrix</span>
              <span className="text-primary font-bold">resume</span>
              <span>Open latest Google Drive resume</span>
              <span className="text-primary font-bold">theme</span>
              <span>Toggle Light / Dark mode</span>
              <span className="text-primary font-bold">doom</span>
              <span>Launch secret DOOM (1993) shareware</span>
              <span className="text-primary font-bold">clear</span>
              <span>Clear terminal history</span>
              <span className="text-primary font-bold">exit</span>
              <span>Close terminal</span>
            </div>
          </div>
        );
        break;

      case "about":
        outputNode = (
          <div className="space-y-1.5 text-xs text-secondary leading-relaxed">
            <p className="text-primary font-bold">Daniel Mekonnen — Backend Software Engineer</p>
            <p>
              Focused on scalable backend microservices, distributed APIs, and performance-critical developer tools.
              Creator of HexPic, e-commerce mini-apps, and automated pipelines.
            </p>
            <p className="text-muted">
              Location: Addis Ababa, ET • Email: {GMAIL_LINK}
            </p>
          </div>
        );
        break;

      case "experience":
      case "exp":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="border-l-2 border-accent pl-2.5">
              <p className="text-primary font-bold">AfterQuery — Software Engineer (May 2026 — Present)</p>
              <p className="text-secondary">NDA-restricted AI reasoning evaluation rubrics &amp; algorithmic correctness.</p>
            </div>
            <div className="border-l-2 border-border pl-2.5">
              <p className="text-primary font-bold">Revelo — Technical Code Evaluator (Jan 2026 — Mar 2026)</p>
              <p className="text-secondary">Audited and refactored AI-generated Python/Go codebases.</p>
            </div>
            <div className="border-l-2 border-border pl-2.5">
              <p className="text-primary font-bold">A2SV — Head of Education (Mar 2025 — Oct 2025)</p>
              <p className="text-secondary">Led Lecture Squad, instructed 18 international students in advanced DSA.</p>
            </div>
            <div className="border-l-2 border-border pl-2.5">
              <p className="text-primary font-bold">Eskalate LLC — Software Engineer Intern (Jun 2024 — Sep 2024)</p>
              <p className="text-secondary">Built product catalog with Clean Architecture and REST API caching.</p>
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-accent font-semibold">FEATURED PROJECTS:</p>
            <div className="space-y-1 text-secondary">
              <p>
                <span className="text-primary font-bold">1. HexPic:</span> Universal raster-to-vector ASCII &amp; MCP engine (TypeScript, Canvas).
              </p>
              <p>
                <span className="text-primary font-bold">2. Telegram Sales CRM:</span> Mini App &amp; Express CRM backed by Notion &amp; Supabase.
              </p>
              <p>
                <span className="text-primary font-bold">3. Career-Fit-Jobs:</span> Telegram scraper bot with automated matching intervals.
              </p>
              <p>
                <span className="text-primary font-bold">4. Smart Legal Platform:</span> Ethiopian law RAG chatbot with Gemini API &amp; Docker.
              </p>
            </div>
          </div>
        );
        break;

      case "hexpic":
        outputNode = (
          <div className="space-y-1.5 text-xs text-secondary">
            <p className="text-primary font-bold">hexpic (npm package v0.3.1)</p>
            <p>High-performance visual engine converting images to TrueColor ASCII &amp; SVGs.</p>
            <p className="text-muted font-mono">
              Features: Atkinson dithering, 3x3 Sobel convolution, MCP server stdio, in-browser Canvas.
            </p>
            <a
              href="https://github.com/DanielKinnito/hexpic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-accent/80"
            >
              github.com/DanielKinnito/hexpic ↗
            </a>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-1 text-xs text-secondary">
            <p><span className="text-primary font-bold">Languages:</span> Python, TypeScript, Go, Dart, SQL, C++, PHP, Java</p>
            <p><span className="text-primary font-bold">Frameworks:</span> Node.js, Express, Next.js, React, Django, Flutter</p>
            <p><span className="text-primary font-bold">Databases &amp; Cloud:</span> PostgreSQL, Supabase, MongoDB, Docker, Linux</p>
            <p><span className="text-primary font-bold">Tools:</span> REST APIs, MCP, CI/CD, Git, TDD, Telethon, GrammY</p>
          </div>
        );
        break;

      case "resume":
        window.open(RESUME_LINK, "_blank");
        outputNode = (
          <p className="text-xs text-accent">
            Opening resume in new tab: {RESUME_LINK}
          </p>
        );
        break;

      case "theme":
        toggleTheme();
        outputNode = (
          <p className="text-xs text-primary">
            Theme toggled to: <span className="text-accent font-bold">{theme === "dark" ? "light" : "dark"}</span>
          </p>
        );
        break;

      case "doom":
        setIsDoomRunning(true);
        setIsDoomLoading(true);
        return;

      case "clear":
        setHistory([]);
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        outputNode = (
          <p className="text-xs text-red-400">
            command not found: <span className="font-bold">{cmd}</span>. Type <span className="text-primary underline">help</span> for commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: rawCmd,
        output: outputNode,
      },
    ]);
  }, [theme, toggleTheme, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length === 0) return;
      const nextIdx = cmdIndex === -1 ? pastCommands.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(nextIdx);
      setInput(pastCommands[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex === -1) return;
      const nextIdx = cmdIndex + 1;
      if (nextIdx >= pastCommands.length) {
        setCmdIndex(-1);
        setInput("");
      } else {
        setCmdIndex(nextIdx);
        setInput(pastCommands[nextIdx]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative flex h-[520px] w-full max-w-2xl flex-col rounded-xl border-2 border-border bg-[#0D0E11] text-stone-100 shadow-2xl overflow-hidden font-mono">
        {/* PostHog tactile desktop title bar */}
        <div className="flex items-center justify-between border-b border-border/80 bg-[#16171C] px-3.5 py-2.5 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={isDoomRunning ? handleExitDoom : onClose}
              className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 cursor-pointer"
              aria-label="Close"
              title="Close"
            />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            <span className="ml-2 text-xs font-semibold text-stone-300">
              {isDoomRunning ? "DOOM (1993) Wasm Edition" : "daniel@portfolio:~ [bash]"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isDoomRunning ? (
              <div className="flex items-center gap-2">
                <a
                  href="https://silentspacemarine.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 rounded border border-stone-700 bg-stone-800 px-2 py-0.5 text-[11px] text-stone-300 hover:text-white hover:border-accent transition-colors"
                  title="Open direct window if your browser blocks iframes"
                >
                  <span>Direct Tab ↗</span>
                </a>
                <button
                  onClick={handleExitDoom}
                  className="inline-flex items-center gap-1.5 rounded border-2 border-red-500/80 bg-red-950/40 px-2 py-0.5 text-xs font-bold text-red-300 hover:bg-red-900/60 transition-colors cursor-pointer"
                >
                  <span>[X] EXIT (ESC)</span>
                </button>
              </div>
            ) : (
              <>
                <span className="text-[11px] text-stone-400">ESC to exit</span>
                <button
                  onClick={onClose}
                  className="rounded px-1.5 py-0.5 text-xs text-stone-400 hover:bg-stone-800 hover:text-stone-100 transition-colors"
                >
                  ✕
                </button>
              </>
            )}
          </div>
        </div>

        {/* View Switch: DOOM Game Container or Terminal */}
        {isDoomRunning ? (
          <div className="relative flex-1 w-full h-full bg-black overflow-hidden select-none">
            {isDoomLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/95 text-accent font-mono text-xs space-y-2 p-6 text-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                <p className="animate-pulse font-bold tracking-wider text-sm">
                  INITIALIZING WEBASSEMBLY DOOM...
                </p>
                <p className="text-[11px] text-stone-500">
                  WASD / Arrows to move • Ctrl to shoot • Space to open doors
                </p>
                <div className="pt-2">
                  <a
                    href="https://silentspacemarine.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-accent underline hover:text-accent/80"
                  >
                    If your browser or ad-blocker restricts iframes, click to play directly in a tab ↗
                  </a>
                </div>
              </div>
            )}
            <iframe
              src="https://silentspacemarine.com/"
              allow="autoplay; fullscreen; pointer-lock"
              className="w-full h-full border-0 bg-black"
              onLoad={() => setIsDoomLoading(false)}
              title="DOOM (1993)"
            />
          </div>
        ) : (
          <>
            {/* Quick Command Chips */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-border/60 bg-[#121316] px-3 py-1.5 text-[11px]">
              <span className="text-stone-500 mr-1">Quick:</span>
              {["help", "about", "projects", "hexpic", "skills", "experience", "resume"].map((c) => (
                <button
                  key={c}
                  onClick={() => runCommand(c)}
                  className="rounded border border-stone-800 bg-[#1A1B20] px-2 py-0.5 text-stone-300 hover:border-accent hover:text-accent transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Terminal Output Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs leading-relaxed">
              {history.map((h) => (
                <div key={h.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-stone-400">
                    <span className="text-accent font-bold">daniel@portfolio:~$</span>
                    <span className="text-stone-100 font-semibold">{h.command}</span>
                  </div>
                  <div className="pl-4">{h.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Interactive Input Form */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border/80 bg-[#14151A] px-3.5 py-2.5"
            >
              <span className="text-accent font-bold text-xs select-none">daniel@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command (help, projects, resume, or 'doom'...)"
                className="flex-1 bg-transparent text-xs text-stone-100 outline-none placeholder:text-stone-600 font-mono"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="submit"
                className="rounded border border-stone-700 bg-stone-800 px-2 py-0.5 text-[11px] text-stone-300 hover:border-accent hover:text-accent font-mono transition-colors"
              >
                Enter ↵
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
