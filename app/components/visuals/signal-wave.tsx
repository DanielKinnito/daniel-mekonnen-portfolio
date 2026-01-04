"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function SignalWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      timeRef.current += 0.02;
      
      ctx.fillStyle = 'rgba(8, 8, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const amplitude = 30 + Math.sin(scrollY * 0.01) * 20;
      const frequency = 0.02 + scrollY * 0.00001;

      // Draw multiple waves
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        ctx.strokeStyle = wave === 0 
          ? 'rgba(40, 180, 20, 0.6)' 
          : wave === 1 
            ? 'rgba(160, 0, 180, 0.4)'
            : 'rgba(40, 180, 20, 0.2)';
        ctx.lineWidth = wave === 0 ? 2 : 1;

        const waveOffset = wave * 0.5;
        const waveAmplitude = amplitude * (1 - wave * 0.3);

        for (let x = 0; x < canvas.width; x++) {
          const y = centerY + 
            Math.sin(x * frequency + timeRef.current + waveOffset) * waveAmplitude +
            Math.sin(x * frequency * 2 + timeRef.current * 1.5) * (waveAmplitude * 0.3);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw data points on main wave
      ctx.fillStyle = 'rgba(40, 180, 20, 0.8)';
      for (let x = 0; x < canvas.width; x += 30) {
        const y = centerY + 
          Math.sin(x * frequency + timeRef.current) * amplitude +
          Math.sin(x * frequency * 2 + timeRef.current * 1.5) * (amplitude * 0.3);
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [scrollY]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full opacity-60"
      style={{ background: 'transparent' }}
    />
  );
}
