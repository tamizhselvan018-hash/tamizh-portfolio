import React from 'react';

interface FolderTagProps {
  text: string;
  fillColor?: string; // The background color of the folder (e.g., '#ffffff' or '#09090b')
  textColorClass?: string; // Tailwind text color class (e.g., 'text-[#0D9488]')
  isDark?: boolean; // If true, applies styling suitable for a dark folder
}

export const FolderTag: React.FC<FolderTagProps> = ({
  text,
  fillColor = '#ffffff',
  textColorClass = 'text-zinc-950',
  isDark = false
}) => {
  // Shading for the fold crease
  const foldColor = isDark ? '#27272a' : '#f4f4f5';
  const foldBorderColor = isDark ? '#3f3f46' : '#d4d4d8';

  return (
    <div className="flex flex-col select-none pointer-events-none shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
      {/* 1. Folder Tab Row */}
      <div className="flex">
        <svg 
          width="36" 
          height="8" 
          viewBox="0 0 36 8" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="block shrink-0"
        >
          {/* Main white tab body (sloped right side) */}
          <path 
            d="M0 8V1C0 0.45 0.45 0 1 0H27L33 6V8H0Z" 
            fill={fillColor} 
          />
          {/* Mathematically precise dog-ear fold reflection */}
          <path 
            d="M27 0L33 6H27V0Z" 
            fill={foldColor} 
            stroke={foldBorderColor} 
            strokeWidth="0.5" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 2. Main Folder Body Rectangle */}
      <div 
        style={{ backgroundColor: fillColor }}
        className="px-3.5 py-1.5 rounded-b-[3px] rounded-tr-[3px] -mt-[0.5px] border-none flex items-center justify-center"
      >
        <span className={`font-mono text-[9px] md:text-[9.5px] font-black tracking-widest uppercase whitespace-nowrap ${textColorClass}`}>
          {text}
        </span>
      </div>
    </div>
  );
};
