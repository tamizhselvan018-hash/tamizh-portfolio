
import React from 'react';
import { motion } from 'motion/react';

interface TextFillProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  fillColor?: string;
}

export const TextFill: React.FC<TextFillProps> = ({ 
  text, 
  className = "", 
  delay = 0, 
  duration = 1.5,
  fillColor = "text-zinc-900"
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Background Text (Light Grey) */}
      <span className="text-zinc-300">
        {text}
      </span>
      
      {/* Foreground Text (Filled Color) */}
      <motion.span
        initial={{ clipPath: 'inset(-20% 100% -20% 0)' }}
        animate={{ clipPath: 'inset(-20% 0% -20% 0)' }}
        transition={{ 
          duration, 
          delay, 
          ease: [0.4, 0, 0.2, 1] 
        }}
        className={`absolute top-0 left-0 ${fillColor} select-none whitespace-nowrap`}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </div>
  );
};
