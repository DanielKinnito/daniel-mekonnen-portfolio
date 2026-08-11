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
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(95,164,145,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(122,106,143,0.12),transparent_24%),linear-gradient(180deg,#070a11_0%,#05070b_100%)] text-slate-100 selection:bg-main/30 selection:text-white font-primary">
      
      {/* Background Grid using Tailwind Utilities defined in config */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-[0.14]"></div>

      <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_25%,rgba(5,7,11,0.45)_100%)]"></div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full h-full px-4 pt-20 pb-8 md:px-6 lg:px-8 lg:pt-24">
        {children}
      </main>

      {/* HUD Overlay Layer - Minimalist Design */}
      <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-3 md:p-6">
        
        {/* Top Bar */}
        <div className="flex justify-between items-start text-slate-300/80">
          {/* Top Left Corner */}
          <div className="flex flex-col items-start gap-1">
            <div className="h-3 w-3 border-l border-t border-main/80"></div>
            <span className="text-[10px] tracking-[0.35em] uppercase opacity-70">SYS.ROOT</span>
          </div>

          {/* Top Right Corner */}
          <div className="flex flex-col items-end gap-1">
             <div className="h-3 w-3 border-r border-t border-main/80"></div>
             <span className="text-xs font-semibold text-white/80 tabular-nums">{time}</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end">
          {/* Bottom Left Corner */}
          <div className="flex flex-col items-start gap-1">
             <div className="h-3 w-3 border-l border-b border-main/80"></div>
          </div>

          {/* Bottom Right Corner */}
          <div className="flex flex-col items-end gap-1">
             <div className="h-3 w-3 border-r border-b border-main/80"></div>
          </div>
        </div>

      </div>

      {/* Subtle Scanline Overlay */}
      <div className="crt fixed inset-0 z-[100] pointer-events-none opacity-[0.07] motion-reduce:opacity-0"></div>
    </div>
  );
}
