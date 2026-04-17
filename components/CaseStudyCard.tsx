
import React, { useRef } from 'react';
import { CaseStudy } from '../types';
import { motion, useTransform, MotionValue, useScroll, useMotionValue, useSpring } from 'motion/react';

interface CaseStudyCardProps {
  study: CaseStudy;
  scrollYProgress?: MotionValue<number>;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, scrollYProgress: externalScrollYProgress }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isLight = study.color === 'bg-white';
  
  // Holographic effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

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
  const imageY = useTransform(scrollY, [0, 1], [0, -60]);
  
  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative p-6 md:p-8 rounded-[40px] flex flex-col min-h-[280px] gap-4 overflow-hidden group transition-shadow hover:shadow-2xl ${study.color} ${isLight ? 'text-zinc-800 border border-zinc-100' : 'text-white'} ${study.isComingSoon ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {/* Coming Soon Overlay */}
      {study.isComingSoon && (
        <div className="absolute inset-0 z-40 flex items-center justify-center backdrop-blur-md bg-white/30">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 rounded-full bg-zinc-900 text-white text-sm font-bold uppercase tracking-widest shadow-xl"
          >
            Coming Soon
          </motion.div>
        </div>
      )}

      {/* Holographic Shine Overlay */}
      <motion.div
        style={{
          background: useTransform(
            [shineX, shineY],
            ([sx, sy]) => `radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,${isLight ? '0.1' : '0.15'}) 0%, transparent 60%)`
          ),
          opacity: useTransform(mouseX, (v) => (v === 0 ? 0 : 1)),
        }}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Iridescent Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 pointer-events-none z-10 transition-opacity duration-500 bg-[linear-gradient(110deg,#ff0000_0%,#ff7f00_14%,#ffff00_28%,#00ff00_42%,#0000ff_56%,#4b0082_70%,#8b00ff_84%,#ff0000_100%)] mix-blend-overlay" />

      {/* Parallax Background Image */}
      {study.images && study.images[0] && (
        <motion.div 
          style={{ y: imageY, transform: "translateZ(-10px)" }}
          className="absolute right-[-5%] bottom-[-5%] w-3/4 h-3/4 opacity-10 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-inherit to-transparent z-10" />
          <img 
            src={study.images[0]} 
            alt="" 
            className="w-full h-full object-cover rounded-[40px] rotate-6 grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      )}

      <div className="relative z-30 flex justify-between items-start" style={{ transform: "translateZ(20px)" }}>
        <div className="space-y-1">
          <p className={`text-xs font-medium uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-white/60'}`}>
            {study.category}
          </p>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight">{study.title}</h3>
        </div>
        <div 
          className={`p-2 rounded-xl ${isLight ? 'bg-zinc-50' : 'bg-white/20'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
      </div>
      
      <p className={`relative z-30 text-lg md:text-xl leading-relaxed max-w-2xl ${isLight ? 'text-zinc-500' : 'text-white/80'}`} style={{ transform: "translateZ(15px)" }}>
        {study.description}
      </p>

      <div className="relative z-30 flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-black/5" style={{ transform: "translateZ(10px)" }}>
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium ${isLight ? 'bg-zinc-100' : 'border border-white/30'}`}>
              {tag}
            </span>
          ))}
        </div>
        {!study.isComingSoon && (
          <div className={`flex items-center gap-2 font-medium text-sm md:text-base ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            <span>View Case Study</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
};
