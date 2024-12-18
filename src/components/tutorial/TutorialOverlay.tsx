import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TutorialStep } from '../../types/tutorial';

interface TutorialOverlayProps {
  step: TutorialStep;
  onComplete: (stepId: string) => void;
  onSkip: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  step,
  onComplete,
  onSkip
}) => {
  const getPositionStyles = () => {
    switch (step.position) {
      case 'top':
        return 'top-4';
      case 'bottom':
        return 'bottom-4';
      case 'left':
        return 'left-4';
      case 'right':
        return 'right-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {step.highlight && (
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
      )}
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`
            absolute ${getPositionStyles()}
            max-w-md w-full mx-4 p-6
            bg-gray-800 rounded-lg shadow-xl
            pointer-events-auto
          `}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">{step.title}</h3>
            <button
              onClick={onSkip}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              Skip all tutorials
            </button>
          </div>

          <p className="text-gray-300 mb-6">{step.description}</p>

          <div className="flex justify-between">
            <button
              onClick={() => onComplete(step.id)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors"
            >Next</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};