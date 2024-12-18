import React from 'react';
import { Card } from '../../types/cards';
import { Zap, Plus, Minus, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

interface DeckCardProps {
  card: Card;
  onAdd?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  cost?: number;
}

export const DeckCard: React.FC<DeckCardProps> = ({
  card,
  onAdd,
  onRemove,
  disabled,
  cost
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`
        bg-gray-800 rounded-lg p-3 flex items-center justify-between
        ${disabled ? 'opacity-50' : 'hover:bg-gray-700'}
        transition-colors
      `}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-yellow-400">
            <Zap size={16} />
            <span>{card.cost.energy}</span>
          </div>
          {cost !== undefined && cost > 0 && (
            <div className="flex items-center gap-1 text-green-400">
              <CreditCard size={16} />
              <span>{cost}</span>
            </div>
          )}
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-white">{card.name}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              card.rarity === 'rare' ? 'bg-purple-600' :
              card.rarity === 'uncommon' ? 'bg-blue-600' :
              card.rarity === 'common' ? 'bg-green-600' :
              'bg-gray-600'
            }`}>
              {card.rarity}
            </span>
          </div>
          <p className="text-sm text-gray-400">{card.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onAdd && (
          <button
            onClick={onAdd}
            disabled={disabled}
            className={`
              p-1 rounded-full
              ${disabled
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
              }
            `}
          >
            <Plus size={16} className="text-white" />
          </button>
        )}
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-1 rounded-full bg-red-600 hover:bg-red-700"
          >
            <Minus size={16} className="text-white" />
          </button>
        )}
      </div>
    </motion.div>
  );
};