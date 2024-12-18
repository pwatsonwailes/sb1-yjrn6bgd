import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Character {
  name: string;
  image: string;
}

interface CharacterPanelProps {
  characters: Character[];
}

export const CharacterPanel: React.FC<CharacterPanelProps> = ({ characters }) => {
  return (
    <div className="p-6 bg-gradient-to-t from-black to-transparent">
      <div className="flex gap-6 justify-center">
        <AnimatePresence mode="popLayout">
          {characters.map(character => (
            <motion.div
              key={character.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center"
            >
              <div
                className="w-24 h-24 rounded-full bg-center bg-cover border-2 border-white mb-2"
                style={{ backgroundImage: `url(${character.image})` }}
              />
              <div className="text-white font-medium">{character.name}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};