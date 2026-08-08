
import React, { useState, useEffect, useRef } from 'react';
import { StickyHeader } from './components/StickyHeader';
import { Hero } from './components/Hero';
import { CaseStudyCard } from './components/CaseStudyCard';
import { Testimonials } from './components/Testimonials';
import { CaseStudyDetail } from './components/CaseStudyDetail';
import { CASE_STUDIES } from './constants';
import { Button } from './components/Button';
import { motion, AnimatePresence } from 'motion/react';

import { TextFill } from './components/TextFill';

const GmailIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
  </svg>
);

const WorksList: React.FC<{ onProjectClick: (id: string) => void }> = ({ onProjectClick }) => {
  return (
    <section id="works" className="relative w-full py-24 border-y border-zinc-200/60 bg-transparent overflow-visible">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-zinc-500 font-medium uppercase tracking-[0.2em] text-[10px]"
          >
            <span className="w-8 h-[1px] bg-zinc-300" />
            <span>Selected Works</span>
            <span className="w-8 h-[1px] bg-zinc-300" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-zinc-900 mt-4"
          >
            Turning ideas into real experiences.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto mt-4"
          >
            Explore how I approach design—from understanding user needs to building structured, meaningful solutions.
          </motion.p>
        </div>

        {/* Project List with Sticky Folder-Tab Stacking Deck */}
        <div className="flex flex-col gap-0 relative">
          {CASE_STUDIES.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ 
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.08 
              }}
              onClick={() => !study.isComingSoon && onProjectClick(study.id)}
              style={{ 
                position: 'sticky', 
                top: '110px', // Perfect offset below StickyHeader
                zIndex: index + 10
              }}
              className={`transform-gpu will-change-transform ${study.isComingSoon ? "cursor-default" : "cursor-pointer"}`}
            >
              <CaseStudyCard study={study} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'portfolio' | 'sandbox'>('portfolio');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const prevProjectIdRef = useRef<string | null>(null);

  // Scroll lock when a project is selected to prevent double scrolling
  useEffect(() => {
    if (selectedProjectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProjectId]);

  const selectedProject = CASE_STUDIES.find(p => p.id === selectedProjectId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] selection:bg-[#0a3161]/10 selection:text-[#0a3161]">
      {/* Dual Engineering Blueprint Grid Background */}
      <div className="fixed inset-0 opacity-[0.035] pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="fixed inset-0 opacity-[0.012] pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
        backgroundSize: '8px 8px'
      }} />

      <StickyHeader activeView={activeView} setActiveView={setActiveView} />
      
      <main>
        {/* Hero */}
        <div className="relative">
          <Hero />
        </div>

        {/* Dynamic Section: Works */}
        <WorksList onProjectClick={(id) => setSelectedProjectId(id)} />

            {/* Journey Section */}
            <section id="about" className="max-w-5xl mx-auto px-6 pt-6 pb-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-500 font-medium uppercase tracking-[0.2em] text-[10px]">
                  <span className="w-8 h-[1px] bg-zinc-200" />
                  <span>About My Approach</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-zinc-900 max-w-4xl flex flex-wrap gap-x-[0.25em] gap-y-2">
                  <TextFill text="From" delay={0.2} />
                  <TextFill text="research" delay={0.4} className="font-playfair italic" fillColor="text-red-500" />
                  <TextFill text="to" delay={0.6} />
                  <TextFill text="design," delay={0.8} className="font-playfair italic" fillColor="text-red-500" />
                  <TextFill text="building" delay={1.0} />
                  <TextFill text="products" delay={1.1} />
                  <TextFill text="that" delay={1.2} />
                  <TextFill text="work." delay={1.3} className="font-playfair italic" fillColor="text-red-500" />
                </h2>
              </div>
              <p className="text-zinc-500 text-xl md:text-2xl leading-relaxed max-w-3xl">
                I combine UX research, product thinking, and design to create clear, effective digital experiences.
              </p>
            </div>

            {/* Integrated Experience Tiles */}
            <div className="pt-12 border-t border-zinc-100">
              <div className="mb-8">
                <p className="text-zinc-400 font-medium uppercase tracking-widest text-[10px]">Experience</p>
                <h3 className="text-2xl font-bold text-zinc-900">Professional Journey</h3>
              </div>
              <Testimonials />
            </div>
          </motion.div>
        </section>

        {/* Contact Banner */}
        <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
             <div className="absolute inset-0 bg-pink-300 rounded-[50px] translate-y-4 rotate-2 opacity-50 transition-transform group-hover:rotate-1"></div>
             <div className="absolute inset-0 bg-green-200 rounded-[50px] translate-y-2 -rotate-1 opacity-50 transition-transform group-hover:-rotate-2"></div>
             <div className="relative bg-[#0a3161] p-16 md:p-24 rounded-[50px] text-center space-y-12 overflow-hidden">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="text-center">
                    <h4 className="text-3xl font-bold text-white">Tamizh</h4>
                    <p className="text-brand-50 font-medium uppercase tracking-widest text-xs">Product Designer · UX Research · UX Design</p>
                  </div>
                </motion.div>
                
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto"
                >
                  “Ready to bring your vision to life? Let's build something beautiful.”
                </motion.h2>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap justify-center gap-4 pt-6"
                >
                  <a 
                    href="mailto:tamizhselvan018@gmail.com" 
                    className="bg-white text-[#0a3161] font-semibold h-14 px-8 rounded-full flex items-center justify-center gap-2.5 hover:bg-zinc-100 transition-all shadow-xl active:scale-95 group/btn"
                  >
                    <GmailIcon className="w-5 h-5 text-[#0a3161] group-hover/btn:scale-110 transition-transform" />
                    <span>Get in touch via Email</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/tamizhselvan-u" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-transparent text-white border border-white/30 font-semibold h-14 px-8 rounded-full flex items-center justify-center gap-2.5 hover:bg-white/10 transition-all active:scale-95 group/btn"
                  >
                    <LinkedinIcon className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </motion.div>
             </div>
          </motion.div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-24 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="text-xl font-black tracking-tighter">Tamizh</div>
          <div className="text-zinc-400 text-xs tracking-widest uppercase font-medium">Product Designer</div>
        </div>

        <div className="flex gap-8 text-sm font-medium">
          <a href="https://www.linkedin.com/in/tamizhselvan-u" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-2">
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:tamizhselvan018@gmail.com" className="text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-2">
            <GmailIcon className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>

        <div className="text-zinc-400 text-sm">© 2025 Tamizh. All rights reserved.</div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyDetail 
            key={selectedProject.id}
            project={selectedProject} 
            onBack={() => setSelectedProjectId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
