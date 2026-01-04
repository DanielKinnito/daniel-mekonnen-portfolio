"use client";

import React, { useEffect, useState } from 'react';

export default function HudLayout({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-dark-bg text-neon-green selection:bg-neon-green selection:text-black font-mono">
      
      {/* Background Grid using Tailwind Utilities defined in config */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-20"></div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full h-full p-4 md:p-8 pt-16 md:pt-20">
        {children}
      </main>

      {/* HUD Overlay Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-2 md:p-6">
        
        {/* Top Bar */}
        <div className="flex justify-between items-start">
          {/* Top Left Corner */}
          <div className="flex flex-col items-start gap-1">
            <div className="h-4 w-4 border-l-2 border-t-2 border-neon-green"></div>
            <span className="text-xs md:text-sm tracking-widest opacity-80">SYS.ROOT.ADMIN</span>
            <span className="text-[10px] opacity-60">ID: 5930-XK</span>
          </div>

          {/* Top Center Decoder (Decorative) */}
          <div className="hidden md:flex gap-4 opacity-50 text-[10px]">
             {['A7F2', 'C4E1', '9D3B', 'F0A8', '5C72'].map((code, i) => (
                <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                  [{code}]
                </span>
             ))}
          </div>

          {/* Top Right Corner */}
          <div className="flex flex-col items-end gap-1">
             <div className="h-4 w-4 border-r-2 border-t-2 border-neon-green"></div>
             <span className="text-xs md:text-sm font-bold">{time}</span>
             <span className="text-[10px] text-neon-purple">CONNECTED</span>
          </div>
        </div>

        {/* Middle Side Decorators */}
        <div className="absolute top-1/2 left-2 md:left-6 -translate-y-1/2 flex flex-col gap-2 opacity-40">
           <div className="w-1 h-12 bg-neon-green/50"></div>
           <div className="w-1 h-3 bg-neon-green/30"></div>
           <div className="w-1 h-3 bg-neon-green/30"></div>
        </div>
        <div className="absolute top-1/2 right-2 md:right-6 -translate-y-1/2 flex flex-col gap-2 opacity-40 items-end">
           <div className="w-1 h-12 bg-neon-purple/50"></div>
           <div className="w-1 h-3 bg-neon-purple/30"></div>
           <div className="w-1 h-3 bg-neon-purple/30"></div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end">
          {/* Bottom Left Corner */}
          <div className="flex flex-col items-start gap-1">
             <span className="text-[10px] opacity-60">MEM: 64TB // OK</span>
             <div className="h-4 w-4 border-l-2 border-b-2 border-neon-green"></div>
          </div>

          {/* Bottom Right Corner */}
          <div className="flex flex-col items-end gap-1">
             <span className="text-[10px] opacity-60">LOC: UNKNOWN</span>
             <div className="h-4 w-4 border-r-2 border-b-2 border-neon-green"></div>
          </div>
        </div>

      </div>

      {/* CRT Scanline Overlay from globals.css */}
      <div className="crt fixed inset-0 z-[100] pointer-events-none"></div>
    </div>
  );
}
