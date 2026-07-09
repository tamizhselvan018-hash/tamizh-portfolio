import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronRight, ChevronLeft, Layers, Compass, Eye, Check } from 'lucide-react';

export interface ScreenshotAnnotation {
  id: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  title: string;
  description: string;
  badge?: string;
  arrowDirection?: 'up' | 'down' | 'left' | 'right';
}

interface AnnotatedScreenshotProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  annotations: ScreenshotAnnotation[];
  caption?: string;
}

export const AnnotatedScreenshot: React.FC<AnnotatedScreenshotProps> = ({
  src,
  alt,
  title,
  subtitle,
  annotations,
  caption
}) => {
  const [activeId, setActiveId] = useState<string | null>(annotations[0]?.id || null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Navigate annotations
  const handleNext = () => {
    const currentIndex = annotations.findIndex(a => a.id === activeId);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % annotations.length;
      setActiveId(annotations[nextIndex].id);
    }
  };

  const handlePrev = () => {
    const currentIndex = annotations.findIndex(a => a.id === activeId);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + annotations.length) % annotations.length;
      setActiveId(annotations[prevIndex].id);
    }
  };

  const activeAnnotation = annotations.find(a => a.id === activeId) || null;

  return (
    <div 
      className="border border-zinc-200/80 rounded-3xl overflow-hidden bg-white shadow-md select-none flex flex-col md:flex-row gap-0" 
      id={`annotated-screenshot-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Left Area: The interactive image */}
      <div className="flex-1 bg-zinc-50 relative p-4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-zinc-150">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
              {subtitle || "Interactive Interface Guide"}
            </span>
          </div>
          
          <button 
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border transition-all ${
              showAnnotations 
                ? 'bg-blue-50 border-blue-200 text-blue-600' 
                : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-600'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>{showAnnotations ? 'HIDE HOTSPOTS' : 'SHOW HOTSPOTS'}</span>
          </button>
        </div>

        {/* Screenshot Container */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white" ref={containerRef}>
          <img 
            src={src} 
            alt={alt}
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain block transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />

          {/* Hotspots layer */}
          {showAnnotations && annotations.map((ann) => {
            const isActive = ann.id === activeId;
            return (
              <button
                key={ann.id}
                onClick={() => setActiveId(ann.id)}
                className="absolute group z-10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 focus:outline-none"
                style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
              >
                {/* Glowing Outer Ring */}
                <span className={`absolute -inset-3.5 rounded-full transition-all duration-300 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 ${
                  isActive 
                    ? 'bg-blue-400/20 ring-4 ring-blue-500/20 scale-100 opacity-100 animate-pulse' 
                    : 'bg-zinc-400/10'
                }`} />

                {/* Inner Circle Bullet */}
                <span className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 text-[10px] font-sans font-bold shadow-md transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-600 border-white text-white scale-110' 
                    : 'bg-white border-blue-500 text-blue-600 group-hover:bg-blue-50'
                }`}>
                  {annotations.indexOf(ann) + 1}
                </span>

                {/* Micro tooltip label on hover */}
                {!isActive && (
                  <span className="absolute left-1/2 -translate-x-1/2 top-7 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 bg-zinc-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap transition-all duration-200 pointer-events-none">
                    {ann.title}
                  </span>
                )}
              </button>
            );
          })}

          {/* SVG Connector Arrow pointing from active annotation card to target (desktop visual guide) */}
          {showAnnotations && activeAnnotation && (
            <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden">
              {/* Active pointer outline overlay */}
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-blue-500 bg-blue-500/10 pointer-events-none"
                style={{ left: `${activeAnnotation.x}%`, top: `${activeAnnotation.y}%` }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-30" />
              </motion.div>
            </div>
          )}
        </div>

        {caption && (
          <p className="text-[10px] font-mono text-zinc-400 mt-2 text-center">
            {caption}
          </p>
        )}
      </div>

      {/* Right Area: Dynamic annotations card with arrow and tour guide */}
      <div className="w-full md:w-80 bg-zinc-900 p-6 flex flex-col justify-between shrink-0 text-white min-h-[300px]">
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" />
              <span>{title}</span>
            </h4>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Click the numbered hotspots on the screenshot, or use the controls below to explore each design decision.
            </p>
          </div>

          <div className="border-t border-zinc-800 pt-5 min-h-[160px]">
            <AnimatePresence mode="wait">
              {activeAnnotation ? (
                <motion.div
                  key={activeAnnotation.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white font-mono text-[10px] font-bold">
                      {annotations.indexOf(activeAnnotation) + 1}
                    </span>
                    {activeAnnotation.badge && (
                      <span className="text-[9px] font-mono bg-zinc-800 text-blue-300 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {activeAnnotation.badge}
                      </span>
                    )}
                  </div>

                  <h5 className="text-base font-extrabold tracking-tight text-white leading-snug">
                    {activeAnnotation.title}
                  </h5>
                  
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    {activeAnnotation.description}
                  </p>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center text-zinc-500 font-mono text-[11px] py-12">
                  Select a hotspot to view details
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation & Stats panel */}
        <div className="pt-6 border-t border-zinc-800 space-y-3 mt-6">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>EXPLORATION PROGRESS</span>
            <span>
              {activeAnnotation ? annotations.indexOf(activeAnnotation) + 1 : 0} OF {annotations.length}
            </span>
          </div>

          <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ 
                width: `${activeAnnotation ? ((annotations.indexOf(activeAnnotation) + 1) / annotations.length) * 100 : 0}%` 
              }}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handlePrev}
              className="flex-1 py-1.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center justify-center gap-1 border border-zinc-700/50"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS</span>
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-mono font-bold transition-all flex items-center justify-center gap-1"
            >
              <span>NEXT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
