
import React from 'react';
import { motion, useScroll } from 'motion/react';
import { TextFill } from './TextFill';

export const StickyHeader: React.FC = () => {
  const { scrollYProgress } = useScroll();

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
        </div>
      </div>
    </motion.nav>
  );
};
