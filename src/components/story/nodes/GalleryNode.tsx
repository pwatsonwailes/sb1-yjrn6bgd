import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryNode } from '../../../types/story';

interface GalleryNodeProps {
  node: StoryNode;
  onComplete: () => void;
}

export const GalleryNode: React.FC<GalleryNodeProps> = ({ node, onComplete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = node.media?.images || [];

  useEffect(() => {
    if (!images[currentImageIndex]) {
      onComplete();
      return;
    }

    const image = images[currentImageIndex];
    const timer = setTimeout(() => {
      if (currentImageIndex < images.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
      } else {
        onComplete();
      }
    }, (image.displayDuration || 5000) + (image.transitionDuration || 1000));

    return () => clearTimeout(timer);
  }, [currentImageIndex, images, onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        {images[currentImageIndex] && (
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: (images[currentImageIndex].transitionDuration || 1000) / 1000
            }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(/images/${images[currentImageIndex].src}.jpg)` }}
            />
            {images[currentImageIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <p className="text-white text-lg max-w-2xl mx-auto text-center">
                  {images[currentImageIndex].caption}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 px-4 py-2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-lg transition-colors"
      >
        Skip
      </button>

      {/* Progress indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-colors
              ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}
            `}
          />
        ))}
      </div>
    </div>
  );
};