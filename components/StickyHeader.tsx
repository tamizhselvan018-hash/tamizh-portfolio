
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { TextFill } from './TextFill';
import { Mail, Briefcase, Copy, Check } from 'lucide-react';

interface StickyHeaderProps {
  activeView?: 'portfolio' | 'sandbox';
  setActiveView?: (view: 'portfolio' | 'sandbox') => void;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({ activeView = 'portfolio', setActiveView }) => {
  const { scrollYProgress } = useScroll();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
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
      className="sticky top-0 z-50 w-full bg-[#FAF9F6]/80 backdrop-blur-md px-4 md:px-6 py-0"
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="w-full flex justify-between items-center h-16">
        <div 
          className="text-xl font-black tracking-tighter cursor-pointer"
          onClick={() => {
            setActiveView?.('portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <TextFill text="Tamizh" delay={0.5} duration={1} fillColor="text-red-500" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          <motion.button 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => {
              setActiveView?.('portfolio');
              setTimeout(() => {
                const el = document.getElementById('works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className={`font-medium text-sm hover:text-red-500 transition-colors cursor-pointer ${
              activeView === 'portfolio' ? 'text-zinc-900 font-semibold border-b-2 border-red-500 pb-0.5' : 'text-zinc-500'
            }`}
          >
            Works
          </motion.button>

          <motion.button 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            onClick={() => {
              setActiveView?.('sandbox');
              setTimeout(() => {
                const el = document.getElementById('design-system-playground');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 105);
            }}
            className={`font-medium text-sm hover:text-red-500 transition-colors cursor-pointer ${
              activeView === 'sandbox' ? 'text-zinc-900 font-semibold border-b-2 border-red-500 pb-0.5' : 'text-zinc-500'
            }`}
          >
            Design Sandbox
          </motion.button>

          <motion.button 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            onClick={() => {
              setActiveView?.('portfolio');
              setTimeout(() => {
                const el = document.getElementById('about');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="font-medium text-sm hover:text-red-500 transition-colors cursor-pointer text-zinc-500"
          >
            About
          </motion.button>

          {/* Contact Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="font-medium text-sm hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none animate-none font-sans"
            >
              <span>Contact</span>
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute right-0 mt-3 w-64 bg-white border border-zinc-150/80 rounded-2xl shadow-xl overflow-hidden py-1 z-50 origin-top-right"
                >
                  <a
                    href="mailto:tamizhselvan018@gmail.com"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                        <Mail className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium group-hover:text-red-500 transition-colors">Email</span>
                        <span className="text-[11px] text-zinc-400">tamizhselvan018@gmail.com</span>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-red-500 transition-colors shrink-0"
                      title="Copy email address"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </a>

                  <div className="h-[1px] bg-zinc-100" />

                  <a
                    href="https://www.linkedin.com/in/tamizhselvan-u"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium group-hover:text-blue-600 transition-colors">LinkedIn</span>
                      <span className="text-[11px] text-zinc-400">tamizhselvan-u</span>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
