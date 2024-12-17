import { GameState } from '../../types/game';
import { MarketEvent } from '../../types/events';

export const updateMarketPrices = (state: GameState): [GameState, MarketEvent[]] => {
  const marketState = { ...state.marketState };
  const resourcePrices = { ...marketState.resourcePrices };
  const events: MarketEvent[] = [];

  Object.entries(resourcePrices).forEach(([resource, oldPrice]) => {
    const change = (Math.random() - 0.5) * 20; // -10 to +10
    const newPrice = Math.max(oldPrice + change, 10); // Ensure price doesn't go below 10
    resourcePrices[resource] = Math.round(newPrice);

    events.push({
      id: Math.random().toString(36).substr(2, 9),
      message: `${resource.charAt(0).toUpperCase() + resource.slice(1)} price ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(Math.round(change))}`,
      type: 'market',
      timestamp: Date.now(),
      details: {
        resource,
        oldPrice,
        newPrice,
        change
      }
    });
  });

  return [
    {
      ...state,
      marketState: {
        ...marketState,
        resourcePrices,
      },
    },
    events
  ];
};