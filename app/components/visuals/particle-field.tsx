"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
}

export default function ParticleField() {
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

    const particles: Particle[] = [];
    const particleCount = 50;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const draw = () => {
      timeRef.current += 0.01;

      // Clear with fade effect
      ctx.fillStyle = 'rgba(10, 12, 14, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Muted sage/teal color palette
      const colors = [
        '95, 164, 145',   // Sage
        '71, 85, 105',    // Slate
        '100, 116, 139',  // Light slate
        '148, 163, 184',  // Muted blue
      ];

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Add subtle wave motion
        particle.x += Math.sin(timeRef.current + index) * 0.1;
        particle.y += Math.cos(timeRef.current + index * 0.5) * 0.1;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Pulse opacity
        const pulseOpacity = particle.opacity + Math.sin(timeRef.current * particle.pulseSpeed * 10) * 0.1;
        const clampedOpacity = Math.max(0.05, Math.min(0.5, pulseOpacity));

        // Get color based on particle index
        const colorIndex = index % colors.length;
        const color = colors[colorIndex];

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${clampedOpacity})`;
        ctx.fill();

        // Draw connection lines to nearby particles
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const lineOpacity = (1 - dist / 150) * 0.1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(${color}, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

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
