import { Card, CardRarity } from '../../types/cards';
import { allCards } from '../../data/cards';

const RARITY_WEIGHTS = {
  rare: 0.1,      // 10% chance
  uncommon: 0.2,  // 20% chance
  common: 0.3,    // 30% chance
  starter: 0.4    // 40% chance
};

export const generateRandomCard = (): Card => {
  const roll = Math.random();
  let targetRarity: CardRarity;
  
  if (roll < RARITY_WEIGHTS.rare) {
    targetRarity = 'rare';
  } else if (roll < RARITY_WEIGHTS.rare + RARITY_WEIGHTS.uncommon) {
    targetRarity = 'uncommon';
  } else if (roll < RARITY_WEIGHTS.rare + RARITY_WEIGHTS.uncommon + RARITY_WEIGHTS.common) {
    targetRarity = 'common';
  } else {
    targetRarity = 'starter';
  }
  
  const possibleCards = allCards.filter(card => card.rarity === targetRarity);
  const randomCard = possibleCards[Math.floor(Math.random() * possibleCards.length)];
  
  // Create a new instance of the card with a unique ID
  return {
    ...randomCard,
    id: `${randomCard.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
};