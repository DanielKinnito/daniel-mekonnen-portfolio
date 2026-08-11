"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface AsciiHeadshotProps {
  width?: number;
  height?: number;
  className?: string;
}

const ASCII_CHARS = '█▓▒░▒▓█';

export default function AsciiHeadshot({ 
  width = 60, 
  height = 60,
  className = "" 
}: AsciiHeadshotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const asciiGridRef = useRef<string[][]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Convert image to ASCII grid (runs once)
  const imageToAscii = useCallback((img: HTMLImageElement, w: number, h: number): string[][] => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return [];

    tempCtx.drawImage(img, 0, 0, w, h);
    const imageData = tempCtx.getImageData(0, 0, w, h);
    const data = imageData.data;

    const grid: string[][] = [];
    for (let y = 0; y < h; y++) {
      const row: string[] = [];
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
        const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
        row.push(ASCII_CHARS[charIndex]);
      }
      grid.push(row);
    }
    return grid;
  }, []);

  // Load image and convert to ASCII
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = '/profile.png';
    
    img.onload = () => {
      asciiGridRef.current = imageToAscii(img, width, height);
      setIsLoaded(true);
    };
  }, [width, height, imageToAscii]);

  // Canvas animation loop
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, 400);
      canvas.width = size;
      canvas.height = size;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      timeRef.current += 0.03;
      
      const cellWidth = canvas.width / width;
      const cellHeight = canvas.height / height;

      // Clear canvas
      ctx.fillStyle = 'rgba(10, 12, 14, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font
      const fontSize = Math.max(6, cellWidth * 0.9);
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const waveX = Math.sin(timeRef.current * 1.2) * 1.2;
      const waveY = Math.cos(timeRef.current * 1.05) * 0.8;

      // Draw ASCII characters
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const char = asciiGridRef.current[y]?.[x] || ' ';
          const px = x * cellWidth + cellWidth / 2;
          const py = y * cellHeight + cellHeight / 2;

          const breathe = Math.sin(timeRef.current * 1.6 + x * 0.12 + y * 0.1) * 0.08;
          const driftX = waveX + Math.sin((y + timeRef.current) * 0.16) * 0.6;
          const driftY = waveY + Math.cos((x + timeRef.current) * 0.14) * 0.5;

          const opacity = Math.max(0.18, Math.min(1, 0.34 + breathe));
          ctx.fillStyle = `rgba(95, 164, 145, ${opacity})`;
          ctx.shadowColor = 'rgba(95, 164, 145, 0.12)';
          ctx.shadowBlur = 4;

          ctx.fillText(char, px + driftX, py + driftY);
        }
      }

      // Reset shadow
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isLoaded, width, height]);

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-main/30 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full max-w-[400px] aspect-square"
      />
      
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
