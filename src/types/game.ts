import { Faction } from './factions';
import { Card } from './cards';
import { MarketPricesState } from '../engine/market/types';

export interface GameState {
  credits: number;
  condition: number;
  factions: Faction[];
  stress: number;
  energyPoints: number;
  deck: Card[];
  hand: Card[];
  discardPile: Card[];
  turn: number;
  debt: number;
  debtPaymentDue: number;
  marketState: MarketPricesState;
}

export interface MarketState {
  resourcePrices: {
    ore: number;
    tech: number;
    data: number;
  };
  priceMultiplier: number;
}

// Re-export existing types
export * from './cards';
export * from './factions';
export * from './events';