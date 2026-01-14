"use client";

import React, { useEffect, useRef } from 'react';

export default function DigitalNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

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

    // Pre-generate noise pattern for better performance
    const noiseSize = 200;
    const noiseData = new Uint8ClampedArray(noiseSize * noiseSize * 4);

    for (let i = 0; i < noiseData.length; i += 4) {
      const value = Math.random() * 255;
      noiseData[i] = value;     // R
      noiseData[i + 1] = value; // G
      noiseData[i + 2] = value; // B
      noiseData[i + 3] = Math.random() * 30; // Alpha - very subtle
    }

    // Pre-generate noise pattern canvas ONCE
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = noiseSize;
    patternCanvas.height = noiseSize;
    const patternCtx = patternCanvas.getContext('2d');
    if (patternCtx) {
      const imageData = patternCtx.createImageData(noiseSize, noiseSize);
      imageData.data.set(noiseData);
      patternCtx.putImageData(imageData, 0, 0);
    }

    const draw = () => {
      // Very subtle clear with fade
      ctx.fillStyle = 'rgba(10, 12, 14, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw noise pattern at random positions
      const intensity = 0.3; // Very subtle

      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 100 + 50;

        ctx.globalAlpha = intensity * Math.random();
        ctx.drawImage(patternCanvas, x, y, size, size);
      }

      ctx.globalAlpha = 1;

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
