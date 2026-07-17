
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { TextFill } from './TextFill';
import { Star } from 'lucide-react';

const NameRotator: React.FC = () => {
  return (
    <span className="inline-block text-red-500 font-playfair italic select-none">
      Tamizh
    </span>
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

  return (
    <div className="flex flex-col items-center text-center w-full max-w-5xl px-4">
      <motion.h1
        variants={sentence}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.2] tracking-tight text-zinc-900 mb-6 flex flex-col items-center gap-y-3"
      >
        <span className="flex flex-wrap justify-center items-baseline gap-x-[0.25em] gap-y-1">
          {["Hey,", "I'm", "Tamizh."].map((word, wIdx) => (
            <span key={`l1-${wIdx}`} className="inline-block whitespace-nowrap">
              {word.split("").map((char, cIdx) => {
                const isTamizhWord = word === "Tamizh.";
                const isPeriod = char === ".";
                const isItalicRed = isTamizhWord && !isPeriod;
                return (
                  <motion.span
                    key={cIdx}
                    variants={letter}
                    className={isItalicRed ? "text-red-500 font-playfair italic inline-block" : "inline-block"}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </span>

        <span className="flex flex-wrap justify-center items-center gap-x-[0.25em] gap-y-1 font-medium text-zinc-700 text-2xl sm:text-3xl md:text-5xl mt-3 leading-relaxed">
          {["I", "design", "products", "—", "and", "I", "can", "actually", "build", "them", "too."].map((word, wIdx) => (
            <span key={`l2-${wIdx}`} className="inline-block whitespace-nowrap">
              {word.split("").map((char, cIdx) => {
                const isDesign = word === "design";
                const isBuild = word === "build";
                const isItalicRed = isDesign || isBuild;
                return (
                  <motion.span
                    key={cIdx}
                    variants={letter}
                    className={isItalicRed ? "text-red-500 font-playfair italic inline-block font-semibold" : "inline-block"}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </span>
      </motion.h1>
    </div>
  );
};

const ShootingStar = ({ delay, left, top }: { delay: number; left: string; top: string }) => (
  <motion.div
    initial={{ 
      x: -100, 
      y: -100, 
      opacity: 0,
      scale: 0
    }}
    animate={{ 
      x: [0, 800],
      y: [0, 600],
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 1, 0.5],
    }}
    transition={{ 
      duration: 1.5, 
      delay, 
      repeat: 2, 
      ease: "linear",
      repeatDelay: Math.random() * 8
    }}
    className="absolute pointer-events-none z-0"
    style={{ 
      top, 
      left,
    }}
  >
    <div className="relative rotate-[35deg]">
      {/* Star Head with Glow */}
      <div className="w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_2px_rgba(59,130,246,0.8)]" />
      
      {/* Long Streak Trail */}
      <div 
        className="absolute top-1/2 right-0 -translate-y-1/2 h-[1px] w-32 bg-gradient-to-l from-blue-500 via-blue-500/50 to-transparent"
        style={{ transformOrigin: 'right center' }}
      />
      
      {/* Extra Sparkle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500/20 blur-sm rounded-full" />
    </div>
  </motion.div>
);

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  const scrollToWorks = () => {
    const worksSection = document.getElementById('works');
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section 
      style={{ opacity, y, scale }}
      className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative text-center flex flex-col items-center overflow-hidden"
    >
      {/* Shooting Stars (Meteor Shower Style) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ShootingStar delay={5.8} left="10%" top="-5%" />
        <ShootingStar delay={7.8} left="30%" top="-10%" />
        <ShootingStar delay={9.8} left="50%" top="-5%" />
        <ShootingStar delay={6.8} left="70%" top="-15%" />
        <ShootingStar delay={8.8} left="5%" top="15%" />
        <ShootingStar delay={10.8} left="85%" top="5%" />
        <ShootingStar delay={6.3} left="40%" top="-20%" />
        <ShootingStar delay={8.3} left="60%" top="0%" />
      </div>

      {/* Refined Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-brand-50 via-white to-emerald-50 rounded-full blur-[120px] -z-10"
      />

      <TypingHeading />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="text-zinc-500 text-xl md:text-2xl leading-relaxed max-w-3xl mb-10 text-balance"
      >
        I specialize in UX research and interaction design.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button 
          variant="primary" 
          className="h-14 px-10 text-lg shadow-2xl shadow-brand-500/20 rounded-full"
          onClick={scrollToWorks}
        >
          View my work <span className="ml-2">↓</span>
        </Button>
      </motion.div>
    </motion.section>
  );
};
