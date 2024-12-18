import React from 'react';
import { Card as CardType } from '../types/game';
import { Zap, AlertTriangle, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

interface CardProps {
  card: CardType;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  playing?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, disabled, selected, playing }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      animate={playing ? { opacity: 0, scale: 0.8, y: -50 } : { opacity: 1, scale: 1, y: selected ? -8 : 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative w-56 h-80 p-4 rounded-lg
        ${disabled ? 'bg-gray-300' : 'bg-white'}
        ${selected 
          ? 'shadow-2xl border-2 border-indigo-500' 
          : 'shadow-lg hover:shadow-xl hover:-translate-y-1 border-2 border-transparent'
        }
        transition-all duration-200 flex flex-col
      `}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1 text-yellow-600">
          <Zap size={16} />
          <span>{card.cost.energy}</span>
        </div>
        {card.cost.credits && (
          <div className="flex items-center gap-1 text-green-600 ml-4">
            <CreditCard size={16} />
            <span>{card.cost.credits}</span>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-bold mb-2">{card.name}</h3>
      <p className="text-sm flex-grow">{card.description}</p>
      
      <div className="mt-2 text-sm space-y-1">
        {card.effects.map((effect, index) => (
          <div key={index} className="flex items-center gap-1">
            <span className={`
              ${effect.value > 0 ? 'text-green-600' : 'text-red-600'}
            `}>
              {effect.value > 0 ? '+' : ''}{effect.value} {effect.type}
            </span>
            {effect.chance && <span className="text-gray-500">({effect.chance * 100}%)</span>}
          </div>
        ))}
        
        {card.mandatory && card.penalty && (
          <div className="flex items-center gap-1 text-red-600 mt-2">
            <AlertTriangle size={16} />
            <span>
              Penalty: {card.penalty.value}
              {card.penalty.percentage ? '%' : ''} {card.penalty.type}
            </span>
          </div>
        )}
      </div>
      
      {card.mandatory && (
        <div className="absolute top-3 right-3">
          <span className="text-xs font-bold text-red-500">URGENT</span>
        </div>
      )}
    </motion.button>
  );
};