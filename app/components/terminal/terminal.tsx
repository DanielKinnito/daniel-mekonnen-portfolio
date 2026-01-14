"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { processCommand, CommandResponse } from './cli-engine';
import PROJECTS from "@/lib/data/projects";
import Image from "next/image";

interface HistoryItem {
  id: number;
  command: string;
  output: React.ReactNode;
}

interface TerminalProps {
    onClose: () => void;
}

export default function Terminal({ onClose }: TerminalProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'command' | 'projects'>('command');
  const [projectIndex, setProjectIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Focus input on mount and click
  useEffect(() => {
    if (mode === 'command') {
        inputRef.current?.focus();
    }
  }, [mode]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Handle keyboard events
  const handleKeyDown = useCallback((e: React.KeyboardEvent | KeyboardEvent) => {
    // Project Selection Mode Handling
    if (mode === 'projects') {
        if (e.key === 'ArrowUp' || e.key === 'k') {
            e.preventDefault();
            setProjectIndex(prev => Math.max(0, prev - 1));
        } else if (e.key === 'ArrowDown' || e.key === 'j') {
            e.preventDefault();
            setProjectIndex(prev => Math.min(PROJECTS.length - 1, prev + 1));
        } else if (e.key === 'q' || e.key === 'Q' || e.key === 'Escape') {
            e.preventDefault();
            setMode('command');
            setHistory(prev => [...prev, { id: Date.now(), command: '', output: <span className="opacity-50">Exited project interface.</span> }]);
            setTimeout(() => inputRef.current?.focus(), 10);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const project = PROJECTS[projectIndex];
            setMode('command');
            setHistory(prev => [...prev, { 
                id: Date.now(), 
                command: `view_project ${project.name}`, 
                output: (
                    <div className="flex flex-col gap-2 my-2 border-l-2 border-neon-purple pl-4">
                        <span className="text-xl font-bold text-main">{project.name}</span>
                        <p className="opacity-90">{project.description}</p>
                        <div className="flex gap-4 mt-2">
                            {project.urls.liveDemo && (
                                <a href={project.urls.liveDemo} target="_blank" className="text-main hover:underline">[ LIVE DEMO ]</a>
                            )}
                            <a href={project.urls.repo} target="_blank" className="text-main hover:underline">[ SOURCE CODE ]</a>
                        </div>
                    </div>
                )
            }]);
            setTimeout(() => inputRef.current?.focus(), 10);
        }
        return;
    }

    // Standard Command Mode
    if (e.key === 'Enter') {
      const command = input.trim();
      if (!command) return;

      const response = processCommand(command);

      if (response.type === 'clear') {
        setHistory([]);
      } else if (response.type === 'projects') {
          setHistory(prev => [...prev, { id: Date.now(), command, output: response.output }]);
          setMode('projects');
          setProjectIndex(0);
      } else {
        setHistory(prev => [
          ...prev,
          { id: Date.now(), command, output: response.output },
        ]);
      }
      
      setInput('');
    }
  }, [input, mode, projectIndex]);

  // Touch control handlers for mobile
  const handleTouchUp = useCallback(() => {
    if (mode === 'projects') {
        setProjectIndex(prev => Math.max(0, prev - 1));
    }
  }, [mode]);

  const handleTouchDown = useCallback(() => {
    if (mode === 'projects') {
        setProjectIndex(prev => Math.min(PROJECTS.length - 1, prev + 1));
    }
  }, [mode]);

  const handleTouchEnter = useCallback(() => {
    if (mode === 'projects') {
        const project = PROJECTS[projectIndex];
        setMode('command');
        setHistory(prev => [...prev, { 
            id: Date.now(), 
            command: `view_project ${project.name}`, 
            output: (
                <div className="flex flex-col gap-2 my-2 border-l-2 border-main pl-4">
                    <span className="text-xl font-bold text-main">{project.name}</span>
                    <p className="opacity-90">{project.description}</p>
                    <div className="flex gap-4 mt-2">
                        {project.urls.liveDemo && (
                            <a href={project.urls.liveDemo} target="_blank" className="text-main hover:underline">[ LIVE DEMO ]</a>
                        )}
                        <a href={project.urls.repo} target="_blank" className="text-main hover:underline">[ SOURCE CODE ]</a>
                    </div>
                </div>
            )
        }]);
        setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [mode, projectIndex]);

  const handleTouchBack = useCallback(() => {
    if (mode === 'projects') {
        setMode('command');
        setHistory(prev => [...prev, { id: Date.now(), command: '', output: <span className="opacity-50">Exited project interface.</span> }]);
        setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [mode]);

  return (
    <div 
        className="w-full h-full bg-black/90 p-4 md:p-8 font-vt323 text-lg md:text-xl text-main overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
    >
      {/* Welcome Message */}
      <div className="mb-8">
        <p className="opacity-70">Dedsec OS [Version 10.0.19045.3693]</p>
        <p className="opacity-70">(c) Dedsec Corporation. All rights reserved.</p>
        <br />
        <p>Type &quot;help&quot; to see available commands.</p>
        {isMobile && (
            <p className="text-xs mt-2 opacity-50">Use controls below for mobile navigation</p>
        )}
      </div>

      {/* History */}
      <div className="flex flex-col gap-4">
        {history.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
                <div className="flex gap-2 items-center opacity-80">
                    <span className="text-main">➜</span>
                    <span className="text-white">~</span>
                    <span>{item.command}</span>
                </div>
                <div className="pl-6 text-main/90">
                    {item.output}
                </div>
            </div>
        ))}
      </div>

      {/* Input Line (Hidden in Project Mode) */}
      {mode === 'command' && (
        <div className="flex gap-2 items-center mt-4">
            <span className="text-main">➜</span>
            <span className="text-white">~</span>
            <div className="flex-1 relative">
            <span className="text-main">{input}</span>
            <span className="inline-block w-2.5 h-5 bg-main animate-blink align-middle ml-0.5" />
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute inset-0 opacity-0 cursor-text"
                autoComplete="off"
                spellCheck="false"
            />
            </div>
        </div>
      )}

      {/* Project Selection Interface */}
      {mode === 'projects' && (
        <div className="mt-4 border border-main/30 p-2 rounded bg-black/50 outline-none" tabIndex={0} onKeyDown={handleKeyDown} autoFocus>
            <div className="text-main mb-2 font-bold px-2">SELECT PROJECT:</div>
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                {PROJECTS.map((p, i) => (
                    <div 
                        key={i} 
                        className={`px-2 py-1 flex justify-between ${i === projectIndex ? 'bg-main text-black font-bold' : 'text-gray-400'}`}
                    >
                        <span>{p.name}</span>
                        {i === projectIndex && <span>&lt; ENTER &gt;</span>}
                    </div>
                ))}
            </div>
            <div className="mt-2 text-xs opacity-50 px-2 pt-2 border-t border-white/10 flex justify-between">
                <span>Navigate: ↑ ↓</span>
                <span>Select: Enter</span>
                <span>Exit: Q</span>
            </div>
        </div>
      )}

      {/* Mobile Touch Controls - Only visible on mobile */}
      {isMobile && mode === 'projects' && (
        <div className="mt-4 flex gap-2 justify-center p-2 border-t border-main/20">
            <button 
                onTouchStart={(e) => { e.preventDefault(); handleTouchUp(); }}
                onClick={handleTouchUp}
                className="w-14 h-14 border border-main/50 rounded flex items-center justify-center text-main hover:bg-main/10 active:bg-main/20"
                aria-label="Scroll up"
            >
                ↑
            </button>
            <button 
                onTouchStart={(e) => { e.preventDefault(); handleTouchDown(); }}
                onClick={handleTouchDown}
                className="w-14 h-14 border border-main/50 rounded flex items-center justify-center text-main hover:bg-main/10 active:bg-main/20"
                aria-label="Scroll down"
            >
                ↓
            </button>
            <button 
                onTouchStart={(e) => { e.preventDefault(); handleTouchEnter(); }}
                onClick={handleTouchEnter}
                className="w-14 h-14 border border-main/50 rounded flex items-center justify-center text-main hover:bg-main/10 active:bg-main/20"
                aria-label="Select project"
            >
                ↵ Enter
            </button>
            <button 
                onTouchStart={(e) => { e.preventDefault(); handleTouchBack(); }}
                onClick={handleTouchBack}
                className="w-14 h-14 border border-red-500/50 rounded flex items-center justify-center text-red-400 hover:bg-red-500/10 active:bg-red-500/20"
                aria-label="Go back"
            >
                ←
            </button>
        </div>
      )}

      <div ref={bottomRef} className="h-8" />
    </div>
  );
}
