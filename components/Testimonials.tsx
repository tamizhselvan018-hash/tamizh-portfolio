
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const EXPERIENCES = [
  {
    id: 'cals-pathways',
    company: 'CALS Pathways - Iowa State University',
    role: 'UX Designer (Summer Work)',
    points: [
      'Designed gamified solutions and quest maps to boost student engagement',
      'Led co-design sessions and usability testing to drive iterative design decisions',
      'Prototyped complex UI flows in Figma'
    ],
    type: 'Summer 2024',
    color: 'bg-white',
    textColor: 'text-zinc-900',
    iconColor: 'bg-emerald-50 text-emerald-600'
  },
  {
    id: 'par-engineering',
    company: 'PAR Engineering',
    role: 'UX Designer',
    points: [
      'Designed stock management dashboards to improve inventory visibility',
      'Led stakeholder interviews to identify bottlenecks',
      'Developed responsive component libraries in Figma'
    ],
    type: 'Experience',
    color: 'bg-zinc-950',
    textColor: 'text-white',
    iconColor: 'bg-zinc-800 text-white'
  },
  {
    id: 'infosys',
    company: 'Infosys',
    role: 'Front-End Developer',
    points: [
      'Developed responsive user interfaces using React and SCSS',
      'Ensured accessibility compliance and implemented ARIA standards',
      'Collaborated in agile sprints to build pixel-perfect components'
    ],
    type: 'Experience',
    color: 'bg-white',
    textColor: 'text-zinc-900',
    iconColor: 'bg-blue-50 text-blue-600'
  }
];

const HolographicCard: React.FC<{ experience: typeof EXPERIENCES[0] }> = ({ experience }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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

  const isDark = experience.color === 'bg-zinc-950';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full p-8 rounded-[32px] shadow-xl flex flex-col justify-between min-h-[340px] border border-zinc-100/10 overflow-hidden group transition-shadow hover:shadow-2xl ${experience.color} ${experience.textColor}`}
    >
      {/* Holographic Shine Overlay */}
      <motion.div
        style={{
          background: useTransform(
            [shineX, shineY],
            ([sx, sy]) => `radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,0.15) 0%, transparent 60%)`
          ),
          opacity: useTransform(mouseX, (v) => (v === 0 ? 0 : 1)),
        }}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Iridescent Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none z-10 transition-opacity duration-500 bg-[linear-gradient(110deg,#ff0000_0%,#ff7f00_14%,#ffff00_28%,#00ff00_42%,#0000ff_56%,#4b0082_70%,#8b00ff_84%,#ff0000_100%)] mix-blend-overlay" />

      <div className="relative z-30 space-y-6" style={{ transform: "translateZ(20px)" }}>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">{experience.company}</h3>
          <p className="text-base font-medium opacity-70">{experience.role}</p>
        </div>
        <ul className="space-y-3">
          {experience.points.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm md:text-base leading-relaxed opacity-60">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-30 mt-8 pt-6 border-t border-current/10 flex items-center justify-between" style={{ transform: "translateZ(10px)" }}>
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
          {experience.type}
        </span>
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXPERIENCES.map((exp) => (
          <HolographicCard key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
};
