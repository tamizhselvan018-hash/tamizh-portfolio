
import React, { useRef, useState, useEffect } from 'react';
import { CaseStudy } from '../types';
import { motion, MotionValue, useReducedMotion } from 'motion/react';
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
  const imgurMatch = url.match(/imgur\.com\/([a-zA-Z0-9]+)$/);
  if (imgurMatch && imgurMatch[1]) {
    return `https://i.imgur.com/${imgurMatch[1]}.png`;
  }
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

  const prefersReducedMotion = useReducedMotion();

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
        whileHover={prefersReducedMotion ? undefined : { y: -3 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`relative mt-0 p-6 md:p-10 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl flex flex-col min-h-[420px] md:h-[480px] overflow-hidden group shadow-md cursor-pointer transform-gpu will-change-transform ${study.color} ${isDark ? 'text-zinc-50' : 'text-zinc-950'}`}
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
              <div className="w-full h-[240px] md:h-[320px] bg-black/15 backdrop-blur-sm rounded-2xl border border-white/15 flex items-center justify-center p-3 md:p-4 relative overflow-hidden group-hover:border-white/30 transition-all shadow-inner">
                {/* Decorative background grid and ambient radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_75%)] pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                {isPhoneFrame ? (
                  <div className="relative p-1.5 bg-white border border-zinc-200/50 shadow-2xl transition-transform duration-300 ease-out group-hover:scale-[1.03] w-fit mx-auto rounded-[14px] md:rounded-[18px]">
                    {/* Transform Corner Handles (Figma style) */}
                    <div className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />
                    <div className="absolute -top-[5px] -right-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />
                    <div className="absolute -bottom-[5px] -left-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />
                    <div className="absolute -bottom-[5px] -right-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />

                    {/* Core Image Container */}
                    <div className="w-[100px] md:w-[135px] h-[190px] md:h-[260px] mx-auto rounded-[8px] md:rounded-[10px] border-[2px] md:border-[3px] border-zinc-950 shadow-inner bg-black overflow-hidden relative">
                      {isVideoUrl(study.images[0]) && !videoHasError ? (
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
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay pointer-events-none" />
                    </div>
                  </div>
                ) : (
                  <div className="relative p-1.5 bg-white border border-zinc-200/50 shadow-md transition-transform duration-300 ease-out group-hover:scale-[1.015] w-full h-full">
                    {/* Transform Corner Handles (Figma style) */}
                    <div className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />
                    <div className="absolute -top-[5px] -right-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />
                    <div className="absolute -bottom-[5px] -left-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />
                    <div className="absolute -bottom-[5px] -right-[5px] w-2.5 h-2.5 border border-zinc-300 bg-white z-30" />

                    {/* Core Image Container */}
                    <div className="w-full h-full bg-zinc-100 rounded-md overflow-hidden relative">
                      {isVideoUrl(study.images[0]) && !videoHasError ? (
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
                  </div>
                )}
              </div>
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
          <div className={`relative z-10 flex items-center pl-2.5 pr-3 md:pl-4 md:pr-6 ${isDark ? 'text-zinc-50' : 'text-zinc-950'} font-mono text-[7px] sm:text-[8px] md:text-xs uppercase tracking-tight md:tracking-wider select-none font-bold`}>
            {/* Custom rising staircase block icon */}
            <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 mr-1 sm:mr-1.5 md:mr-2 shrink-0 opacity-90" viewBox="0 0 24 24" fill="currentColor">
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
