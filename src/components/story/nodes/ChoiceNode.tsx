import React from 'react';
import { motion } from 'framer-motion';
import { StoryNode } from '../../../types/story';

interface ChoiceNodeProps {
  node: StoryNode;
  onChoice: (choiceId: string, picked: number) => void;
}

export const ChoiceNode: React.FC<ChoiceNodeProps> = ({ node, onChoice }) => {
  if (!node.id || !node.options) return null;

  return (
    <div className="max-w-2xl w-full">
      {node.media?.character && (
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full bg-center bg-cover"
            style={{ backgroundImage: `url(/images/${node.media.character.src}.jpg)` }}
          />
          <div>
            <div className="text-gray-400 text-sm">
              {node.media.character.cast}
            </div>
            <div className="text-white font-medium">
              {node.media.character.name}
            </div>
          </div>
        </div>
      )}

      <p className="text-white text-lg mb-8">{node.text}</p>

      <div className="space-y-3">
        {node.options.map((option, index) => (
          <motion.button
            key={option.picked}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onChoice(node.id!, option.picked)}
            className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-left transition-colors"
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
};