"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Characters to use (mix of ASCII and some special chars)
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[]|';
    
    let columns: number[] = [];
    let drops: number[] = [];
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      const fontSize = 14;
      const columnCount = Math.floor(canvas.width / fontSize);
      
      columns = Array(columnCount).fill(0);
      drops = Array(columnCount).fill(0).map(() => Math.random() * -100);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(8, 8, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fontSize = 14;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns.length; i++) {
        // Vary color based on proximity to mouse
        const distToMouse = Math.abs(i * fontSize - mousePos.x);
        const brightness = Math.max(0.2, 1 - distToMouse / 300);
        
        // Mix of green and purple based on position
        const hue = i % 2 === 0 ? 120 : 280;
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${brightness * 0.8})`;

        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [mousePos.x]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full opacity-40 pointer-events-auto"
      style={{ background: 'transparent' }}
    />
  );
}
