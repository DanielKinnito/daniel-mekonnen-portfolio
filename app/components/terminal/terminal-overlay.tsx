"use client";

import React, { useState, useEffect } from 'react';
import DoomPlayer from '../game/doom-player';
import Terminal from './terminal';

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TerminalOverlay({ isOpen, onClose }: TerminalOverlayProps) {
  const [isDoomRunning, setIsDoomRunning] = useState(false);

  // Reset Doom state when overlay is closed
  useEffect(() => {
    if (!isOpen) {
        setIsDoomRunning(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="relative w-full h-full md:w-[90%] md:h-[90%] bg-dark-bg border-2 border-neon-green/50 shadow-[0_0_20px_rgba(57,255,20,0.3)] rounded-lg overflow-hidden flex flex-col">
            
            {/* Header / Title Bar */}
            <div className="bg-neon-green/10 border-b border-neon-green/30 p-2 flex justify-between items-center select-none">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" onClick={onClose}></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-xs font-mono opacity-70">root@daniel:~/terminal</span>
                </div>
                <button onClick={onClose} className="text-xs hover:text-neon-green text-white/50">[ESC] TO CLOSE</button>
            </div>

            {/* Content */}
            <div className="flex-1 relative">
                {isDoomRunning ? (
                  <div className="w-full h-full bg-black">
                     <DoomPlayer onClose={() => setIsDoomRunning(false)} />
                  </div>
                ) : (
                  <Terminal 
                    onClose={onClose} 
                    onLaunchDoom={() => setIsDoomRunning(true)} 
                  />
                )}
            </div>

        </div>
    </div>
  );
}
