"use client";

import React from 'react';
import Terminal from './terminal';

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TerminalOverlay({ isOpen, onClose }: TerminalOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm">
        <div className="relative w-full h-full md:w-[90%] md:h-[90%] bg-dark-bg border border-main/40 shadow-[0_0_15px_rgba(95,164,145,0.2)] overflow-hidden flex flex-col">
            
            {/* Header / Title Bar */}
            <div className="bg-main/5 border-b border-main/20 p-2 flex justify-between items-center select-none">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/70 cursor-pointer hover:bg-red-400" onClick={onClose}></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-main/70"></div>
                    <span className="ml-4 text-xs font-mono opacity-60">root@daniel:~/terminal</span>
                </div>
                <button onClick={onClose} className="text-xs hover:text-main text-white/40">[ESC] CLOSE</button>
            </div>

            {/* Content */}
            <div className="flex-1 relative">
                <Terminal 
                    onClose={onClose} 
                />
            </div>

        </div>
    </div>
  );
}
