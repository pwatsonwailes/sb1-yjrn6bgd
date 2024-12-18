import React from 'react';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnergyCounterProps {
  currentEnergy: number;
  maxEnergy: number;
  selectedEnergy: number;
}

export const EnergyCounter: React.FC<EnergyCounterProps> = ({
  currentEnergy,
  maxEnergy,
  selectedEnergy
}) => {
  const remainingEnergy = currentEnergy - selectedEnergy;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 bg-gray-800 rounded-lg p-3 shadow-lg"
    >
      <div className="flex items-center gap-2">
        <Zap className="text-yellow-400" size={20} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-white font-medium">
              {remainingEnergy}
            </span>
            <span className="text-gray-400 text-sm">
              / {maxEnergy}
            </span>
          </div>
          {selectedEnergy > 0 && (
            <div className="text-xs text-yellow-400">
              -{selectedEnergy} from selected cards
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};