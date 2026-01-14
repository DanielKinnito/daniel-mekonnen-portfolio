"use client";

import React, { useEffect, useRef } from 'react';

export default function ScanningBeam() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      timeRef.current += 0.015;

      // Clear with very subtle fade
      ctx.fillStyle = 'rgba(10, 12, 14, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Primary scanning beam (moves horizontally with sine wave)
      const beamY = centerY + Math.sin(timeRef.current * 0.3) * (canvas.height * 0.3);
      const beamX = (timeRef.current * 50) % (canvas.width + 200) - 100;

      // Draw beam glow
      const gradient = ctx.createLinearGradient(beamX - 100, beamY, beamX + 100, beamY);
      gradient.addColorStop(0, 'rgba(95, 164, 145, 0)');
      gradient.addColorStop(0.3, 'rgba(95, 164, 145, 0.03)');
      gradient.addColorStop(0.5, 'rgba(95, 164, 145, 0.05)');
      gradient.addColorStop(0.7, 'rgba(95, 164, 145, 0.03)');
      gradient.addColorStop(1, 'rgba(95, 164, 145, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, beamY - 20, canvas.width, 40);

      // Draw main beam line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(95, 164, 145, 0.08)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, beamY);
      ctx.lineTo(canvas.width, beamY);
      ctx.stroke();

      // Secondary subtle beam moving vertically
      const verticalBeamX = centerX + Math.cos(timeRef.current * 0.2) * (canvas.width * 0.3);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.05)';
      ctx.lineWidth = 1;
      ctx.moveTo(verticalBeamX, 0);
      ctx.lineTo(verticalBeamX, canvas.height);
      ctx.stroke();

      // Mouse follower effect
      const dx = mouseX - verticalBeamX;
      const mouseInfluence = Math.max(0, 1 - Math.abs(dx) / 300);

      if (mouseInfluence > 0) {
        // Draw intersection highlight
        ctx.beginPath();
        ctx.arc(verticalBeamX, beamY, 30 * mouseInfluence, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(95, 164, 145, ${0.02 * mouseInfluence})`;
        ctx.fill();

        // Draw crosshair at intersection
        ctx.beginPath();
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.1 * mouseInfluence})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(verticalBeamX - 15, beamY);
        ctx.lineTo(verticalBeamX + 15, beamY);
        ctx.moveTo(verticalBeamX, beamY - 15);
        ctx.lineTo(verticalBeamX, beamY + 15);
        ctx.stroke();
      }

      // Add subtle data points along the beam
      for (let x = 0; x < canvas.width; x += 80) {
        const distToBeamX = Math.abs(x - beamX);
        if (distToBeamX < 150) {
          const brightness = 1 - distToBeamX / 150;
          ctx.beginPath();
          ctx.arc(x, beamY, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 163, 184, ${0.15 * brightness})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
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
