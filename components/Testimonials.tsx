
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, BookOpen } from 'lucide-react';

const EXPERIENCES = [
  {
    id: 'infosys',
    volume: 'VOL. 01',
    chapter: 'CHAPTER 01',
    company: 'INFOSYS',
    subtitle: 'FRONT-END SYSTEMS',
    role: 'Front-End Developer',
    period: '2021 — 2023',
    themeColor: '#38bdf8', // Cyan
    accentDots: [
      { letter: 'O', color: 'bg-cyan-400 text-zinc-950' },
      { letter: 'Y', color: 'bg-pink-500 text-white' }
    ],
    points: [
      'Developed responsive UI using React & SCSS',
      'Ensured accessibility & ARIA standards',
      'Collaborated in agile design sprints'
    ],
    pageNo: '01'
  },
  {
    id: 'par-engineering',
    volume: 'VOL. 02',
    chapter: 'CHAPTER 02',
    company: 'PAR ENG',
    subtitle: 'INVENTORY UX',
    role: 'UX Designer',
    period: '2023 — 2024',
    themeColor: '#f43f5e', // Pink
    accentDots: [
      { letter: 'A', color: 'bg-rose-500 text-white' },
      { letter: 'E', color: 'bg-amber-400 text-zinc-950' }
    ],
    points: [
      'Designed stock management dashboards',
      'Led stakeholder bottleneck interviews',
      'Built design systems in Figma'
    ],
    pageNo: '02'
  },
  {
    id: 'cals-pathways',
    volume: 'VOL. 03',
    chapter: 'CHAPTER 03',
    company: 'CALS ISU',
    subtitle: 'GAMIFIED LEARNING',
    role: 'UX Designer (Summer)',
    period: 'SUMMER 2024',
    themeColor: '#a3e635', // Lime
    accentDots: [
      { letter: 'A', color: 'bg-lime-400 text-zinc-950' },
      { letter: 'U', color: 'bg-cyan-400 text-zinc-950' }
    ],
    points: [
      'Designed gamified quest maps for students',
      'Led co-design & usability testing sessions',
      'Prototyped interactive flows in Figma'
    ],
    pageNo: '03'
  },
  {
    id: 'next-chapter',
    volume: 'VOL. 04',
    chapter: 'CHAPTER 04',
    company: 'THE NEXT',
    subtitle: 'YOUR FUTURE PROJECT',
    role: 'Product / UX Designer',
    period: 'PRESENT',
    themeColor: '#f59e0b', // Gold
    isFuture: true,
    accentDots: [],
    points: [],
    pageNo: '04'
  }
];

const BookCard: React.FC<{ experience: typeof EXPERIENCES[0]; index: number }> = ({ experience }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full max-w-[360px] mx-auto group cursor-pointer transition-all duration-300 hover:-translate-y-2 select-none"
    >
      {/* Outer 3D Book Box */}
      <div className="relative w-full aspect-[1/1.42] min-h-[440px] rounded-r-lg rounded-l-xs bg-[#121316] p-1.5 shadow-[-14px_18px_36px_rgba(0,0,0,0.5),0_8px_16px_rgba(0,0,0,0.3)] border border-zinc-800/80 flex overflow-hidden group-hover:shadow-[-18px_24px_45px_rgba(0,0,0,0.6),0_12px_24px_rgba(0,0,0,0.4)] transition-shadow">
        
        {/* Left Spine Fold & Lighting Gradient */}
        <div className="w-6 sm:w-7 bg-gradient-to-r from-zinc-950 via-zinc-850 to-zinc-900 rounded-l-xs border-r border-black/90 shrink-0 relative flex flex-col justify-between items-center py-5 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.6)]">
          {/* Spine Foil Line Accents */}
          <div className="w-full h-[2px] bg-zinc-700/60" />
          <div 
            style={{ writingMode: 'vertical-rl' }}
            className="rotate-180 text-[9px] font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase my-auto"
          >
            {experience.volume} • {experience.period}
          </div>
          <div className="w-full h-[2px] bg-zinc-700/60" />
        </div>

        {/* 3D Spine Crease Overlay */}
        <div className="absolute left-6 sm:left-7 top-0 bottom-0 w-[3px] bg-gradient-to-r from-black/80 via-transparent to-white/5 z-20 pointer-events-none" />

        {/* Front Cover Container with Matte Surface & Dashed Inlay Border */}
        <div className="flex-1 rounded-r-md bg-gradient-to-br from-[#1b1c21] via-[#15161a] to-[#101114] p-3.5 sm:p-4 flex flex-col relative z-10">
          
          {/* Inner Dashed Border Inlay (Matching reference book cover image) */}
          <div className="w-full h-full rounded border border-dashed border-zinc-700/70 p-4 sm:p-5 flex flex-col justify-between relative bg-black/10">
            
            {/* Top Header Label */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5 font-mono text-[10px] text-zinc-400">
              <span className="font-bold tracking-widest text-zinc-300 uppercase flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-zinc-400" />
                {experience.chapter}
              </span>
              <span className="text-zinc-500 font-medium">{experience.period}</span>
            </div>

            {/* Book Center Content: Future Question Mark vs Experience Info */}
            <div className="my-auto py-2 space-y-3">
              {experience.isFuture ? (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="relative my-2">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-zinc-600 bg-zinc-900/90 flex items-center justify-center shadow-2xl">
                      <span className="text-4xl font-black text-white font-sans select-none">?</span>
                    </div>
                    <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
                      {experience.subtitle}
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans leading-[0.95] break-words">
                      {experience.company}
                    </h3>
                  </div>

                  {/* Role Badge */}
                  <div className="pt-0.5">
                    <span className="inline-block text-[10px] font-mono font-bold tracking-wider text-zinc-300 uppercase bg-zinc-800/90 border border-zinc-700/80 px-2.5 py-1 rounded">
                      {experience.role}
                    </span>
                  </div>

                  <div className="pt-2 space-y-2">
                    <div className="w-full h-[1px] bg-zinc-800" />
                    <ul className="space-y-1.5 text-[11px] text-zinc-300 font-sans leading-tight">
                      {experience.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[10px] font-mono text-zinc-500 font-bold mt-0.5 shrink-0">
                            0{i + 1}
                          </span>
                          <span className="text-zinc-300 font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* Book Cover Bottom Footer */}
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span className="uppercase tracking-widest text-[9px] text-zinc-500">BOOK NO. {experience.pageNo}</span>
              <span className="text-zinc-400 font-bold">{experience.volume}</span>
            </div>

          </div>
        </div>

        {/* 3D Paper Page Stack (Right side of book) */}
        <div className="w-[7px] bg-gradient-to-b from-[#e8e5dc] via-[#f3f0e6] to-[#dedbd0] rounded-r-xs border-r border-zinc-950 shadow-inner shrink-0 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch justify-center max-w-4xl mx-auto">
        {EXPERIENCES.map((exp, idx) => (
          <BookCard key={exp.id} experience={exp} index={idx} />
        ))}
      </div>
    </section>
  );
};





