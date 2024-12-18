import { GameState } from '../types/game';
import { getStarterDeck } from './cards';
import { factions } from './factions';
import { shuffleArray } from '../utils/array';
import { createInitialMarketState } from '../engine/market/initialState';
import { generateGoals } from './goals';

export const getInitialState = (): GameState => {
  const starterDeck = shuffleArray(getStarterDeck());
  const initialHand = starterDeck.slice(0, 5);
  const remainingDeck = starterDeck.slice(5);
  const initialGoals = factions.flatMap(faction => generateGoals(faction.id));

  return {
    // Starting Resources
    credits: 500,
    condition: 80,
    factions: factions,
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
    debtPaymentDue: 3,
    
    // Market State
    marketState: createInitialMarketState(),

    // Goals System
    goals: initialGoals
  };
};