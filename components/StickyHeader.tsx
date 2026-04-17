
import React, { useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { TextFill } from './TextFill';

export const StickyHeader: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('tamizhselvan018@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      className="sticky top-0 z-50 w-full bg-[#F8F9FA]/80 backdrop-blur-md px-6 py-0"
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-6xl mx-auto flex justify-between items-center h-16">
        <div className="text-xl font-black tracking-tighter">
          <TextFill text="Tamizh" delay={0.5} duration={1} fillColor="text-red-500" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Works', 'About'].map((item, i) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="font-medium text-sm hover:text-red-500 transition-colors"
            >
              {item}
            </motion.a>
          ))}
          
          <div className="relative">
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              onClick={() => setIsContactOpen(!isContactOpen)}
              className="font-medium text-sm hover:text-red-500 transition-colors flex items-center gap-1"
            >
              Contact
              <motion.svg 
                animate={{ rotate: isContactOpen ? 180 : 0 }}
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>

            <AnimatePresence>
              {isContactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden"
                >
                  <div className="p-2">
                    <div className="relative group/email">
                      <a 
                        href="mailto:tamizhselvan018@gmail.com"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email</span>
                          <span className="text-sm font-medium text-zinc-900 truncate">tamizhselvan018@gmail.com</span>
                        </div>
                      </a>
                      
                      <button 
                        onClick={copyEmail}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-zinc-100 text-zinc-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover/email:opacity-100"
                        title="Copy email"
                      >
                        {copied ? (
                          <span className="text-[10px] font-bold px-1">Copied!</span>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <a 
                      href="https://www.linkedin.com/in/tamizh-selvan-ux/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">LinkedIn</span>
                        <span className="text-sm font-medium text-zinc-900">Tamizh Selvan</span>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
