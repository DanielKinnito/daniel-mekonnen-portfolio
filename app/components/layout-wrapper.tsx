"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HudLayout from "./ui/hud-layout";
import TerminalOverlay from "./terminal/terminal-overlay";

// Dynamic imports for visual components (client-side only)
const ParticleField = dynamic(() => import("./visuals/particle-field"), { ssr: false });
const GridAnimation = dynamic(() => import("./visuals/grid-animation"), { ssr: false });
const DigitalNoise = dynamic(() => import("./visuals/digital-noise"), { ssr: false });
const ScanningBeam = dynamic(() => import("./visuals/scanning-beam"), { ssr: false });
const AmbientPulse = dynamic(() => import("./visuals/ambient-pulse"), { ssr: false });

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  // Pause animations when page is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

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
      {/* Ambient Background Layer - Only render when visible */}
      {isPageVisible && (
        <div className="fixed inset-0 pointer-events-none z-[-1]">
        {/* Full screen ambient pulse */}
        <div className="absolute inset-0">
          <AmbientPulse />
        </div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-30">
          <GridAnimation />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 opacity-40">
          <ParticleField />
        </div>
        
        {/* Digital noise texture */}
        <div className="absolute inset-0 opacity-20">
          <DigitalNoise />
        </div>
      </div>
      )}

      {/* Left Side Visual - Very Wide Screens Only */}
      <div className="hidden 2xl:block absolute left-0 top-0 w-[72px] h-full pointer-events-none z-[5] opacity-70">
        <div className="sticky top-0 h-screen">
          <ScanningBeam />
        </div>
      </div>

      {/* Right Side Visual - Very Wide Screens Only */}
      <div className="hidden 2xl:block absolute right-0 top-0 w-[72px] h-full pointer-events-none z-[5] opacity-70">
         <div className="sticky top-0 h-screen">
            <ScanningBeam />
         </div>
      </div>

      {/* Bottom Section Visual - Large Desktop Only */}
      <div className="hidden 2xl:block fixed bottom-0 left-[100px] right-[100px] h-[80px] pointer-events-none z-[5] opacity-50">
        <ParticleField />
      </div>

      {children}
      <TerminalOverlay isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      
      {/* Terminal Trigger Button - Always visible */}
      <button 
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-dark-bg/90 border border-main/40 hover:border-main px-3 py-2 rounded shadow-[0_0_6px_rgba(95,164,145,0.2)] hover:shadow-[0_0_10px_rgba(95,164,145,0.35)] transition-all group flex items-center gap-2"
        title="Open Terminal (or press `)"
      >
        <span className="text-main text-sm font-mono">&gt;_</span>
        <span className="text-[10px] text-gray-500 group-hover:text-main/80 hidden sm:inline">TERMINAL</span>
      </button>
    </HudLayout>
  );
}

