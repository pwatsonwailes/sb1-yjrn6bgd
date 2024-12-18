import React from 'react';
import { motion } from 'framer-motion';
import { StoryNode } from '../../../types/story';

interface ButtonNodeProps {
  node: StoryNode;
  onComplete: () => void;
}

export const ButtonNode: React.FC<ButtonNodeProps> = ({ node, onComplete }) => {
  return (
    <div className="text-center">
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onComplete}
        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-lg font-semibold transition-colors"
      >
        {node.text || 'Continue'}
      </motion.button>
    </div>
  );
};