"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { HexPic } from "hexpic";
import { useTheme } from "../theme-provider";

interface Particle {
  char: string;
  color: string;
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function HexPicAvatar() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Initialize and generate ASCII art via HexPic with native Light/Dark mode tuning
  useEffect(() => {
    let isCancelled = false;

    async function loadAscii() {
      try {
        setLoading(true);
        setError(null);

        // Native HexPic configuration with light/dark inversion & contrast tuning
        const hexpic = new HexPic({
          width: 46,
          colorMode: "color",
          dithering: "atkinson",
          contrast: isLight ? 122 : 112,
          brightness: isLight ? 98 : 102,
          invert: isLight, // HexPic's luminance inversion for light mode contrast
          backgroundColor: isLight ? "#F8F7F2" : "#121316",
          textColor: isLight ? "#1F2328" : "#E6EDF3",
        });

        const result = await hexpic.fromUrl("/profile.jpg");
        if (isCancelled) return;

        const lines = result.ascii.split("\n").filter((l) => l.length > 0);
        const rows = lines.length;
        const cols = lines[0]?.length || 0;

        if (cols === 0 || rows === 0) {
          setError("Empty character matrix");
          setLoading(false);
          return;
        }

        const charWidth = 8.5;
        const charHeight = 14;

        const totalWidth = cols * charWidth;
        const totalHeight = rows * charHeight;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
        canvas.width = totalWidth * dpr;
        canvas.height = totalHeight * dpr;
        canvas.style.width = `${totalWidth}px`;
        canvas.style.height = `${totalHeight}px`;

        const particles: Particle[] = [];
        const colors = result.colors;

        for (let r = 0; r < rows; r++) {
          const line = lines[r];
          for (let c = 0; c < line.length; c++) {
            const char = line[c];
            if (!char || char === " ") continue;

            const ox = c * charWidth + charWidth / 2;
            const oy = r * charHeight + charHeight / 2;

            let colorStr = isLight ? "#24292F" : "#A1A1AA";
            if (colors && colors[r] && colors[r][c]) {
              const { r: cr, g: cg, b: cb } = colors[r][c];
              if (isLight) {
                // Ensure sufficient contrast against light background
                const lum = 0.2126 * cr + 0.7152 * cg + 0.0722 * cb;
                if (lum > 210) {
                  colorStr = "rgb(85,90,100)";
                } else {
                  colorStr = `rgb(${cr},${cg},${cb})`;
                }
              } else {
                colorStr = `rgb(${cr},${cg},${cb})`;
              }
            }

            particles.push({
              char,
              color: colorStr,
              originX: ox,
              originY: oy,
              x: ox,
              y: oy,
              vx: 0,
              vy: 0,
            });
          }
        }

        particlesRef.current = particles;
        setLoading(false);
      } catch (err) {
        console.error("HexPic avatar generation error:", err);
        if (!isCancelled) {
          setError("Failed to generate ASCII avatar");
          setLoading(false);
        }
      }
    }

    loadAscii();

    return () => {
      isCancelled = true;
    };
  }, [isLight]);

  // Pointer position tracker
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
    setIsInteracting(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999, active: false };
    setIsInteracting(false);
  }, []);

  // Animation & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    // IntersectionObserver to pause loop when not on screen
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const radius = 64;
    const forceFactor = 7;
    const springK = 0.12;
    const damping = 0.82;

    function renderLoop() {
      if (!isVisibleRef.current || !ctx || !canvas) {
        animFrameId.current = requestAnimationFrame(renderLoop);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      ctx.font = '10px "Geist Mono", SFMono-Regular, Consolas, monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const { x: mx, y: my, active: mActive } = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.hypot(dx, dy);

          if (dist < radius && dist > 0.001) {
            const force = (1 - dist / radius) * forceFactor;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Spring force returning to anchor
        const springX = (p.originX - p.x) * springK;
        const springY = (p.originY - p.y) * springK;

        p.vx = (p.vx + springX) * damping;
        p.vy = (p.vy + springY) * damping;

        p.x += p.vx;
        p.y += p.vy;

        // Render character
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, p.x, p.y);
      }

      ctx.restore();
      animFrameId.current = requestAnimationFrame(renderLoop);
    }

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:border-accent/50"
    >
      {/* PostHog tactile header tag */}
      <div className="mb-3 flex items-center justify-between border-b border-border/80 pb-2.5 text-xs font-mono text-muted">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="font-semibold text-primary">hexpic: v0.3.1</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              isInteracting ? "bg-accent animate-ping" : "bg-muted/60"
            }`}
          />
          <span className="text-[11px] uppercase tracking-wider">
            {isInteracting ? "Pointer Active" : "Interactive Canvas"}
          </span>
        </div>
      </div>

      {/* Interactive ASCII canvas viewport */}
      <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-lg bg-surface/50 p-2 select-none touch-none">
        {loading && (
          <div className="flex flex-col items-center gap-2 font-mono text-xs text-muted">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            <span>Processing TrueColor ASCII...</span>
          </div>
        )}

        {error && (
          <div className="font-mono text-xs text-muted">
            <span>{error}</span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className={`cursor-crosshair transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {/* Bottom tactile badge */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-muted">
        <span>Atkinson • {isLight ? "Light Inverted" : "Dark Mode"}</span>
        <span className="text-accent/90">Hover or drag to displace</span>
      </div>
    </div>
  );
}

