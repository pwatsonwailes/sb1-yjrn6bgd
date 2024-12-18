import React from 'react';
import { Card } from '../Card';
import { Card as CardType } from '../../types/cards';

interface BoardViewProps {
  turn: number;
  debtPaymentDue: number;
  hand: CardType[];
  energyPoints: number;
  credits: number;
  selectedCards: Set<string>;
  playingCards: Set<string>;
  selectedEnergy: number;
  onCardClick: (card: CardType) => void;
  onEndTurn: () => void;
}

export const BoardView: React.FC<BoardViewProps> = ({
  turn,
  debtPaymentDue,
  hand,
  energyPoints,
  credits,
  selectedCards,
  playingCards,
  selectedEnergy,
  onCardClick,
  onEndTurn,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white">Turn {turn}</h2>
        {debtPaymentDue > 0 && (
          <div className="text-red-400">
            Debt Payment Due in {debtPaymentDue} turns
          </div>
        )}
      </div>
      
      <div className="flex justify-center mb-4">
        <button
          onClick={onEndTurn}
          disabled={selectedCards.size === 0}
          className={`
            px-4 py-2 rounded-lg transition-colors
            ${selectedCards.size === 0
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
            }
            text-white
          `}
        >
          End Turn
        </button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {hand.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={() => onCardClick(card)}
            disabled={
              energyPoints < card.cost.energy ||
              (card.cost.credits && credits < card.cost.credits) ||
              (!selectedCards.has(card.id) && 
               selectedEnergy + card.cost.energy > energyPoints)
            }
            selected={selectedCards.has(card.id)}
            playing={playingCards.has(card.id)}
          />
        ))}
      </div>
    </div>
  );
};