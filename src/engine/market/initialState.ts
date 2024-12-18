import { MarketPricesState, ResourcePrice } from './types';

const createInitialResourcePrice = (basePrice: number, volatility: number): ResourcePrice => ({
  base: basePrice,
  current: basePrice,
  volatility,
  trend: 0,
  modifiers: []
});

export const createInitialMarketState = (): MarketPricesState => ({
  resourcePrices: {
    ore: createInitialResourcePrice(100, 0.1),
    tech: createInitialResourcePrice(200, 0.15),
    data: createInitialResourcePrice(150, 0.12)
  },
  globalModifier: 1.0,
  trends: {},
  lastUpdate: Date.now()
});