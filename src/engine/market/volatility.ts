import { ResourcePrice } from './types';

export const calculateVolatility = (
  priceHistory: number[],
  timeWindow: number = 5
): number => {
  if (priceHistory.length < 2) return 0;
  
  const recentPrices = priceHistory.slice(-timeWindow);
  const changes = [];
  
  for (let i = 1; i < recentPrices.length; i++) {
    const change = Math.abs(
      (recentPrices[i] - recentPrices[i - 1]) / recentPrices[i - 1]
    );
    changes.push(change);
  }
  
  return changes.reduce((sum, change) => sum + change, 0) / changes.length;
};

export const applyVolatility = (price: ResourcePrice): ResourcePrice => {
  const volatilityEffect = (Math.random() - 0.5) * price.volatility * 0.1;
  
  return {
    ...price,
    current: Math.round(price.current * (1 + volatilityEffect))
  };
};