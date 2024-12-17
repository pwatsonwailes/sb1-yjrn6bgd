import { GameState, MarketState } from '../types/game';
import { getStarterDeck } from './cards';
import { corporations } from './corporations';
import { shuffleArray } from '../utils/array';

const getInitialMarketState = (): MarketState => ({
  resourcePrices: {
    ore: Math.floor(Math.random() * 20) + 90, // 90-110 base price
    tech: Math.floor(Math.random() * 30) + 185, // 185-215 base price
    data: Math.floor(Math.random() * 25) + 135, // 135-160 base price
  },
  priceMultiplier: 1.0,
});

export const getInitialState = (): GameState => {
  const starterDeck = shuffleArray(getStarterDeck());
  const initialHand = starterDeck.slice(0, 5);
  const remainingDeck = starterDeck.slice(5);

  return {
    // Starting Resources
    credits: 500,
    condition: 80,
    corporations: corporations,
    stress: 0,
    energyPoints: 5,
    
    // Deck State
    deck: remainingDeck,
    hand: initialHand,
    discardPile: [],
    
    // Game Progress
    turn: 1,
    
    // Debt System
    debt: 200,
    debtPaymentDue: 3, // Payment due in 3 turns
    
    // Market State
    marketState: getInitialMarketState(),
  };
};