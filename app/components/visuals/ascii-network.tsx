"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
}

export default function AsciiNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);

  const ASCII_CHARS = '◉○◎●◐◑◒◓⬡⬢⎔';

  useEffect(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const nodeCount = 15;
    
    const initialNodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      char: ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)],
    }));
    
    setNodes(initialNodes);

    const animate = () => {
      setNodes(prevNodes => {
        if (!containerRef.current) return prevNodes;
        const rect = containerRef.current.getBoundingClientRect();
        
        return prevNodes.map(node => {
          let { x, y, vx, vy } = node;
          
          // Mouse attraction/repulsion
          const dx = mousePos.x - x;
          const dy = mousePos.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150 && dist > 0) {
            // Repel from mouse - Gentler force
            vx -= (dx / dist) * 0.15;
            vy -= (dy / dist) * 0.15;
          }
          
          // Apply velocity with heavier damping for "floaty" feel
          x += vx;
          y += vy;
          vx *= 0.95;
          vy *= 0.95;
          
          // Add very subtle random movement
          vx += (Math.random() - 0.5) * 0.02;
          vy += (Math.random() - 0.5) * 0.02;
          
          // Bounce off edges
          if (x < 0 || x > rect.width) vx *= -1;
          if (y < 0 || y > rect.height) vy *= -1;
          
          // Clamp position
          x = Math.max(0, Math.min(rect.width, x));
          y = Math.max(0, Math.min(rect.height, y));
          
          return { ...node, x, y, vx, vy };
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  // Calculate connections between nearby nodes
  const connections: JSX.Element[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 120) {
        const opacity = 1 - dist / 120;
        connections.push(
          <line
            key={`${i}-${j}`}
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[j].x}
            y2={nodes[j].y}
            stroke={`rgba(40, 180, 20, ${opacity * 0.5})`}
            strokeWidth={1}
            strokeDasharray="2,2"
          />
        );
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full relative pointer-events-auto"
    >
      <svg className="absolute inset-0 w-full h-full">
        {connections}
      </svg>
      {nodes.map(node => (
        <span
          key={node.id}
          className="absolute text-neon-green text-lg transition-transform duration-100"
          style={{
            left: node.x,
            top: node.y,
            transform: 'translate(-50%, -50%)',
            textShadow: '0 0 5px rgba(40, 180, 20, 0.5)',
          }}
        >
          {node.char}
        </span>
      ))}
    </div>
  );
}
