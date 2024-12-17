export interface Corporation {
  id: string;
  name: string;
  description: string;
  reputation: number;
}

export interface GameState {
  credits: number;
  condition: number;
  corporations: Corporation[];
  stress: number;
  energyPoints: number;
  deck: Card[];
  hand: Card[];
  discardPile: Card[];
  turn: number;
  debt: number;
  debtPaymentDue: number;
  marketState: MarketState;
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