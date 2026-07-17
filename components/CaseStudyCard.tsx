
import React, { useRef, useState, useEffect } from 'react';
import { CaseStudy } from '../types';
import { motion, useTransform, MotionValue, useScroll, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { FolderTag } from './FolderTag';

interface CaseStudyCardProps {
  study: CaseStudy;
  index?: number;
  scrollYProgress?: MotionValue<number>;
}

const getHexColor = (colorClass: string | undefined): string => {
  if (!colorClass) return '#0f172a';
  const match = colorClass.match(/bg-\[#([0-9a-fA-F]{3,8})\]/);
  if (match) {
    return `#${match[1]}`;
  }
  if (colorClass === 'bg-white') return '#ffffff';
  if (colorClass === 'bg-black') return '#000000';
  return '#b31942'; // default fallback
};

const getMediaUrl = (url: string | undefined): string => {
  if (!url) return '';
  // Check if it's a Google Drive share link and convert it to a streamable link
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
  }
  return url;
};

const isGoogleDriveUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return url.includes('drive.google.com');
};

const getGoogleDriveEmbedUrl = (url: string): string => {
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
};

const isVideoUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.includes('drive.google.com') ||
    lower.includes('google.com/uc')
  );
};

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, index = 0, scrollYProgress: externalScrollYProgress }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoHasError, setVideoHasError] = useState(false);
  const isPhoneFrame = study.id === 'my-campus' || study.id === 'walk-for-plastic';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabWidth = isMobile ? 90 : 160;
  const tabSlant = isMobile ? 20 : 36;
  const leftOffset = index * tabWidth;

  const isDark = study.textColor ? study.textColor !== 'text-zinc-950' : (study.color !== 'bg-white' && study.color !== 'bg-[#FAF9F6]');
  
  // Holographic effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = e.clientX - rect.left;
    const mouseYRelative = e.clientY - rect.top;

    x.set((mouseXRelative / width) - 0.5);
    y.set((mouseYRelative / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Use external scroll if provided, otherwise create a local one for this card
  const { scrollYProgress: localScrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scrollY = externalScrollYProgress || localScrollYProgress;
  
  // Subtle parallax for the background image
  const imageY = useTransform(scrollY, [0, 1], [0, -20]);

  // Handle smooth scroll on tab click
  const handleTabClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = document.getElementById(`card-anchor-${study.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <motion.div 
      ref={ref}
      id={`card-anchor-${study.id}`}
      className="relative w-full overflow-visible select-none pt-10 pb-12 md:pb-24 animate-none"
    >
      {/* 2. Folder Card Body Container (Rendered first so tab can sit on top of it in DOM order) */}
      <motion.div 
        layoutId={`card-container-${study.id}`}
        className={`relative mt-0 p-6 md:p-10 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl flex flex-col min-h-[380px] md:min-h-[460px] overflow-hidden group shadow-md cursor-pointer ${study.color} ${isDark ? 'text-zinc-50' : 'text-zinc-950'}`}
      >
        {/* Fine background grid within the card body for that design system detail */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Split Two-Column Content Layout on Desktop */}
        <div className="relative z-30 flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-10 h-full my-auto pb-4">
          
          {/* Left Column - Details */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6 md:space-y-8" style={{ transform: "translateZ(20px)" }}>
            <div className="space-y-4">
              {/* Category and Date Row */}
              <div className="flex items-center gap-2 pb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase font-bold opacity-80">
                  {study.date}
                </span>
              </div>

              {/* Title */}
              <motion.h3 
                layoutId={`card-title-${study.id}`}
                className="text-3xl md:text-5xl font-extrabold tracking-tight text-left block font-sans"
              >
                {study.title}
              </motion.h3>

              {/* Description */}
              <motion.p 
                layoutId={`card-desc-${study.id}`}
                className={`text-lg md:text-xl font-medium leading-relaxed text-left block max-w-xl ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`} 
              >
                {study.description}
              </motion.p>

              {/* VIEW PROJECT Link positioned below Description as seen in screenshot */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest border-b-2 border-current pb-0.5 hover:opacity-80 transition-all">
                  VIEW PROJECT <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Bounding Box Image Frame */}
          <div className="md:col-span-6 flex items-center justify-center relative">
            {study.images && study.images[0] && (
              <motion.div 
                style={{ y: imageY }}
                className={`relative p-1.5 bg-white border border-zinc-200/50 shadow-md ${
                  isPhoneFrame ? "w-fit mx-auto rounded-[28px] md:rounded-[36px]" : "w-full"
                }`}
              >
                {/* Transform Corner Handles (Figma style) */}
                <div className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />
                <div className="absolute -top-[5px] -right-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />
                <div className="absolute -bottom-[5px] -left-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />
                <div className="absolute -bottom-[5px] -right-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />

                {/* Pixel Grid File Info Badge */}
                {!isPhoneFrame && (
                  <div className={`absolute bg-zinc-950 text-white border border-zinc-800 px-2.5 py-1 rounded text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5 z-20 shadow-lg ${
                    isPhoneFrame ? "-top-9 right-1.5" : "top-3.5 right-3.5"
                  }`}>
                    {study.images && study.images[0] && isVideoUrl(study.images[0]) ? (
                      <>
                        <svg className="w-3 h-3 text-red-500 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span className="font-bold">MP4 VIDEO.MP4</span>
                      </>
                    ) : study.images && study.images[0] && study.images[0].endsWith('.gif') ? (
                      <>
                        <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="font-bold">GIF ANIMATION.GIF</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="font-bold">JPG IMAGE.JPG</span>
                      </>
                    )}
                  </div>
                )}

                {/* Micro-annotation Figma Multiplayer Cursor */}
                {index === 2 && (
                  <div className="absolute bottom-6 right-8 flex items-center gap-1.5 z-20 pointer-events-none bg-zinc-950/90 text-white px-2 py-0.5 rounded-full shadow-lg border border-zinc-800 scale-95 md:scale-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[8px] font-extrabold uppercase tracking-widest">YOU</span>
                  </div>
                )}

                {/* Core Image Container with interactive Grayscale-to-Color hover filter */}
                <div className={`overflow-hidden relative ${
                  isPhoneFrame 
                    ? "w-[120px] md:w-[170px] h-[240px] md:h-[340px] mx-auto rounded-[24px] md:rounded-[32px] border-[5px] md:border-[8px] border-zinc-950 shadow-inner bg-black" 
                    : "w-full h-[240px] md:h-[340px] bg-zinc-100"
                }`}>
                  {isPhoneFrame && (
                    <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 w-10 md:w-14 h-2 md:h-3 bg-zinc-950 rounded-full z-20 flex items-center justify-center">
                      <div className="w-1 h-1 bg-zinc-900 rounded-full ml-auto mr-1 md:mr-1.5 opacity-60" />
                    </div>
                  )}

                  {study.images && study.images[0] && isVideoUrl(study.images[0]) && !videoHasError ? (
                    <video 
                      src={getMediaUrl(study.images[0])} 
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      onError={() => setVideoHasError(true)}
                    />
                  ) : (
                    <img 
                      src={videoHasError ? 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200' : getMediaUrl(study.images[0])} 
                      alt={study.title} 
                      className="w-full h-full object-cover filter-none"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  
                  {/* Subtle vector-like overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay pointer-events-none" />
                </div>
              </motion.div>
            )}
          </div>

        </div>

        {/* Card Footer containing duration and platform metadata on bottom right */}
        <div className="relative z-30 flex items-center justify-between mt-auto pt-4 border-t border-zinc-950/10">
          <div className="flex items-center gap-2.5">
            {study.tags.slice(0, 2).map((tag) => {
              const colors = (() => {
                if (study.id === 'my-campus') return { fillColor: '#ffffff', textColorClass: 'text-[#4338CA]' };
                if (study.id === 'walk-for-plastic') return { fillColor: '#ffffff', textColorClass: 'text-[#0D9488]' };
                if (study.id === 'par-production-control') return { fillColor: '#ffffff', textColorClass: 'text-[#065f46]' };
                if (study.id === 'pathways-badge-quest') return { fillColor: '#ffffff', textColorClass: 'text-zinc-950' };
                return { fillColor: '#ffffff', textColorClass: 'text-zinc-950' };
              })();
              
              return (
                <FolderTag 
                  key={tag}
                  text={tag}
                  fillColor={colors.fillColor}
                  textColorClass={colors.textColorClass}
                />
              );
            })}
          </div>

          <div className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60">
            {study.platform} · {study.duration}
          </div>
        </div>

      </motion.div>

      {/* 1. Folder Tab Header Row (Rendered second so it sits ON TOP of the tile in DOM order) */}
      <div 
        className="absolute top-0 left-0 w-full h-11 bg-transparent overflow-visible z-30 pointer-events-none"
      >
        <div 
          onClick={handleTabClick}
          style={{
            left: `${leftOffset}px`,
            width: `${tabWidth + tabSlant}px`,
          }}
          className="absolute top-0 h-11 flex items-center cursor-pointer pointer-events-auto"
        >
          <svg className="absolute inset-0 w-full h-full drop-shadow-[-2px_-1px_3px_rgba(0,0,0,0.06)]" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
            <path 
              d="M 0,100 L 0,0 L 78,0 L 100,100 Z" 
              fill={getHexColor(study.color)}
            />
          </svg>
          
          {/* Tab Content */}
          <div className={`relative z-10 flex items-center pl-4 pr-6 ${isDark ? 'text-zinc-50' : 'text-zinc-950'} font-mono text-[9px] md:text-xs uppercase tracking-wider select-none font-bold`}>
            {/* Custom rising staircase block icon */}
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1.5 md:mr-2 shrink-0 opacity-90" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="15" width="4" height="5" rx="0.5" />
              <rect x="10" y="9" width="4" height="11" rx="0.5" />
              <rect x="17" y="3" width="4" height="17" rx="0.5" />
            </svg>
            <span className="truncate">PROJECT 0{index + 1}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
