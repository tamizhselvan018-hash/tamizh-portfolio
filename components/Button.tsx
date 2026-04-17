
import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', onClick }) => {
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "px-6 py-3 rounded-full font-medium transition-colors duration-300 flex items-center justify-center gap-2 active:scale-95";
  
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-white text-black hover:bg-zinc-100",
    outline: "border border-zinc-200 text-zinc-900 hover:bg-zinc-50",
    ghost: "bg-transparent text-zinc-600 hover:text-black hover:bg-zinc-100"
  };

  return (
    <motion.button 
      onClick={onClick} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
