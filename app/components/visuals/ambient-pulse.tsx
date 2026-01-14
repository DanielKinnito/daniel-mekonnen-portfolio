"use client";

import React, { useEffect, useRef } from 'react';

export default function AmbientPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

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

    // Create gradient layers for pulse effect
    const createGradient = (x: number, y: number, radius: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(95, 164, 145, 0.08)');
      gradient.addColorStop(0.4, 'rgba(95, 164, 145, 0.03)');
      gradient.addColorStop(0.7, 'rgba(71, 85, 105, 0.02)');
      gradient.addColorStop(1, 'rgba(71, 85, 105, 0)');
      return gradient;
    };

    const draw = () => {
      timeRef.current += 0.012;

      // Clear with very subtle fade
      ctx.fillStyle = 'rgba(10, 12, 14, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Primary pulse - slow breathing effect
      const pulse1Radius = 200 + Math.sin(timeRef.current * 0.5) * 50;
      const pulse1Gradient = createGradient(centerX, centerY, pulse1Radius);
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulse1Radius, 0, Math.PI * 2);
      ctx.fillStyle = pulse1Gradient;
      ctx.fill();

      // Secondary pulse - opposite phase
      const pulse2Radius = 300 + Math.sin(timeRef.current * 0.5 + Math.PI) * 80;
      const pulse2Gradient = createGradient(centerX * 0.3, centerY * 0.4, pulse2Radius);
      ctx.beginPath();
      ctx.arc(centerX * 0.3, centerY * 0.4, pulse2Radius, 0, Math.PI * 2);
      ctx.fillStyle = pulse2Gradient;
      ctx.fill();

      // Tertiary pulse - different phase
      const pulse3Radius = 250 + Math.sin(timeRef.current * 0.3 + Math.PI / 2) * 60;
      const pulse3Gradient = createGradient(centerX * 0.7, centerY * 0.7, pulse3Radius);
      ctx.beginPath();
      ctx.arc(centerX * 0.7, centerY * 0.7, pulse3Radius, 0, Math.PI * 2);
      ctx.fillStyle = pulse3Gradient;
      ctx.fill();

      // Subtle corner accents
      const corners = [
        { x: 0, y: 0 },
        { x: canvas.width, y: 0 },
        { x: 0, y: canvas.height },
        { x: canvas.width, y: canvas.height },
      ];

      corners.forEach((corner, index) => {
        const cornerPulse = 100 + Math.sin(timeRef.current * 0.4 + index * 0.5) * 30;
        const cornerGradient = ctx.createRadialGradient(
          corner.x,
          corner.y,
          0,
          corner.x,
          corner.y,
          cornerPulse
        );
        cornerGradient.addColorStop(0, 'rgba(100, 116, 139, 0.03)');
        cornerGradient.addColorStop(0.5, 'rgba(100, 116, 139, 0.01)');
        cornerGradient.addColorStop(1, 'rgba(100, 116, 139, 0)');

        ctx.beginPath();
        ctx.fillStyle = cornerGradient;
        ctx.fillRect(corner.x - cornerPulse, corner.y - cornerPulse, cornerPulse * 2, cornerPulse * 2);
      });

      // Very subtle vignette effect
      const vignetteGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        canvas.height * 0.3,
        centerX,
        centerY,
        canvas.height * 0.8
      );
      vignetteGradient.addColorStop(0, 'rgba(10, 12, 14, 0)');
      vignetteGradient.addColorStop(1, 'rgba(10, 12, 14, 0.1)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, canvas.height * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = vignetteGradient;
      ctx.fill();

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
