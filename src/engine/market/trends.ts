import { MarketTrend, ResourcePrice } from './types';

export const generateNewTrend = (): MarketTrend => {
  const directions = ['up', 'down', 'stable'] as const;
  const direction = directions[Math.floor(Math.random() * 3)];
  
  return {
    direction,
    strength: Math.random(),
    duration: Math.floor(Math.random() * 5) + 1 // 1-5 turns
  };
};

export const applyTrend = (price: ResourcePrice, trend: MarketTrend): ResourcePrice => {
  let trendValue = 0;
  
  switch (trend.direction) {
    case 'up':
      trendValue = trend.strength * 0.2; // Up to 20% increase
      break;
    case 'down':
      trendValue = -trend.strength * 0.2; // Up to 20% decrease
      break;
    case 'stable':
      trendValue = (Math.random() - 0.5) * 0.05; // Small random fluctuation
      break;
  }

  return {
    ...price,
    trend: trendValue,
    current: Math.round(price.current * (1 + trendValue))
  };
};