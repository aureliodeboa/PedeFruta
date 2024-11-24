import React from 'react';
import { motion } from 'framer-motion';

interface SlideProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
}

export const OnboardingSlide: React.FC<SlideProps> = ({
  title,
  description,
  icon,
  isActive
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center p-8 ${
        isActive ? 'block' : 'hidden'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-primary-darkGreen mb-8 text-6xl">
        {icon}
      </div>
      <h2 className="text-3xl font-bold mb-4 text-primary-dark text-center">
        {title}
      </h2>
      <p className="text-lg text-gray-600 text-center max-w-md">
        {description}
      </p>
    </motion.div>
  );
};
