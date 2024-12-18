import React, { useMemo } from 'react';
import { Faction } from '../../types/factions';
import { Card } from '../../types/cards';
import { DeckCard } from '../deck/DeckCard';
import { allCards } from '../../data/cards';

interface FactionCardsProps {
  faction: Faction;
  credits: number;
  onPurchaseCard: (card: Card, cost: number) => void;
}

export const FactionCards: React.FC<FactionCardsProps> = ({
  faction,
  credits,
  onPurchaseCard,
}) => {
  const factionCards = useMemo(() => {
    return allCards.filter(card => 
      card.effects.some(effect => effect.factionId === faction.id)
    );
  }, [faction.id]);

  const calculateCardCost = (card: Card): number => {
    switch (card.rarity) {
      case 'rare': return 500;
      case 'uncommon': return 300;
      case 'common': return 150;
      case 'starter': return 0;
      default: return 0;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Available Cards</h3>
        <div className="text-sm text-gray-400">
          {factionCards.length} cards available
        </div>
      </div>

      <div className="grid gap-3">
        {factionCards.map(card => (
          <DeckCard
            key={card.id}
            card={card}
            cost={calculateCardCost(card)}
            onAdd={() => onPurchaseCard(card, calculateCardCost(card))}
            disabled={credits < calculateCardCost(card)}
          />
        ))}
      </div>
    </div>
  );
};