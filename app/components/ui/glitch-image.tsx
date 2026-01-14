import React from 'react';
import Image, { ImageProps } from 'next/legacy/image';

interface GlitchImageProps extends ImageProps {
  containerClassName?: string;
}

export default function GlitchImage({ containerClassName, ...props }: GlitchImageProps) {
  return (
    <div className={`relative group overflow-hidden ${containerClassName}`}>
      <div className="relative z-10">
         <Image {...props} alt={props.alt || ""} />
      </div>
      
      {/* Glitch Layers */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-hard-light animate-glitch-2">
         <Image {...props} alt={props.alt || ""} className="filter contrast-150 brightness-150 saturate-0" />
      </div>
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-50 pointer-events-none translate-x-1 mix-blend-color-dodge animate-pulse">
         <div className="w-full h-full bg-neon-purple/20"></div>
      </div>
    </div>
  );
}
