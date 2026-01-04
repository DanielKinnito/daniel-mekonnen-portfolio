import React from 'react';

interface AsciiArtProps {
  art: string;
  className?: string;
  glitch?: boolean;
}

export default function AsciiArt({ art, className = "", glitch = true }: AsciiArtProps) {
  return (
    <pre 
      className={`
        font-mono text-[10px] md:text-xs leading-none whitespace-pre 
        text-neon-green opacity-90 select-none overflow-hidden
        ${glitch ? 'hover:animate-glitch-1' : ''}
        ${className}
      `}
      aria-hidden="true"
    >
      {art}
    </pre>
  );
}
