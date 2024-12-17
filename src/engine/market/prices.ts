import { GameState } from '../../types/game';
import { MarketEvent } from '../../types/events';
import { ResourcePrice, MarketTrend } from './types';
import { applyModifiers, updateModifiers } from './modifiers';
import { generateNewTrend, applyTrend } from './trends';
import { applyVolatility } from './volatility';
import { ReputationManager } from '../reputation/reputationManager';

export const updateMarketPrices = (state: GameState): [GameState, MarketEvent[]] => {
  const events: MarketEvent[] = [];
  const newMarketState = { ...state.marketState };
  
  // Update each resource price
  Object.entries(newMarketState.resourcePrices).forEach(([resource, price]) => {
    let updatedPrice = { ...price } as ResourcePrice;
    
    // Update modifiers
    updatedPrice = updateModifiers(updatedPrice);
    
    // Check if trend needs updating
    const currentTrend = newMarketState.trends[resource];
    if (!currentTrend || currentTrend.duration <= 0) {
      newMarketState.trends[resource] = generateNewTrend();
    }
    
    // Apply current trend
    updatedPrice = applyTrend(updatedPrice, newMarketState.trends[resource]);
    
    // Apply volatility
    updatedPrice = applyVolatility(updatedPrice);
    
    // Apply faction modifiers
    state.corporations.forEach(faction => {
      const modifier = ReputationManager.getReputationModifier(faction);
      if (modifier !== 0) {
        updatedPrice.modifiers.push({
          type: 'multiplier',
          value: modifier,
          source: faction.id,
          duration: 1
        });
      }
    });
    
    // Calculate final price
    const oldPrice = price.current;
    const newPrice = applyModifiers(updatedPrice);
    updatedPrice.current = newPrice;
    
    // Generate event if price changed significantly
    const priceChange = newPrice - oldPrice;
    if (Math.abs(priceChange) >= oldPrice * 0.05) {
      events.push({
        id: Math.random().toString(36).substr(2, 9),
        type: 'market',
        message: `${resource} price ${priceChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(priceChange)}`,
        timestamp: Date.now(),
        details: {
          resource,
          oldPrice,
          newPrice,
          change: priceChange
        }
      });
    }
    
    newMarketState.resourcePrices[resource] = updatedPrice;
  });
  
  return [
    { ...state, marketState: newMarketState },
    events
  ];
};