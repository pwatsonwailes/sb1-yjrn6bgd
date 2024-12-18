import React from 'react';
import { motion } from 'framer-motion';

interface TutorialHighlightProps {
  selector: string;
}

export const TutorialHighlight: React.FC<TutorialHighlightProps> = ({ selector }) => {
  const element = document.querySelector(selector);
  if (!element) return null;

  const rect = element.getBoundingClientRect();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute pointer-events-none"
      style={{
        top: rect.top - 8,
        left: rect.left - 8,
        width: rect.width + 16,
        height: rect.height + 16,
        border: '2px solid #6366f1',
        borderRadius: '8px',
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
        zIndex: 40
      }}
    >
      <div className="absolute inset-0 bg-indigo-500 opacity-10 rounded-lg" />
    </motion.div>
  );
};