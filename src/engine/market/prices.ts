import { GameState } from '../../types/game';

export const updateMarketPrices = (state: GameState): GameState => {
  const marketState = { ...state.marketState };
  const resourcePrices = { ...marketState.resourcePrices };

  Object.keys(resourcePrices).forEach(resource => {
    const change = (Math.random() - 0.5) * 20; // -10 to +10
    resourcePrices[resource] += change;
  });

  return {
    ...state,
    marketState: {
      ...marketState,
      resourcePrices,
    },
  };
};