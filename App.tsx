
import React, { useState, useEffect, useRef } from 'react';
import { StickyHeader } from './components/StickyHeader';
import { Hero } from './components/Hero';
import { CaseStudyCard } from './components/CaseStudyCard';
import { Testimonials } from './components/Testimonials';
import { CaseStudyDetail } from './components/CaseStudyDetail';
import { CASE_STUDIES } from './constants';
import { Button } from './components/Button';
import { motion, AnimatePresence } from 'motion/react';

const WorksList: React.FC<{ onProjectClick: (id: string) => void }> = ({ onProjectClick }) => {
  return (
    <section id="works" className="max-w-5xl mx-auto px-6 py-24">
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-zinc-500 font-medium uppercase tracking-[0.2em] text-[10px]"
        >
          <span className="w-8 h-[1px] bg-zinc-200" />
          <span>Selected Works</span>
          <span className="w-8 h-[1px] bg-zinc-200" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-zinc-900 mt-4"
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

      {/* Project List */}
      <div className="flex flex-col gap-12 md:gap-20">
        {CASE_STUDIES.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.21, 0.47, 0.32, 0.98],
              delay: index * 0.1 
            }}
            onClick={() => !study.isComingSoon && onProjectClick(study.id)}
            style={{ 
              position: 'sticky', 
              top: `${100 + (index * 20)}px`,
              zIndex: index + 10
            }}
            className="cursor-pointer"
          >
            <CaseStudyCard study={study} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const TypingHeading: React.FC = () => {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.03,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const text = "I'm Tamizh, a Product Designer dedicated to crafting impactful digital experiences.";
  
  // We need to preserve the styling for "Product Designer" and "impactful"
  // Parts: 
  // 1. "I'm Tamizh, a "
  // 2. "Product Designer"
  // 3. " dedicated to crafting "
  // 4. "impactful"
  // 5. " digital experiences."

  const parts = [
    { text: "I'm Tamizh, a ", style: "" },
    { text: "Product Designer", style: "text-red-500 font-playfair italic" },
    { text: " dedicated to crafting ", style: "" },
    { text: "impactful", style: "text-red-500 font-playfair italic" },
    { text: " digital experiences.", style: "" }
  ];

  return (
    <motion.h2
      variants={sentence}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-5xl md:text-6xl font-bold leading-tight text-zinc-900"
    >
      {parts.map((part, partIdx) => (
        <span key={partIdx} className={part.style}>
          {part.text.split("").map((char, charIdx) => (
            <motion.span key={`${partIdx}-${charIdx}`} variants={letter}>
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
};

const App: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const prevProjectIdRef = useRef<string | null>(null);

  // Scroll behavior when project changes
  useEffect(() => {
    // Disable browser's default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (selectedProjectId) {
      // If a project is selected, scroll to top
      window.scrollTo(0, 0);
    } else if (prevProjectIdRef.current !== null) {
      // If we were viewing a project and now we're not (going back)
      const timer = setTimeout(() => {
        const worksSection = document.getElementById('works');
        if (worksSection) {
          worksSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Initial load or refresh, ensure we are at the top
      window.scrollTo(0, 0);
    }
    
    // Update the ref for the next run
    prevProjectIdRef.current = selectedProjectId;
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
    <div className="min-h-screen bg-[#F8F9FA]">
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <CaseStudyDetail 
            key="detail"
            project={selectedProject} 
            onBack={() => setSelectedProjectId(null)} 
          />
        ) : (
          <motion.div 
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StickyHeader />
            
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
                        <span>About Me</span>
                      </div>
                      <TypingHeading />
                    </div>
                    <p className="text-zinc-500 text-xl md:text-2xl leading-relaxed max-w-3xl">
                      I specialize in UX research and interaction design, bridging the gap between complex engineering requirements and seamless user interfaces.
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
                   </div>
                </motion.div>
              </section>
            </main>

            <footer className="max-w-5xl mx-auto px-6 py-24 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col gap-2 items-center md:items-start">
                <div className="text-xl font-black tracking-tighter">Tamizh</div>
                <div className="text-zinc-400 text-xs tracking-widest uppercase font-medium">Product Designer</div>
              </div>
              <div className="text-zinc-400 text-sm">© 2025 Tamizh. All rights reserved.</div>
              <div className="flex gap-8">
                <a href="mailto:tamizhselvan018@gmail.com" className="text-zinc-400 hover:text-red-500 transition-colors text-sm font-medium">Email</a>
                <a href="https://www.linkedin.com/in/tamizh-selvan-ux/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors text-sm font-medium">LinkedIn</a>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
