import { Card } from '../../types/cards';
import { miningCards } from './mining';
import { maintenanceCards } from './maintenance';
import { tradeCards } from './trade';
import { debtCards } from './debt';
import { modCards } from './mods';

export const allCards = [
  ...miningCards,
  ...maintenanceCards,
  ...tradeCards,
  ...debtCards,
  ...modCards,
];

export const getStarterDeck = (): Card[] => {
  const deck: Card[] = [
    ...Array(3).fill(miningCards[0]), // 3x Basic Mining
    ...Array(2).fill(maintenanceCards[0]), // 2x Quick Repair
    ...Array(2).fill(debtCards[0]), // 2x Subscription Payment
    ...Array(2).fill(tradeCards[0]), // 2x Small Trade
    debtCards[1], // 1x Take Loan
    maintenanceCards[1], // 1x Emergency Repairs
  ];
  
  return deck.map((card, index) => ({
    ...card,
    id: `${card.id}-${index}` // Make IDs unique
  }));
};