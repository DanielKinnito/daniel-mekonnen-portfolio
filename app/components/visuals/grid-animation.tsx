"use client";

import React, { useEffect, useRef } from 'react';

export default function GridAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offsetX = 0;
    let offsetY = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      timeRef.current += 0.008;

      // Clear canvas
      ctx.fillStyle = 'rgba(10, 12, 14, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gridSize = 50;
      const perspectiveOffset = timeRef.current * 20;

      // Muted sage and slate colors
      const gridColor = 'rgba(95, 164, 145, 0.08)';
      const horizontalLineColor = 'rgba(71, 85, 105, 0.1)';
      const verticalLineColor = 'rgba(100, 116, 139, 0.08)';

      // Draw horizontal lines with subtle wave
      for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.strokeStyle = horizontalLineColor;
        ctx.lineWidth = 0.5;

        const waveOffset = Math.sin(timeRef.current + y * 0.02) * 3;

        for (let x = 0; x < canvas.width; x += 5) {
          const yPos = y + waveOffset;
          if (x === 0) {
            ctx.moveTo(x, yPos);
          } else {
            ctx.lineTo(x, yPos);
          }
        }
        ctx.stroke();
      }

      // Draw vertical lines with movement
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.strokeStyle = verticalLineColor;
        ctx.lineWidth = 0.5;

        const lineOffset = (x + perspectiveOffset) % (canvas.width + gridSize * 2);
        const adjustedX = lineOffset < 0 ? lineOffset + canvas.width + gridSize * 2 : lineOffset;

        for (let y = 0; y < canvas.height; y += 5) {
          const xPos = adjustedX + Math.sin(timeRef.current + y * 0.03) * 2;
          if (y === 0) {
            ctx.moveTo(xPos, y);
          } else {
            ctx.lineTo(xPos, y);
          }
        }
        ctx.stroke();
      }

      // Draw intersection points
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          const lineOffset = (x + perspectiveOffset) % (canvas.width + gridSize * 2);
          const adjustedX = lineOffset < 0 ? lineOffset + canvas.width + gridSize * 2 : lineOffset;
          const waveOffset = Math.sin(timeRef.current + y * 0.02) * 3;
          const yPos = y + waveOffset;

          // Only draw some intersection points for a sparse, clean look
          if (Math.random() > 0.7) {
            ctx.beginPath();
            ctx.arc(adjustedX, yPos, 0.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(95, 164, 145, 0.15)';
            ctx.fill();
          }
        }
      }

      // Add subtle scanning line
      const scanY = (Math.sin(timeRef.current * 0.5) * 0.5 + 0.5) * canvas.height;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.03)';
      ctx.lineWidth = 2;
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
