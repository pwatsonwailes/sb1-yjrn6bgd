import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StoryNode } from '../../../types/story';

interface ParagraphNodeProps {
  node: StoryNode;
  onComplete: () => void;
}

export const ParagraphNode: React.FC<ParagraphNodeProps> = ({ node, onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, node.duration || 2000);

    return () => clearTimeout(timer);
  }, [node.duration]);

  return (
    <div className="relative max-w-2xl w-full">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white text-lg leading-relaxed mb-8"
      >
        {node.text}
      </motion.p>

      {isComplete && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onComplete}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors"
        >
          Continue
        </motion.button>
      )}
    </div>
  );
};