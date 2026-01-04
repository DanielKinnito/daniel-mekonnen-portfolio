"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HudLayout from "./ui/hud-layout";
import TerminalOverlay from "./terminal/terminal-overlay";

// Dynamic imports for visual components (client-side only)
const MatrixRain = dynamic(() => import("./visuals/matrix-rain"), { ssr: false });
const AsciiNetwork = dynamic(() => import("./visuals/ascii-network"), { ssr: false });
const SignalWave = dynamic(() => import("./visuals/signal-wave"), { ssr: false });

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Toggle terminal with tilde key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on backtick/tilde or Ctrl+Space
      if (e.key === '`' || (e.ctrlKey && e.code === 'Space')) {
         setIsTerminalOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isTerminalOpen) {
          setIsTerminalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen]);

  return (
    <HudLayout>
      {/* Left Side Visuals - Desktop Only */}
      <div className="hidden xl:block absolute left-0 top-0 w-[120px] h-full pointer-events-none z-[5]">
        <div className="sticky top-0 h-screen flex flex-col">
            <div className="h-1/2 opacity-30 pointer-events-auto transition-opacity duration-500 hover:opacity-100">
            <MatrixRain />
            </div>
            <div className="h-1/2 opacity-40 pointer-events-auto transition-opacity duration-500 hover:opacity-100">
            <AsciiNetwork />
            </div>
        </div>
      </div>

      {/* Right Side Visuals - Desktop Only */}
      <div className="hidden xl:block absolute right-0 top-0 w-[120px] h-full pointer-events-none z-[5]">
         <div className="sticky top-0 h-screen">
            <SignalWave />
         </div>
      </div>

      {/* Bottom Wave - Large Desktop Only */}
      <div className="hidden 2xl:block fixed bottom-0 left-[120px] right-[120px] h-[60px] pointer-events-none z-[5] opacity-20">
        <SignalWave />
      </div>

      {children}
      <TerminalOverlay isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      
      {/* Terminal Trigger Button - Always visible */}
      <button 
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-black/90 border border-neon-green/50 hover:border-neon-green px-3 py-2 rounded shadow-[0_0_8px_rgba(40,180,20,0.3)] hover:shadow-[0_0_12px_rgba(40,180,20,0.5)] transition-all group flex items-center gap-2"
        title="Open Terminal (or press `)"
      >
        <span className="text-neon-green text-sm font-mono">&gt;_</span>
        <span className="text-[10px] text-gray-500 group-hover:text-gray-400 hidden sm:inline">TERMINAL</span>
      </button>
    </HudLayout>
  );
}

