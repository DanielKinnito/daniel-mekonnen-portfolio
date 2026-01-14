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
    <div className="relative min-h-screen w-full overflow-hidden bg-dark-bg text-neon-green selection:bg-main/60 selection:text-white font-mono">
      
      {/* Background Grid using Tailwind Utilities defined in config */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-30"></div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full h-full p-4 md:p-8 pt-16 md:pt-20">
        {children}
      </main>

      {/* HUD Overlay Layer - Minimalist Design */}
      <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-3 md:p-6">
        
        {/* Top Bar */}
        <div className="flex justify-between items-start">
          {/* Top Left Corner */}
          <div className="flex flex-col items-start gap-1">
            <div className="h-3 w-3 border-l border-t border-neon-green"></div>
            <span className="text-xs tracking-widest opacity-70">SYS.ROOT</span>
          </div>

          {/* Top Right Corner */}
          <div className="flex flex-col items-end gap-1">
             <div className="h-3 w-3 border-r border-t border-neon-green"></div>
             <span className="text-xs font-bold">{time}</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end">
          {/* Bottom Left Corner */}
          <div className="flex flex-col items-start gap-1">
             <div className="h-3 w-3 border-l border-b border-neon-green"></div>
          </div>

          {/* Bottom Right Corner */}
          <div className="flex flex-col items-end gap-1">
             <div className="h-3 w-3 border-r border-b border-neon-green"></div>
          </div>
        </div>

      </div>

      {/* Subtle Scanline Overlay */}
      <div className="crt fixed inset-0 z-[100] pointer-events-none opacity-15"></div>
    </div>
  );
}
