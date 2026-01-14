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
  const mousePosRef = useRef({ x: -1, y: -1 });
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
      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;

      // Clear canvas
      ctx.fillStyle = 'rgba(10, 12, 14, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font
      const fontSize = Math.max(6, cellWidth * 0.9);
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw ASCII characters
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const char = asciiGridRef.current[y]?.[x] || ' ';
          const px = x * cellWidth + cellWidth / 2;
          const py = y * cellHeight + cellHeight / 2;

          // Calculate mouse influence
          let opacity = 0.5;
          let brightness = 0;

          if (mouseX >= 0) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 8;

            if (dist < maxDist) {
              const influence = 1 - dist / maxDist;
              opacity = 0.3 + influence * 0.7;
              brightness = influence;
            }
          }

          // Subtle breathing effect when not interacting
          if (mouseX < 0) {
            const breathe = Math.sin(timeRef.current * 2 + x * 0.1 + y * 0.1) * 0.1;
            opacity += breathe;
          }

          opacity = Math.max(0.2, Math.min(1, opacity));

          // Set color with brightness
          const r = Math.floor(95 + brightness * 60);
          const g = Math.floor(164 + brightness * 60);
          const b = Math.floor(145 + brightness * 60);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;

          // Add glow effect for bright areas
          if (brightness > 0.3) {
            ctx.shadowColor = `rgba(95, 164, 145, ${brightness * 0.5})`;
            ctx.shadowBlur = brightness * 8;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, px, py);
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

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const cellWidth = canvas.width / width;
    const cellHeight = canvas.height / height;

    const x = Math.floor((e.clientX - rect.left) / cellWidth);
    const y = Math.floor((e.clientY - rect.top) / cellHeight);

    mousePosRef.current = { x, y };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -1, y: -1 };
  };

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
