"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface AsciiHeadshotProps {
  width?: number;
  height?: number;
  className?: string;
}

const ASCII_CHARS = '█▓▒░▒▓█';

export default function AsciiHeadshot({ 
  width = 80, 
  height = 80,
  className = "" 
}: AsciiHeadshotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [asciiArt, setAsciiArt] = useState<string[][]>([]);
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Convert image to ASCII art
  const imageToAscii = useCallback((img: HTMLImageElement, w: number, h: number): string[][] => {
    const asciiGrid: string[][] = [];
    const cellWidth = img.width / w;
    const cellHeight = img.height / h;

    for (let y = 0; y < h; y++) {
      const row: string[] = [];
      for (let x = 0; x < w; x++) {
        // Sample the center pixel of each cell
        const pixelX = Math.floor(x * cellWidth + cellWidth / 2);
        const pixelY = Math.floor(y * cellHeight + cellHeight / 2);
        
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, pixelX, pixelY, 1, 1, 0, 0, 1, 1);
          const pixelData = ctx.getImageData(0, 0, 1, 1).data;
          const brightness = (pixelData[0] + pixelData[1] + pixelData[2]) / 3;
          const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
          row.push(ASCII_CHARS[charIndex]);
        } else {
          row.push(' ');
        }
      }
      asciiGrid.push(row);
    }
    return asciiGrid;
  }, []);

  // Load image and convert to ASCII
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = '/profile.png';
    
    img.onload = () => {
      imageRef.current = img;
      const grid = imageToAscii(img, width, height);
      setAsciiArt(grid);
    };
  }, [width, height, imageToAscii]);

  // Animation loop for interactive effects
  useEffect(() => {
    if (asciiArt.length === 0) return;

    const animate = () => {
      timeRef.current += 0.03;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [asciiArt.length]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const charWidth = rect.width / width;
    const charHeight = rect.height / height;
    
    const x = Math.floor((e.clientX - rect.left) / charWidth);
    const y = Math.floor((e.clientY - rect.top) / charHeight);
    
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1, y: -1 });
  };

  // Calculate character style based on proximity to mouse
  const getCharStyle = (x: number, y: number): React.CSSProperties => {
    let opacity = 0.6;
    let scale = 1;
    let brightness = 0;

    // Distance from mouse
    if (mousePos.x >= 0) {
      const dx = x - mousePos.x;
      const dy = y - mousePos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 8;
      
      if (dist < maxDist) {
        // Closer to mouse = more visible
        const influence = 1 - dist / maxDist;
        opacity = 0.3 + influence * 0.7;
        scale = 1 + influence * 0.3;
        brightness = influence;
      }
    }

    // Subtle breathing effect when not interacting
    const breathe = Math.sin(timeRef.current * 2 + x * 0.1 + y * 0.1) * 0.1;
    if (mousePos.x < 0) {
      opacity += breathe;
    }

    return {
      opacity: Math.max(0.2, Math.min(1, opacity)),
      transform: `scale(${scale})`,
      color: `rgba(95, 164, 145, ${0.4 + brightness * 0.6})`,
      textShadow: brightness > 0 ? `0 0 ${brightness * 8}px rgba(95, 164, 145, ${brightness * 0.5})` : 'none',
      transition: 'all 0.15s ease-out',
    };
  };

  if (asciiArt.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <canvas ref={canvasRef} className="hidden" />
        <div className="text-main/30 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="hidden" />
      
      <div 
        className="font-mono leading-[0.75] tracking-[0.05em]"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${width}, 1fr)`,
          width: '100%',
          aspectRatio: '1/1',
          maxWidth: '400px',
        }}
      >
        {asciiArt.map((row, y) => (
          row.map((char, x) => (
            <span
              key={`${x}-${y}`}
              className="flex items-center justify-center"
              style={getCharStyle(x, y)}
            >
              {char}
            </span>
          ))
        ))}
      </div>

      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,12,14,0.8) 100%)',
        }}
      />
    </div>
  );
}
